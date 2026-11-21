import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const PNG_SIGNATURE: readonly number[] = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;
const MAX_BYTES = 1048576;

const CRC32_TABLE: Uint32Array = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function computeCrc32(buf: Buffer, start: number, end: number): number {
  let crc = 0xffffffff;
  for (let i = start; i < end; i++) {
    crc = CRC32_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function validatePng(buf: Buffer): void {
  if (buf.byteLength < 57 || buf.byteLength > MAX_BYTES) {
    throw new Error(`Invalid PNG byte length: ${buf.byteLength} (expected 57..${MAX_BYTES})`);
  }

  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (buf[i] !== PNG_SIGNATURE[i]) {
      throw new Error(`Invalid PNG signature byte at index ${i}`);
    }
  }

  const ihdrLength = buf.readUInt32BE(8);
  const ihdrType = buf.subarray(12, 16).toString("ascii");
  if (ihdrLength !== 13 || ihdrType !== "IHDR") {
    throw new Error(`Invalid IHDR chunk: length=${ihdrLength}, type=${ihdrType}`);
  }

  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const bitDepth = buf[24];
  const colorType = buf[25];
  const interlaceMethod = buf[28];
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    throw new Error(`Invalid PNG dimensions: ${width}x${height} (expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT})`);
  }
  if (bitDepth !== 8 || (colorType !== 2 && colorType !== 6) || interlaceMethod !== 0) {
    throw new Error(
      `Unexpected PNG format: bitDepth=${bitDepth}, colorType=${colorType}, interlace=${interlaceMethod}`
    );
  }

  let offset = 8;
  let chunkCount = 0;
  let sawIhdr = false;
  let sawIdat = false;
  let totalIdatBytes = 0;
  let sawIend = false;

  while (offset < buf.byteLength) {
    if (offset + 12 > buf.byteLength) {
      throw new Error(`Truncated PNG chunk header at offset ${offset}`);
    }
    const length = buf.readUInt32BE(offset);
    const typeStart = offset + 4;
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const crcOffset = dataEnd;

    if (crcOffset + 4 > buf.byteLength) {
      throw new Error(`Truncated PNG chunk data at offset ${offset} (length=${length})`);
    }

    const chunkType = buf.subarray(typeStart, dataStart).toString("ascii");
    const expectedCrc = buf.readUInt32BE(crcOffset);
    const actualCrc = computeCrc32(buf, typeStart, dataEnd);
    if (actualCrc !== expectedCrc) {
      throw new Error(
        `CRC32 mismatch in chunk ${chunkType} at offset ${offset}: expected 0x${expectedCrc.toString(16)}, got 0x${actualCrc.toString(16)}`
      );
    }

    if (chunkCount === 0 && chunkType !== "IHDR") {
      throw new Error(`First PNG chunk must be IHDR, found ${chunkType}`);
    }
    chunkCount++;

    if (chunkType === "IHDR") {
      sawIhdr = true;
    } else if (chunkType === "IDAT") {
      sawIdat = true;
      totalIdatBytes += length;
    } else if (chunkType === "IEND") {
      sawIend = true;
      if (length !== 0 || crcOffset + 4 !== buf.byteLength) {
        throw new Error(`Invalid IEND chunk placement or length at offset ${offset}`);
      }
    }

    offset = crcOffset + 4;
  }

  if (!sawIhdr || !sawIdat || totalIdatBytes === 0 || !sawIend || offset !== buf.byteLength) {
    throw new Error(
      `Invalid PNG structure: IHDR=${sawIhdr}, IDAT=${sawIdat} (${totalIdatBytes} bytes), IEND=${sawIend}, parsed=${offset}/${buf.byteLength}`
    );
  }
}

function main(): void {
  const repoRoot = import.meta.dirname ?? process.cwd();
  const sourcePath = resolve(repoRoot, "entry.png");
  const pngBytes = readFileSync(sourcePath);

  validatePng(pngBytes);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true, mode: 0o755 });

  const outputPath = join(outputDir, "entry.png");
  writeFileSync(outputPath, pngBytes, { mode: 0o644 });
  try {
    chmodSync(outputPath, 0o644);
  } catch {
    // Ignore chmod errors on filesystems that do not support POSIX permissions
  }
}

main();
