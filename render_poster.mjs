import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_PNG = resolve(import.meta.dirname ?? process.cwd(), "entry.png");
const PREVIEW_PATHS = [
  "C:\\Users\\yukikatodo\\.gemini\\antigravity\\brain\\cfd43a09-ac67-4568-99db-651d18d1fe2a\\scratch\\preview_300.png",
  "C:\\Users\\yukikatodo\\.gemini\\antigravity-cli\\brain\\fde99d57-49b7-4940-8046-ec6bf88e5fc5\\scratch\\preview_300.png",
];

function buildHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>The World in One Day — Friday, 20 November 2026</title>
<style>
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #F8F4EC;
    color: #111827;
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 6px 10px;
    display: grid;
    grid-template-rows: 68px 286px 248px 236px 144px 24px;
    gap: 0px;
    background: #F8F4EC;
    border: 3px solid #111827;
    position: relative;
  }

  /* CLASSIC BROADSHEET MASTHEAD */
  .masthead {
    display: grid;
    grid-template-columns: 236px 1fr 258px;
    align-items: center;
    background: #111827;
    color: #F8F4EC;
    padding: 5px 12px;
    border-bottom: 4px solid #B91C1C;
    gap: 10px;
  }
  .mast-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-right: 1px solid #374151;
    padding-right: 10px;
  }
  .mast-kicker {
    font-size: 9.5px;
    font-weight: 900;
    letter-spacing: 1px;
    color: #F87171;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .mast-edition {
    font-size: 10.2px;
    font-weight: 800;
    color: #F9FAFB;
    letter-spacing: 0.25px;
    white-space: nowrap;
  }
  .mast-sub {
    font-size: 9.2px;
    font-weight: 700;
    color: #FCD34D;
    letter-spacing: 0.35px;
    white-space: nowrap;
  }
  .mast-center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
  .mast-title {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 32.5px;
    font-weight: 900;
    letter-spacing: 0.9px;
    color: #FFFFFF;
    line-height: 1.02;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .mast-deck {
    font-size: 9.8px;
    font-weight: 800;
    letter-spacing: 1.2px;
    color: #E5E7EB;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .mast-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 2px;
  }
  .date-banner {
    background: #B91C1C;
    color: #FFFFFF;
    font-size: 14.5px;
    font-weight: 900;
    letter-spacing: 0.75px;
    padding: 4px 10px;
    border-radius: 2px;
    border: 1.5px solid #FCA5A5;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .date-meta {
    font-size: 9px;
    font-weight: 700;
    color: #D1D5DB;
    letter-spacing: 0.45px;
    white-space: nowrap;
  }

  /* BROADSHEET TIER ROWS */
  .tier-a {
    display: grid;
    grid-template-columns: 38fr 31fr 31fr;
    border-bottom: 2px solid #111827;
    background: #F8F4EC;
  }
  .tier-b {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 2px solid #111827;
    background: #F8F4EC;
  }
  .tier-c {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 2.5px solid #111827;
    background: #F8F4EC;
  }

  /* BROADSHEET COLUMNS (NO ROUNDED SAAS BOXES) */
  .story {
    padding: 5px 8px 5px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    border-right: 1px solid #C8BFA8;
    background: #F8F4EC;
  }
  .story:last-child {
    border-right: none;
  }
  .story.lead-col {
    background: #FCF9F2;
  }

  .story-kicker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    height: 17px;
    flex-shrink: 0;
    border-top: 3px solid #111827;
    padding-top: 2px;
  }
  .kicker-left {
    font-size: 9.8px;
    font-weight: 900;
    letter-spacing: 0.45px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .kicker-loc {
    font-size: 9.2px;
    font-weight: 800;
    color: #4B5563;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .tier-c .kicker-left {
    font-size: 8.6px;
    letter-spacing: 0.25px;
  }
  .tier-c .kicker-loc {
    font-size: 8.2px;
    letter-spacing: 0.15px;
  }

  .headline {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 18.5px;
    font-weight: 900;
    color: #111827;
    line-height: 1.08;
    letter-spacing: -0.25px;
    margin: 2px 0 3px 0;
    white-space: nowrap;
    overflow: hidden;
    flex-shrink: 0;
  }
  .story.lead-col .headline {
    font-size: 20.5px;
  }
  .tier-b .headline {
    font-size: 17.8px;
  }
  .tier-c .headline {
    font-size: 15.2px;
    letter-spacing: -0.3px;
  }

  .art-frame {
    width: 100%;
    flex: 1;
    min-height: 0;
    border: 1px solid #9CA3AF;
    background: #FFFFFF;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .art-frame svg {
    width: 100%;
    height: 100%;
    display: block;
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
  }

  .caption {
    font-size: 11.4px;
    font-weight: 600;
    color: #1F2937;
    line-height: 1.22;
    margin-top: 3px;
    flex-shrink: 0;
  }
  .tier-c .caption {
    font-size: 10.5px;
    line-height: 1.19;
  }
  .caption strong {
    color: #111827;
    font-weight: 800;
  }

  /* TIER D: AROUND THE WORLD 6-DISPATCH BAND (144px tall) */
  .tier-d {
    display: flex;
    flex-direction: column;
    background: #F3EDE0;
    border-bottom: 1.5px solid #111827;
    overflow: hidden;
  }
  .tier-d-header {
    height: 20px;
    background: #1F2937;
    color: #F9FAFB;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 9.8px;
    font-weight: 900;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .tier-d-header span.gold {
    color: #FCD34D;
  }
  .tier-d-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  .brief-cell {
    display: grid;
    grid-template-columns: 34px 1fr;
    align-items: center;
    gap: 6px;
    padding: 2px 7px;
    border-right: 1px solid #C8BFA8;
    border-bottom: 1px solid #C8BFA8;
    background: #FAF6EE;
    overflow: hidden;
  }
  .brief-cell:nth-child(3n) {
    border-right: none;
  }
  .brief-cell:nth-child(n+4) {
    border-bottom: none;
  }
  .brief-icon {
    width: 34px;
    height: 34px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #9CA3AF;
    flex-shrink: 0;
  }
  .brief-icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  .brief-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-width: 0;
    overflow: hidden;
    gap: 1px;
  }
  .brief-top {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .brief-pill {
    font-size: 7.8px;
    font-weight: 900;
    letter-spacing: 0.35px;
    padding: 1px 4px;
    border-radius: 2px;
    color: #FFFFFF;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .brief-headline {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 13px;
    font-weight: 900;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: -0.2px;
    line-height: 1.12;
    width: 100%;
  }
  .brief-lead {
    font-size: 9.3px;
    font-weight: 600;
    color: #374151;
    line-height: 1.15;
    letter-spacing: -0.1px;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }
  .brief-lead strong {
    color: #111827;
    font-weight: 800;
  }

  /* FOOTER DATELINE RULE */
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #111827;
    color: #F9FAFB;
    padding: 0 10px;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.35px;
  }
  .legend {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 3.5px;
  }
  .dot {
    width: 7.5px;
    height: 7.5px;
    border-radius: 1.5px;
    display: inline-block;
  }
</style>
</head>
<body>
  <div class="page">
    <!-- CLASSIC BROADSHEET MASTHEAD -->
    <header class="masthead">
      <div class="mast-left">
        <div class="mast-kicker">GLOBAL EDITION · 7 REGIONS</div>
        <div class="mast-edition">10 BEATS · 16 VERIFIED DISPATCHES</div>
        <div class="mast-sub">00:00–24:00 UTC · ALL CONTINENTS</div>
      </div>
      <div class="mast-center">
        <div class="mast-title">THE WORLD IN ONE DAY</div>
        <div class="mast-deck">ILLUSTRATED WORLD NEWS FRONT PAGE · 16 MAJOR STORIES</div>
      </div>
      <div class="mast-right">
        <div class="date-banner">FRIDAY · 20 NOVEMBER 2026</div>
        <div class="date-meta">VOL. CCXXVI · ISSUE 2026-11-20</div>
      </div>
    </header>

    <!-- TIER A: ABOVE-THE-FOLD HERO ROW (38% | 31% | 31%) -->
    <section class="tier-a">
      <!-- STORY 1 (LEAD, 38%): KYIV BRIDGES -->
      <article class="story lead-col">
        <div class="story-kicker" style="border-top-color:#B91C1C;">
          <span class="kicker-left" style="color:#B91C1C;">EUROPE · WAR</span>
          <span class="kicker-loc">KYIV, UKRAINE</span>
        </div>
        <h2 class="headline">Missiles Hit 3 Kyiv Bridges</h2>
        <div class="art-frame">
          <svg viewBox="0 0 364 176" xmlns="http://www.w3.org/2000/svg">
            <!-- Deep twilight sky over Kyiv -->
            <rect width="364" height="176" fill="#0B1120"/>
            <!-- Anti-aircraft searchlight beams -->
            <polygon points="48,100 96,0 122,0" fill="#1E293B" opacity="0.6"/>
            <polygon points="188,100 142,0 166,0" fill="#1E293B" opacity="0.6"/>
            <polygon points="282,100 236,0 260,0" fill="#1E293B" opacity="0.5"/>

            <!-- Billowing dark smoke plumes rising from the 3 bridge spans -->
            <path d="M58,116 C44,84 68,54 50,14 C78,38 86,78 74,116 Z" fill="#334155" opacity="0.85"/>
            <path d="M178,120 C164,82 192,48 174,8 C204,34 212,78 196,120 Z" fill="#334155" opacity="0.88"/>
            <path d="M292,124 C280,90 304,58 290,20 C316,44 322,86 308,124 Z" fill="#334155" opacity="0.85"/>

            <!-- Darkened Kyiv skyline silhouette with cathedral domes & unlit apartment towers -->
            <path d="M0,100 L18,100 L18,66 L40,66 L40,92 L58,92 L58,58 L65,38 L72,58 L72,94 L98,94 L98,64 L132,64 L132,96 L154,96 L154,60 L161,40 L168,60 L168,96 L204,96 L204,68 L240,68 L240,98 L266,98 L266,74 L296,74 L296,100 L364,100 L364,112 L0,112 Z" fill="#162032"/>
            <!-- Golden-domed Lavra cathedral silhouettes (darkened) -->
            <circle cx="65" cy="37" r="6" fill="#475569"/>
            <line x1="65" y1="26" x2="65" y2="33" stroke="#64748B" stroke-width="2"/>
            <circle cx="161" cy="39" r="6" fill="#475569"/>
            <line x1="161" y1="28" x2="161" y2="35" stroke="#64748B" stroke-width="2"/>
            <!-- Darkened unlit apartment window grids -->
            <g fill="#090D16">
              <rect x="23" y="72" width="5" height="5"/><rect x="31" y="72" width="5" height="5"/>
              <rect x="23" y="81" width="5" height="5"/><rect x="31" y="81" width="5" height="5"/>
              <rect x="104" y="70" width="6" height="5"/><rect x="114" y="70" width="6" height="5"/>
              <rect x="104" y="79" width="6" height="5"/><rect x="114" y="79" width="6" height="5"/>
              <rect x="212" y="74" width="6" height="5"/><rect x="223" y="74" width="6" height="5"/>
              <rect x="212" y="83" width="6" height="5"/><rect x="223" y="83" width="6" height="5"/>
            </g>

            <!-- Incoming Red Missile & Drone Streaks -->
            <path d="M16,10 Q42,58 64,114" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="6,3"/>
            <path d="M126,8 Q156,58 182,118" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="6,3"/>
            <path d="M236,12 Q268,62 296,122" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="6,3"/>
            <polygon points="98,24 114,19 108,27 114,32" fill="#EF4444" stroke="#FCA5A5" stroke-width="1"/>
            <polygon points="204,20 220,15 214,23 220,28" fill="#EF4444" stroke="#FCA5A5" stroke-width="1"/>

            <!-- Circular Blackout & Water-Cut Icon Medallion (Top Right) -->
            <g transform="translate(328, 30)">
              <circle cx="0" cy="0" r="23" fill="#1E293B" stroke="#F59E0B" stroke-width="2.2"/>
              <polygon points="-6,-12 -14,-1 -7,-1 -11,11 2,-3 -5,-3" fill="#FACC15"/>
              <path d="M9,-9 C9,-9 2,0 2,5 C2,8.8 5.2,11.5 9,11.5 C12.8,11.5 16,8.8 16,5 C16,0 9,-9 9,-9 Z" fill="#38BDF8"/>
              <line x1="-16" y1="14" x2="16" y2="-14" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>
            </g>

            <!-- Dnieper River water -->
            <rect x="0" y="108" width="364" height="68" fill="#082F49"/>
            <path d="M0,124 Q91,118 182,124 T364,124 L364,176 L0,176 Z" fill="#0C4A6E"/>

            <!-- Shimmering Orange & Gold Blast Reflections on River -->
            <ellipse cx="64" cy="150" rx="24" ry="4" fill="#F97316" opacity="0.55"/>
            <ellipse cx="64" cy="159" rx="15" ry="2.5" fill="#FEF08A" opacity="0.5"/>
            <ellipse cx="182" cy="154" rx="26" ry="4.2" fill="#F97316" opacity="0.55"/>
            <ellipse cx="182" cy="163" rx="16" ry="2.5" fill="#FEF08A" opacity="0.5"/>
            <ellipse cx="296" cy="158" rx="22" ry="3.8" fill="#F97316" opacity="0.55"/>
            <ellipse cx="296" cy="167" rx="14" ry="2.2" fill="#FEF08A" opacity="0.5"/>

            <!-- 3 Distinct Bridges (Arch, Cable-Stayed, Truss) Across Dnieper -->
            <!-- Bridge 1 (Arch) -->
            <path d="M10,134 Q64,96 118,134" fill="none" stroke="#94A3B8" stroke-width="5.5"/>
            <line x1="6" y1="118" x2="122" y2="118" stroke="#E2E8F0" stroke-width="4"/>
            <line x1="30" y1="118" x2="30" y2="142" stroke="#64748B" stroke-width="4"/>
            <line x1="98" y1="118" x2="98" y2="142" stroke="#64748B" stroke-width="4"/>

            <!-- Bridge 2 (Cable-Stayed Pylon) -->
            <line x1="182" y1="80" x2="182" y2="146" stroke="#E2E8F0" stroke-width="4.5"/>
            <line x1="182" y1="84" x2="134" y2="122" stroke="#94A3B8" stroke-width="1.6"/>
            <line x1="182" y1="92" x2="148" y2="122" stroke="#94A3B8" stroke-width="1.6"/>
            <line x1="182" y1="84" x2="230" y2="122" stroke="#94A3B8" stroke-width="1.6"/>
            <line x1="182" y1="92" x2="216" y2="122" stroke="#94A3B8" stroke-width="1.6"/>
            <line x1="126" y1="122" x2="238" y2="122" stroke="#E2E8F0" stroke-width="4"/>

            <!-- Bridge 3 (Tied-Arch Truss) -->
            <path d="M244,140 Q296,102 348,140" fill="none" stroke="#94A3B8" stroke-width="5.5"/>
            <line x1="242" y1="126" x2="352" y2="126" stroke="#E2E8F0" stroke-width="4"/>
            <line x1="266" y1="126" x2="266" y2="148" stroke="#64748B" stroke-width="4"/>
            <line x1="326" y1="126" x2="326" y2="148" stroke="#64748B" stroke-width="4"/>

            <!-- 3 Vivid Multi-Layered Explosion Fireballs -->
            <circle cx="64" cy="114" r="21" fill="#DC2626" opacity="0.88"/>
            <polygon points="64,88 70,104 87,101 75,114 84,128 68,122 64,136 58,122 43,127 53,114 42,101 58,104" fill="#F97316"/>
            <circle cx="64" cy="114" r="8" fill="#FEF08A"/>

            <circle cx="182" cy="118" r="22" fill="#DC2626" opacity="0.88"/>
            <polygon points="182,90 188,107 206,104 193,118 203,132 187,126 182,140 176,126 160,131 171,118 159,104 176,107" fill="#F97316"/>
            <circle cx="182" cy="118" r="8.5" fill="#FEF08A"/>

            <circle cx="296" cy="122" r="20" fill="#DC2626" opacity="0.88"/>
            <polygon points="296,96 302,112 318,109 306,122 315,135 301,130 296,143 290,130 276,134 286,122 275,109 290,112" fill="#F97316"/>
            <circle cx="296" cy="122" r="7.5" fill="#FEF08A"/>
          </svg>
        </div>
        <p class="caption"><strong>~110 missiles &amp; 400 drones</strong> hit bridges and grid across Ukraine, <strong>killing at least 9</strong> and cutting Kyiv power &amp; water.</p>
      </article>

      <!-- STORY 2 (31%): EAST ASIA MARKETS -->
      <article class="story">
        <div class="story-kicker" style="border-top-color:#1E3A8A;">
          <span class="kicker-left" style="color:#1E3A8A;">EAST ASIA · MARKETS</span>
          <span class="kicker-loc">TAIPEI · SEOUL · TOKYO</span>
        </div>
        <h2 class="headline">AI Chip Rout Sinks Asia</h2>
        <div class="art-frame">
          <svg viewBox="0 0 294 176" xmlns="http://www.w3.org/2000/svg">
            <rect width="294" height="176" fill="#0B1120"/>
            <!-- Economist-style Financial Terminal Grid -->
            <g stroke="#1E293B" stroke-width="1">
              <line x1="0" y1="35" x2="294" y2="35"/>
              <line x1="0" y1="70" x2="294" y2="70"/>
              <line x1="0" y1="105" x2="294" y2="105"/>
              <line x1="0" y1="140" x2="294" y2="140"/>
              <line x1="106" y1="0" x2="106" y2="176"/>
              <line x1="168" y1="0" x2="168" y2="176"/>
              <line x1="230" y1="0" x2="230" y2="176"/>
            </g>

            <!-- Left: Gold-Pinned Silicon AI Wafer Cracking -->
            <g transform="translate(52, 56)">
              <g stroke="#FACC15" stroke-width="3.2" stroke-linecap="round">
                <line x1="-20" y1="-39" x2="-20" y2="-30"/><line x1="-7" y1="-39" x2="-7" y2="-30"/><line x1="7" y1="-39" x2="7" y2="-30"/><line x1="20" y1="-39" x2="20" y2="-30"/>
                <line x1="-20" y1="30" x2="-20" y2="39"/><line x1="-7" y1="30" x2="-7" y2="39"/><line x1="7" y1="30" x2="7" y2="39"/><line x1="20" y1="30" x2="20" y2="39"/>
                <line x1="-39" y1="-20" x2="-30" y2="-20"/><line x1="-39" y1="-7" x2="-30" y2="-7"/><line x1="-39" y1="7" x2="-30" y2="7"/><line x1="-39" y1="20" x2="-30" y2="20"/>
                <line x1="30" y1="-20" x2="39" y2="-20"/><line x1="30" y1="-7" x2="39" y2="-7"/><line x1="30" y1="7" x2="39" y2="7"/><line x1="30" y1="20" x2="39" y2="20"/>
              </g>
              <rect x="-30" y="-30" width="60" height="60" rx="6" fill="#1E293B" stroke="#38BDF8" stroke-width="2.4"/>
              <rect x="-19" y="-19" width="38" height="38" rx="3" fill="#0F172A" stroke="#7DD3FC" stroke-width="1.5"/>
              <path d="M-24,-24 L-4,-5 L6,-11 L24,24" fill="none" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="0" y="6" text-anchor="middle" fill="#FFFFFF" font-size="17" font-weight="900">AI</text>
            </g>

            <!-- Bottom Left: Downward Bitcoin Medallion & $61.4K -->
            <g transform="translate(52, 138)">
              <circle cx="-24" cy="0" r="18" fill="#F59E0B" stroke="#FEF08A" stroke-width="2"/>
              <text x="-24" y="7" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900">₿</text>
              <text x="16" y="-4" text-anchor="middle" fill="#FEF08A" font-size="11.5" font-weight="900">$61.4K</text>
              <path d="M16,2 L16,18 M9,11 L16,19 L23,11" fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </g>

            <!-- Right: Plunging Red Candlestick Line & 3 Bold Red Index Bars -->
            <path d="M112,14 L152,28 L194,22 L238,58 L278,96" fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
            <polygon points="284,102 270,98 280,88" fill="#EF4444"/>

            <!-- TAIEX -6.2% -->
            <text x="112" y="28" fill="#E2E8F0" font-size="12.5" font-weight="900">TAIEX</text>
            <rect x="112" y="33" width="170" height="26" rx="3" fill="#DC2626" stroke="#FCA5A5" stroke-width="1.2"/>
            <text x="275" y="52" text-anchor="end" fill="#FFFFFF" font-size="15.5" font-weight="900">-6.2%</text>

            <!-- KOSPI -5.2% -->
            <text x="112" y="81" fill="#E2E8F0" font-size="12.5" font-weight="900">KOSPI</text>
            <rect x="112" y="86" width="144" height="26" rx="3" fill="#E11D48" stroke="#FDA4AF" stroke-width="1.2"/>
            <text x="249" y="105" text-anchor="end" fill="#FFFFFF" font-size="15" font-weight="900">-5.2%</text>

            <!-- NIKKEI -5.1% -->
            <text x="112" y="134" fill="#E2E8F0" font-size="12.5" font-weight="900">NIKKEI</text>
            <rect x="112" y="139" width="140" height="26" rx="3" fill="#F43F5E" stroke="#FECDD3" stroke-width="1.2"/>
            <text x="245" y="158" text-anchor="end" fill="#FFFFFF" font-size="15" font-weight="900">-5.1%</text>
          </svg>
        </div>
        <p class="caption">Taiwan posts worst week since 1991 (<strong>-6.2%</strong>) as chip &amp; AI stocks slide across Asia; Bitcoin dips to <strong>$61.4K</strong>.</p>
      </article>

      <!-- STORY 3 (31%): SOUTH ASIA CYCLONE -->
      <article class="story">
        <div class="story-kicker" style="border-top-color:#C2410C;">
          <span class="kicker-left" style="color:#C2410C;">SOUTH ASIA · CYCLONE</span>
          <span class="kicker-loc">ODISHA, INDIA</span>
        </div>
        <h2 class="headline">Cyclone Akvan Hits Odisha</h2>
        <div class="art-frame">
          <svg viewBox="0 0 294 176" xmlns="http://www.w3.org/2000/svg">
            <rect width="294" height="176" fill="#075985"/>
            <path d="M105,0 L294,0 L294,176 L48,176 Z" fill="#0C4A6E"/>
            <!-- Wave crests & rain streaks -->
            <path d="M196,150 Q210,143 224,150 T252,150" fill="none" stroke="#38BDF8" stroke-width="2"/>
            <path d="M222,164 Q236,157 250,164 T278,164" fill="none" stroke="#38BDF8" stroke-width="2"/>
            <line x1="152" y1="20" x2="134" y2="42" stroke="#7DD3FC" stroke-width="1.4" opacity="0.55"/>
            <line x1="248" y1="26" x2="230" y2="48" stroke="#7DD3FC" stroke-width="1.4" opacity="0.55"/>

            <!-- Authentic Odisha Coastline -->
            <path d="M0,0 L178,0 L162,28 L146,48 L130,70 C122,76 114,72 112,80 C110,86 118,88 112,96 L90,124 L64,152 L32,176 L0,176 Z" fill="#BBF7D0" stroke="#15803D" stroke-width="2.8"/>
            <path d="M0,0 L140,0 L126,34 L104,66 L78,100 L42,138 L0,166 Z" fill="#86EFAC"/>

            <!-- Civil-Defense Shelter Roof with Checkmark & 300K+ SAFE -->
            <g transform="translate(10, 6)">
              <circle cx="33" cy="33" r="29" fill="#065F46" stroke="#34D399" stroke-width="2.5"/>
              <polygon points="33,11 12,27 18,27 18,48 48,48 48,27 54,27" fill="#10B981" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>
              <path d="M25,34 L31,41 L43,27" fill="none" stroke="#FEF08A" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <rect x="10" y="71" width="68" height="17" rx="3" fill="#065F46" stroke="#FFFFFF" stroke-width="1.2"/>
            <text x="44" y="83" text-anchor="middle" fill="#FEF08A" font-size="10" font-weight="900">300K+ SAFE</text>

            <!-- Wind-Bent Palms -->
            <g stroke-linecap="round">
              <path d="M82,138 Q66,116 46,112" fill="none" stroke="#78350F" stroke-width="3.2"/>
              <path d="M46,112 Q30,106 24,112 M46,112 Q28,114 26,124 M46,112 Q34,98 26,102" fill="none" stroke="#15803D" stroke-width="2.4"/>
              <path d="M98,122 Q82,100 62,96" fill="none" stroke="#78350F" stroke-width="3.2"/>
              <path d="M62,96 Q46,90 40,96 M62,96 Q44,98 42,108" fill="none" stroke="#15803D" stroke-width="2.4"/>
            </g>

            <!-- Multi-Band Spiral Cyclone Vortex -->
            <g transform="translate(190, 86)">
              <circle cx="0" cy="0" r="64" fill="#38BDF8" opacity="0.18"/>
              <circle cx="0" cy="0" r="48" fill="#BAE6FD" opacity="0.26"/>
              <circle cx="0" cy="0" r="32" fill="#E0F2FE" opacity="0.34"/>
              <path d="M-11,-54 C34,-60 64,-22 52,20 C44,52 4,64 -32,48" fill="none" stroke="#E0F2FE" stroke-width="6.5" stroke-linecap="round"/>
              <path d="M13,52 C-30,60 -62,24 -50,-16 C-42,-50 -4,-62 30,-46" fill="none" stroke="#7DD3FC" stroke-width="6" stroke-linecap="round"/>
              <path d="M-30,-20 C-11,-40 26,-34 34,-8 C40,16 16,40 -13,32" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
              <path d="M24,16 C9,34 -20,26 -28,4 C-34,-16 -15,-34 11,-26" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"/>
              <circle cx="0" cy="0" r="12" fill="#075985" stroke="#FACC15" stroke-width="3.8"/>
            </g>

            <!-- Landfall Track & Gopalpur Bullseye -->
            <path d="M242,114 L122,88" fill="none" stroke="#EF4444" stroke-width="4" stroke-dasharray="7,3"/>
            <polygon points="113,86 129,81 125,96" fill="#EF4444"/>
            <circle cx="109" cy="85" r="13" fill="#DC2626" opacity="0.35"/>
            <circle cx="109" cy="85" r="6" fill="#DC2626" stroke="#FFFFFF" stroke-width="2.2"/>
          </svg>
        </div>
        <p class="caption">Crosses near <strong>Gopalpur</strong> (70–90 km/h gusts) after <strong>300,000+</strong> move to shelters; <strong>zero deaths</strong> reported.</p>
      </article>
    </section>

    <!-- TIER B: SECOND ILLUSTRATED ROW (3 EQUAL COLUMNS) -->
    <section class="tier-b">
      <!-- STORY 4: COP31 DEADLOCK IN ANTALYA -->
      <article class="story">
        <div class="story-kicker" style="border-top-color:#0F766E;">
          <span class="kicker-left" style="color:#0F766E;">WORLD · CLIMATE</span>
          <span class="kicker-loc">ANTALYA, TÜRKIYE</span>
        </div>
        <h2 class="headline">COP31 Stalls on Final Day</h2>
        <div class="art-frame">
          <svg viewBox="0 0 314 146" xmlns="http://www.w3.org/2000/svg">
            <rect width="314" height="146" fill="#F0FDFA"/>
            <!-- Center Fulcrum: Detailed Earth Globe -->
            <g transform="translate(157, 92)">
              <circle cx="0" cy="0" r="38" fill="#0284C7" stroke="#0F172A" stroke-width="2.5"/>
              <ellipse cx="0" cy="0" rx="20" ry="38" fill="none" stroke="#7DD3FC" stroke-width="1" opacity="0.75"/>
              <line x1="-38" y1="0" x2="38" y2="0" stroke="#7DD3FC" stroke-width="1" opacity="0.75"/>
              <line x1="-32" y1="-19" x2="32" y2="-19" stroke="#7DD3FC" stroke-width="1" opacity="0.75"/>
              <line x1="-32" y1="19" x2="32" y2="19" stroke="#7DD3FC" stroke-width="1" opacity="0.75"/>
              <path d="M-20,-20 Q-5,-27 5,-14 Q16,-5 4,18 Q-12,23 -22,4 Z" fill="#16A34A"/>
              <path d="M13,-20 Q29,-11 25,7 Q16,14 13,-2 Z" fill="#16A34A"/>
              <circle cx="0" cy="0" r="43" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="6,4"/>
            </g>

            <!-- Top Center: Wooden Gavel & Overtime Hourglass -->
            <g transform="translate(157, 26)">
              <polygon points="-26,-14 -8,-14 -17,-1 -8,11 -26,11 -17,-1" fill="#FEF08A" stroke="#0F172A" stroke-width="1.8" stroke-linejoin="round"/>
              <line x1="-29" y1="-14" x2="-5" y2="-14" stroke="#78350F" stroke-width="2.8" stroke-linecap="round"/>
              <line x1="-29" y1="11" x2="-5" y2="11" stroke="#78350F" stroke-width="2.8" stroke-linecap="round"/>
              <line x1="-2" y1="0" x2="28" y2="-7" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>
              <rect x="18" y="-18" width="14" height="22" rx="2.5" transform="rotate(-14 25 -7)" fill="#B45309" stroke="#451A03" stroke-width="1.8"/>
            </g>

            <!-- Brass Balance Scale Beam & Chains -->
            <line x1="48" y1="54" x2="266" y2="74" stroke="#0F172A" stroke-width="5.5" stroke-linecap="round"/>
            <line x1="48" y1="54" x2="266" y2="74" stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="34" y1="108" x2="52" y2="55" stroke="#475569" stroke-width="1.8"/>
            <line x1="74" y1="108" x2="52" y2="55" stroke="#475569" stroke-width="1.8"/>
            <line x1="240" y1="124" x2="260" y2="73" stroke="#475569" stroke-width="1.8"/>
            <line x1="284" y1="124" x2="260" y2="73" stroke="#475569" stroke-width="1.8"/>

            <!-- Left Pan: Smoky Factory Chimneys & Black Oil Drum -->
            <g transform="translate(8, 108)">
              <path d="M2,0 L94,0 L84,11 L12,11 Z" fill="#D97706" stroke="#78350F" stroke-width="1.8"/>
              <circle cx="24" cy="-50" r="7.5" fill="#64748B"/>
              <circle cx="34" cy="-56" r="9.5" fill="#475569"/>
              <circle cx="48" cy="-48" r="7" fill="#64748B"/>
              <polygon points="16,0 20,-38 32,-38 36,0" fill="#334155" stroke="#0F172A" stroke-width="1.5"/>
              <rect x="19" y="-33" width="14" height="4.5" fill="#DC2626"/>
              <polygon points="38,0 42,-33 54,-33 58,0" fill="#334155" stroke="#0F172A" stroke-width="1.5"/>
              <rect x="41" y="-28" width="14" height="4.5" fill="#DC2626"/>
              <rect x="62" y="-29" width="24" height="29" rx="3" fill="#0F172A" stroke="#EF4444" stroke-width="1.8"/>
              <line x1="62" y1="-19" x2="86" y2="-19" stroke="#EF4444" stroke-width="1.8"/>
              <line x1="62" y1="-9" x2="86" y2="-9" stroke="#EF4444" stroke-width="1.8"/>
            </g>

            <!-- Right Pan: Solar Array, Wind Turbine & Gold $ Coin Stack -->
            <g transform="translate(210, 124)">
              <path d="M2,0 L94,0 L84,11 L12,11 Z" fill="#D97706" stroke="#78350F" stroke-width="1.8"/>
              <polygon points="8,0 18,-26 48,-26 40,0" fill="#0284C7" stroke="#E0F2FE" stroke-width="1.8"/>
              <line x1="28" y1="-26" x2="22" y2="0" stroke="#7DD3FC" stroke-width="1.1"/>
              <line x1="38" y1="-26" x2="32" y2="0" stroke="#7DD3FC" stroke-width="1.1"/>
              <line x1="13" y1="-13" x2="44" y2="-13" stroke="#7DD3FC" stroke-width="1.1"/>
              <line x1="54" y1="-40" x2="54" y2="0" stroke="#0F172A" stroke-width="2.8"/>
              <path d="M54,-40 L41,-51 M54,-40 L69,-47 M54,-40 L56,-25" stroke="#0F766E" stroke-width="2.8" stroke-linecap="round"/>
              <circle cx="54" cy="-40" r="2.8" fill="#FACC15"/>
              <circle cx="76" cy="-15" r="14" fill="#FACC15" stroke="#B45309" stroke-width="2"/>
              <text x="76" y="-9" text-anchor="middle" fill="#78350F" font-size="17" font-weight="900">$</text>
            </g>
          </svg>
        </div>
        <p class="caption">Closing day in Türkiye goes to overtime as nations clash over <strong>fossil-fuel phaseout</strong> &amp; <strong>transition finance</strong>.</p>
      </article>

      <!-- STORY 5: UK & EU RESET PACT -->
      <article class="story">
        <div class="story-kicker" style="border-top-color:#1D4ED8;">
          <span class="kicker-left" style="color:#1D4ED8;">EUROPE · DIPLOMACY</span>
          <span class="kicker-loc">BRUSSELS &amp; LONDON</span>
        </div>
        <h2 class="headline">UK &amp; EU Seal 'Reset' Pact</h2>
        <div class="art-frame">
          <svg viewBox="0 0 314 146" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="uk-roundel-clip">
                <circle cx="0" cy="0" r="32"/>
              </clipPath>
            </defs>
            <rect width="314" height="146" fill="#EFF6FF"/>
            <path d="M0,126 Q78,120 157,126 T314,126 L314,146 L0,146 Z" fill="#DBEAFE"/>

            <!-- Stone Channel Arch Bridge -->
            <path d="M24,86 Q157,24 290,86" fill="none" stroke="#B45309" stroke-width="10" stroke-linecap="round"/>
            <path d="M24,86 Q157,24 290,86" fill="none" stroke="#FACC15" stroke-width="4.5" stroke-linecap="round"/>
            <circle cx="157" cy="48" r="15" fill="#0F172A" stroke="#FACC15" stroke-width="2.8"/>
            <path d="M148,48 L166,48 M153,43 L161,43 M153,53 L161,53" stroke="#FEF08A" stroke-width="2.2" stroke-linecap="round"/>

            <!-- Left: Clipped Union Jack Roundel -->
            <g transform="translate(76, 44)">
              <g clip-path="url(#uk-roundel-clip)">
                <rect x="-34" y="-34" width="68" height="68" fill="#1E3A8A"/>
                <path d="M-34,-34 L34,34 M-34,34 L34,-34" stroke="#FFFFFF" stroke-width="9.5"/>
                <path d="M-34,-34 L34,34 M-34,34 L34,-34" stroke="#DC2626" stroke-width="4.8"/>
                <path d="M-34,0 L34,0 M0,-34 L0,34" stroke="#FFFFFF" stroke-width="13"/>
                <path d="M-34,0 L34,0 M0,-34 L0,34" stroke="#DC2626" stroke-width="7.5"/>
              </g>
              <circle cx="0" cy="0" r="32" fill="none" stroke="#0F172A" stroke-width="3.2"/>
            </g>

            <!-- Right: 12-Star EU Roundel -->
            <g transform="translate(238, 44)">
              <circle cx="0" cy="0" r="32" fill="#1D4ED8" stroke="#FACC15" stroke-width="3.2"/>
              <circle cx="0" cy="-20" r="2.8" fill="#FACC15"/>
              <circle cx="10" cy="-17.3" r="2.8" fill="#FACC15"/>
              <circle cx="17.3" cy="-10" r="2.8" fill="#FACC15"/>
              <circle cx="20" cy="0" r="2.8" fill="#FACC15"/>
              <circle cx="17.3" cy="10" r="2.8" fill="#FACC15"/>
              <circle cx="10" cy="17.3" r="2.8" fill="#FACC15"/>
              <circle cx="0" cy="20" r="2.8" fill="#FACC15"/>
              <circle cx="-10" cy="17.3" r="2.8" fill="#FACC15"/>
              <circle cx="-17.3" cy="10" r="2.8" fill="#FACC15"/>
              <circle cx="-20" cy="0" r="2.8" fill="#FACC15"/>
              <circle cx="-17.3" cy="-10" r="2.8" fill="#FACC15"/>
              <circle cx="-10" cy="-17.3" r="2.8" fill="#FACC15"/>
            </g>

            <!-- 3 Clean Illustrated Emblems Underneath Bridge -->
            <!-- 1. Blue Youth Visa Passport -->
            <g transform="translate(64, 112)">
              <circle cx="0" cy="0" r="25" fill="#FFFFFF" stroke="#1D4ED8" stroke-width="2.8"/>
              <rect x="-11" y="-15" width="22" height="30" rx="2.5" fill="#1E3A8A" stroke="#93C5FD" stroke-width="1.2"/>
              <circle cx="0" cy="-3" r="6" fill="none" stroke="#FACC15" stroke-width="1.6"/>
              <line x1="-6" y1="8" x2="6" y2="8" stroke="#FACC15" stroke-width="1.8"/>
            </g>

            <!-- 2. Golden Agrifood Wheat -->
            <g transform="translate(157, 112)">
              <circle cx="0" cy="0" r="25" fill="#FFFFFF" stroke="#047857" stroke-width="2.8"/>
              <line x1="0" y1="16" x2="0" y2="-14" stroke="#D97706" stroke-width="2.8" stroke-linecap="round"/>
              <ellipse cx="-6" cy="-9" rx="5" ry="2.8" transform="rotate(-30 -6 -9)" fill="#F59E0B"/>
              <ellipse cx="6" cy="-9" rx="5" ry="2.8" transform="rotate(30 6 -9)" fill="#F59E0B"/>
              <ellipse cx="-6" cy="-1" rx="5" ry="2.8" transform="rotate(-30 -6 -1)" fill="#F59E0B"/>
              <ellipse cx="6" cy="-1" rx="5" ry="2.8" transform="rotate(30 6 -1)" fill="#F59E0B"/>
              <ellipse cx="-5" cy="7" rx="4.5" ry="2.5" transform="rotate(-30 -5 7)" fill="#F59E0B"/>
              <ellipse cx="5" cy="7" rx="4.5" ry="2.5" transform="rotate(30 5 7)" fill="#F59E0B"/>
            </g>

            <!-- 3. Green Carbon ETS Leaf -->
            <g transform="translate(250, 112)">
              <circle cx="0" cy="0" r="25" fill="#FFFFFF" stroke="#B45309" stroke-width="2.8"/>
              <circle cx="0" cy="0" r="17" fill="none" stroke="#16A34A" stroke-width="2.2" stroke-dasharray="16,5"/>
              <path d="M-9,9 C-9,-7 9,-11 11,-11 C11,-11 9,9 -9,9 Z" fill="#16A34A"/>
              <path d="M-9,9 L4,-4" stroke="#DCFCE7" stroke-width="1.8" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
        <p class="caption">London &amp; Brussels agree timelines on <strong>youth visas</strong>, <strong>food trade checks</strong> &amp; <strong>carbon-market link</strong>.</p>
      </article>

      <!-- STORY 6: MIDDLE EAST SECURITY -->
      <article class="story">
        <div class="story-kicker" style="border-top-color:#991B1B;">
          <span class="kicker-left" style="color:#991B1B;">MIDDLE EAST · SECURITY</span>
          <span class="kicker-loc">HORMUZ · LEBANON</span>
        </div>
        <h2 class="headline">Oman Tanker Fire &amp; UN Alert</h2>
        <div class="art-frame">
          <svg viewBox="0 0 314 146" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="200" height="146" fill="#0369A1"/>
            <path d="M0,40 Q100,48 200,40 L200,146 L0,146 Z" fill="#075985"/>
            <!-- Northern sandy headland -->
            <path d="M0,0 L200,0 L200,32 L162,24 L130,20 L98,32 L58,28 L28,20 L0,30 Z" fill="#E7E5E4" stroke="#78716C" stroke-width="1.8"/>
            <!-- Southern Khasab / Musandam Peninsula -->
            <path d="M16,146 L68,122 L102,94 L118,86 L130,94 L148,124 L184,146 Z" fill="#FDE68A" stroke="#B45309" stroke-width="2"/>
            <circle cx="116" cy="102" r="4.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.6"/>

            <!-- Oil Supertanker Silhouette Ablaze in Strait of Hormuz -->
            <g transform="translate(36, 56)">
              <path d="M52,12 C38,-12 64,-28 48,-50 C72,-38 86,-12 70,12 Z" fill="#1E293B" opacity="0.9"/>
              <circle cx="58" cy="-16" r="12" fill="#334155"/>
              <polygon points="0,18 112,18 100,32 12,32" fill="#1E293B" stroke="#E2E8F0" stroke-width="1.6"/>
              <rect x="16" y="10" width="12" height="8" fill="#64748B"/>
              <rect x="80" y="3" width="16" height="15" fill="#F8FAFC" stroke="#475569" stroke-width="1.2"/>
              <circle cx="52" cy="9" r="17" fill="#DC2626" opacity="0.9"/>
              <polygon points="52,-14 59,-1 74,-3 63,9 72,20 52,16 35,20 42,9 31,-3 45,-1" fill="#F97316"/>
              <circle cx="52" cy="9" r="7" fill="#FEF08A"/>
            </g>

            <line x1="200" y1="0" x2="200" y2="146" stroke="#111827" stroke-width="2.5"/>

            <!-- Right: Smoky Levant Horizon & Crisp White UN Relief Tent Emblem -->
            <rect x="201" y="0" width="113" height="146" fill="#1E293B"/>
            <path d="M201,86 Q230,72 258,82 T314,78 L314,146 L201,146 Z" fill="#334155"/>
            <circle cx="232" cy="34" r="16" fill="#475569" opacity="0.6"/>
            <circle cx="252" cy="28" r="20" fill="#475569" opacity="0.5"/>

            <g transform="translate(257, 76)">
              <circle cx="0" cy="0" r="37" fill="#0284C7" stroke="#FFFFFF" stroke-width="2.8"/>
              <polygon points="0,-22 -24,11 24,11" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.6" stroke-linejoin="round"/>
              <polygon points="0,-5 -7,11 7,11" fill="#0369A1"/>
              <path d="M0,-16 L0,-9 M-3.5,-12.5 L3.5,-12.5" stroke="#DC2626" stroke-width="2.8" stroke-linecap="round"/>
              <path d="M-22,16 Q0,29 22,16" fill="none" stroke="#FEF08A" stroke-width="2.8" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
        <p class="caption">Tanker explodes off <strong>Khasab</strong> in Strait of Hormuz; <strong>UN warns</strong> over Gaza &amp; south Lebanon displacement.</p>
      </article>
    </section>

    <!-- TIER C: THIRD ILLUSTRATED ROW (4 COLUMNS, FINELY DRAWN EDITORIAL SCENES) -->
    <section class="tier-c">
      <!-- STORY 7: AFRICA (DAKAR PACT & DRC WATER CUT — NO CRUDE POLYGON MAP!) -->
      <article class="story">
        <div class="story-kicker" style="border-top-color:#B45309;">
          <span class="kicker-left" style="color:#B45309;">AFRICA · HUMANITARIAN</span>
          <span class="kicker-loc">DAKAR &amp; DRC</span>
        </div>
        <h2 class="headline">Dakar Pact; DRC Water Cut</h2>
        <div class="art-frame">
          <svg viewBox="0 0 232 132" xmlns="http://www.w3.org/2000/svg">
            <!-- Left Half: Dakar 16-State Diplomatic Ring & Clasped Treaty Hands -->
            <rect x="0" y="0" width="114" height="132" fill="#EFF6FF"/>
            <g transform="translate(57, 56)">
              <!-- Outer 16-Star West African Diplomatic Medallion -->
              <circle cx="0" cy="0" r="40" fill="#1E3A8A" stroke="#F59E0B" stroke-width="2.5"/>
              <!-- 16 Gold Stars Ring -->
              <circle cx="0" cy="-31" r="2.4" fill="#FACC15"/>
              <circle cx="11.9" cy="-28.6" r="2.4" fill="#FACC15"/>
              <circle cx="21.9" cy="-21.9" r="2.4" fill="#FACC15"/>
              <circle cx="28.6" cy="-11.9" r="2.4" fill="#FACC15"/>
              <circle cx="31" cy="0" r="2.4" fill="#FACC15"/>
              <circle cx="28.6" cy="11.9" r="2.4" fill="#FACC15"/>
              <circle cx="21.9" cy="21.9" r="2.4" fill="#FACC15"/>
              <circle cx="11.9" cy="28.6" r="2.4" fill="#FACC15"/>
              <circle cx="0" cy="31" r="2.4" fill="#FACC15"/>
              <circle cx="-11.9" cy="28.6" r="2.4" fill="#FACC15"/>
              <circle cx="-21.9" cy="21.9" r="2.4" fill="#FACC15"/>
              <circle cx="-28.6" cy="11.9" r="2.4" fill="#FACC15"/>
              <circle cx="-31" cy="0" r="2.4" fill="#FACC15"/>
              <circle cx="-28.6" cy="-11.9" r="2.4" fill="#FACC15"/>
              <circle cx="-21.9" cy="-21.9" r="2.4" fill="#FACC15"/>
              <circle cx="-11.9" cy="-28.6" r="2.4" fill="#FACC15"/>
              <!-- Clasped Treaty Arch & 16 inside -->
              <path d="M-20,6 Q0,-12 20,6" fill="none" stroke="#38BDF8" stroke-width="3.5" stroke-linecap="round"/>
              <text x="0" y="10" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900">16</text>
            </g>
            <text x="57" y="118" text-anchor="middle" fill="#1E3A8A" font-size="11" font-weight="900">DAKAR PACT</text>

            <line x1="115" y1="0" x2="115" y2="132" stroke="#111827" stroke-width="2"/>

            <!-- Right Half: Urgent Red Humanitarian Vignette — Dry Brass Standpipe Tap, Slashed Drop & Yellow Jerrycan (76K) -->
            <rect x="116" y="0" width="116" height="132" fill="#FEF2F2"/>
            <!-- Brass Standpipe & Faucet Spigot -->
            <path d="M134,104 L134,26 L166,26 L166,38" fill="none" stroke="#B45309" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="154" y1="16" x2="176" y2="16" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
            <line x1="165" y1="16" x2="165" y2="26" stroke="#D97706" stroke-width="4"/>

            <!-- Crossed-Out Water Droplet Below Spigot -->
            <g transform="translate(166, 62)">
              <circle cx="0" cy="0" r="20" fill="#991B1B" stroke="#FCA5A5" stroke-width="1.8"/>
              <path d="M0,-12 C0,-12 -10,0 -10,6 C-10,11.5 -5.5,15.5 0,15.5 C5.5,15.5 10,11.5 10,6 C10,0 0,-12 0,-12 Z" fill="#38BDF8"/>
              <line x1="-14" y1="13" x2="14" y2="-13" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/>
            </g>

            <!-- Empty Yellow Water Jerrycan on Right -->
            <g transform="translate(196, 56)">
              <rect x="0" y="8" width="24" height="32" rx="3" fill="#FACC15" stroke="#78350F" stroke-width="1.8"/>
              <rect x="3" y="2" width="7" height="6" fill="#DC2626" stroke="#78350F" stroke-width="1.2"/>
              <path d="M14,8 L14,3 L22,3 L22,8" fill="none" stroke="#78350F" stroke-width="2"/>
              <line x1="5" y1="16" x2="19" y2="32" stroke="#B45309" stroke-width="1.8"/>
              <line x1="19" y1="16" x2="5" y2="32" stroke="#B45309" stroke-width="1.8"/>
            </g>
            <text x="174" y="118" text-anchor="middle" fill="#991B1B" font-size="11.5" font-weight="900">DRC 76K DRY</text>
          </svg>
        </div>
        <p class="caption"><strong>16 West African states</strong> back migration pact; violence cuts water for <strong>76,000 in Ituri, DRC</strong>.</p>
      </article>

      <!-- STORY 8: AMERICAS PUBLIC HEALTH (CRISP MEDICAL ART — NO CRUDE POLYGON MAP!) -->
      <article class="story">
        <div class="story-kicker" style="border-top-color:#BE123C;">
          <span class="kicker-left" style="color:#BE123C;">AMERICAS · HEALTH</span>
          <span class="kicker-loc">US · MEX · BOL</span>
        </div>
        <h2 class="headline">Measles-Free Status Lost</h2>
        <div class="art-frame">
          <svg viewBox="0 0 232 132" xmlns="http://www.w3.org/2000/svg">
            <rect width="232" height="132" fill="#FFF1F2"/>
            <!-- Left: Bold Red-and-White PAHO Health Shield, Vaccine Vial & Syringe -->
            <g transform="translate(46, 54)">
              <path d="M-30,-36 L30,-36 L30,4 C30,28 0,40 0,40 C0,40 -30,28 -30,4 Z" fill="#DC2626" stroke="#7F1D1D" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M-21,-28 L21,-28 L21,2 C21,19 0,28 0,28 C0,28 -21,19 -21,2 Z" fill="#FFFFFF"/>
              <path d="M0,-17 L0,11 M-14,-3 L14,-3" stroke="#DC2626" stroke-width="7" stroke-linecap="round"/>
              <!-- Slashed Revocation Bar Across Shield Corner -->
              <line x1="-26" y1="24" x2="26" y2="-28" stroke="#0F172A" stroke-width="4" stroke-linecap="round"/>
            </g>

            <!-- Angled Vaccine Syringe -->
            <g transform="translate(92, 46) rotate(28)">
              <rect x="-5" y="-18" width="10" height="28" rx="1.5" fill="#E0F2FE" stroke="#0F172A" stroke-width="1.8"/>
              <rect x="-5" y="-4" width="10" height="14" fill="#38BDF8"/>
              <line x1="0" y1="-27" x2="0" y2="-18" stroke="#0F172A" stroke-width="2.2"/>
              <line x1="-6" y1="-27" x2="6" y2="-27" stroke="#0F172A" stroke-width="2.2"/>
              <line x1="0" y1="10" x2="0" y2="23" stroke="#475569" stroke-width="2"/>
            </g>
            <text x="52" y="118" text-anchor="middle" fill="#9F1239" font-size="11" font-weight="900">REVOKED</text>

            <!-- Right: Steep Rising Crimson 12-Month Epidemic Curve Chart Labeled US · MEX · BOL -->
            <g transform="translate(108, 10)">
              <rect x="0" y="0" width="116" height="112" rx="4" fill="#FFFFFF" stroke="#BE123C" stroke-width="2"/>
              <!-- Chart Gridlines -->
              <line x1="10" y1="28" x2="106" y2="28" stroke="#FCE7F3" stroke-width="1.2"/>
              <line x1="10" y1="54" x2="106" y2="54" stroke="#FCE7F3" stroke-width="1.2"/>
              <line x1="10" y1="80" x2="106" y2="80" stroke="#FCE7F3" stroke-width="1.2"/>
              <text x="58" y="20" text-anchor="middle" fill="#881337" font-size="10.5" font-weight="900">12+ MO. SPREAD</text>

              <!-- Shaded Outbreak Area & Steep Crimson Curve -->
              <path d="M12,84 Q44,78 68,54 T102,26 L102,86 L12,86 Z" fill="#FFE4E6"/>
              <path d="M12,84 Q44,78 68,54 T102,26" fill="none" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round"/>
              <circle cx="40" cy="76" r="4" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
              <circle cx="72" cy="50" r="4.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
              <circle cx="102" cy="26" r="5.5" fill="#DC2626" stroke="#FEF08A" stroke-width="2"/>

              <text x="58" y="103" text-anchor="middle" fill="#BE123C" font-size="10.5" font-weight="900">US · MEX · BOL</text>
            </g>
          </svg>
        </div>
        <p class="caption"><strong>PAHO revokes</strong> measles elimination in <strong>US, Mexico &amp; Bolivia</strong> after 12+ months of spread.</p>
      </article>

      <!-- STORY 9: SPACE & SCIENCE -->
      <article class="story">
        <div class="story-kicker" style="border-top-color:#4338CA;">
          <span class="kicker-left" style="color:#4338CA;">SPACE · SCIENCE</span>
          <span class="kicker-loc">ISS &amp; MERCURY</span>
        </div>
        <h2 class="headline">ISS Dragon &amp; Mercury Probe</h2>
        <div class="art-frame">
          <svg viewBox="0 0 232 132" xmlns="http://www.w3.org/2000/svg">
            <rect width="232" height="132" fill="#090D16"/>
            <circle cx="16" cy="12" r="1.3" fill="#FFFFFF"/>
            <circle cx="110" cy="10" r="1.4" fill="#93C5FD"/>
            <circle cx="216" cy="14" r="1.3" fill="#FFFFFF"/>
            <circle cx="18" cy="118" r="1.4" fill="#FEF08A"/>
            <circle cx="124" cy="92" r="1.2" fill="#FFFFFF"/>

            <line x1="0" y1="74" x2="232" y2="54" stroke="#334155" stroke-width="1.8" stroke-dasharray="5,3"/>

            <!-- Upper-Left: ISS Golden Solar Wings + SpaceX Dragon + Red 3D Vascular Medallion -->
            <g transform="translate(6, 4)">
              <line x1="6" y1="30" x2="80" y2="30" stroke="#CBD5E1" stroke-width="3.5"/>
              <rect x="33" y="20" width="18" height="20" rx="2.5" fill="#F8FAFC" stroke="#475569" stroke-width="1"/>
              <rect x="10" y="4" width="13" height="21" fill="#D97706" stroke="#FDE047" stroke-width="1.4"/>
              <rect x="10" y="35" width="13" height="21" fill="#D97706" stroke="#FDE047" stroke-width="1.4"/>
              <rect x="62" y="4" width="13" height="21" fill="#D97706" stroke="#FDE047" stroke-width="1.4"/>
              <rect x="62" y="35" width="13" height="21" fill="#D97706" stroke="#FDE047" stroke-width="1.4"/>

              <path d="M82,30 L104,30" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="3,2"/>
              <path d="M108,20 C122,20 132,24 132,30 C132,36 122,40 108,40 L100,37 L100,23 Z" fill="#FFFFFF" stroke="#38BDF8" stroke-width="1.6"/>
              <rect x="96" y="16" width="4.5" height="28" rx="1" fill="#0284C7"/>

              <g transform="translate(182, 24)">
                <circle cx="0" cy="0" r="20" fill="#1E1B4B" stroke="#F43F5E" stroke-width="2.2"/>
                <path d="M-12,0 L2,0 M-3,0 Q3,-11 12,-12 M-3,0 Q3,11 12,12 M3,-7 L12,-5" fill="none" stroke="#FB7185" stroke-width="3" stroke-linecap="round"/>
              </g>
            </g>

            <!-- Lower-Right: Winged BepiColombo Sweeping Cyan X-Ray Beam Across Cratered Mercury Crescent -->
            <g transform="translate(0, 56)">
              <path d="M10,62 Q68,16 158,28" fill="none" stroke="#FACC15" stroke-width="2.2" stroke-dasharray="4,3"/>
              <polygon points="86,32 174,8 174,64" fill="#22D3EE" opacity="0.38"/>
              <line x1="86" y1="32" x2="174" y2="18" stroke="#38BDF8" stroke-width="1.8" stroke-dasharray="4,2"/>
              <line x1="86" y1="32" x2="174" y2="50" stroke="#38BDF8" stroke-width="1.8" stroke-dasharray="4,2"/>

              <g transform="translate(76, 32) rotate(-14)">
                <polygon points="-34,-5 -10,-3.5 -10,3.5 -34,5" fill="#0284C7" stroke="#7DD3FC" stroke-width="1.4"/>
                <polygon points="10,-3.5 34,-5 34,5 10,3.5" fill="#0284C7" stroke="#7DD3FC" stroke-width="1.4"/>
                <rect x="-10" y="-8.5" width="20" height="17" rx="2.5" fill="#FACC15" stroke="#FFFFFF" stroke-width="1.6"/>
                <circle cx="0" cy="0" r="4" fill="#0F172A"/>
              </g>

              <circle cx="188" cy="38" r="31" fill="#475569" stroke="#CBD5E1" stroke-width="2.2"/>
              <path d="M188,7 A31,31 0 0,0 188,69 A20,31 0 0,1 188,7 Z" fill="#CBD5E1"/>
              <circle cx="176" cy="26" r="5.5" fill="#64748B" stroke="#94A3B8" stroke-width="1"/>
              <circle cx="198" cy="44" r="7" fill="#334155" stroke="#64748B" stroke-width="1"/>
              <circle cx="180" cy="52" r="4.2" fill="#64748B"/>
            </g>
          </svg>
        </div>
        <p class="caption">Dragon returns <strong>3D-printed blood vessels</strong>; <strong>BepiColombo</strong> tests X-ray gear at Mercury.</p>
      </article>

      <!-- STORY 10: SOCIETY & SPORT -->
      <article class="story">
        <div class="story-kicker" style="border-top-color:#047857;">
          <span class="kicker-left" style="color:#047857;">SOCIETY &amp; SPORT</span>
          <span class="kicker-loc">EU &amp; TURIN</span>
        </div>
        <h2 class="headline">EU Youth March; ATP Semis</h2>
        <div class="art-frame">
          <svg viewBox="0 0 232 132" xmlns="http://www.w3.org/2000/svg">
            <rect width="232" height="132" fill="#F8FAFC"/>
            <!-- Left Half: Marching Students Raising House & Euro Placards Under EU Stars -->
            <rect x="3" y="3" width="110" height="126" rx="3" fill="#EFF6FF" stroke="#1D4ED8" stroke-width="1.6"/>
            <g fill="#FACC15" stroke="#B45309" stroke-width="0.5">
              <circle cx="24" cy="15" r="3.2"/>
              <circle cx="40" cy="11" r="3.2"/>
              <circle cx="58" cy="9" r="3.2"/>
              <circle cx="76" cy="11" r="3.2"/>
              <circle cx="92" cy="15" r="3.2"/>
            </g>

            <g transform="translate(10, 22) rotate(-5)">
              <rect x="0" y="0" width="42" height="32" rx="3" fill="#FEF08A" stroke="#0F172A" stroke-width="1.8"/>
              <polygon points="21,5 8,16 12,16 12,27 30,27 30,16 34,16" fill="#DC2626"/>
              <rect x="18" y="19" width="6" height="8" fill="#FEF08A"/>
              <line x1="21" y1="32" x2="21" y2="66" stroke="#0F172A" stroke-width="3.2"/>
            </g>

            <g transform="translate(60, 27) rotate(5)">
              <rect x="0" y="0" width="42" height="32" rx="3" fill="#FCA5A5" stroke="#7F1D1D" stroke-width="1.8"/>
              <text x="21" y="24" text-anchor="middle" fill="#7F1D1D" font-size="22" font-weight="900">€</text>
              <line x1="21" y1="32" x2="21" y2="64" stroke="#0F172A" stroke-width="3.2"/>
            </g>

            <g fill="#0F172A">
              <circle cx="24" cy="94" r="7.5"/>
              <path d="M11,124 C11,106 37,106 37,124 Z"/>
              <path d="M16,106 L29,82" stroke="#0F172A" stroke-width="4.5" stroke-linecap="round"/>

              <circle cx="58" cy="91" r="8"/>
              <path d="M43,124 C43,104 73,104 73,124 Z"/>
              <path d="M65,104 L76,84" stroke="#0F172A" stroke-width="4.5" stroke-linecap="round"/>

              <circle cx="90" cy="95" r="7.5"/>
              <path d="M77,124 C77,107 103,107 103,124 Z"/>
            </g>

            <!-- Right Half: Turin Indoor Tennis Court, Net, Yellow Ball Arc & Gold Trophy -->
            <rect x="118" y="3" width="111" height="126" rx="3" fill="#0F172A" stroke="#38BDF8" stroke-width="1.6"/>
            <g transform="translate(173, 21)">
              <path d="M-11,-11 L11,-11 L8,2 C8,8 0,10 0,10 C0,10 -8,8 -8,2 Z" fill="#FACC15" stroke="#FEF08A" stroke-width="1.4"/>
              <rect x="-3.5" y="10" width="7" height="4" fill="#D97706"/>
              <rect x="-9" y="14" width="18" height="3.5" rx="1" fill="#FACC15"/>
            </g>

            <polygon points="136,46 210,46 222,120 124,120" fill="#2563EB" stroke="#FFFFFF" stroke-width="2"/>
            <line x1="131" y1="68" x2="215" y2="68" stroke="#E0F2FE" stroke-width="1.6"/>
            <line x1="127" y1="100" x2="219" y2="100" stroke="#E0F2FE" stroke-width="1.6"/>
            <line x1="173" y1="46" x2="173" y2="120" stroke="#FFFFFF" stroke-width="1.6"/>
            <line x1="126" y1="80" x2="220" y2="80" stroke="#FEF08A" stroke-width="2.2" stroke-dasharray="4,2"/>

            <path d="M140,110 Q162,52 196,68" fill="none" stroke="#FEF08A" stroke-width="3" stroke-dasharray="4,3"/>
            <circle cx="196" cy="68" r="9.5" fill="#EAB308" stroke="#FFFFFF" stroke-width="2"/>
          </svg>
        </div>
        <p class="caption">Students protest housing costs in <strong>20+ EU states</strong>; <strong>Alcaraz &amp; Medvedev</strong> in ATP semis.</p>
      </article>
    </section>

    <!-- TIER D: AROUND THE WORLD · 6 MORE VERIFIED DISPATCHES BAND (144px tall) -->
    <section class="tier-d">
      <div class="tier-d-header">
        <span>AROUND THE WORLD · 6 MORE VERIFIED DISPATCHES</span>
        <span class="gold">LAW · LATIN AMERICA · NORTH AMERICA · EASTERN EUROPE · ENVIRONMENT · WEST AFRICA</span>
      </div>
      <div class="tier-d-grid">
        <!-- STORY 11: LAW · MYANMAR & UK -->
        <div class="brief-cell">
          <div class="brief-icon">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" fill="#7F1D1D"/>
              <line x1="7" y1="24" x2="23" y2="10" stroke="#FDE047" stroke-width="3.5" stroke-linecap="round"/>
              <rect x="19" y="5" width="8" height="13" rx="1.5" transform="rotate(-40 23 11)" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1.2"/>
              <rect x="6" y="27" width="24" height="4" rx="1" fill="#FCA5A5"/>
            </svg>
          </div>
          <div class="brief-body">
            <div class="brief-top"><span class="brief-pill" style="background:#991B1B;">LAW · MYANMAR &amp; UK</span></div>
            <div class="brief-headline">UK Expels Myanmar Attaché</div>
            <div class="brief-lead">Follows <strong>ICJ Rohingya genocide ruling</strong>; EU urges compliance.</div>
          </div>
        </div>

        <!-- STORY 12: LATIN AMERICA · SUMMIT -->
        <div class="brief-cell">
          <div class="brief-icon">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" fill="#064E3B"/>
              <circle cx="18" cy="18" r="13" fill="none" stroke="#34D399" stroke-width="2"/>
              <path d="M11,12 L18,25 L25,12" fill="none" stroke="#FEF08A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="18" y1="7" x2="18" y2="25" stroke="#FEF08A" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="brief-body">
            <div class="brief-top"><span class="brief-pill" style="background:#0F766E;">LATIN AMERICA · SUMMIT</span></div>
            <div class="brief-headline">Cap Cana Talks; Darién -90%</div>
            <div class="brief-lead">Caribbean leaders meet; IOM says <strong>Darién crossings fell 90%</strong>.</div>
          </div>
        </div>

        <!-- STORY 13: NORTH AMERICA · TRADE -->
        <div class="brief-cell">
          <div class="brief-icon">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" fill="#1E3A8A"/>
              <polygon points="4,22 32,22 28,30 8,30" fill="#38BDF8" stroke="#FFFFFF" stroke-width="1.2"/>
              <rect x="9" y="13" width="8" height="9" fill="#F59E0B"/>
              <rect x="19" y="11" width="8" height="11" fill="#10B981"/>
            </svg>
          </div>
          <div class="brief-body">
            <div class="brief-top"><span class="brief-pill" style="background:#1D4ED8;">NORTH AMERICA · TRADE</span></div>
            <div class="brief-headline">US Touts $17B Asia Deals</div>
            <div class="brief-lead">White House details <strong>$17B in post-APEC trade</strong> agreements.</div>
          </div>
        </div>

        <!-- STORY 14: EASTERN EUROPE · FRONT -->
        <div class="brief-cell">
          <div class="brief-icon">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" fill="#1E293B"/>
              <path d="M8,6 L28,6 L28,18 C28,26 18,31 18,31 C18,31 8,26 8,18 Z" fill="#0284C7" stroke="#FACC15" stroke-width="2"/>
              <path d="M13,18 L17,22 L24,13" fill="none" stroke="#FACC15" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="brief-body">
            <div class="brief-top"><span class="brief-pill" style="background:#0369A1;">EASTERN EUROPE · FRONT</span></div>
            <div class="brief-headline">Ukraine Retakes 14 Villages</div>
            <div class="brief-lead">Forces liberate <strong>14 border settlements</strong> near Velykyi Burluk.</div>
          </div>
        </div>

        <!-- STORY 15: AMERICAS · ENVIRONMENT -->
        <div class="brief-cell">
          <div class="brief-icon">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" fill="#451A03"/>
              <circle cx="18" cy="14" r="8" fill="#F97316"/>
              <line x1="5" y1="21" x2="31" y2="21" stroke="#FDE047" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="8" y1="26" x2="28" y2="26" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="6" y1="31" x2="30" y2="31" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="brief-body">
            <div class="brief-top"><span class="brief-pill" style="background:#B45309;">AMERICAS · ENVIRONMENT</span></div>
            <div class="brief-headline">Mexico City Smog Hits 157 AQI</div>
            <div class="brief-lead">Stagnant air pushes capital among <strong>world's most polluted</strong>.</div>
          </div>
        </div>

        <!-- STORY 16: WEST AFRICA · MARITIME -->
        <div class="brief-cell">
          <div class="brief-icon">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" fill="#0C4A6E"/>
              <circle cx="18" cy="18" r="12" fill="none" stroke="#FFFFFF" stroke-width="5"/>
              <circle cx="18" cy="18" r="12" fill="none" stroke="#EF4444" stroke-width="5" stroke-dasharray="10,9"/>
            </svg>
          </div>
          <div class="brief-body">
            <div class="brief-top"><span class="brief-pill" style="background:#047857;">WEST AFRICA · MARITIME</span></div>
            <div class="brief-headline">Senegal &amp; Nigeria Rescues</div>
            <div class="brief-lead">Crews deploy after fatal boat capsizings in <strong>Yenne &amp; Sagbama</strong>.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER DATELINE RULE -->
    <footer class="footer">
      <div class="legend">
        <span class="legend-item"><span class="dot" style="background:#EF4444;"></span>EUROPE</span>
        <span class="legend-item"><span class="dot" style="background:#3B82F6;"></span>EAST ASIA</span>
        <span class="legend-item"><span class="dot" style="background:#F97316;"></span>SOUTH &amp; SE ASIA</span>
        <span class="legend-item"><span class="dot" style="background:#DC2626;"></span>MIDDLE EAST</span>
        <span class="legend-item"><span class="dot" style="background:#F59E0B;"></span>AFRICA</span>
        <span class="legend-item"><span class="dot" style="background:#EC4899;"></span>NORTH &amp; LATIN AMERICA</span>
        <span class="legend-item"><span class="dot" style="background:#14B8A6;"></span>CLIMATE &amp; SPACE</span>
      </div>
      <div>FRIDAY, 20 NOVEMBER 2026 · GLOBAL SUMMARY</div>
    </footer>
  </div>
</body>
</html>`;
}

function connectCdp(wsUrl) {
  return new Promise((resolveConn, rejectConn) => {
    const ws = new WebSocket(wsUrl);
    let nextId = 1;
    const pending = new Map();
    const eventWaiters = new Map();

    ws.addEventListener("open", () => {
      resolveConn({
        send(method, params = {}) {
          const id = nextId++;
          return new Promise((res, rej) => {
            pending.set(id, { res, rej, method });
            ws.send(JSON.stringify({ id, method, params }));
          });
        },
        waitForEvent(eventName, timeoutMs = 10000) {
          return new Promise((res, rej) => {
            const timer = setTimeout(() => {
              eventWaiters.delete(eventName);
              rej(new Error(`Timeout waiting for CDP event ${eventName}`));
            }, timeoutMs);
            eventWaiters.set(eventName, (params) => {
              clearTimeout(timer);
              res(params);
            });
          });
        },
        close() {
          ws.close();
        },
      });
    });

    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(typeof ev.data === "string" ? ev.data : ev.data.toString());
      if (msg.id && pending.has(msg.id)) {
        const { res, rej, method } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) {
          rej(new Error(`CDP error in ${method}: ${JSON.stringify(msg.error)}`));
        } else {
          res(msg.result);
        }
      } else if (msg.method && eventWaiters.has(msg.method)) {
        const handler = eventWaiters.get(msg.method);
        eventWaiters.delete(msg.method);
        handler(msg.params);
      }
    });

    ws.addEventListener("error", (err) => {
      rejectConn(err);
    });
  });
}

async function renderPoster() {
  const html = buildHtml();
  const server = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });

  await new Promise((res) => server.listen(0, "127.0.0.1", res));
  const serverPort = server.address().port;
  const pageUrl = `http://127.0.0.1:${serverPort}/`;

  const tempProfile = mkdtempSync(resolve(tmpdir(), "chrome-news-20261120-"));
  const chrome = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--remote-debugging-port=0",
      "--window-size=1024,1024",
      `--user-data-dir=${tempProfile}`,
      "about:blank",
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  try {
    const browserWsUrl = await new Promise((res, rej) => {
      let stderrBuf = "";
      const timer = setTimeout(() => rej(new Error(`Chrome startup timeout. Stderr: ${stderrBuf}`)), 15000);
      chrome.stderr.on("data", (chunk) => {
        stderrBuf += chunk.toString();
        const match = stderrBuf.match(/DevTools listening on (ws:\/\/[^\r\n]+)/);
        if (match) {
          clearTimeout(timer);
          res(match[1]);
        }
      });
      chrome.on("exit", (code) => {
        clearTimeout(timer);
        rej(new Error(`Chrome exited prematurely with code ${code}. Stderr: ${stderrBuf}`));
      });
    });

    const portMatch = browserWsUrl.match(/:(\d+)\//);
    const debugPort = portMatch[1];
    const listResp = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
    const targets = await listResp.json();
    const pageTarget = targets.find((t) => t.type === "page") ?? targets[0];

    const cdp = await connectCdp(pageTarget.webSocketDebuggerUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1024,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const loadPromise = cdp.waitForEvent("Page.loadEventFired");
    await cdp.send("Page.navigate", { url: pageUrl });
    await loadPromise;

    const auditResult = await cdp.send("Runtime.evaluate", {
      awaitPromise: true,
      returnByValue: true,
      expression: `(async () => {
        await document.fonts.ready;
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        const root = document.documentElement;
        const stories = Array.from(document.querySelectorAll('.story'));
        const storyChecks = stories.map((c, idx) => {
          const r = c.getBoundingClientRect();
          const h = c.querySelector('.headline');
          const s = c.querySelector('.caption');
          const svg = c.querySelector('svg');
          const svgRect = svg.getBoundingClientRect();
          const svgTextIssues = [];
          for (const t of svg.querySelectorAll('text')) {
            const tr = t.getBoundingClientRect();
            if (tr.left < svgRect.left + 1 || tr.right > svgRect.right - 1 || tr.top < svgRect.top + 1 || tr.bottom > svgRect.bottom - 1) {
              svgTextIssues.push({ text: t.textContent, leftDelta: tr.left - svgRect.left, rightDelta: svgRect.right - tr.right });
            }
          }
          return {
            story: idx + 1,
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            storyOverflowY: c.scrollHeight > c.clientHeight + 1,
            storyOverflowX: c.scrollWidth > c.clientWidth + 1,
            headlineOverflow: h ? h.scrollWidth > h.clientWidth + 1 : false,
            captionOverflow: s ? s.scrollHeight > s.clientHeight + 2 : false,
            svgTextIssues,
          };
        });
        const briefs = Array.from(document.querySelectorAll('.brief-cell'));
        const briefChecks = briefs.map((b, idx) => {
          const bh = b.querySelector('.brief-headline');
          const bl = b.querySelector('.brief-lead');
          return {
            brief: idx + 11,
            cellOverflowX: b.scrollWidth > b.clientWidth + 1,
            cellOverflowY: b.scrollHeight > b.clientHeight + 1,
            headlineOverflow: bh ? bh.scrollWidth > bh.clientWidth + 1 : false,
            leadOverflow: bl ? bl.scrollWidth > bl.clientWidth + 1 : false,
          };
        });
        return {
          scrollWidth: root.scrollWidth,
          scrollHeight: root.scrollHeight,
          storyChecks,
          briefChecks,
        };
      })()`,
    });

    const audit = auditResult.result.value;
    console.log("DOM Audit:", JSON.stringify(audit, null, 2));

    if (audit.scrollWidth > 1024 || audit.scrollHeight > 1024) {
      throw new Error(`Viewport overflow: ${audit.scrollWidth}x${audit.scrollHeight}`);
    }
    for (const c of audit.storyChecks) {
      if (
        c.storyOverflowX ||
        c.storyOverflowY ||
        c.headlineOverflow ||
        c.captionOverflow ||
        c.svgTextIssues.length > 0
      ) {
        throw new Error(`Story overflow detected in story ${c.story}: ${JSON.stringify(c)}`);
      }
    }
    for (const b of audit.briefChecks) {
      if (b.cellOverflowX || b.cellOverflowY || b.headlineOverflow || b.leadOverflow) {
        throw new Error(`Brief overflow detected in brief ${b.brief}: ${JSON.stringify(b)}`);
      }
    }

    const fullShot = await cdp.send("Page.captureScreenshot", {
      format: "png",
      clip: { x: 0, y: 0, width: 1024, height: 1024, scale: 1 },
      captureBeyondViewport: false,
    });
    const pngBuf = Buffer.from(fullShot.data, "base64");
    writeFileSync(OUTPUT_PNG, pngBuf);
    console.log(`Wrote ${OUTPUT_PNG} (${pngBuf.byteLength} bytes)`);

    const thumbShot = await cdp.send("Page.captureScreenshot", {
      format: "png",
      clip: { x: 0, y: 0, width: 1024, height: 1024, scale: 0.293 },
      captureBeyondViewport: false,
    });
    const thumbBuf = Buffer.from(thumbShot.data, "base64");
    for (const previewPath of PREVIEW_PATHS) {
      mkdirSync(dirname(previewPath), { recursive: true });
      writeFileSync(previewPath, thumbBuf);
      console.log(`Wrote preview ${previewPath} (${thumbBuf.byteLength} bytes)`);
    }

    cdp.close();
  } finally {
    server.close();
    try {
      chrome.kill("SIGKILL");
    } catch {}
    setTimeout(() => {
      try {
        rmSync(tempProfile, { recursive: true, force: true });
      } catch {}
    }, 500);
  }
}

renderPoster().catch((err) => {
  console.error(err);
  process.exit(1);
});
