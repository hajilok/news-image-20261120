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
    color: #0F172A;
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 6px 8px;
    display: grid;
    grid-template-rows: 72px 302px 302px 302px 28px;
    gap: 0px;
    background: #F8F4EC;
    border: 3px solid #0F172A;
    position: relative;
  }

  /* BROADSHEET MASTHEAD (ZERO TEXT < 13px) */
  .masthead {
    display: grid;
    grid-template-columns: 218px 1fr 252px;
    align-items: center;
    background: #0F172A;
    color: #F8F4EC;
    padding: 6px 12px;
    border-bottom: 4px solid #B91C1C;
    gap: 8px;
  }
  .mast-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    border-right: 1.5px solid #334155;
    padding-right: 10px;
  }
  .mast-ear-top {
    font-size: 13.5px;
    font-weight: 900;
    letter-spacing: 0.5px;
    color: #F87171;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .mast-ear-sub {
    font-size: 13px;
    font-weight: 800;
    color: #FCD34D;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }
  .mast-center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .mast-title {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 35.5px;
    font-weight: 900;
    letter-spacing: 0.6px;
    color: #FFFFFF;
    line-height: 1.05;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .mast-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
  .date-banner {
    background: #B91C1C;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 900;
    letter-spacing: 0.5px;
    padding: 7px 10px;
    border-radius: 3px;
    border: 2px solid #FCA5A5;
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* 3x3 SYMMETRIC BROADSHEET GRID */
  .grid-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 2px solid #0F172A;
    background: #F8F4EC;
  }

  .panel {
    padding: 6px 9px 6px 9px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    border-right: 1.5px solid #C8BFA8;
    background: #F8F4EC;
  }
  .panel:last-child {
    border-right: none;
  }

  .panel-kicker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    height: 21px;
    flex-shrink: 0;
    border-top: 3.5px solid #0F172A;
    padding-top: 2px;
  }
  .kicker-beat {
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .kicker-loc {
    font-size: 13px;
    font-weight: 800;
    color: #334155;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .headline {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 21.5px;
    font-weight: 900;
    color: #0F172A;
    line-height: 1.1;
    letter-spacing: -0.35px;
    margin: 1px 0 3px 0;
    white-space: nowrap;
    overflow: hidden;
    flex-shrink: 0;
  }

  .art-frame {
    width: 100%;
    flex: 1;
    min-height: 0;
    border: 1.5px solid #64748B;
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

  .short-label {
    font-size: 13.6px;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.15;
    letter-spacing: -0.25px;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    flex-shrink: 0;
  }
  .short-label span.accent {
    color: #B91C1C;
    font-weight: 900;
  }

  /* BOTTOM DATELINE BAR (13px BOLD) */
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0F172A;
    color: #F8FAFC;
    padding: 0 10px;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.25px;
  }
  .legend {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    display: inline-block;
  }
</style>
</head>
<body>
  <div class="page">
    <!-- BROADSHEET MASTHEAD -->
    <header class="masthead">
      <div class="mast-left">
        <div class="mast-ear-top">6 CONTINENTS · 9 BEATS</div>
        <div class="mast-ear-sub">WORLD EDITION · 20 NOV</div>
      </div>
      <div class="mast-center">
        <div class="mast-title">THE WORLD IN ONE DAY</div>
      </div>
      <div class="mast-right">
        <div class="date-banner">FRIDAY · 20 NOVEMBER 2026</div>
      </div>
    </header>

    <!-- ROW 1 -->
    <section class="grid-row">
      <!-- PANEL 1: EUROPE · WAR — KYIV -->
      <article class="panel">
        <div class="panel-kicker" style="border-top-color:#B91C1C;">
          <span class="kicker-beat" style="color:#B91C1C;">EUROPE · WAR</span>
          <span class="kicker-loc">KYIV</span>
        </div>
        <h2 class="headline">Missiles Hit 3 Kyiv Bridges</h2>
        <div class="art-frame">
          <svg viewBox="0 0 316 212" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="kyiv-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#070B19"/>
                <stop offset="60%" stop-color="#131C31"/>
                <stop offset="100%" stop-color="#2A1B2E"/>
              </linearGradient>
              <linearGradient id="dnieper-water" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#082F49"/>
                <stop offset="100%" stop-color="#041E30"/>
              </linearGradient>
            </defs>
            <rect width="316" height="212" fill="url(#kyiv-sky)"/>
            <!-- Searchlight cones -->
            <polygon points="38,124 84,0 112,0" fill="#1E293B" opacity="0.55"/>
            <polygon points="162,124 118,0 144,0" fill="#1E293B" opacity="0.55"/>
            <polygon points="244,124 202,0 226,0" fill="#1E293B" opacity="0.45"/>

            <!-- Volumetric dark smoke columns -->
            <path d="M46,142 C32,102 58,68 40,20 C68,46 78,94 64,142 Z" fill="#334155" opacity="0.85"/>
            <path d="M152,146 C138,100 168,62 148,12 C180,42 188,96 172,146 Z" fill="#334155" opacity="0.88"/>
            <path d="M250,150 C238,108 264,74 248,26 C276,54 282,104 268,150 Z" fill="#334155" opacity="0.85"/>

            <!-- Darkened Kyiv skyline with Pechersk Lavra golden domes & dark apartment blocks -->
            <path d="M0,124 L16,124 L16,84 L36,84 L36,114 L50,114 L50,74 L57,50 L64,74 L64,116 L86,116 L86,80 L114,80 L114,118 L132,118 L132,76 L139,54 L146,76 L146,118 L178,118 L178,86 L208,86 L208,120 L232,120 L232,92 L258,92 L258,124 L316,124 L316,136 L0,136 Z" fill="#111827"/>
            <!-- Lavra onion domes & crosses -->
            <circle cx="57" cy="49" r="6" fill="#64748B"/>
            <line x1="57" y1="37" x2="57" y2="45" stroke="#94A3B8" stroke-width="2"/>
            <circle cx="139" cy="53" r="6" fill="#64748B"/>
            <line x1="139" y1="41" x2="139" y2="49" stroke="#94A3B8" stroke-width="2"/>
            <!-- Unlit blackout apartment windows -->
            <g fill="#070B19">
              <rect x="21" y="90" width="4.5" height="6"/><rect x="28" y="90" width="4.5" height="6"/>
              <rect x="21" y="100" width="4.5" height="6"/><rect x="28" y="100" width="4.5" height="6"/>
              <rect x="92" y="87" width="5" height="6"/><rect x="102" y="87" width="5" height="6"/>
              <rect x="92" y="97" width="5" height="6"/><rect x="102" y="97" width="5" height="6"/>
              <rect x="184" y="93" width="5" height="6"/><rect x="194" y="93" width="5" height="6"/>
            </g>

            <!-- Incoming Red Missile & Drone Streaks -->
            <path d="M12,12 Q36,72 56,138" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="7,3"/>
            <path d="M108,8 Q136,72 158,142" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="7,3"/>
            <path d="M202,12 Q230,78 256,146" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="7,3"/>
            <polygon points="84,28 100,22 94,31 100,37" fill="#EF4444" stroke="#FCA5A5" stroke-width="1.2"/>
            <polygon points="180,24 196,18 190,27 196,33" fill="#EF4444" stroke="#FCA5A5" stroke-width="1.2"/>

            <!-- Power & Water Out Roundel (Top Right) -->
            <g transform="translate(278, 34)">
              <circle cx="0" cy="0" r="25" fill="#1E293B" stroke="#F59E0B" stroke-width="2.5"/>
              <polygon points="-6,-13 -15,-1 -7,-1 -12,13 3,-3 -5,-3" fill="#FACC15"/>
              <path d="M10,-10 C10,-10 2,0 2,6 C2,10.2 5.6,13.5 10,13.5 C14.4,13.5 18,10.2 18,6 C18,0 10,-10 10,-10 Z" fill="#38BDF8"/>
              <line x1="-18" y1="16" x2="18" y2="-16" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/>
            </g>

            <!-- Dnieper River Water & Shimmering Fire Reflections -->
            <rect x="0" y="132" width="316" height="80" fill="url(#dnieper-water)"/>
            <ellipse cx="56" cy="180" rx="24" ry="4.5" fill="#F97316" opacity="0.6"/>
            <ellipse cx="56" cy="190" rx="15" ry="2.8" fill="#FEF08A" opacity="0.55"/>
            <ellipse cx="158" cy="184" rx="26" ry="4.8" fill="#F97316" opacity="0.6"/>
            <ellipse cx="158" cy="194" rx="16" ry="2.8" fill="#FEF08A" opacity="0.55"/>
            <ellipse cx="256" cy="188" rx="22" ry="4.2" fill="#F97316" opacity="0.6"/>
            <ellipse cx="256" cy="198" rx="13" ry="2.5" fill="#FEF08A" opacity="0.55"/>

            <!-- 3 Distinct Perspective Bridges (Arch, Suspension, Truss) -->
            <!-- Bridge 1 -->
            <path d="M8,162 Q56,118 104,162" fill="none" stroke="#94A3B8" stroke-width="6"/>
            <line x1="4" y1="144" x2="108" y2="144" stroke="#E2E8F0" stroke-width="4.2"/>
            <line x1="26" y1="144" x2="26" y2="170" stroke="#64748B" stroke-width="4"/>
            <line x1="86" y1="144" x2="86" y2="170" stroke="#64748B" stroke-width="4"/>

            <!-- Bridge 2 (Suspension / Cable-stayed) -->
            <line x1="158" y1="102" x2="158" y2="174" stroke="#E2E8F0" stroke-width="5"/>
            <line x1="158" y1="106" x2="114" y2="148" stroke="#94A3B8" stroke-width="1.8"/>
            <line x1="158" y1="115" x2="128" y2="148" stroke="#94A3B8" stroke-width="1.8"/>
            <line x1="158" y1="106" x2="202" y2="148" stroke="#94A3B8" stroke-width="1.8"/>
            <line x1="158" y1="115" x2="188" y2="148" stroke="#94A3B8" stroke-width="1.8"/>
            <line x1="110" y1="148" x2="206" y2="148" stroke="#E2E8F0" stroke-width="4.2"/>

            <!-- Bridge 3 -->
            <path d="M210,168 Q256,126 302,168" fill="none" stroke="#94A3B8" stroke-width="6"/>
            <line x1="208" y1="152" x2="306" y2="152" stroke="#E2E8F0" stroke-width="4.2"/>
            <line x1="228" y1="152" x2="228" y2="176" stroke="#64748B" stroke-width="4"/>
            <line x1="284" y1="152" x2="284" y2="176" stroke="#64748B" stroke-width="4"/>

            <!-- 3 Glowing Multi-Layered Explosion Fireballs -->
            <circle cx="56" cy="140" r="23" fill="#DC2626" opacity="0.88"/>
            <polygon points="56,112 63,130 81,126 68,140 78,155 61,149 56,164 50,149 34,154 45,140 33,126 50,130" fill="#F97316"/>
            <circle cx="56" cy="140" r="9" fill="#FEF08A"/>

            <circle cx="158" cy="144" r="24" fill="#DC2626" opacity="0.88"/>
            <polygon points="158,114 165,133 184,129 170,144 181,160 163,153 158,169 152,153 135,159 146,144 134,129 152,133" fill="#F97316"/>
            <circle cx="158" cy="144" r="9.5" fill="#FEF08A"/>

            <circle cx="256" cy="148" r="22" fill="#DC2626" opacity="0.88"/>
            <polygon points="256,120 262,137 280,134 267,148 277,162 261,156 256,171 250,156 235,161 245,148 234,134 250,137" fill="#F97316"/>
            <circle cx="256" cy="148" r="8.5" fill="#FEF08A"/>
          </svg>
        </div>
        <div class="short-label"><span class="accent">110 Missiles &amp; 400 Drones</span> · 9 Killed · Power Cut</div>
      </article>

      <!-- PANEL 2: SOUTH ASIA · CYCLONE — INDIA -->
      <article class="panel">
        <div class="panel-kicker" style="border-top-color:#C2410C;">
          <span class="kicker-beat" style="color:#C2410C;">SOUTH ASIA · CYCLONE</span>
          <span class="kicker-loc">INDIA</span>
        </div>
        <h2 class="headline">Cyclone Akvan Hits Odisha</h2>
        <div class="art-frame">
          <svg viewBox="0 0 316 212" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bengal-sea" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#0369A1"/>
                <stop offset="100%" stop-color="#082F49"/>
              </linearGradient>
            </defs>
            <rect width="316" height="212" fill="url(#bengal-sea)"/>
            <!-- Churning wave crests & diagonal rain sheets -->
            <path d="M204,178 Q220,170 236,178 T268,178" fill="none" stroke="#38BDF8" stroke-width="2.5"/>
            <path d="M234,194 Q250,186 266,194 T298,194" fill="none" stroke="#38BDF8" stroke-width="2.5"/>
            <line x1="164" y1="22" x2="142" y2="50" stroke="#BAE6FD" stroke-width="1.6" opacity="0.6"/>
            <line x1="266" y1="28" x2="244" y2="56" stroke="#BAE6FD" stroke-width="1.6" opacity="0.6"/>
            <line x1="292" y1="118" x2="270" y2="146" stroke="#BAE6FD" stroke-width="1.6" opacity="0.6"/>

            <!-- White surf & Lush Green Odisha Shoreline -->
            <path d="M0,0 L194,0 L176,34 L158,58 L142,84 C132,90 124,86 122,96 C120,104 128,106 122,114 L98,146 L70,178 L36,212 L0,212 Z" fill="#DCFCE7" stroke="#E0F2FE" stroke-width="5"/>
            <path d="M0,0 L190,0 L172,34 L154,58 L138,84 C128,90 120,86 118,96 C116,104 124,106 118,114 L94,146 L66,178 L32,212 L0,212 Z" fill="#86EFAC" stroke="#15803D" stroke-width="3"/>
            <path d="M0,0 L148,0 L134,42 L108,82 L80,122 L42,168 L0,198 Z" fill="#4ADE80" opacity="0.5"/>

            <!-- Raised Concrete Cyclone Shelter with Bold Green Checkmark Shield (300K+) -->
            <g transform="translate(10, 6)">
              <circle cx="36" cy="36" r="33" fill="#065F46" stroke="#34D399" stroke-width="3"/>
              <polygon points="36,11 12,29 19,29 19,53 53,53 53,29 60,29" fill="#10B981" stroke="#FFFFFF" stroke-width="2.2" stroke-linejoin="round"/>
              <path d="M26,37 L34,45 L47,29" fill="none" stroke="#FEF08A" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <rect x="8" y="82" width="76" height="23" rx="4" fill="#064E3B" stroke="#34D399" stroke-width="1.8"/>
            <text x="46" y="99" text-anchor="middle" fill="#FEF08A" font-size="14.5" font-weight="900">300K+</text>

            <!-- Wind-Bent Coconut Palm Silhouettes (positioned cleanly below 300K+ badge) -->
            <g stroke-linecap="round">
              <path d="M74,180 Q58,156 38,152" fill="none" stroke="#78350F" stroke-width="3.8"/>
              <path d="M38,152 Q20,144 14,152 M38,152 Q18,154 16,166 M38,152 Q24,136 16,140 M38,152 Q34,134 26,134" fill="none" stroke="#14532D" stroke-width="2.8"/>
              <path d="M96,158 Q80,134 58,130" fill="none" stroke="#78350F" stroke-width="3.8"/>
              <path d="M58,130 Q40,122 34,130 M58,130 Q38,132 36,144 M58,130 Q44,114 36,118" fill="none" stroke="#14532D" stroke-width="2.8"/>
            </g>

            <!-- Large Multi-Arm Translucent Spiral Cyclone Vortex & Eye -->
            <g transform="translate(204, 104)">
              <circle cx="0" cy="0" r="74" fill="#38BDF8" opacity="0.2"/>
              <circle cx="0" cy="0" r="56" fill="#BAE6FD" opacity="0.28"/>
              <circle cx="0" cy="0" r="38" fill="#E0F2FE" opacity="0.36"/>
              <path d="M-13,-64 C40,-70 74,-26 62,24 C52,62 4,74 -38,56" fill="none" stroke="#E0F2FE" stroke-width="7.5" stroke-linecap="round"/>
              <path d="M15,62 C-36,70 -72,28 -60,-20 C-50,-60 -4,-72 36,-54" fill="none" stroke="#7DD3FC" stroke-width="7" stroke-linecap="round"/>
              <path d="M-36,-24 C-13,-48 30,-40 40,-9 C48,20 20,48 -15,38" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
              <path d="M28,20 C11,40 -24,30 -32,4 C-40,-20 -18,-40 13,-30" fill="none" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round"/>
              <circle cx="0" cy="0" r="14" fill="#075985" stroke="#FACC15" stroke-width="4.5"/>
            </g>

            <!-- Landfall Arrow & Gopalpur Bullseye -->
            <path d="M262,136 L132,106" fill="none" stroke="#EF4444" stroke-width="4.5" stroke-dasharray="8,4"/>
            <polygon points="122,104 140,98 136,115" fill="#EF4444"/>
            <circle cx="118" cy="103" r="15" fill="#DC2626" opacity="0.38"/>
            <circle cx="118" cy="103" r="7" fill="#DC2626" stroke="#FFFFFF" stroke-width="2.5"/>
          </svg>
        </div>
        <div class="short-label">Gopalpur Landfall · <span class="accent" style="color:#047857;">300K Sheltered · 0 Deaths</span></div>
      </article>

      <!-- PANEL 3: ASIA & GLOBAL · MARKETS -->
      <article class="panel">
        <div class="panel-kicker" style="border-top-color:#1E3A8A;">
          <span class="kicker-beat" style="color:#1E3A8A;">ASIA &amp; GLOBAL · MARKETS</span>
          <span class="kicker-loc">TECH</span>
        </div>
        <h2 class="headline">AI Rout Sinks Asian Stocks</h2>
        <div class="art-frame">
          <svg viewBox="0 0 316 212" xmlns="http://www.w3.org/2000/svg">
            <rect width="316" height="212" fill="#090F1D"/>
            <!-- Glowing Financial Gridlines -->
            <g stroke="#1E293B" stroke-width="1.2">
              <line x1="0" y1="42" x2="316" y2="42"/>
              <line x1="0" y1="84" x2="316" y2="84"/>
              <line x1="0" y1="126" x2="316" y2="126"/>
              <line x1="0" y1="168" x2="316" y2="168"/>
              <line x1="114" y1="0" x2="114" y2="212"/>
              <line x1="180" y1="0" x2="180" y2="212"/>
              <line x1="246" y1="0" x2="246" y2="212"/>
            </g>

            <!-- Left: Gold-Pinned Silicon AI Processor Die with Red Fracture -->
            <g transform="translate(56, 66)">
              <g stroke="#FACC15" stroke-width="3.5" stroke-linecap="round">
                <line x1="-22" y1="-44" x2="-22" y2="-34"/><line x1="-8" y1="-44" x2="-8" y2="-34"/><line x1="8" y1="-44" x2="8" y2="-34"/><line x1="22" y1="-44" x2="22" y2="-34"/>
                <line x1="-22" y1="34" x2="-22" y2="44"/><line x1="-8" y1="34" x2="-8" y2="44"/><line x1="8" y1="34" x2="8" y2="44"/><line x1="22" y1="34" x2="22" y2="44"/>
                <line x1="-44" y1="-22" x2="-34" y2="-22"/><line x1="-44" y1="-8" x2="-34" y2="-8"/><line x1="-44" y1="8" x2="-34" y2="8"/><line x1="-44" y1="22" x2="-34" y2="22"/>
                <line x1="34" y1="-22" x2="44" y2="-22"/><line x1="34" y1="-8" x2="44" y2="-8"/><line x1="34" y1="8" x2="44" y2="8"/><line x1="34" y1="22" x2="44" y2="22"/>
              </g>
              <rect x="-34" y="-34" width="68" height="68" rx="7" fill="#1E293B" stroke="#38BDF8" stroke-width="2.8"/>
              <rect x="-22" y="-22" width="44" height="44" rx="4" fill="#0F172A" stroke="#7DD3FC" stroke-width="1.6"/>
              <path d="M-28,-28 L-4,-6 L6,-12 L28,28" fill="none" stroke="#EF4444" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="0" y="7" text-anchor="middle" fill="#FFFFFF" font-size="20" font-weight="900">AI</text>
            </g>

            <!-- Bottom Left: Gold Bitcoin Coin & $61.4K -->
            <g transform="translate(56, 166)">
              <circle cx="-26" cy="0" r="21" fill="#F59E0B" stroke="#FEF08A" stroke-width="2.2"/>
              <text x="-26" y="8" text-anchor="middle" fill="#FFFFFF" font-size="21" font-weight="900">₿</text>
              <text x="20" y="-4" text-anchor="middle" fill="#FEF08A" font-size="14" font-weight="900">$61.4K</text>
              <path d="M20,3 L20,21 M12,13 L20,22 L28,13" fill="none" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>

            <!-- Right: Red Crash Trendline & 3 Luminous Crimson Index Bars (15.5px Bold White Labels) -->
            <path d="M120,16 L162,32 L206,24 L254,68 L296,114" fill="none" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>
            <polygon points="302,120 287,116 298,104" fill="#EF4444"/>

            <!-- Bar 1: TAIEX -6.2% -->
            <rect x="118" y="24" width="184" height="42" rx="4" fill="#DC2626" stroke="#FCA5A5" stroke-width="1.5"/>
            <text x="128" y="51" fill="#FFFFFF" font-size="15.5" font-weight="900">TAIEX</text>
            <text x="292" y="51" text-anchor="end" fill="#FEF08A" font-size="17.5" font-weight="900">-6.2%</text>

            <!-- Bar 2: KOSPI -5.2% -->
            <rect x="118" y="84" width="160" height="42" rx="4" fill="#E11D48" stroke="#FDA4AF" stroke-width="1.5"/>
            <text x="128" y="111" fill="#FFFFFF" font-size="15.5" font-weight="900">KOSPI</text>
            <text x="268" y="111" text-anchor="end" fill="#FFFFFF" font-size="17" font-weight="900">-5.2%</text>

            <!-- Bar 3: NIKKEI -5.1% -->
            <rect x="118" y="144" width="156" height="42" rx="4" fill="#F43F5E" stroke="#FECDD3" stroke-width="1.5"/>
            <text x="128" y="171" fill="#FFFFFF" font-size="15.5" font-weight="900">NIKKEI</text>
            <text x="264" y="171" text-anchor="end" fill="#FFFFFF" font-size="17" font-weight="900">-5.1%</text>
          </svg>
        </div>
        <div class="short-label"><span class="accent">Taipei -6.2%</span> · Seoul -5.2% · Tokyo -5.1%</div>
      </article>
    </section>

    <!-- ROW 2 -->
    <section class="grid-row">
      <!-- PANEL 4: EUROPE · DIPLOMACY -->
      <article class="panel">
        <div class="panel-kicker" style="border-top-color:#1D4ED8;">
          <span class="kicker-beat" style="color:#1D4ED8;">EUROPE · DIPLOMACY</span>
          <span class="kicker-loc">BRUSSELS</span>
        </div>
        <h2 class="headline">UK &amp; EU Seal 'Reset' Deal</h2>
        <div class="art-frame">
          <svg viewBox="0 0 316 212" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="uk-p4-clip">
                <circle cx="0" cy="0" r="39"/>
              </clipPath>
              <linearGradient id="channel-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#DBEAFE"/>
                <stop offset="100%" stop-color="#EFF6FF"/>
              </linearGradient>
            </defs>
            <rect width="316" height="212" fill="url(#channel-sky)"/>
            <!-- Subtle Westminster Big Ben silhouette on left bank & Brussels skyline on right bank -->
            <path d="M0,130 L12,130 L12,68 L18,48 L24,68 L24,104 L42,104 L42,130 Z" fill="#BFDBFE"/>
            <path d="M274,130 L274,98 L292,98 L292,72 L306,72 L306,130 L316,130 Z" fill="#BFDBFE"/>
            <!-- Blue English Channel waters -->
            <path d="M0,180 Q79,172 158,180 T316,180 L316,212 L0,212 Z" fill="#93C5FD"/>

            <!-- Grand Golden Stone Arch Bridge -->
            <path d="M22,120 Q158,38 294,120" fill="none" stroke="#B45309" stroke-width="13" stroke-linecap="round"/>
            <path d="M22,120 Q158,38 294,120" fill="none" stroke="#FACC15" stroke-width="6" stroke-linecap="round"/>
            <circle cx="158" cy="70" r="19" fill="#0F172A" stroke="#FACC15" stroke-width="3.5"/>
            <path d="M147,70 L169,70 M153,63 L163,63 M153,77 L163,77" stroke="#FEF08A" stroke-width="2.8" stroke-linecap="round"/>

            <!-- Left: Clipped Union Jack Roundel -->
            <g transform="translate(76, 62)">
              <g clip-path="url(#uk-p4-clip)">
                <rect x="-40" y="-40" width="80" height="80" fill="#1E3A8A"/>
                <path d="M-40,-40 L40,40 M-40,40 L40,-40" stroke="#FFFFFF" stroke-width="11"/>
                <path d="M-40,-40 L40,40 M-40,40 L40,-40" stroke="#DC2626" stroke-width="5.5"/>
                <path d="M-40,0 L40,0 M0,-40 L0,40" stroke="#FFFFFF" stroke-width="16"/>
                <path d="M-40,0 L40,0 M0,-40 L0,40" stroke="#DC2626" stroke-width="9"/>
              </g>
              <circle cx="0" cy="0" r="39" fill="none" stroke="#0F172A" stroke-width="3.8"/>
            </g>

            <!-- Right: EU 12-Gold-Star Roundel -->
            <g transform="translate(240, 62)">
              <circle cx="0" cy="0" r="39" fill="#1D4ED8" stroke="#FACC15" stroke-width="3.8"/>
              <circle cx="0" cy="-25" r="3.3" fill="#FACC15"/>
              <circle cx="12.5" cy="-21.6" r="3.3" fill="#FACC15"/>
              <circle cx="21.6" cy="-12.5" r="3.3" fill="#FACC15"/>
              <circle cx="25" cy="0" r="3.3" fill="#FACC15"/>
              <circle cx="21.6" cy="12.5" r="3.3" fill="#FACC15"/>
              <circle cx="12.5" cy="21.6" r="3.3" fill="#FACC15"/>
              <circle cx="0" cy="25" r="3.3" fill="#FACC15"/>
              <circle cx="-12.5" cy="21.6" r="3.3" fill="#FACC15"/>
              <circle cx="-21.6" cy="12.5" r="3.3" fill="#FACC15"/>
              <circle cx="-25" cy="0" r="3.3" fill="#FACC15"/>
              <circle cx="-21.6" cy="-12.5" r="3.3" fill="#FACC15"/>
              <circle cx="-12.5" cy="-21.6" r="3.3" fill="#FACC15"/>
            </g>

            <!-- 3 Large Clean Illustrated Medallions Below (Passport, Wheat Sheaf, Carbon Leaf) -->
            <!-- 1. Passport -->
            <g transform="translate(64, 158)">
              <circle cx="0" cy="0" r="34" fill="#FFFFFF" stroke="#1D4ED8" stroke-width="3.5"/>
              <rect x="-15" y="-20" width="30" height="40" rx="3.5" fill="#1E3A8A" stroke="#93C5FD" stroke-width="1.5"/>
              <circle cx="0" cy="-4" r="8" fill="none" stroke="#FACC15" stroke-width="2.2"/>
              <line x1="-8" y1="11" x2="8" y2="11" stroke="#FACC15" stroke-width="2.5"/>
            </g>

            <!-- 2. Golden Wheat Sheaf -->
            <g transform="translate(158, 158)">
              <circle cx="0" cy="0" r="34" fill="#FFFFFF" stroke="#047857" stroke-width="3.5"/>
              <line x1="0" y1="22" x2="0" y2="-20" stroke="#D97706" stroke-width="3.5" stroke-linecap="round"/>
              <ellipse cx="-8" cy="-12" rx="6.5" ry="3.5" transform="rotate(-30 -8 -12)" fill="#F59E0B"/>
              <ellipse cx="8" cy="-12" rx="6.5" ry="3.5" transform="rotate(30 8 -12)" fill="#F59E0B"/>
              <ellipse cx="-8" cy="-1" rx="6.5" ry="3.5" transform="rotate(-30 -8 -1)" fill="#F59E0B"/>
              <ellipse cx="8" cy="-1" rx="6.5" ry="3.5" transform="rotate(30 8 -1)" fill="#F59E0B"/>
              <ellipse cx="-7" cy="10" rx="6" ry="3.2" transform="rotate(-30 -7 10)" fill="#F59E0B"/>
              <ellipse cx="7" cy="10" rx="6" ry="3.2" transform="rotate(30 7 10)" fill="#F59E0B"/>
            </g>

            <!-- 3. Green Carbon Leaf -->
            <g transform="translate(252, 158)">
              <circle cx="0" cy="0" r="34" fill="#FFFFFF" stroke="#B45309" stroke-width="3.5"/>
              <circle cx="0" cy="0" r="23" fill="none" stroke="#16A34A" stroke-width="3" stroke-dasharray="22,7"/>
              <path d="M-12,12 C-12,-10 12,-15 15,-15 C15,-15 12,12 -12,12 Z" fill="#16A34A"/>
              <path d="M-12,12 L5,-5" stroke="#DCFCE7" stroke-width="2.5" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
        <div class="short-label">Youth Visas · Food Trade · Carbon Link</div>
      </article>

      <!-- PANEL 5: WORLD · CLIMATE — TÜRKIYE -->
      <article class="panel">
        <div class="panel-kicker" style="border-top-color:#0F766E;">
          <span class="kicker-beat" style="color:#0F766E;">WORLD · CLIMATE</span>
          <span class="kicker-loc">TÜRKIYE</span>
        </div>
        <h2 class="headline">COP31 Stalls on Final Day</h2>
        <div class="art-frame">
          <svg viewBox="0 0 316 212" xmlns="http://www.w3.org/2000/svg">
            <rect width="316" height="212" fill="#F0FDFA"/>
            <!-- Center Fulcrum: Shaded Earth Globe Encircled by Olive Branches -->
            <g transform="translate(158, 134)">
              <circle cx="0" cy="0" r="50" fill="#0284C7" stroke="#0F172A" stroke-width="3"/>
              <ellipse cx="0" cy="0" rx="26" ry="50" fill="none" stroke="#7DD3FC" stroke-width="1.3" opacity="0.75"/>
              <line x1="-50" y1="0" x2="50" y2="0" stroke="#7DD3FC" stroke-width="1.3" opacity="0.75"/>
              <line x1="-43" y1="-25" x2="43" y2="-25" stroke="#7DD3FC" stroke-width="1.3" opacity="0.75"/>
              <line x1="-43" y1="25" x2="43" y2="25" stroke="#7DD3FC" stroke-width="1.3" opacity="0.75"/>
              <path d="M-26,-26 Q-7,-35 7,-19 Q22,-7 5,24 Q-16,30 -28,5 Z" fill="#16A34A"/>
              <path d="M16,-26 Q38,-14 33,10 Q22,19 16,-2 Z" fill="#16A34A"/>
              <circle cx="0" cy="0" r="56" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="7,5"/>
            </g>

            <!-- Top Center: 11:59 Overtime Clock / Hourglass & Wooden Gavel -->
            <g transform="translate(158, 36)">
              <rect x="-54" y="-20" width="54" height="30" rx="4" fill="#0F172A" stroke="#EF4444" stroke-width="2"/>
              <text x="-27" y="1" text-anchor="middle" fill="#FEF08A" font-size="15.5" font-weight="900">11:59</text>
              <line x1="6" y1="2" x2="42" y2="-8" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
              <rect x="30" y="-22" width="16" height="26" rx="3" transform="rotate(-14 38 -9)" fill="#B45309" stroke="#451A03" stroke-width="2.2"/>
            </g>

            <!-- Heavy Brass Balance Beam & Suspension Chains -->
            <line x1="48" y1="78" x2="268" y2="104" stroke="#0F172A" stroke-width="7" stroke-linecap="round"/>
            <line x1="48" y1="78" x2="268" y2="104" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
            <line x1="34" y1="152" x2="52" y2="79" stroke="#475569" stroke-width="2.2"/>
            <line x1="76" y1="152" x2="52" y2="79" stroke="#475569" stroke-width="2.2"/>
            <line x1="238" y1="176" x2="262" y2="103" stroke="#475569" stroke-width="2.2"/>
            <line x1="284" y1="176" x2="262" y2="103" stroke="#475569" stroke-width="2.2"/>

            <!-- Left Pan: Industrial Smokestacks & Black Oil Barrel -->
            <g transform="translate(8, 152)">
              <path d="M2,0 L96,0 L86,14 L12,14 Z" fill="#D97706" stroke="#78350F" stroke-width="2.2"/>
              <circle cx="24" cy="-64" r="9.5" fill="#64748B"/>
              <circle cx="36" cy="-72" r="12" fill="#475569"/>
              <circle cx="50" cy="-62" r="9" fill="#64748B"/>
              <polygon points="14,0 19,-50 33,-50 38,0" fill="#334155" stroke="#0F172A" stroke-width="1.8"/>
              <rect x="18" y="-43" width="16" height="6" fill="#DC2626"/>
              <polygon points="39,0 43,-44 57,-44 61,0" fill="#334155" stroke="#0F172A" stroke-width="1.8"/>
              <rect x="42" y="-37" width="16" height="6" fill="#DC2626"/>
              <rect x="64" y="-38" width="26" height="38" rx="3.5" fill="#0F172A" stroke="#EF4444" stroke-width="2.2"/>
              <line x1="64" y1="-25" x2="90" y2="-25" stroke="#EF4444" stroke-width="2.2"/>
              <line x1="64" y1="-12" x2="90" y2="-12" stroke="#EF4444" stroke-width="2.2"/>
            </g>

            <!-- Right Pan: Sunlit Blue Solar Panel, White Wind Turbine & Gold $ Coin Stack -->
            <g transform="translate(212, 176)">
              <path d="M2,0 L96,0 L86,14 L12,14 Z" fill="#D97706" stroke="#78350F" stroke-width="2.2"/>
              <polygon points="6,0 18,-34 50,-34 40,0" fill="#0284C7" stroke="#E0F2FE" stroke-width="2.2"/>
              <line x1="29" y1="-34" x2="21" y2="0" stroke="#7DD3FC" stroke-width="1.4"/>
              <line x1="40" y1="-34" x2="32" y2="0" stroke="#7DD3FC" stroke-width="1.4"/>
              <line x1="12" y1="-17" x2="45" y2="-17" stroke="#7DD3FC" stroke-width="1.4"/>
              <line x1="56" y1="-54" x2="56" y2="0" stroke="#0F172A" stroke-width="3.5"/>
              <path d="M56,-54 L40,-68 M56,-54 L74,-63 M56,-54 L58,-34" stroke="#0F766E" stroke-width="3.5" stroke-linecap="round"/>
              <circle cx="56" cy="-54" r="3.5" fill="#FACC15"/>
              <circle cx="78" cy="-20" r="18" fill="#FACC15" stroke="#B45309" stroke-width="2.5"/>
              <text x="78" y="-13" text-anchor="middle" fill="#78350F" font-size="21" font-weight="900">$</text>
            </g>
          </svg>
        </div>
        <div class="short-label"><span class="accent">Antalya Deadlock</span> · Fossil Fuels vs. Finance</div>
      </article>

      <!-- PANEL 6: MIDDLE EAST · SECURITY -->
      <article class="panel">
        <div class="panel-kicker" style="border-top-color:#991B1B;">
          <span class="kicker-beat" style="color:#991B1B;">MIDDLE EAST · SECURITY</span>
          <span class="kicker-loc">OMAN</span>
        </div>
        <h2 class="headline">Hormuz Tanker Set Ablaze</h2>
        <div class="art-frame">
          <svg viewBox="0 0 316 212" xmlns="http://www.w3.org/2000/svg">
            <!-- Left 62%: Strait of Hormuz Headlands & Burning Supertanker -->
            <rect x="0" y="0" width="200" height="212" fill="#0369A1"/>
            <path d="M0,58 Q100,70 200,58 L200,212 L0,212 Z" fill="#075985"/>
            <!-- Rugged Iranian northern coastline -->
            <path d="M0,0 L200,0 L200,44 L164,34 L130,28 L98,44 L58,38 L28,28 L0,40 Z" fill="#D6D3D1" stroke="#57534E" stroke-width="2.2"/>
            <!-- Rugged ochre Musandam Peninsula (Khasab, Oman) -->
            <path d="M14,212 L68,176 L104,136 L120,126 L134,136 L154,178 L188,212 Z" fill="#FDE68A" stroke="#B45309" stroke-width="2.5"/>
            <circle cx="118" cy="148" r="6" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>

            <!-- Dark Oil Supertanker Silhouette on Water with Roaring Orange Flames & Towering Smoke -->
            <g transform="translate(32, 84)">
              <path d="M56,16 C40,-20 70,-42 52,-76 C80,-58 96,-20 76,16 Z" fill="#1E293B" opacity="0.92"/>
              <circle cx="64" cy="-24" r="16" fill="#334155"/>
              <polygon points="0,24 122,24 108,44 14,44" fill="#1E293B" stroke="#E2E8F0" stroke-width="2"/>
              <rect x="18" y="14" width="14" height="10" fill="#64748B"/>
              <rect x="86" y="4" width="18" height="20" fill="#F8FAFC" stroke="#475569" stroke-width="1.5"/>
              <circle cx="56" cy="12" r="23" fill="#DC2626" opacity="0.92"/>
              <polygon points="56,-19 64,-1 82,-4 69,12 80,27 56,22 36,27 44,12 31,-4 48,-1" fill="#F97316"/>
              <circle cx="56" cy="12" r="9.5" fill="#FEF08A"/>
            </g>

            <line x1="200" y1="0" x2="200" y2="212" stroke="#0F172A" stroke-width="3"/>

            <!-- Right 38%: Smoky Horizon & Crisp White UN Humanitarian Relief Tent Emblem -->
            <rect x="201" y="0" width="115" height="212" fill="#1E293B"/>
            <path d="M201,124 Q230,106 260,118 T316,112 L316,212 L201,212 Z" fill="#334155"/>
            <circle cx="234" cy="48" r="22" fill="#475569" opacity="0.6"/>
            <circle cx="258" cy="38" r="26" fill="#475569" opacity="0.5"/>

            <g transform="translate(258, 114)">
              <circle cx="0" cy="0" r="45" fill="#0284C7" stroke="#FFFFFF" stroke-width="3.5"/>
              <polygon points="0,-28 -30,14 30,14" fill="#FFFFFF" stroke="#0F172A" stroke-width="2" stroke-linejoin="round"/>
              <polygon points="0,-7 -9,14 9,14" fill="#0369A1"/>
              <path d="M0,-21 L0,-11 M-5,-16 L5,-16" stroke="#DC2626" stroke-width="3.5" stroke-linecap="round"/>
              <path d="M-27,21 Q0,37 27,21" fill="none" stroke="#FEF08A" stroke-width="3.5" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
        <div class="short-label"><span class="accent">Blast Off Oman</span> · UN Gaza &amp; Lebanon Alert</div>
      </article>
    </section>

    <!-- ROW 3 -->
    <section class="grid-row" style="border-bottom:none;">
      <!-- PANEL 7: AFRICA · DIPLOMACY & AID -->
      <article class="panel">
        <div class="panel-kicker" style="border-top-color:#B45309;">
          <span class="kicker-beat" style="color:#B45309;">AFRICA · DIPLOMACY &amp; AID</span>
          <span class="kicker-loc">DRC</span>
        </div>
        <h2 class="headline">Dakar Pact; DRC Water Cut</h2>
        <div class="art-frame">
          <svg viewBox="0 0 316 212" xmlns="http://www.w3.org/2000/svg">
            <!-- Left Half: Radiant Royal-Blue & Gold 16-Star West African Summit Seal & Clasped Hands -->
            <rect x="0" y="0" width="156" height="212" fill="#EFF6FF"/>
            <g transform="translate(78, 92)">
              <circle cx="0" cy="0" r="58" fill="#1E3A8A" stroke="#F59E0B" stroke-width="3.5"/>
              <!-- 16 Gold Stars Ring -->
              <circle cx="0" cy="-45" r="3.5" fill="#FACC15"/>
              <circle cx="17.2" cy="-41.6" r="3.5" fill="#FACC15"/>
              <circle cx="31.8" cy="-31.8" r="3.5" fill="#FACC15"/>
              <circle cx="41.6" cy="-17.2" r="3.5" fill="#FACC15"/>
              <circle cx="45" cy="0" r="3.5" fill="#FACC15"/>
              <circle cx="41.6" cy="17.2" r="3.5" fill="#FACC15"/>
              <circle cx="31.8" cy="31.8" r="3.5" fill="#FACC15"/>
              <circle cx="17.2" cy="41.6" r="3.5" fill="#FACC15"/>
              <circle cx="0" cy="45" r="3.5" fill="#FACC15"/>
              <circle cx="-17.2" cy="41.6" r="3.5" fill="#FACC15"/>
              <circle cx="-31.8" cy="31.8" r="3.5" fill="#FACC15"/>
              <circle cx="-41.6" cy="17.2" r="3.5" fill="#FACC15"/>
              <circle cx="-45" cy="0" r="3.5" fill="#FACC15"/>
              <circle cx="-41.6" cy="-17.2" r="3.5" fill="#FACC15"/>
              <circle cx="-31.8" cy="-31.8" r="3.5" fill="#FACC15"/>
              <circle cx="-17.2" cy="-41.6" r="3.5" fill="#FACC15"/>
              <!-- Clasped Treaty Arch & Bold 16 -->
              <path d="M-28,12 Q0,-16 28,12" fill="none" stroke="#38BDF8" stroke-width="5" stroke-linecap="round"/>
              <text x="0" y="14" text-anchor="middle" fill="#FFFFFF" font-size="26" font-weight="900">16</text>
            </g>
            <text x="78" y="186" text-anchor="middle" fill="#1E3A8A" font-size="15.5" font-weight="900">DAKAR PACT</text>

            <line x1="157" y1="0" x2="157" y2="212" stroke="#0F172A" stroke-width="3"/>

            <!-- Right Half: Arid Red-Ochre Displaced Camp Scene — Tall Brass Standpipe, Slashed Water Drop & Empty Yellow Jerrycan (76K) -->
            <rect x="158" y="0" width="158" height="212" fill="#FEF2F2"/>
            <!-- Tall Brass Standpipe & Spigot -->
            <path d="M180,158 L180,34 L224,34 L224,52" fill="none" stroke="#B45309" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="208" y1="20" x2="238" y2="20" stroke="#D97706" stroke-width="5.5" stroke-linecap="round"/>
            <line x1="223" y1="20" x2="223" y2="34" stroke="#D97706" stroke-width="5.5"/>

            <!-- Slashed Water Droplet Medallion Below Spigot -->
            <g transform="translate(224, 92)">
              <circle cx="0" cy="0" r="28" fill="#991B1B" stroke="#FCA5A5" stroke-width="2.5"/>
              <path d="M0,-17 C0,-17 -14,0 -14,9 C-14,16.7 -7.7,22 0,22 C7.7,22 14,16.7 14,9 C14,0 0,-17 0,-17 Z" fill="#38BDF8"/>
              <line x1="-20" y1="19" x2="20" y2="-19" stroke="#EF4444" stroke-width="5.5" stroke-linecap="round"/>
            </g>

            <!-- Empty Yellow Water Jerrycan -->
            <g transform="translate(264, 92)">
              <rect x="0" y="10" width="36" height="48" rx="4" fill="#FACC15" stroke="#78350F" stroke-width="2.5"/>
              <rect x="4" y="2" width="11" height="8" fill="#DC2626" stroke="#78350F" stroke-width="1.6"/>
              <path d="M20,10 L20,3 L32,3 L32,10" fill="none" stroke="#78350F" stroke-width="2.5"/>
              <line x1="7" y1="22" x2="29" y2="46" stroke="#B45309" stroke-width="2.5"/>
              <line x1="29" y1="22" x2="7" y2="46" stroke="#B45309" stroke-width="2.5"/>
            </g>
            <text x="237" y="186" text-anchor="middle" fill="#991B1B" font-size="16" font-weight="900">76K NO WATER</text>
          </svg>
        </div>
        <div class="short-label">16-State Migration Deal · <span class="accent">76K Dry in Ituri</span></div>
      </article>

      <!-- PANEL 8: AMERICAS · HEALTH & SUMMIT -->
      <article class="panel">
        <div class="panel-kicker" style="border-top-color:#BE123C;">
          <span class="kicker-beat" style="color:#BE123C;">AMERICAS · HEALTH</span>
          <span class="kicker-loc">PAHO</span>
        </div>
        <h2 class="headline">Measles-Free Status Lost</h2>
        <div class="art-frame">
          <svg viewBox="0 0 316 212" xmlns="http://www.w3.org/2000/svg">
            <rect width="316" height="212" fill="#FFF1F2"/>
            <!-- Left: Bold Red-and-White PAHO Health Shield with Diagonal Revocation Slash + Vaccine Syringe -->
            <g transform="translate(64, 88)">
              <path d="M-42,-52 L42,-52 L42,6 C42,40 0,58 0,58 C0,58 -42,40 -42,6 Z" fill="#DC2626" stroke="#7F1D1D" stroke-width="3.5" stroke-linejoin="round"/>
              <path d="M-30,-40 L30,-40 L30,3 C30,28 0,41 0,41 C0,41 -30,28 -30,3 Z" fill="#FFFFFF"/>
              <path d="M0,-24 L0,16 M-20,-4 L20,-4" stroke="#DC2626" stroke-width="10" stroke-linecap="round"/>
              <line x1="-38" y1="36" x2="38" y2="-40" stroke="#0F172A" stroke-width="6" stroke-linecap="round"/>
            </g>

            <!-- Angled Vaccine Syringe -->
            <g transform="translate(128, 72) rotate(28)">
              <rect x="-7" y="-26" width="14" height="40" rx="2" fill="#E0F2FE" stroke="#0F172A" stroke-width="2.2"/>
              <rect x="-7" y="-6" width="14" height="20" fill="#38BDF8"/>
              <line x1="0" y1="-39" x2="0" y2="-26" stroke="#0F172A" stroke-width="3"/>
              <line x1="-9" y1="-39" x2="9" y2="-39" stroke="#0F172A" stroke-width="3"/>
              <line x1="0" y1="14" x2="0" y2="33" stroke="#475569" stroke-width="2.5"/>
            </g>
            <text x="72" y="186" text-anchor="middle" fill="#9F1239" font-size="16" font-weight="900">REVOKED</text>

            <!-- Right: Steep Glowing Crimson 12-Month Outbreak Curve Chart (US · MEX · BOL) -->
            <g transform="translate(148, 16)">
              <rect x="0" y="0" width="156" height="180" rx="6" fill="#FFFFFF" stroke="#BE123C" stroke-width="2.5"/>
              <line x1="14" y1="45" x2="142" y2="45" stroke="#FCE7F3" stroke-width="1.5"/>
              <line x1="14" y1="88" x2="142" y2="88" stroke="#FCE7F3" stroke-width="1.5"/>
              <line x1="14" y1="131" x2="142" y2="131" stroke="#FCE7F3" stroke-width="1.5"/>
              <text x="78" y="30" text-anchor="middle" fill="#881337" font-size="14.5" font-weight="900">12+ MO. SPREAD</text>

              <path d="M16,138 Q58,128 92,88 T138,44 L138,142 L16,142 Z" fill="#FFE4E6"/>
              <path d="M16,138 Q58,128 92,88 T138,44" fill="none" stroke="#DC2626" stroke-width="6" stroke-linecap="round"/>
              <circle cx="54" cy="124" r="5.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
              <circle cx="96" cy="82" r="6" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
              <circle cx="138" cy="44" r="7.5" fill="#DC2626" stroke="#FEF08A" stroke-width="2.5"/>

              <text x="78" y="166" text-anchor="middle" fill="#BE123C" font-size="15" font-weight="900">US · MEX · BOL</text>
            </g>
          </svg>
        </div>
        <div class="short-label"><span class="accent">US, Mexico &amp; Bolivia</span> · Cap Cana Summit</div>
      </article>

      <!-- PANEL 9: SPACE, SCIENCE & SPORT -->
      <article class="panel">
        <div class="panel-kicker" style="border-top-color:#4338CA;">
          <span class="kicker-beat" style="color:#4338CA;">SPACE, SCIENCE &amp; SPORT</span>
          <span class="kicker-loc">GLOBAL</span>
        </div>
        <h2 class="headline">ISS, Mercury &amp; ATP Semis</h2>
        <div class="art-frame">
          <svg viewBox="0 0 316 212" xmlns="http://www.w3.org/2000/svg">
            <!-- Top 58% (122px): Deep Cosmos — ISS + SpaceX Dragon + BepiColombo at Cratered Mercury -->
            <rect x="0" y="0" width="316" height="122" fill="#090D16"/>
            <circle cx="18" cy="14" r="1.5" fill="#FFFFFF"/>
            <circle cx="132" cy="12" r="1.6" fill="#93C5FD"/>
            <circle cx="296" cy="16" r="1.5" fill="#FFFFFF"/>
            <circle cx="154" cy="106" r="1.5" fill="#FEF08A"/>

            <!-- Top-Left: Golden ISS Solar Arrays + White SpaceX Dragon Capsule + Red 3D Vascular Medallion -->
            <g transform="translate(8, 8)">
              <line x1="6" y1="36" x2="94" y2="36" stroke="#CBD5E1" stroke-width="4.5"/>
              <rect x="38" y="24" width="22" height="24" rx="3" fill="#F8FAFC" stroke="#475569" stroke-width="1.2"/>
              <rect x="10" y="4" width="16" height="26" fill="#D97706" stroke="#FDE047" stroke-width="1.6"/>
              <rect x="10" y="42" width="16" height="26" fill="#D97706" stroke="#FDE047" stroke-width="1.6"/>
              <rect x="72" y="4" width="16" height="26" fill="#D97706" stroke="#FDE047" stroke-width="1.6"/>
              <rect x="72" y="42" width="16" height="26" fill="#D97706" stroke="#FDE047" stroke-width="1.6"/>

              <path d="M96,36 L114,36" stroke="#38BDF8" stroke-width="3" stroke-dasharray="4,2"/>
              <path d="M118,24 C132,24 142,29 142,36 C142,43 132,48 118,48 L110,44 L110,28 Z" fill="#FFFFFF" stroke="#38BDF8" stroke-width="1.8"/>
              <rect x="105" y="19" width="5" height="34" rx="1" fill="#0284C7"/>
              <!-- Red 3D-Bioprinted Blood Vessel Medallion -->
              <g transform="translate(126, 84)">
                <circle cx="0" cy="0" r="19" fill="#1E1B4B" stroke="#F43F5E" stroke-width="2.2"/>
                <path d="M-11,0 L2,0 M-3,0 Q3,-10 11,-11 M-3,0 Q3,10 11,11 M3,-6 L11,-4" fill="none" stroke="#FB7185" stroke-width="3" stroke-linecap="round"/>
              </g>
            </g>

            <!-- Top-Right: Winged BepiColombo Sweeping Cyan X-Ray Beam Across Cratered Mercury Crescent -->
            <g transform="translate(154, 6)">
              <polygon points="48,54 118,16 118,96" fill="#22D3EE" opacity="0.38"/>
              <line x1="48" y1="54" x2="118" y2="30" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4,2"/>
              <line x1="48" y1="54" x2="118" y2="78" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4,2"/>

              <g transform="translate(42, 54) rotate(-14)">
                <polygon points="-36,-6 -11,-4 -11,4 -36,6" fill="#0284C7" stroke="#7DD3FC" stroke-width="1.5"/>
                <polygon points="11,-4 36,-6 36,6 11,4" fill="#0284C7" stroke="#7DD3FC" stroke-width="1.5"/>
                <rect x="-11" y="-9.5" width="22" height="19" rx="3" fill="#FACC15" stroke="#FFFFFF" stroke-width="1.8"/>
                <circle cx="0" cy="0" r="4.2" fill="#0F172A"/>
              </g>

              <circle cx="126" cy="56" r="34" fill="#475569" stroke="#CBD5E1" stroke-width="2.5"/>
              <path d="M126,22 A34,34 0 0,0 126,90 A22,34 0 0,1 126,22 Z" fill="#CBD5E1"/>
              <circle cx="114" cy="42" r="6" fill="#64748B" stroke="#94A3B8" stroke-width="1.2"/>
              <circle cx="138" cy="62" r="7.5" fill="#334155" stroke="#64748B" stroke-width="1.2"/>
              <circle cx="118" cy="72" r="4.8" fill="#64748B"/>
            </g>

            <line x1="0" y1="122" x2="316" y2="122" stroke="#F8FAFC" stroke-width="2.5"/>

            <!-- Bottom 42% (90px): Left EU Youth March Placards | Right Blue Turin ATP Tennis Court & Trophy -->
            <!-- Bottom-Left: EU Youth March -->
            <rect x="0" y="123" width="144" height="89" fill="#EFF6FF"/>
            <g transform="translate(14, 130) rotate(-4)">
              <rect x="0" y="0" width="46" height="34" rx="3.5" fill="#FEF08A" stroke="#0F172A" stroke-width="2"/>
              <polygon points="23,5 9,17 13,17 13,29 33,29 33,17 37,17" fill="#DC2626"/>
              <line x1="23" y1="34" x2="23" y2="68" stroke="#0F172A" stroke-width="3.5"/>
            </g>
            <g transform="translate(76, 132) rotate(5)">
              <rect x="0" y="0" width="46" height="34" rx="3.5" fill="#FCA5A5" stroke="#7F1D1D" stroke-width="2"/>
              <text x="23" y="25" text-anchor="middle" fill="#7F1D1D" font-size="23" font-weight="900">€</text>
              <line x1="23" y1="34" x2="23" y2="68" stroke="#0F172A" stroke-width="3.5"/>
            </g>
            <g fill="#0F172A">
              <circle cx="36" cy="192" r="8"/><path d="M22,212 C22,198 50,198 50,212 Z"/>
              <circle cx="74" cy="190" r="8.5"/><path d="M58,212 C58,196 90,196 90,212 Z"/>
              <circle cx="110" cy="193" r="8"/><path d="M96,212 C96,198 124,198 124,212 Z"/>
            </g>

            <line x1="144" y1="123" x2="144" y2="212" stroke="#0F172A" stroke-width="2.5"/>

            <!-- Bottom-Right: Blue Turin ATP Tennis Court, Net, Arcing Yellow Ball & Gold Trophy -->
            <rect x="145" y="123" width="171" height="89" fill="#0F172A"/>
            <!-- Gold ATP Trophy at Top Left of Tennis Panel -->
            <g transform="translate(162, 138)">
              <path d="M-8,-8 L8,-8 L6,2 C6,7 0,9 0,9 C0,9 -6,7 -6,2 Z" fill="#FACC15" stroke="#FEF08A" stroke-width="1.2"/>
              <rect x="-3" y="9" width="6" height="3" fill="#D97706"/>
              <rect x="-7" y="12" width="14" height="3" rx="1" fill="#FACC15"/>
            </g>
            <polygon points="180,136 294,136 308,204 166,204" fill="#2563EB" stroke="#FFFFFF" stroke-width="2.2"/>
            <line x1="174" y1="160" x2="300" y2="160" stroke="#E0F2FE" stroke-width="1.6"/>
            <line x1="169" y1="186" x2="305" y2="186" stroke="#E0F2FE" stroke-width="1.6"/>
            <line x1="237" y1="136" x2="237" y2="204" stroke="#FFFFFF" stroke-width="1.8"/>
            <line x1="168" y1="170" x2="306" y2="170" stroke="#FEF08A" stroke-width="2.4" stroke-dasharray="4,2"/>
            <path d="M188,194 Q224,140 270,158" fill="none" stroke="#FEF08A" stroke-width="3.2" stroke-dasharray="5,3"/>
            <circle cx="270" cy="158" r="10.5" fill="#EAB308" stroke="#FFFFFF" stroke-width="2.2"/>
          </svg>
        </div>
        <div class="short-label">Dragon Bio-Lab · BepiColombo · <span class="accent" style="color:#1D4ED8;">Alcaraz Wins</span></div>
      </article>
    </section>

    <!-- BOTTOM BROADSHEET DATELINE BAR (13px BOLD) -->
    <footer class="footer">
      <div class="legend">
        <span class="legend-item"><span class="dot" style="background:#EF4444;"></span>EUROPE</span>
        <span class="legend-item"><span class="dot" style="background:#F97316;"></span>SOUTH ASIA</span>
        <span class="legend-item"><span class="dot" style="background:#3B82F6;"></span>EAST ASIA</span>
        <span class="legend-item"><span class="dot" style="background:#14B8A6;"></span>CLIMATE</span>
        <span class="legend-item"><span class="dot" style="background:#DC2626;"></span>MIDEAST</span>
        <span class="legend-item"><span class="dot" style="background:#F59E0B;"></span>AFRICA</span>
        <span class="legend-item"><span class="dot" style="background:#EC4899;"></span>AMERICAS</span>
        <span class="legend-item"><span class="dot" style="background:#818CF8;"></span>SPACE &amp; SPORT</span>
      </div>
      <div>20 NOV 2026</div>
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
        const panels = Array.from(document.querySelectorAll('.panel'));
        const panelChecks = panels.map((c, idx) => {
          const r = c.getBoundingClientRect();
          const h = c.querySelector('.headline');
          const s = c.querySelector('.short-label');
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
            panel: idx + 1,
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            artHeight: Math.round(svgRect.height * 10) / 10,
            panelOverflowY: c.scrollHeight > c.clientHeight + 1,
            panelOverflowX: c.scrollWidth > c.clientWidth + 1,
            headlineOverflow: h ? h.scrollWidth > h.clientWidth + 1 : false,
            shortLabelOverflow: s ? s.scrollWidth > s.clientWidth + 1 : false,
            svgTextIssues,
          };
        });
        return {
          scrollWidth: root.scrollWidth,
          scrollHeight: root.scrollHeight,
          panelChecks,
        };
      })()`,
    });

    const audit = auditResult.result.value;
    console.log("DOM Audit:", JSON.stringify(audit, null, 2));

    if (audit.scrollWidth > 1024 || audit.scrollHeight > 1024) {
      throw new Error(`Viewport overflow: ${audit.scrollWidth}x${audit.scrollHeight}`);
    }
    for (const c of audit.panelChecks) {
      if (
        c.panelOverflowX ||
        c.panelOverflowY ||
        c.headlineOverflow ||
        c.shortLabelOverflow ||
        c.svgTextIssues.length > 0
      ) {
        throw new Error(`Panel overflow detected in panel ${c.panel}: ${JSON.stringify(c)}`);
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
