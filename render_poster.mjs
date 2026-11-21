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
    background: #FAF7F0;
    color: #0F172A;
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 10px 12px;
    display: grid;
    grid-template-rows: 74px 312px 282px 282px 26px;
    gap: 7px;
    background: #FAF7F0;
    border: 3px solid #0F172A;
    position: relative;
  }

  /* MASTHEAD */
  .masthead {
    display: grid;
    grid-template-columns: 236px 1fr 262px;
    align-items: center;
    background: #0F172A;
    color: #FAF7F0;
    border-radius: 4px;
    padding: 6px 12px;
    border-bottom: 4px solid #B91C1C;
    gap: 10px;
  }
  .mast-left {
    display: flex;
    flex-direction: column;
    gap: 3px;
    border-right: 1px solid #334155;
    padding-right: 10px;
  }
  .mast-kicker {
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 1.1px;
    color: #F87171;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .mast-edition {
    font-size: 10.6px;
    font-weight: 800;
    color: #F8FAFC;
    letter-spacing: 0.25px;
    white-space: nowrap;
  }
  .mast-sub {
    font-size: 9.5px;
    font-weight: 700;
    color: #94A3B8;
    letter-spacing: 0.25px;
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
    font-size: 30px;
    font-weight: 900;
    letter-spacing: 1px;
    color: #FFFFFF;
    line-height: 1.05;
    text-transform: uppercase;
  }
  .mast-deck {
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 1.4px;
    color: #FCD34D;
    text-transform: uppercase;
  }
  .mast-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 3px;
  }
  .date-banner {
    background: #B91C1C;
    color: #FFFFFF;
    font-size: 14.5px;
    font-weight: 900;
    letter-spacing: 0.8px;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1.5px solid #FCA5A5;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .date-meta {
    font-size: 9.5px;
    font-weight: 700;
    color: #CBD5E1;
    letter-spacing: 0.5px;
  }

  /* GRID ROWS */
  .row-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    height: 100%;
  }
  .row-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    height: 100%;
  }

  /* CARDS */
  .card {
    background: #FFFFFF;
    border: 1.5px solid #1E293B;
    border-radius: 5px;
    padding: 6px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    box-shadow: 0 1px 0 rgba(15, 23, 42, 0.08);
  }
  .card.hero {
    border-top: 4px solid #B91C1C;
    background: #FFFDF9;
  }
  .card.hero-2 {
    border-top: 4px solid #C2410C;
    background: #FFFDF9;
  }
  .card.hero-3 {
    border-top: 4px solid #1E3A8A;
    background: #FFFDF9;
  }
  .card.row2-1 { border-top: 3.5px solid #1D4ED8; }
  .card.row2-2 { border-top: 3.5px solid #0F766E; }
  .card.row2-3 { border-top: 3.5px solid #991B1B; }
  .card.row3-1 { border-top: 3.5px solid #B45309; }
  .card.row3-2 { border-top: 3.5px solid #BE123C; }
  .card.row3-3 { border-top: 3.5px solid #4338CA; }
  .card.row3-4 { border-top: 3.5px solid #047857; }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    height: 20px;
    flex-shrink: 0;
  }
  .tag-group {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .story-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 17px;
    height: 17px;
    border-radius: 3px;
    background: #0F172A;
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 900;
  }
  .beat-pill {
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 0.4px;
    padding: 2px 6px;
    border-radius: 3px;
    color: #FFFFFF;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .loc-label {
    font-size: 9.5px;
    font-weight: 800;
    color: #334155;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .row-4 .beat-pill {
    font-size: 8.3px;
    padding: 2px 4px;
    letter-spacing: 0.15px;
  }
  .row-4 .loc-label {
    font-size: 8.3px;
    letter-spacing: 0.15px;
  }

  .headline {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 18px;
    font-weight: 900;
    color: #0F172A;
    line-height: 1.12;
    letter-spacing: -0.2px;
    margin: 2px 0 3px 0;
    white-space: nowrap;
    overflow: hidden;
    flex-shrink: 0;
  }
  .row-4 .headline {
    font-size: 15.2px;
    letter-spacing: -0.3px;
  }

  .art-box {
    width: 100%;
    flex: 1;
    min-height: 0;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #94A3B8;
    background: #F8FAFC;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .art-box svg {
    width: 100%;
    height: 100%;
    display: block;
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
  }

  .subtext {
    font-size: 11px;
    font-weight: 600;
    color: #1E293B;
    line-height: 1.26;
    margin-top: 4px;
    flex-shrink: 0;
  }
  .row-4 .subtext {
    font-size: 10.4px;
    line-height: 1.24;
  }
  .subtext strong {
    color: #0F172A;
    font-weight: 800;
  }

  /* FOOTER */
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0F172A;
    color: #F8FAFC;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 9.5px;
    font-weight: 700;
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
    gap: 4px;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    display: inline-block;
  }
</style>
</head>
<body>
  <div class="page">
    <!-- MASTHEAD -->
    <header class="masthead">
      <div class="mast-left">
        <div class="mast-kicker">WORLD NEWS BROADSHEET</div>
        <div class="mast-edition">10 STORIES · 6 CONTINENTS · 9 BEATS</div>
        <div class="mast-sub">VERIFIED DISPATCHES · 00:00–24:00 UTC</div>
      </div>
      <div class="mast-center">
        <div class="mast-title">THE WORLD IN ONE DAY</div>
        <div class="mast-deck">GLOBAL EDITION · DAILY VISUAL SUMMARY</div>
      </div>
      <div class="mast-right">
        <div class="date-banner">FRIDAY · 20 NOVEMBER 2026</div>
        <div class="date-meta">ISSUE 2026-11-20 · ALL REGIONS &amp; BEATS</div>
      </div>
    </header>

    <!-- ROW 1: 3 HERO CARDS -->
    <section class="row-3">
      <!-- STORY 1: KYIV & POLAND -->
      <article class="card hero">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">1</span>
            <span class="beat-pill" style="background:#B91C1C;">EUROPE · WAR</span>
          </div>
          <span class="loc-label">KYIV &amp; POLAND</span>
        </div>
        <h2 class="headline">3 Kyiv Bridges Hit in Mass Raid</h2>
        <div class="art-box">
          <svg viewBox="0 0 306 196" xmlns="http://www.w3.org/2000/svg">
            <!-- Night sky over Kyiv -->
            <rect width="306" height="196" fill="#0F172A"/>
            <!-- Subtle air-defense searchlights -->
            <polygon points="36,118 76,6 92,6" fill="#1E293B" opacity="0.65"/>
            <polygon points="154,118 118,6 134,6" fill="#1E293B" opacity="0.65"/>
            <!-- Darkened Kyiv skyline silhouette -->
            <path d="M0,114 L18,114 L18,88 L28,88 L28,104 L42,104 L42,74 L48,58 L54,74 L54,108 L76,108 L76,84 L96,84 L96,110 L118,110 L118,80 L123,64 L128,80 L128,112 L156,112 L156,90 L176,90 L176,114 L306,114 L306,126 L0,126 Z" fill="#1E293B"/>
            <!-- Unlit blackout apartment grid -->
            <rect x="79" y="89" width="4" height="5" fill="#334155"/>
            <rect x="87" y="89" width="4" height="5" fill="#334155"/>
            <rect x="79" y="98" width="4" height="5" fill="#334155"/>
            <rect x="87" y="98" width="4" height="5" fill="#334155"/>
            <rect x="160" y="95" width="5" height="6" fill="#334155"/>
            <rect x="168" y="95" width="5" height="6" fill="#334155"/>
            <!-- Dnieper River water -->
            <rect x="0" y="122" width="306" height="74" fill="#0C4A6E"/>
            <path d="M0,136 Q75,131 150,136 T306,136 L306,196 L0,196 Z" fill="#075985"/>
            <text x="153" y="189" text-anchor="middle" fill="#7DD3FC" font-size="9.2" font-weight="900" letter-spacing="1.1">DNIEPER RIVER · 3 KYIV BRIDGES STRUCK</text>

            <!-- Incoming red missile trajectory arcs -->
            <path d="M22,52 Q42,80 55,126" fill="none" stroke="#EF4444" stroke-width="2.2" stroke-dasharray="4,2"/>
            <path d="M108,52 Q128,82 143,130" fill="none" stroke="#EF4444" stroke-width="2.2" stroke-dasharray="4,2"/>
            <path d="M178,52 Q204,84 228,134" fill="none" stroke="#EF4444" stroke-width="2.2" stroke-dasharray="4,2"/>

            <!-- 3 Arched Bridges across the Dnieper -->
            <!-- Bridge 1 -->
            <path d="M16,142 Q55,112 94,142" fill="none" stroke="#94A3B8" stroke-width="5"/>
            <line x1="12" y1="130" x2="98" y2="130" stroke="#E2E8F0" stroke-width="3.5"/>
            <line x1="34" y1="130" x2="34" y2="148" stroke="#94A3B8" stroke-width="3"/>
            <line x1="76" y1="130" x2="76" y2="148" stroke="#94A3B8" stroke-width="3"/>
            <!-- Bridge 2 -->
            <path d="M104,146 Q143,116 182,146" fill="none" stroke="#94A3B8" stroke-width="5"/>
            <line x1="100" y1="134" x2="186" y2="134" stroke="#E2E8F0" stroke-width="3.5"/>
            <line x1="122" y1="134" x2="122" y2="152" stroke="#94A3B8" stroke-width="3"/>
            <line x1="164" y1="134" x2="164" y2="152" stroke="#94A3B8" stroke-width="3"/>
            <!-- Bridge 3 -->
            <path d="M192,150 Q231,120 270,150" fill="none" stroke="#94A3B8" stroke-width="5"/>
            <line x1="188" y1="138" x2="274" y2="138" stroke="#E2E8F0" stroke-width="3.5"/>
            <line x1="210" y1="138" x2="210" y2="156" stroke="#94A3B8" stroke-width="3"/>
            <line x1="252" y1="138" x2="252" y2="156" stroke="#94A3B8" stroke-width="3"/>

            <!-- 3 Impact Blast Plumes + Shockwaves on the 3 Bridges -->
            <circle cx="55" cy="126" r="20" fill="none" stroke="#F97316" stroke-width="1.2" opacity="0.7"/>
            <circle cx="55" cy="126" r="15" fill="#DC2626" opacity="0.9"/>
            <circle cx="55" cy="126" r="9.5" fill="#F97316"/>
            <circle cx="55" cy="126" r="4.8" fill="#FEF08A"/>

            <circle cx="143" cy="130" r="21" fill="none" stroke="#F97316" stroke-width="1.2" opacity="0.7"/>
            <circle cx="143" cy="130" r="16" fill="#DC2626" opacity="0.9"/>
            <circle cx="143" cy="130" r="10.5" fill="#F97316"/>
            <circle cx="143" cy="130" r="5.2" fill="#FEF08A"/>

            <circle cx="228" cy="134" r="19" fill="none" stroke="#F97316" stroke-width="1.2" opacity="0.7"/>
            <circle cx="228" cy="134" r="14.5" fill="#DC2626" opacity="0.9"/>
            <circle cx="228" cy="134" r="9" fill="#F97316"/>
            <circle cx="228" cy="134" r="4.5" fill="#FEF08A"/>

            <!-- Bridge labels -->
            <rect x="31" y="153" width="48" height="14" rx="2" fill="#7F1D1D" stroke="#FCA5A5" stroke-width="1"/>
            <text x="55" y="163" text-anchor="middle" fill="#FFFFFF" font-size="8.2" font-weight="900">BRIDGE 1</text>
            <rect x="119" y="157" width="48" height="14" rx="2" fill="#7F1D1D" stroke="#FCA5A5" stroke-width="1"/>
            <text x="143" y="167" text-anchor="middle" fill="#FFFFFF" font-size="8.2" font-weight="900">BRIDGE 2</text>
            <rect x="204" y="161" width="48" height="14" rx="2" fill="#7F1D1D" stroke="#FCA5A5" stroke-width="1"/>
            <text x="228" y="171" text-anchor="middle" fill="#FFFFFF" font-size="8.2" font-weight="900">BRIDGE 3</text>

            <!-- Top-left Raid Stats Badge -->
            <rect x="6" y="6" width="184" height="44" rx="4" fill="#991B1B" stroke="#FCA5A5" stroke-width="1.5"/>
            <text x="98" y="22" text-anchor="middle" fill="#FEF08A" font-size="11.2" font-weight="900">110 MISSILES · 400 DRONES</text>
            <text x="98" y="38" text-anchor="middle" fill="#FFFFFF" font-size="9.8" font-weight="800">9 KILLED · POWER &amp; WATER CUT</text>

            <!-- Blackout / Water Cut Pill -->
            <rect x="6" y="55" width="154" height="20" rx="3" fill="#1E293B" stroke="#F59E0B" stroke-width="1.2"/>
            <text x="83" y="68" text-anchor="middle" fill="#FDE68A" font-size="9.2" font-weight="900">KYIV POWER &amp; WATER OUT</text>

            <!-- Top-Right Poland NATO Radar Inset -->
            <rect x="198" y="6" width="102" height="84" rx="4" fill="#064E3B" stroke="#34D399" stroke-width="1.5"/>
            <text x="249" y="19" text-anchor="middle" fill="#A7F3D0" font-size="8.8" font-weight="900">POLAND AIRSPACE</text>
            <circle cx="249" cy="48" r="20" fill="#022C22" stroke="#10B981" stroke-width="1.2"/>
            <circle cx="249" cy="48" r="11" fill="none" stroke="#059669" stroke-width="0.8" stroke-dasharray="2,2"/>
            <line x1="249" y1="28" x2="249" y2="68" stroke="#059669" stroke-width="0.8"/>
            <line x1="229" y1="48" x2="269" y2="48" stroke="#059669" stroke-width="0.8"/>
            <path d="M268,38 L242,52" stroke="#EF4444" stroke-width="2.4"/>
            <circle cx="242" cy="52" r="3.5" fill="#EF4444"/>
            <text x="249" y="83" text-anchor="middle" fill="#FEF08A" font-size="8.5" font-weight="900">NATO CONDEMNS</text>
          </svg>
        </div>
        <p class="subtext"><strong>At least 9 killed</strong> across Ukraine; power &amp; water cut in Kyiv; <strong>NATO condemns</strong> missile breach in Poland.</p>
      </article>

      <!-- STORY 2: CYCLONE AKVAN IN ODISHA -->
      <article class="card hero-2">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">2</span>
            <span class="beat-pill" style="background:#C2410C;">SOUTH ASIA · CYCLONE</span>
          </div>
          <span class="loc-label">ODISHA, INDIA</span>
        </div>
        <h2 class="headline">Cyclone Akvan Strikes Odisha</h2>
        <div class="art-box">
          <svg viewBox="0 0 306 196" xmlns="http://www.w3.org/2000/svg">
            <!-- Bay of Bengal water background -->
            <rect width="306" height="196" fill="#0C4A6E"/>
            <!-- Wave lines -->
            <path d="M196,154 Q208,149 220,154 T244,154" fill="none" stroke="#0284C7" stroke-width="2"/>
            <path d="M236,166 Q248,161 260,166 T284,166" fill="none" stroke="#0284C7" stroke-width="2"/>
            <!-- Odisha landmass on left/top-left -->
            <path d="M0,0 L175,0 L162,38 L142,68 L124,98 L108,124 L84,154 L46,182 L0,196 Z" fill="#DCFCE7" stroke="#15803D" stroke-width="2.5"/>
            <path d="M0,0 L146,0 L132,40 L110,78 L86,115 L52,150 L0,175 Z" fill="#BBF7D0"/>
            <text x="14" y="48" fill="#14532D" font-size="12" font-weight="900" letter-spacing="0.6">ODISHA</text>
            <text x="14" y="62" fill="#166534" font-size="9.2" font-weight="800">EAST INDIA COAST</text>
            <text x="244" y="186" text-anchor="middle" fill="#7DD3FC" font-size="9.5" font-weight="900" letter-spacing="0.6">BAY OF BENGAL</text>

            <!-- Cyclone Akvan Spiral Arms -->
            <g transform="translate(182, 98)">
              <circle cx="0" cy="0" r="55" fill="#38BDF8" opacity="0.18"/>
              <circle cx="0" cy="0" r="41" fill="#7DD3FC" opacity="0.24"/>
              <path d="M-12,-45 C25,-51 52,-19 45,16 C37,47 2,56 -27,43" fill="none" stroke="#E0F2FE" stroke-width="5" stroke-linecap="round"/>
              <path d="M14,43 C-23,51 -50,21 -43,-14 C-35,-43 -2,-52 25,-39" fill="none" stroke="#BAE6FD" stroke-width="4.5" stroke-linecap="round"/>
              <path d="M-23,-17 C-8,-33 21,-27 27,-6 C33,15 13,33 -10,27" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
              <path d="M19,13 C6,27 -17,21 -23,4 C-27,-13 -11,-27 8,-21" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
              <circle cx="0" cy="0" r="10" fill="#0C4A6E" stroke="#FDE047" stroke-width="3"/>
            </g>

            <!-- Track arrow to Gopalpur Landfall -->
            <path d="M238,126 L128,100" fill="none" stroke="#EF4444" stroke-width="3.5" stroke-dasharray="6,3"/>
            <polygon points="122,98 135,94 132,107" fill="#EF4444"/>

            <!-- Gopalpur Landfall Bullseye Pin -->
            <circle cx="116" cy="96" r="11" fill="#DC2626" opacity="0.35"/>
            <circle cx="116" cy="96" r="5.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
            <rect x="18" y="75" width="88" height="22" rx="3" fill="#991B1B" stroke="#FFFFFF" stroke-width="1.2"/>
            <text x="62" y="89" text-anchor="middle" fill="#FFFFFF" font-size="10" font-weight="900">GOPALPUR</text>

            <!-- Wind-bent palm silhouettes on coast -->
            <path d="M76,136 Q66,120 54,117" fill="none" stroke="#14532D" stroke-width="2.5"/>
            <path d="M54,117 L44,113 M54,117 L46,121 M54,117 L50,109" stroke="#15803D" stroke-width="2"/>
            <path d="M92,128 Q82,112 70,109" fill="none" stroke="#14532D" stroke-width="2.5"/>
            <path d="M70,109 L60,105 M70,109 L62,113 M70,109 L66,101" stroke="#15803D" stroke-width="2"/>

            <!-- Top Wind Speed Badge -->
            <rect x="6" y="6" width="166" height="24" rx="4" fill="#C2410C" stroke="#FED7AA" stroke-width="1.5"/>
            <text x="89" y="22" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="900">WINDS 70–90 KM/H</text>

            <!-- Top-right Storm Name Tag -->
            <rect x="180" y="6" width="120" height="24" rx="4" fill="#1E293B" stroke="#38BDF8" stroke-width="1.2"/>
            <text x="240" y="22" text-anchor="middle" fill="#7DD3FC" font-size="10.5" font-weight="900">CYCLONE AKVAN</text>

            <!-- Bottom Protection / Evacuation Shield Badge -->
            <rect x="8" y="138" width="180" height="50" rx="5" fill="#065F46" stroke="#34D399" stroke-width="2"/>
            <text x="98" y="158" text-anchor="middle" fill="#A7F3D0" font-size="11.5" font-weight="900">300,000+ SHELTERED</text>
            <text x="98" y="178" text-anchor="middle" fill="#FEF08A" font-size="13.5" font-weight="900">0 DEATHS REPORTED</text>
          </svg>
        </div>
        <p class="subtext">Crosses near <strong>Gopalpur</strong> after <strong>300,000+ evacuate</strong> to shelters; <strong>zero fatalities</strong> reported as storm weakens.</p>
      </article>

      <!-- STORY 3: MARKETS & AI -->
      <article class="card hero-3">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">3</span>
            <span class="beat-pill" style="background:#1E3A8A;">GLOBAL · MARKETS &amp; AI</span>
          </div>
          <span class="loc-label">ASIA &amp; NY</span>
        </div>
        <h2 class="headline">AI Sell-Off Sinks Asian Stocks</h2>
        <div class="art-box">
          <svg viewBox="0 0 306 196" xmlns="http://www.w3.org/2000/svg">
            <rect width="306" height="196" fill="#0F172A"/>
            <!-- Left Panel: Asian Tech Sell-Off Bar Chart -->
            <rect x="6" y="6" width="186" height="184" rx="4" fill="#1E293B" stroke="#475569" stroke-width="1.2"/>
            <rect x="12" y="11" width="174" height="18" rx="2" fill="#450A0A"/>
            <text x="99" y="23" text-anchor="middle" fill="#FCA5A5" font-size="9.2" font-weight="900">ASIA AI ROUT · WORST SINCE 1991</text>

            <!-- Bar 1: TAIEX -6.2% -->
            <text x="14" y="44" fill="#F8FAFC" font-size="10.8" font-weight="900">TAIEX (Taiwan)</text>
            <rect x="14" y="49" width="166" height="22" rx="3" fill="#DC2626"/>
            <text x="174" y="64" text-anchor="end" fill="#FFFFFF" font-size="12.8" font-weight="900">-6.2%</text>

            <!-- Bar 2: KOSPI -5.2% -->
            <text x="14" y="86" fill="#F8FAFC" font-size="10.8" font-weight="900">KOSPI (Korea)</text>
            <rect x="14" y="91" width="140" height="21" rx="3" fill="#E11D48"/>
            <text x="148" y="106" text-anchor="end" fill="#FFFFFF" font-size="12.2" font-weight="900">-5.2%</text>

            <!-- Bar 3: NIKKEI -5.1% -->
            <text x="14" y="127" fill="#F8FAFC" font-size="10.8" font-weight="900">NIKKEI (Japan)</text>
            <rect x="14" y="132" width="137" height="21" rx="3" fill="#F43F5E"/>
            <text x="145" y="147" text-anchor="end" fill="#FFFFFF" font-size="12.2" font-weight="900">-5.1%</text>

            <!-- Bottom row inside left panel: BTC & AI Chip -->
            <rect x="14" y="160" width="170" height="22" rx="3" fill="#0F172A" stroke="#F59E0B" stroke-width="1.2"/>
            <text x="99" y="175" text-anchor="middle" fill="#FDE047" font-size="10.5" font-weight="900">BTC $61.4K · AI CHIP DROP</text>

            <!-- Right Panel: Anthropic $81.3B IPO & AI Chip Contrast -->
            <rect x="198" y="6" width="102" height="184" rx="4" fill="#064E3B" stroke="#10B981" stroke-width="1.5"/>
            <rect x="206" y="14" width="86" height="20" rx="3" fill="#047857"/>
            <text x="249" y="28" text-anchor="middle" fill="#A7F3D0" font-size="9.5" font-weight="900">NYSE / AI DEBUT</text>

            <!-- IPO Bell Icon -->
            <path d="M249,42 C240,42 235,49 235,58 L231,64 L267,64 L263,58 C263,49 258,42 249,42 Z" fill="#FBBF24" stroke="#FEF08A" stroke-width="1.5"/>
            <circle cx="249" cy="67" r="3.5" fill="#FDE047"/>

            <text x="249" y="88" text-anchor="middle" fill="#FFFFFF" font-size="11.8" font-weight="900">ANTHROPIC</text>
            <text x="249" y="102" text-anchor="middle" fill="#6EE7B7" font-size="9.8" font-weight="800">RECORD IPO</text>

            <rect x="206" y="109" width="86" height="34" rx="4" fill="#022C22" stroke="#34D399" stroke-width="1.5"/>
            <text x="249" y="132" text-anchor="middle" fill="#FEF08A" font-size="18.5" font-weight="900">$81.3B</text>

            <!-- Silicon AI Die Graphic with pins -->
            <line x1="230" y1="158" x2="268" y2="158" stroke="#38BDF8" stroke-width="1.5"/>
            <line x1="230" y1="166" x2="268" y2="166" stroke="#38BDF8" stroke-width="1.5"/>
            <rect x="235" y="150" width="28" height="22" rx="3" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
            <text x="249" y="165" text-anchor="middle" fill="#7DD3FC" font-size="10" font-weight="900">AI</text>
            <text x="249" y="184" text-anchor="middle" fill="#A7F3D0" font-size="8.4" font-weight="800">VALUATION SPLIT</text>
          </svg>
        </div>
        <p class="subtext">Taiwan logs worst week since 1991 (<strong>-6.2%</strong>) on AI valuation jitters despite <strong>Anthropic's record $81.3B IPO</strong>.</p>
      </article>
    </section>

    <!-- ROW 2: 3 MAJOR REGIONAL / GLOBAL CARDS -->
    <section class="row-3">
      <!-- STORY 4: UK & EU RESET PACKAGE -->
      <article class="card row2-1">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">4</span>
            <span class="beat-pill" style="background:#1D4ED8;">EUROPE · DIPLOMACY</span>
          </div>
          <span class="loc-label">BRUSSELS &amp; LONDON</span>
        </div>
        <h2 class="headline">UK &amp; EU Seal 'Reset' Package</h2>
        <div class="art-box">
          <svg viewBox="0 0 306 168" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="uk-clip">
                <circle cx="0" cy="0" r="32"/>
              </clipPath>
            </defs>
            <rect width="306" height="168" fill="#EFF6FF"/>
            <!-- Connecting Treaty Bridge Arch -->
            <path d="M22,94 Q153,42 284,94" fill="none" stroke="#1D4ED8" stroke-width="6"/>
            <path d="M22,99 Q153,47 284,99" fill="none" stroke="#93C5FD" stroke-width="2"/>

            <!-- Left: UK Union Jack Medallion (clipped cleanly to circle) -->
            <g transform="translate(88, 50)">
              <g clip-path="url(#uk-clip)">
                <rect x="-34" y="-34" width="68" height="68" fill="#1E3A8A"/>
                <path d="M-34,-34 L34,34 M-34,34 L34,-34" stroke="#FFFFFF" stroke-width="9"/>
                <path d="M-34,-34 L34,34 M-34,34 L34,-34" stroke="#DC2626" stroke-width="4.5"/>
                <path d="M-34,0 L34,0 M0,-34 L0,34" stroke="#FFFFFF" stroke-width="13"/>
                <path d="M-34,0 L34,0 M0,-34 L0,34" stroke="#DC2626" stroke-width="7"/>
              </g>
              <circle cx="0" cy="0" r="32" fill="none" stroke="#1E3A8A" stroke-width="3"/>
            </g>
            <rect x="10" y="14" width="40" height="20" rx="3" fill="#1E3A8A"/>
            <text x="30" y="28" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="900">U.K.</text>

            <!-- Right: EU 12-Star Medallion -->
            <g transform="translate(218, 50)">
              <circle cx="0" cy="0" r="32" fill="#1D4ED8" stroke="#FACC15" stroke-width="3"/>
              <circle cx="0" cy="-20" r="2.6" fill="#FACC15"/>
              <circle cx="10" cy="-17.3" r="2.6" fill="#FACC15"/>
              <circle cx="17.3" cy="-10" r="2.6" fill="#FACC15"/>
              <circle cx="20" cy="0" r="2.6" fill="#FACC15"/>
              <circle cx="17.3" cy="10" r="2.6" fill="#FACC15"/>
              <circle cx="10" cy="17.3" r="2.6" fill="#FACC15"/>
              <circle cx="0" cy="20" r="2.6" fill="#FACC15"/>
              <circle cx="-10" cy="17.3" r="2.6" fill="#FACC15"/>
              <circle cx="-17.3" cy="10" r="2.6" fill="#FACC15"/>
              <circle cx="-20" cy="0" r="2.6" fill="#FACC15"/>
              <circle cx="-17.3" cy="-10" r="2.6" fill="#FACC15"/>
              <circle cx="-10" cy="-17.3" r="2.6" fill="#FACC15"/>
            </g>
            <rect x="256" y="14" width="40" height="20" rx="3" fill="#1D4ED8"/>
            <text x="276" y="28" text-anchor="middle" fill="#FACC15" font-size="11" font-weight="900">E.U.</text>

            <!-- Center Clasp Badge -->
            <rect x="113" y="36" width="80" height="26" rx="13" fill="#0F172A" stroke="#FACC15" stroke-width="2"/>
            <text x="153" y="53" text-anchor="middle" fill="#FEF08A" font-size="10.5" font-weight="900">RESET PACT</text>

            <!-- 3 Pillar Cards at Bottom -->
            <rect x="6" y="100" width="94" height="62" rx="4" fill="#FFFFFF" stroke="#1D4ED8" stroke-width="1.5"/>
            <text x="53" y="118" text-anchor="middle" fill="#1E3A8A" font-size="10.2" font-weight="900">YOUTH VISAS</text>
            <text x="53" y="134" text-anchor="middle" fill="#334155" font-size="9.2" font-weight="700">18–30 Mobility</text>
            <text x="53" y="150" text-anchor="middle" fill="#1D4ED8" font-size="8.8" font-weight="900">TIMELINE SET</text>

            <rect x="106" y="100" width="94" height="62" rx="4" fill="#FFFFFF" stroke="#047857" stroke-width="1.5"/>
            <text x="153" y="118" text-anchor="middle" fill="#065F46" font-size="10.2" font-weight="900">AGRIFOOD SPS</text>
            <text x="153" y="134" text-anchor="middle" fill="#334155" font-size="9.2" font-weight="700">Food Trade Rules</text>
            <text x="153" y="150" text-anchor="middle" fill="#047857" font-size="8.8" font-weight="900">EASE CHECKS</text>

            <rect x="206" y="100" width="94" height="62" rx="4" fill="#FFFFFF" stroke="#B45309" stroke-width="1.5"/>
            <text x="253" y="118" text-anchor="middle" fill="#92400E" font-size="10.2" font-weight="900">CARBON ETS</text>
            <text x="253" y="134" text-anchor="middle" fill="#334155" font-size="9.2" font-weight="700">Emissions Link</text>
            <text x="253" y="150" text-anchor="middle" fill="#B45309" font-size="8.8" font-weight="900">MARKET PACT</text>
          </svg>
        </div>
        <p class="subtext">Agree timelines on <strong>youth mobility visas</strong>, <strong>food trade rules</strong> &amp; <strong>carbon-market link</strong>.</p>
      </article>

      <!-- STORY 5: COP31 DEADLOCK IN ANTALYA -->
      <article class="card row2-2">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">5</span>
            <span class="beat-pill" style="background:#0F766E;">WORLD · CLIMATE</span>
          </div>
          <span class="loc-label">ANTALYA, TÜRKIYE</span>
        </div>
        <h2 class="headline">COP31 Deadlocks on Final Day</h2>
        <div class="art-box">
          <svg viewBox="0 0 306 168" xmlns="http://www.w3.org/2000/svg">
            <rect width="306" height="168" fill="#F0FDFA"/>
            <!-- Top header banner -->
            <rect x="6" y="6" width="186" height="24" rx="3" fill="#134E4A"/>
            <text x="99" y="22" text-anchor="middle" fill="#5EEAD4" font-size="10.2" font-weight="900">COP31 ANTALYA · CLOSING DAY</text>
            <rect x="198" y="6" width="102" height="24" rx="3" fill="#B91C1C"/>
            <text x="249" y="22" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="900">NO DEAL YET</text>

            <!-- Center Fulcrum: Warming Earth + Hourglass -->
            <circle cx="153" cy="92" r="33" fill="#0284C7" stroke="#0F172A" stroke-width="2"/>
            <path d="M135,74 Q148,68 156,80 Q165,88 154,106 Q140,112 132,94 Z" fill="#16A34A"/>
            <path d="M162,72 Q176,80 174,96 Q166,102 162,88 Z" fill="#16A34A"/>
            <circle cx="153" cy="92" r="36" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="5,3"/>

            <!-- Stalled Gavel & Hourglass Pill on Top of Fulcrum -->
            <rect x="119" y="37" width="68" height="18" rx="3" fill="#7F1D1D" stroke="#FCA5A5" stroke-width="1"/>
            <text x="153" y="49" text-anchor="middle" fill="#FEF08A" font-size="8.8" font-weight="900">STALLED</text>

            <!-- Tilted Deadlocked Scale Beam -->
            <line x1="48" y1="74" x2="258" y2="102" stroke="#0F172A" stroke-width="4.5" stroke-linecap="round"/>

            <!-- Left Pan: Fossil Fuels -->
            <rect x="8" y="78" width="96" height="58" rx="4" fill="#1E293B" stroke="#EF4444" stroke-width="1.5"/>
            <text x="56" y="97" text-anchor="middle" fill="#FCA5A5" font-size="10.2" font-weight="900">FOSSIL FUELS</text>
            <text x="56" y="113" text-anchor="middle" fill="#FFFFFF" font-size="9.2" font-weight="700">Phaseout Text</text>
            <text x="56" y="128" text-anchor="middle" fill="#F87171" font-size="9.2" font-weight="900">BLOCKED</text>

            <!-- Right Pan: Climate Finance -->
            <rect x="202" y="78" width="96" height="58" rx="4" fill="#064E3B" stroke="#F59E0B" stroke-width="1.5"/>
            <text x="250" y="97" text-anchor="middle" fill="#FDE047" font-size="10.2" font-weight="900">FINANCE GAP</text>
            <text x="250" y="113" text-anchor="middle" fill="#FFFFFF" font-size="9.2" font-weight="700">Transition Aid</text>
            <text x="250" y="128" text-anchor="middle" fill="#FBBF24" font-size="9.2" font-weight="900">DISPUTED</text>

            <!-- Bottom Status Bar (comfortably fitted inside 294px width) -->
            <rect x="6" y="142" width="294" height="20" rx="3" fill="#0F172A"/>
            <text x="153" y="156" text-anchor="middle" fill="#FEF08A" font-size="9.5" font-weight="900">OVERTIME TALKS · FOSSIL vs. FINANCE STANDOFF</text>
          </svg>
        </div>
        <p class="subtext">Talks stall on closing day as nations clash over <strong>fossil-fuel phaseout</strong> &amp; <strong>transition finance</strong>.</p>
      </article>

      <!-- STORY 6: HORMUZ TANKER & US SENATE IRAN VOTE -->
      <article class="card row2-3">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">6</span>
            <span class="beat-pill" style="background:#991B1B;">MIDEAST &amp; US · SECURITY</span>
          </div>
          <span class="loc-label">HORMUZ &amp; DC</span>
        </div>
        <h2 class="headline">Oman Tanker Fire &amp; Iran Vote</h2>
        <div class="art-box">
          <svg viewBox="0 0 306 168" xmlns="http://www.w3.org/2000/svg">
            <rect width="306" height="168" fill="#0C4A6E"/>
            <!-- Left Panel (Strait of Hormuz Map & Burning Tanker) -->
            <path d="M0,0 L186,0 L186,38 L140,34 L95,46 L42,36 L0,48 Z" fill="#D6D3D1" stroke="#57534E" stroke-width="1.5"/>
            <text x="76" y="23" text-anchor="middle" fill="#1C1917" font-size="11" font-weight="900">IRAN</text>
            <!-- Oman / Musandam Peninsula South Coast -->
            <path d="M0,168 L56,144 L98,112 L116,114 L132,146 L186,168 Z" fill="#FDE68A" stroke="#B45309" stroke-width="1.5"/>
            <circle cx="106" cy="122" r="4" fill="#DC2626"/>
            <text x="102" y="142" text-anchor="middle" fill="#78350F" font-size="9.8" font-weight="900">KHASAB</text>
            <text x="102" y="154" text-anchor="middle" fill="#92400E" font-size="8.8" font-weight="800">(OMAN)</text>
            <text x="10" y="64" fill="#7DD3FC" font-size="9.2" font-weight="900">STRAIT OF HORMUZ</text>

            <!-- Burning Tanker Icon off Khasab -->
            <polygon points="62,92 128,92 120,104 70,104" fill="#334155" stroke="#E2E8F0" stroke-width="1.2"/>
            <rect x="106" y="82" width="12" height="10" fill="#94A3B8"/>
            <!-- Fire & Blast Plume -->
            <circle cx="92" cy="84" r="14" fill="#DC2626" opacity="0.9"/>
            <circle cx="92" cy="84" r="9" fill="#F97316"/>
            <circle cx="92" cy="84" r="4.5" fill="#FEF08A"/>
            <rect x="8" y="114" width="76" height="18" rx="3" fill="#991B1B" stroke="#FCA5A5" stroke-width="1"/>
            <text x="46" y="126" text-anchor="middle" fill="#FFFFFF" font-size="8.6" font-weight="900">DRONE CLASH</text>

            <!-- Right Panel: US Senate Capitol Dome & Vote -->
            <rect x="190" y="6" width="110" height="156" rx="4" fill="#1E293B" stroke="#94A3B8" stroke-width="1.5"/>
            <text x="245" y="23" text-anchor="middle" fill="#93C5FD" font-size="9.5" font-weight="900">WASHINGTON, D.C.</text>

            <!-- Capitol Dome Silhouette -->
            <path d="M223,72 C223,52 267,52 267,72 Z" fill="#E2E8F0"/>
            <rect x="242" y="42" width="6" height="12" fill="#E2E8F0"/>
            <rect x="215" y="72" width="60" height="12" fill="#CBD5E1"/>
            <line x1="211" y1="84" x2="279" y2="84" stroke="#94A3B8" stroke-width="3"/>

            <rect x="198" y="94" width="94" height="24" rx="3" fill="#B91C1C" stroke="#FCA5A5" stroke-width="1.2"/>
            <text x="245" y="110" text-anchor="middle" fill="#FFFFFF" font-size="10.2" font-weight="900">SENATE BLOCKS</text>

            <text x="245" y="130" text-anchor="middle" fill="#FEF08A" font-size="9.5" font-weight="900">IRAN WAR-POWERS</text>
            <text x="245" y="144" text-anchor="middle" fill="#F8FAFC" font-size="9" font-weight="800">CURB RESOLUTION</text>
          </svg>
        </div>
        <p class="subtext">Tanker blast off <strong>Khasab</strong> &amp; drone clash in Hormuz; <strong>US Senate blocks</strong> curb on Iran war powers.</p>
      </article>
    </section>

    <!-- ROW 3: 4 GLOBAL BREADTH CARDS -->
    <section class="row-4">
      <!-- STORY 7: AFRICA (DAKAR PACT & DRC WATER CUT) -->
      <article class="card row3-1">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">7</span>
            <span class="beat-pill" style="background:#B45309;">AFRICA · HUMANITARIAN</span>
          </div>
          <span class="loc-label">DAKAR &amp; DRC</span>
        </div>
        <h2 class="headline">Dakar Pact; DRC Water Cut</h2>
        <div class="art-box">
          <svg viewBox="0 0 226 168" xmlns="http://www.w3.org/2000/svg">
            <rect width="226" height="168" fill="#FEF3C7"/>
            <!-- Stylized Africa Continent Silhouette -->
            <path d="M52,16 L104,14 L126,30 L144,62 L130,96 L114,136 L92,158 L76,134 L72,96 L48,84 L24,68 L22,42 Z" fill="#FDE68A" stroke="#B45309" stroke-width="2"/>

            <!-- Dakar Pin (West Africa) -->
            <circle cx="24" cy="54" r="9" fill="#1D4ED8" stroke="#FFFFFF" stroke-width="2"/>
            <rect x="6" y="6" width="136" height="34" rx="4" fill="#1E3A8A" stroke="#93C5FD" stroke-width="1.2"/>
            <text x="74" y="21" text-anchor="middle" fill="#FEF08A" font-size="10.2" font-weight="900">DAKAR: 16 STATES</text>
            <text x="74" y="34" text-anchor="middle" fill="#FFFFFF" font-size="8.8" font-weight="800">BACK MIGRATION PACT</text>
            <line x1="24" y1="40" x2="24" y2="48" stroke="#1E3A8A" stroke-width="2"/>

            <!-- Ituri DRC Pin (Central/East Africa) -->
            <circle cx="108" cy="88" r="9.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
            <line x1="117" y1="88" x2="132" y2="104" stroke="#DC2626" stroke-width="2.5"/>

            <!-- DRC Water Crisis Alert Box -->
            <rect x="62" y="102" width="158" height="58" rx="4" fill="#991B1B" stroke="#FCA5A5" stroke-width="1.5"/>
            <text x="141" y="120" text-anchor="middle" fill="#FEF08A" font-size="10.8" font-weight="900">ITURI, DRC · UN ALERT</text>
            <text x="141" y="137" text-anchor="middle" fill="#FFFFFF" font-size="11.5" font-weight="900">76,000 NO WATER</text>
            <text x="141" y="152" text-anchor="middle" fill="#FECACA" font-size="8.8" font-weight="800">DISPLACED CAMPS CUT OFF</text>
          </svg>
        </div>
        <p class="subtext"><strong>16 West African nations</strong> back migration pact; UN warns <strong>76,000 displaced</strong> in Ituri lost safe water.</p>
      </article>

      <!-- STORY 8: AMERICAS HEALTH (MEASLES) -->
      <article class="card row3-2">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">8</span>
            <span class="beat-pill" style="background:#BE123C;">AMERICAS · HEALTH</span>
          </div>
          <span class="loc-label">US · MEX · BOL</span>
        </div>
        <h2 class="headline">Measles-Free Status Lost</h2>
        <div class="art-box">
          <svg viewBox="0 0 226 168" xmlns="http://www.w3.org/2000/svg">
            <rect width="226" height="168" fill="#FFF1F2"/>
            <!-- Left: Stylized Americas Map Highlighting US, Mexico, Bolivia -->
            <rect x="6" y="6" width="96" height="156" rx="4" fill="#FFE4E6" stroke="#FDA4AF" stroke-width="1.2"/>
            <!-- North America / US -->
            <path d="M14,18 L86,18 L80,50 L20,50 Z" fill="#E11D48" stroke="#881337" stroke-width="1.5"/>
            <text x="51" y="38" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="900">U.S.A.</text>
            <!-- Mexico -->
            <path d="M20,54 L80,54 L72,82 L28,82 Z" fill="#BE123C" stroke="#881337" stroke-width="1.5"/>
            <text x="50" y="72" text-anchor="middle" fill="#FFFFFF" font-size="9.5" font-weight="900">MEXICO</text>
            <!-- South America + Bolivia Pill -->
            <path d="M36,88 L86,94 L78,154 L48,154 L34,116 Z" fill="#FECDD3" stroke="#FB7185" stroke-width="1.2"/>
            <rect x="24" y="112" width="60" height="22" rx="4" fill="#9F1239" stroke="#FFFFFF" stroke-width="1.2"/>
            <text x="54" y="127" text-anchor="middle" fill="#FFFFFF" font-size="9.2" font-weight="900">BOLIVIA</text>

            <!-- Right: PAHO Revocation Badge & 12+ Mo Spread Curve -->
            <rect x="108" y="6" width="112" height="72" rx="4" fill="#9F1239" stroke="#FDA4AF" stroke-width="1.5"/>
            <text x="164" y="23" text-anchor="middle" fill="#FEF08A" font-size="10.2" font-weight="900">PAHO / WHO</text>
            <text x="164" y="40" text-anchor="middle" fill="#FFFFFF" font-size="10.8" font-weight="900">ELIMINATION</text>
            <rect x="118" y="48" width="92" height="22" rx="3" fill="#0F172A"/>
            <text x="164" y="63" text-anchor="middle" fill="#F87171" font-size="10.5" font-weight="900">REVOKED</text>

            <!-- Outbreak Curve Box -->
            <rect x="108" y="84" width="112" height="78" rx="4" fill="#FFFFFF" stroke="#BE123C" stroke-width="1.5"/>
            <text x="164" y="100" text-anchor="middle" fill="#881337" font-size="9.2" font-weight="900">12+ MO. SPREAD</text>
            <path d="M120,140 Q144,136 164,122 T204,106" fill="none" stroke="#E11D48" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="204" cy="106" r="3.8" fill="#E11D48"/>
            <text x="164" y="154" text-anchor="middle" fill="#BE123C" font-size="8.8" font-weight="900">3 NATIONS LOST</text>
          </svg>
        </div>
        <p class="subtext"><strong>PAHO revokes</strong> measles elimination in <strong>US, Mexico &amp; Bolivia</strong> after year-long spread.</p>
      </article>

      <!-- STORY 9: SPACE & SCIENCE (ISS DRAGON & BEPICOLOMBO) -->
      <article class="card row3-3">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">9</span>
            <span class="beat-pill" style="background:#4338CA;">SPACE · SCIENCE</span>
          </div>
          <span class="loc-label">ISS &amp; MERCURY</span>
        </div>
        <h2 class="headline">ISS Dragon &amp; Mercury Probe</h2>
        <div class="art-box">
          <svg viewBox="0 0 226 168" xmlns="http://www.w3.org/2000/svg">
            <rect width="226" height="168" fill="#0F172A"/>
            <!-- Top Half: ISS + Dragon Bioprinted Blood Vessels -->
            <rect x="6" y="6" width="214" height="74" rx="4" fill="#1E1B4B" stroke="#6366F1" stroke-width="1.2"/>
            <!-- ISS Solar Wings -->
            <rect x="14" y="20" width="12" height="44" fill="#D97706" stroke="#FCD34D" stroke-width="1"/>
            <rect x="32" y="20" width="12" height="44" fill="#D97706" stroke="#FCD34D" stroke-width="1"/>
            <line x1="10" y1="42" x2="52" y2="42" stroke="#E2E8F0" stroke-width="3"/>
            <!-- Departing Dragon Capsule -->
            <polygon points="64,34 82,28 82,56 64,50" fill="#F8FAFC" stroke="#38BDF8" stroke-width="1.5"/>
            <path d="M52,42 L62,42" stroke="#38BDF8" stroke-width="2" stroke-dasharray="2,2"/>
            <text x="150" y="25" text-anchor="middle" fill="#A5B4FC" font-size="9.2" font-weight="900">SPACEX DRAGON · ISS</text>
            <text x="150" y="42" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="900">3D-BIOPRINTED</text>
            <text x="150" y="57" text-anchor="middle" fill="#F43F5E" font-size="10.2" font-weight="900">BLOOD VESSELS</text>
            <text x="150" y="71" text-anchor="middle" fill="#7DD3FC" font-size="8.6" font-weight="800">RETURN TO EARTH</text>

            <!-- Bottom Half: BepiColombo at Mercury -->
            <rect x="6" y="86" width="214" height="76" rx="4" fill="#1E293B" stroke="#38BDF8" stroke-width="1.2"/>
            <!-- Planet Mercury -->
            <circle cx="182" cy="124" r="26" fill="#94A3B8" stroke="#CBD5E1" stroke-width="1.5"/>
            <circle cx="174" cy="114" r="4.5" fill="#64748B"/>
            <circle cx="192" cy="128" r="6" fill="#64748B"/>
            <circle cx="176" cy="136" r="3.8" fill="#64748B"/>
            <text x="182" y="127" text-anchor="middle" fill="#0F172A" font-size="8.5" font-weight="900">MERCURY</text>

            <!-- BepiColombo Probe & X-Ray Scan Beam -->
            <polygon points="124,122 158,105 158,143" fill="#22D3EE" opacity="0.35"/>
            <rect x="108" y="112" width="16" height="20" rx="2" fill="#FACC15" stroke="#FFFFFF" stroke-width="1.2"/>
            <line x1="96" y1="122" x2="132" y2="122" stroke="#38BDF8" stroke-width="3"/>

            <text x="54" y="108" text-anchor="middle" fill="#FDE047" font-size="9.5" font-weight="900">BEPICOLOMBO</text>
            <text x="54" y="124" text-anchor="middle" fill="#FFFFFF" font-size="10" font-weight="900">X-RAY GEAR</text>
            <text x="54" y="139" text-anchor="middle" fill="#38BDF8" font-size="9.2" font-weight="900">MERCURY TEST</text>
          </svg>
        </div>
        <p class="subtext">Dragon returns <strong>3D-bioprinted blood vessels</strong>; <strong>BepiColombo</strong> tests X-ray gear at Mercury.</p>
      </article>

      <!-- STORY 10: SOCIETY & SPORT (EU YOUTH MARCH & TURIN ATP SEMIS) -->
      <article class="card row3-4">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">10</span>
            <span class="beat-pill" style="background:#047857;">SOCIETY &amp; SPORT</span>
          </div>
          <span class="loc-label">EU &amp; TURIN</span>
        </div>
        <h2 class="headline">EU Youth March; ATP Semis</h2>
        <div class="art-box">
          <svg viewBox="0 0 226 168" xmlns="http://www.w3.org/2000/svg">
            <rect width="226" height="168" fill="#F8FAFC"/>
            <!-- Left Half: EU Student Protests (20+ States) -->
            <rect x="5" y="6" width="106" height="156" rx="4" fill="#FEF2F2" stroke="#DC2626" stroke-width="1.5"/>
            <rect x="11" y="12" width="94" height="20" rx="3" fill="#B91C1C"/>
            <text x="58" y="26" text-anchor="middle" fill="#FFFFFF" font-size="9.8" font-weight="900">20+ EU STATES</text>

            <!-- Protest Placards -->
            <rect x="14" y="42" width="40" height="24" rx="2" fill="#FEF08A" stroke="#0F172A" stroke-width="1.5"/>
            <text x="34" y="58" text-anchor="middle" fill="#0F172A" font-size="9.8" font-weight="900">RENT!</text>
            <line x1="34" y1="66" x2="34" y2="86" stroke="#0F172A" stroke-width="2.5"/>

            <rect x="60" y="38" width="42" height="24" rx="2" fill="#FCA5A5" stroke="#0F172A" stroke-width="1.5"/>
            <text x="81" y="54" text-anchor="middle" fill="#7F1D1D" font-size="9.8" font-weight="900">COSTS</text>
            <line x1="81" y1="62" x2="81" y2="86" stroke="#0F172A" stroke-width="2.5"/>

            <!-- Crowd Silhouettes -->
            <circle cx="26" cy="92" r="7" fill="#1E293B"/>
            <circle cx="48" cy="90" r="7" fill="#1E293B"/>
            <circle cx="70" cy="92" r="7" fill="#1E293B"/>
            <circle cx="90" cy="90" r="7" fill="#1E293B"/>
            <rect x="14" y="99" width="88" height="16" rx="3" fill="#1E293B"/>

            <text x="58" y="132" text-anchor="middle" fill="#991B1B" font-size="10.2" font-weight="900">YOUTH MARCH</text>
            <text x="58" y="147" text-anchor="middle" fill="#334155" font-size="8.8" font-weight="800">LIVING-COST CRISIS</text>

            <!-- Right Half: ATP Finals Turin -->
            <rect x="115" y="6" width="106" height="156" rx="4" fill="#1E3A8A" stroke="#38BDF8" stroke-width="1.5"/>
            <rect x="121" y="12" width="94" height="20" rx="3" fill="#0284C7"/>
            <text x="168" y="26" text-anchor="middle" fill="#FFFFFF" font-size="9.5" font-weight="900">ATP TURIN SEMIS</text>

            <!-- Blue Tennis Court & Yellow Tennis Ball -->
            <rect x="123" y="38" width="90" height="50" rx="2" fill="#2563EB" stroke="#FFFFFF" stroke-width="1.5"/>
            <line x1="123" y1="63" x2="213" y2="63" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="3,2"/>
            <line x1="168" y1="38" x2="168" y2="88" stroke="#FFFFFF" stroke-width="1.2"/>
            <circle cx="184" cy="54" r="8.5" fill="#EAB308" stroke="#FFFFFF" stroke-width="1.5"/>

            <!-- Player Plaques -->
            <rect x="121" y="96" width="94" height="24" rx="3" fill="#0F172A" stroke="#FACC15" stroke-width="1.2"/>
            <text x="168" y="112" text-anchor="middle" fill="#FEF08A" font-size="10.5" font-weight="900">C. ALCARAZ</text>

            <rect x="121" y="126" width="94" height="24" rx="3" fill="#0F172A" stroke="#38BDF8" stroke-width="1.2"/>
            <text x="168" y="142" text-anchor="middle" fill="#7DD3FC" font-size="10.5" font-weight="900">D. MEDVEDEV</text>
          </svg>
        </div>
        <p class="subtext">Students march over <strong>living costs in 20+ EU states</strong>; <strong>Alcaraz &amp; Medvedev</strong> reach ATP semis.</p>
      </article>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="legend">
        <span class="legend-item"><span class="dot" style="background:#EF4444;"></span>EUROPE (WAR / DIPLOMACY / SOCIETY)</span>
        <span class="legend-item"><span class="dot" style="background:#F97316;"></span>SOUTH ASIA</span>
        <span class="legend-item"><span class="dot" style="background:#3B82F6;"></span>EAST ASIA &amp; MARKETS</span>
        <span class="legend-item"><span class="dot" style="background:#14B8A6;"></span>CLIMATE</span>
        <span class="legend-item"><span class="dot" style="background:#F59E0B;"></span>MIDEAST &amp; AFRICA</span>
        <span class="legend-item"><span class="dot" style="background:#EC4899;"></span>AMERICAS</span>
        <span class="legend-item"><span class="dot" style="background:#818CF8;"></span>SPACE</span>
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
        const cards = Array.from(document.querySelectorAll('.card'));
        const cardChecks = cards.map((c, idx) => {
          const r = c.getBoundingClientRect();
          const h = c.querySelector('.headline');
          const s = c.querySelector('.subtext');
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
            card: idx + 1,
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            bottom: Math.round(r.bottom * 10) / 10,
            right: Math.round(r.right * 10) / 10,
            cardOverflowY: c.scrollHeight > c.clientHeight + 1,
            cardOverflowX: c.scrollWidth > c.clientWidth + 1,
            headlineOverflow: h ? h.scrollWidth > h.clientWidth + 1 : false,
            subtextOverflow: s ? s.scrollHeight > s.clientHeight + 2 : false,
            svgTextIssues,
          };
        });
        return {
          scrollWidth: root.scrollWidth,
          scrollHeight: root.scrollHeight,
          cardChecks,
        };
      })()`,
    });

    const audit = auditResult.result.value;
    console.log("DOM Audit:", JSON.stringify(audit, null, 2));

    if (audit.scrollWidth > 1024 || audit.scrollHeight > 1024) {
      throw new Error(`Viewport overflow: ${audit.scrollWidth}x${audit.scrollHeight}`);
    }
    for (const c of audit.cardChecks) {
      if (
        c.cardOverflowX ||
        c.cardOverflowY ||
        c.headlineOverflow ||
        c.subtextOverflow ||
        c.svgTextIssues.length > 0
      ) {
        throw new Error(`Card overflow detected in card ${c.card}: ${JSON.stringify(c)}`);
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
