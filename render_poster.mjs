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
    font-size: 10.5px;
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
    white-space: nowrap;
  }
  .mast-deck {
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 1.2px;
    color: #FCD34D;
    text-transform: uppercase;
    white-space: nowrap;
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
    white-space: nowrap;
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
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.35px;
    padding: 2px 6px;
    border-radius: 3px;
    color: #FFFFFF;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .loc-label {
    font-size: 9.8px;
    font-weight: 800;
    color: #334155;
    letter-spacing: 0.25px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .row-4 .beat-pill {
    font-size: 8.4px;
    padding: 2px 4px;
    letter-spacing: 0.15px;
  }
  .row-4 .loc-label {
    font-size: 8.4px;
    letter-spacing: 0.15px;
  }

  .headline {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 18.6px;
    font-weight: 900;
    color: #0F172A;
    line-height: 1.12;
    letter-spacing: -0.25px;
    margin: 2px 0 3px 0;
    white-space: nowrap;
    overflow: hidden;
    flex-shrink: 0;
  }
  .row-4 .headline {
    font-size: 15.6px;
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
    font-size: 11.6px;
    font-weight: 600;
    color: #1E293B;
    line-height: 1.24;
    margin-top: 4px;
    flex-shrink: 0;
  }
  .row-4 .subtext {
    font-size: 10.9px;
    line-height: 1.22;
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
        <div class="mast-edition">10 MAJOR STORIES · 6 CONTINENTS</div>
        <div class="mast-sub">9 BEATS · 00:00–24:00 UTC · 20 NOV 2026</div>
      </div>
      <div class="mast-center">
        <div class="mast-title">THE WORLD IN ONE DAY</div>
        <div class="mast-deck">10 MAJOR STORIES · 6 CONTINENTS · 9 BEATS</div>
      </div>
      <div class="mast-right">
        <div class="date-banner">FRIDAY · 20 NOVEMBER 2026</div>
        <div class="date-meta">ISSUE 2026-11-20 · ALL REGIONS &amp; BEATS</div>
      </div>
    </header>

    <!-- ROW 1: 3 HERO CARDS -->
    <section class="row-3">
      <!-- STORY 1: KYIV BRIDGES -->
      <article class="card hero">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">1</span>
            <span class="beat-pill" style="background:#B91C1C;">EUROPE · WAR</span>
          </div>
          <span class="loc-label">KYIV, UKRAINE</span>
        </div>
        <h2 class="headline">Missiles Hit 3 Kyiv Bridges</h2>
        <div class="art-box">
          <svg viewBox="0 0 308 192" xmlns="http://www.w3.org/2000/svg">
            <!-- Deep night sky over Kyiv -->
            <rect width="308" height="192" fill="#0B1120"/>
            <!-- Anti-aircraft searchlight beams sweeping sky -->
            <polygon points="42,108 86,0 110,0" fill="#1E293B" opacity="0.6"/>
            <polygon points="168,108 124,0 146,0" fill="#1E293B" opacity="0.6"/>
            <polygon points="246,108 204,0 226,0" fill="#1E293B" opacity="0.5"/>

            <!-- Billowing dark smoke plumes rising from the 3 bridge impacts -->
            <path d="M48,124 C36,92 58,64 42,24 C66,46 74,86 64,124 Z" fill="#334155" opacity="0.82"/>
            <path d="M148,128 C136,90 160,58 144,16 C170,42 176,86 164,128 Z" fill="#334155" opacity="0.85"/>
            <path d="M242,132 C232,98 254,68 242,30 C264,54 268,94 256,132 Z" fill="#334155" opacity="0.82"/>

            <!-- Darkened Kyiv skyline silhouette with cathedral domes & unlit apartment blocks -->
            <path d="M0,108 L16,108 L16,74 L34,74 L34,100 L48,100 L48,66 L54,46 L60,66 L60,102 L82,102 L82,72 L110,72 L110,104 L128,104 L128,68 L134,48 L140,68 L140,104 L172,104 L172,76 L202,76 L202,106 L224,106 L224,82 L250,82 L250,108 L308,108 L308,120 L0,120 Z" fill="#162032"/>
            <!-- Cathedral onion domes & crosses -->
            <circle cx="54" cy="45" r="5.5" fill="#475569"/>
            <line x1="54" y1="35" x2="54" y2="41" stroke="#64748B" stroke-width="1.8"/>
            <line x1="51" y1="38" x2="57" y2="38" stroke="#64748B" stroke-width="1.5"/>
            <circle cx="134" cy="47" r="5.5" fill="#475569"/>
            <line x1="134" y1="37" x2="134" y2="43" stroke="#64748B" stroke-width="1.8"/>
            <line x1="131" y1="40" x2="137" y2="40" stroke="#64748B" stroke-width="1.5"/>
            <!-- Darkened unlit apartment window grids -->
            <g fill="#090D16">
              <rect x="20" y="80" width="4" height="5"/><rect x="26" y="80" width="4" height="5"/>
              <rect x="20" y="88" width="4" height="5"/><rect x="26" y="88" width="4" height="5"/>
              <rect x="87" y="78" width="5" height="5"/><rect x="96" y="78" width="5" height="5"/>
              <rect x="87" y="87" width="5" height="5"/><rect x="96" y="87" width="5" height="5"/>
              <rect x="178" y="82" width="5" height="5"/><rect x="188" y="82" width="5" height="5"/>
              <rect x="178" y="91" width="5" height="5"/><rect x="188" y="91" width="5" height="5"/>
            </g>

            <!-- Incoming Red Missile & Drone Streaks Across Sky -->
            <path d="M12,14 Q36,64 55,122" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="6,3"/>
            <polygon points="55,122 48,113 56,111" fill="#FCA5A5"/>
            <path d="M104,10 Q132,64 154,126" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="6,3"/>
            <polygon points="154,126 147,117 155,115" fill="#FCA5A5"/>
            <path d="M196,14 Q224,68 248,130" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="6,3"/>
            <polygon points="248,130 241,121 249,119" fill="#FCA5A5"/>
            <!-- Delta-wing Shahed-style drone silhouettes in sky -->
            <polygon points="82,28 96,23 91,31 96,36" fill="#EF4444" stroke="#FCA5A5" stroke-width="1"/>
            <polygon points="174,24 188,19 183,27 188,32" fill="#EF4444" stroke="#FCA5A5" stroke-width="1"/>

            <!-- Circular Blackout & Water-Out Icon Medallion (Top Right) -->
            <g transform="translate(268, 32)">
              <circle cx="0" cy="0" r="24" fill="#1E293B" stroke="#F59E0B" stroke-width="2.2"/>
              <!-- Lightning bolt -->
              <polygon points="-6,-13 -14,-1 -7,-1 -11,12 2,-3 -5,-3" fill="#FACC15"/>
              <!-- Water droplet -->
              <path d="M9,-10 C9,-10 2,0 2,5 C2,9 5.2,12 9,12 C12.8,12 16,9 16,5 C16,0 9,-10 9,-10 Z" fill="#38BDF8"/>
              <!-- Red blackout slash -->
              <line x1="-17" y1="15" x2="17" y2="-15" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>
            </g>

            <!-- Dnieper River water -->
            <rect x="0" y="116" width="308" height="76" fill="#082F49"/>
            <path d="M0,134 Q77,128 154,134 T308,134 L308,192 L0,192 Z" fill="#0C4A6E"/>

            <!-- Shimmering Orange & Gold Fire Reflections on the Dnieper River -->
            <ellipse cx="55" cy="162" rx="22" ry="4" fill="#F97316" opacity="0.55"/>
            <ellipse cx="55" cy="171" rx="14" ry="2.5" fill="#FEF08A" opacity="0.5"/>
            <ellipse cx="55" cy="178" rx="8" ry="1.8" fill="#F97316" opacity="0.4"/>

            <ellipse cx="154" cy="166" rx="24" ry="4.2" fill="#F97316" opacity="0.55"/>
            <ellipse cx="154" cy="175" rx="15" ry="2.5" fill="#FEF08A" opacity="0.5"/>
            <ellipse cx="154" cy="182" rx="9" ry="1.8" fill="#F97316" opacity="0.4"/>

            <ellipse cx="248" cy="170" rx="20" ry="3.8" fill="#F97316" opacity="0.55"/>
            <ellipse cx="248" cy="179" rx="12" ry="2.2" fill="#FEF08A" opacity="0.5"/>

            <!-- 3 Distinct Arched & Cable-Stayed Bridges Across the Dnieper -->
            <!-- Bridge 1 (Left Arch Span) -->
            <path d="M8,144 Q55,104 102,144" fill="none" stroke="#94A3B8" stroke-width="5.5"/>
            <line x1="4" y1="128" x2="104" y2="128" stroke="#E2E8F0" stroke-width="4"/>
            <line x1="26" y1="128" x2="26" y2="152" stroke="#64748B" stroke-width="4"/>
            <line x1="84" y1="128" x2="84" y2="152" stroke="#64748B" stroke-width="4"/>

            <!-- Bridge 2 (Center Cable-Stayed Pylon Bridge) -->
            <line x1="154" y1="90" x2="154" y2="156" stroke="#E2E8F0" stroke-width="4.5"/>
            <line x1="154" y1="94" x2="112" y2="132" stroke="#94A3B8" stroke-width="1.6"/>
            <line x1="154" y1="102" x2="124" y2="132" stroke="#94A3B8" stroke-width="1.6"/>
            <line x1="154" y1="94" x2="196" y2="132" stroke="#94A3B8" stroke-width="1.6"/>
            <line x1="154" y1="102" x2="184" y2="132" stroke="#94A3B8" stroke-width="1.6"/>
            <line x1="106" y1="132" x2="202" y2="132" stroke="#E2E8F0" stroke-width="4"/>

            <!-- Bridge 3 (Right Tied-Arch Girder Bridge) -->
            <path d="M204,150 Q248,112 294,150" fill="none" stroke="#94A3B8" stroke-width="5.5"/>
            <line x1="202" y1="136" x2="298" y2="136" stroke="#E2E8F0" stroke-width="4"/>
            <line x1="222" y1="136" x2="222" y2="158" stroke="#64748B" stroke-width="4"/>
            <line x1="276" y1="136" x2="276" y2="158" stroke="#64748B" stroke-width="4"/>

            <!-- 3 Vivid Multi-Layered Explosion Fireballs on the 3 Bridge Spans -->
            <!-- Fireball 1 -->
            <circle cx="55" cy="124" r="21" fill="#DC2626" opacity="0.85"/>
            <polygon points="55,98 61,114 78,111 66,124 75,138 59,132 55,146 49,132 34,137 44,124 33,111 49,114" fill="#F97316"/>
            <circle cx="55" cy="124" r="8" fill="#FEF08A"/>

            <!-- Fireball 2 -->
            <circle cx="154" cy="128" r="22" fill="#DC2626" opacity="0.85"/>
            <polygon points="154,100 160,117 178,114 165,128 175,142 159,136 154,150 148,136 132,141 143,128 131,114 148,117" fill="#F97316"/>
            <circle cx="154" cy="128" r="8.5" fill="#FEF08A"/>

            <!-- Fireball 3 -->
            <circle cx="248" cy="132" r="20" fill="#DC2626" opacity="0.85"/>
            <polygon points="248,106 254,122 270,119 258,132 267,145 253,140 248,153 242,140 228,144 238,132 227,119 242,122" fill="#F97316"/>
            <circle cx="248" cy="132" r="7.5" fill="#FEF08A"/>
          </svg>
        </div>
        <p class="subtext">Overnight raid of <strong>~110 missiles &amp; 400 drones</strong> hits 3 Dnieper bridges, <strong>killing 9</strong> &amp; cutting Kyiv power &amp; water.</p>
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
          <svg viewBox="0 0 308 192" xmlns="http://www.w3.org/2000/svg">
            <!-- Deep Bay of Bengal ocean -->
            <rect width="308" height="192" fill="#075985"/>
            <path d="M110,0 L308,0 L308,192 L50,192 Z" fill="#0C4A6E"/>
            <!-- Ocean wave crests & rain bands -->
            <path d="M204,162 Q218,155 232,162 T260,162" fill="none" stroke="#38BDF8" stroke-width="2.2"/>
            <path d="M232,176 Q246,169 260,176 T288,176" fill="none" stroke="#38BDF8" stroke-width="2.2"/>
            <line x1="158" y1="22" x2="138" y2="46" stroke="#7DD3FC" stroke-width="1.5" opacity="0.55"/>
            <line x1="256" y1="28" x2="236" y2="52" stroke="#7DD3FC" stroke-width="1.5" opacity="0.55"/>
            <line x1="282" y1="106" x2="262" y2="130" stroke="#7DD3FC" stroke-width="1.5" opacity="0.55"/>

            <!-- Authentic Eastern India / Odisha Coastline Curve -->
            <path d="M0,0 L186,0 L170,30 L152,52 L136,76 C128,82 120,78 118,86 C116,92 124,94 118,102 L96,132 L68,162 L34,192 L0,192 Z" fill="#BBF7D0" stroke="#15803D" stroke-width="3"/>
            <path d="M0,0 L146,0 L132,36 L108,72 L82,108 L44,150 L0,180 Z" fill="#86EFAC"/>

            <!-- Civil-Defense Shelter House & Checkmark Shield on Higher Ground (Top Left) -->
            <g transform="translate(12, 12)">
              <circle cx="38" cy="38" r="34" fill="#065F46" stroke="#34D399" stroke-width="2.8"/>
              <!-- White Shelter Roof & House -->
              <polygon points="38,14 14,32 21,32 21,56 55,56 55,32 62,32" fill="#10B981" stroke="#FFFFFF" stroke-width="2.2" stroke-linejoin="round"/>
              <!-- Bold Gold Checkmark inside Shelter -->
              <path d="M29,40 L36,47 L48,32" fill="none" stroke="#FEF08A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </g>

            <!-- Wind-Whipped Coastal Coconut Palms -->
            <g stroke-linecap="round">
              <path d="M84,138 Q68,114 46,110" fill="none" stroke="#78350F" stroke-width="3.5"/>
              <path d="M46,110 Q30,103 24,110 M46,110 Q28,112 26,122 M46,110 Q34,94 26,98 M46,110 Q42,92 35,92" fill="none" stroke="#15803D" stroke-width="2.5"/>
              <path d="M102,122 Q86,98 64,94" fill="none" stroke="#78350F" stroke-width="3.5"/>
              <path d="M64,94 Q48,87 42,94 M64,94 Q46,96 44,106 M64,94 Q52,78 44,82" fill="none" stroke="#15803D" stroke-width="2.5"/>
            </g>

            <!-- Large Multi-Arm Swirling Cyclone Vortex -->
            <g transform="translate(198, 94)">
              <circle cx="0" cy="0" r="68" fill="#38BDF8" opacity="0.18"/>
              <circle cx="0" cy="0" r="52" fill="#BAE6FD" opacity="0.26"/>
              <circle cx="0" cy="0" r="35" fill="#E0F2FE" opacity="0.34"/>
              <!-- 4 Bold Spiral Rainband Arms -->
              <path d="M-12,-58 C36,-64 68,-24 56,22 C48,56 4,68 -34,52" fill="none" stroke="#E0F2FE" stroke-width="7" stroke-linecap="round"/>
              <path d="M14,56 C-32,64 -66,26 -54,-18 C-46,-54 -4,-66 32,-50" fill="none" stroke="#7DD3FC" stroke-width="6.5" stroke-linecap="round"/>
              <path d="M-32,-22 C-12,-44 28,-36 36,-8 C44,18 18,44 -14,34" fill="none" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round"/>
              <path d="M26,18 C10,36 -22,28 -30,4 C-36,-18 -16,-36 12,-28" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
              <!-- Calm Cyclone Eye -->
              <circle cx="0" cy="0" r="13" fill="#075985" stroke="#FACC15" stroke-width="4"/>
            </g>

            <!-- Red Landfall Track Arrow & Gopalpur Bullseye -->
            <path d="M254,124 L128,96" fill="none" stroke="#EF4444" stroke-width="4.5" stroke-dasharray="8,4"/>
            <polygon points="118,94 135,89 131,105" fill="#EF4444"/>
            <circle cx="114" cy="93" r="14" fill="#DC2626" opacity="0.35"/>
            <circle cx="114" cy="93" r="6.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="2.5"/>
          </svg>
        </div>
        <p class="subtext">Crosses near <strong>Gopalpur</strong> after <strong>300,000+ evacuate</strong> to shelters; <strong>zero fatalities</strong> reported as storm weakens.</p>
      </article>

      <!-- STORY 3: ASIA AI SELL-OFF -->
      <article class="card hero-3">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">3</span>
            <span class="beat-pill" style="background:#1E3A8A;">ASIA &amp; GLOBAL · MARKETS</span>
          </div>
          <span class="loc-label">TAIPEI · SEOUL · TOKYO</span>
        </div>
        <h2 class="headline">AI Chip Rout Sinks Asia Stocks</h2>
        <div class="art-box">
          <svg viewBox="0 0 308 192" xmlns="http://www.w3.org/2000/svg">
            <rect width="308" height="192" fill="#0B1120"/>
            <!-- Financial Terminal Gridlines -->
            <g stroke="#1E293B" stroke-width="1">
              <line x1="0" y1="38" x2="308" y2="38"/>
              <line x1="0" y1="76" x2="308" y2="76"/>
              <line x1="0" y1="114" x2="308" y2="114"/>
              <line x1="0" y1="152" x2="308" y2="152"/>
              <line x1="112" y1="0" x2="112" y2="192"/>
              <line x1="176" y1="0" x2="176" y2="192"/>
              <line x1="240" y1="0" x2="240" y2="192"/>
            </g>

            <!-- Left Section: Large Gold-Pinned Silicon AI Microchip Cracking + Bitcoin Coin -->
            <g transform="translate(54, 62)">
              <!-- Gold Microchip Pins (Top, Bottom, Left, Right) -->
              <g stroke="#FACC15" stroke-width="3.5" stroke-linecap="round">
                <line x1="-22" y1="-42" x2="-22" y2="-32"/><line x1="-8" y1="-42" x2="-8" y2="-32"/><line x1="8" y1="-42" x2="8" y2="-32"/><line x1="22" y1="-42" x2="22" y2="-32"/>
                <line x1="-22" y1="32" x2="-22" y2="42"/><line x1="-8" y1="32" x2="-8" y2="42"/><line x1="8" y1="32" x2="8" y2="42"/><line x1="22" y1="32" x2="22" y2="42"/>
                <line x1="-42" y1="-22" x2="-32" y2="-22"/><line x1="-42" y1="-8" x2="-32" y2="-8"/><line x1="-42" y1="8" x2="-32" y2="8"/><line x1="-42" y1="22" x2="-32" y2="22"/>
                <line x1="32" y1="-22" x2="42" y2="-22"/><line x1="32" y1="-8" x2="42" y2="-8"/><line x1="32" y1="8" x2="42" y2="8"/><line x1="32" y1="22" x2="42" y2="22"/>
              </g>
              <!-- Silicon Package & Inner Die -->
              <rect x="-32" y="-32" width="64" height="64" rx="7" fill="#1E293B" stroke="#38BDF8" stroke-width="2.5"/>
              <rect x="-20" y="-20" width="40" height="40" rx="3" fill="#0F172A" stroke="#7DD3FC" stroke-width="1.5"/>
              <!-- Red Valuation Crack Across Chip -->
              <path d="M-26,-26 L-4,-6 L6,-12 L26,26" fill="none" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="0" y="7" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900">AI</text>
            </g>

            <!-- Gold Bitcoin Medallion Dipping (Bottom Left) -->
            <g transform="translate(54, 152)">
              <circle cx="-12" cy="0" r="22" fill="#F59E0B" stroke="#FEF08A" stroke-width="2.2"/>
              <text x="-12" y="8" text-anchor="middle" fill="#FFFFFF" font-size="22" font-weight="900">₿</text>
              <!-- Red downward plunge arrow next to coin -->
              <path d="M20,-14 L20,12 M11,3 L20,14 L29,3" fill="none" stroke="#EF4444" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </g>

            <!-- Right Section: Plunging Red Market Trendline & 3 Bold Red Index Columns -->
            <path d="M116,18 L158,34 L202,28 L248,66 L288,108" fill="none" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>
            <polygon points="294,114 279,110 290,99" fill="#EF4444"/>

            <!-- Bar 1: TAIEX -6.2% -->
            <text x="118" y="34" fill="#E2E8F0" font-size="13" font-weight="900">TAIEX</text>
            <rect x="118" y="40" width="176" height="28" rx="4" fill="#DC2626" stroke="#FCA5A5" stroke-width="1.2"/>
            <text x="286" y="60" text-anchor="end" fill="#FFFFFF" font-size="16.5" font-weight="900">-6.2%</text>

            <!-- Bar 2: KOSPI -5.2% -->
            <text x="118" y="90" fill="#E2E8F0" font-size="13" font-weight="900">KOSPI</text>
            <rect x="118" y="96" width="148" height="28" rx="4" fill="#E11D48" stroke="#FDA4AF" stroke-width="1.2"/>
            <text x="258" y="116" text-anchor="end" fill="#FFFFFF" font-size="16" font-weight="900">-5.2%</text>

            <!-- Bar 3: NIKKEI -5.1% -->
            <text x="118" y="146" fill="#E2E8F0" font-size="13" font-weight="900">NIKKEI</text>
            <rect x="118" y="152" width="144" height="28" rx="4" fill="#F43F5E" stroke="#FECDD3" stroke-width="1.2"/>
            <text x="254" y="172" text-anchor="end" fill="#FFFFFF" font-size="16" font-weight="900">-5.1%</text>
          </svg>
        </div>
        <p class="subtext">Taiwan falls <strong>6.2%</strong> (worst week since 1991), Seoul <strong>-5.2%</strong> &amp; Tokyo <strong>-5.1%</strong> on AI valuation fears; Bitcoin dips to <strong>$61.4K</strong>.</p>
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
          <svg viewBox="0 0 308 164" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="uk-circle-clip">
                <circle cx="0" cy="0" r="35"/>
              </clipPath>
            </defs>
            <rect width="308" height="164" fill="#EFF6FF"/>
            <!-- Subtle English Channel water waves at bottom -->
            <path d="M0,142 Q77,136 154,142 T308,142 L308,164 L0,164 Z" fill="#DBEAFE"/>

            <!-- Golden Stone Arch Bridge Spanning Between UK & EU -->
            <path d="M24,96 Q154,28 284,96" fill="none" stroke="#B45309" stroke-width="11" stroke-linecap="round"/>
            <path d="M24,96 Q154,28 284,96" fill="none" stroke="#FACC15" stroke-width="5" stroke-linecap="round"/>
            <!-- Golden Handshake / Keystone Clasp at Bridge Apex -->
            <circle cx="154" cy="54" r="16" fill="#0F172A" stroke="#FACC15" stroke-width="3"/>
            <path d="M144,54 L164,54 M150,48 L158,48 M150,60 L158,60" stroke="#FEF08A" stroke-width="2.5" stroke-linecap="round"/>

            <!-- Left: Large Crisp Union Jack Circle -->
            <g transform="translate(76, 48)">
              <g clip-path="url(#uk-circle-clip)">
                <rect x="-36" y="-36" width="72" height="72" fill="#1E3A8A"/>
                <path d="M-36,-36 L36,36 M-36,36 L36,-36" stroke="#FFFFFF" stroke-width="10"/>
                <path d="M-36,-36 L36,36 M-36,36 L36,-36" stroke="#DC2626" stroke-width="5"/>
                <path d="M-36,0 L36,0 M0,-36 L0,36" stroke="#FFFFFF" stroke-width="14"/>
                <path d="M-36,0 L36,0 M0,-36 L0,36" stroke="#DC2626" stroke-width="8"/>
              </g>
              <circle cx="0" cy="0" r="35" fill="none" stroke="#0F172A" stroke-width="3.5"/>
            </g>

            <!-- Right: Large Crisp EU 12-Gold-Star Circle -->
            <g transform="translate(232, 48)">
              <circle cx="0" cy="0" r="35" fill="#1D4ED8" stroke="#FACC15" stroke-width="3.5"/>
              <circle cx="0" cy="-22" r="3" fill="#FACC15"/>
              <circle cx="11" cy="-19" r="3" fill="#FACC15"/>
              <circle cx="19" cy="-11" r="3" fill="#FACC15"/>
              <circle cx="22" cy="0" r="3" fill="#FACC15"/>
              <circle cx="19" cy="11" r="3" fill="#FACC15"/>
              <circle cx="11" cy="19" r="3" fill="#FACC15"/>
              <circle cx="0" cy="22" r="3" fill="#FACC15"/>
              <circle cx="-11" cy="19" r="3" fill="#FACC15"/>
              <circle cx="-19" cy="11" r="3" fill="#FACC15"/>
              <circle cx="-22" cy="0" r="3" fill="#FACC15"/>
              <circle cx="-19" cy="-11" r="3" fill="#FACC15"/>
              <circle cx="-11" cy="-19" r="3" fill="#FACC15"/>
            </g>

            <!-- 3 Large Illustrated Pictogram Medallions Underneath Bridge -->
            <!-- 1. Blue Passport (Youth Mobility) -->
            <g transform="translate(64, 124)">
              <circle cx="0" cy="0" r="28" fill="#FFFFFF" stroke="#1D4ED8" stroke-width="3"/>
              <rect x="-12" y="-17" width="24" height="34" rx="3" fill="#1E3A8A" stroke="#93C5FD" stroke-width="1.2"/>
              <circle cx="0" cy="-3" r="6.5" fill="none" stroke="#FACC15" stroke-width="1.8"/>
              <line x1="-7" y1="9" x2="7" y2="9" stroke="#FACC15" stroke-width="2"/>
            </g>

            <!-- 2. Golden Wheat Sheaf (Agrifood Trade) -->
            <g transform="translate(154, 124)">
              <circle cx="0" cy="0" r="28" fill="#FFFFFF" stroke="#047857" stroke-width="3"/>
              <line x1="0" y1="18" x2="0" y2="-16" stroke="#D97706" stroke-width="3" stroke-linecap="round"/>
              <ellipse cx="-7" cy="-10" rx="5.5" ry="3" transform="rotate(-30 -7 -10)" fill="#F59E0B"/>
              <ellipse cx="7" cy="-10" rx="5.5" ry="3" transform="rotate(30 7 -10)" fill="#F59E0B"/>
              <ellipse cx="-7" cy="-1" rx="5.5" ry="3" transform="rotate(-30 -7 -1)" fill="#F59E0B"/>
              <ellipse cx="7" cy="-1" rx="5.5" ry="3" transform="rotate(30 7 -1)" fill="#F59E0B"/>
              <ellipse cx="-6" cy="8" rx="5" ry="2.8" transform="rotate(-30 -6 8)" fill="#F59E0B"/>
              <ellipse cx="6" cy="8" rx="5" ry="2.8" transform="rotate(30 6 8)" fill="#F59E0B"/>
            </g>

            <!-- 3. Green Leaf & Carbon Cycle Arrows (Carbon ETS Link) -->
            <g transform="translate(244, 124)">
              <circle cx="0" cy="0" r="28" fill="#FFFFFF" stroke="#B45309" stroke-width="3"/>
              <circle cx="0" cy="0" r="19" fill="none" stroke="#16A34A" stroke-width="2.5" stroke-dasharray="18,6"/>
              <path d="M-10,10 C-10,-8 10,-12 12,-12 C12,-12 10,10 -10,10 Z" fill="#16A34A"/>
              <path d="M-10,10 L4,-4" stroke="#DCFCE7" stroke-width="2" stroke-linecap="round"/>
            </g>
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
          <svg viewBox="0 0 308 164" xmlns="http://www.w3.org/2000/svg">
            <rect width="308" height="164" fill="#F0FDFA"/>
            <!-- Center Fulcrum: Large Warming Earth Globe -->
            <g transform="translate(154, 102)">
              <circle cx="0" cy="0" r="42" fill="#0284C7" stroke="#0F172A" stroke-width="2.8"/>
              <!-- Latitude / Longitude Grid -->
              <ellipse cx="0" cy="0" rx="22" ry="42" fill="none" stroke="#7DD3FC" stroke-width="1.1" opacity="0.75"/>
              <line x1="-42" y1="0" x2="42" y2="0" stroke="#7DD3FC" stroke-width="1.1" opacity="0.75"/>
              <line x1="-36" y1="-21" x2="36" y2="-21" stroke="#7DD3FC" stroke-width="1.1" opacity="0.75"/>
              <line x1="-36" y1="21" x2="36" y2="21" stroke="#7DD3FC" stroke-width="1.1" opacity="0.75"/>
              <!-- Green Continents -->
              <path d="M-22,-22 Q-6,-30 6,-16 Q18,-6 4,20 Q-14,26 -24,4 Z" fill="#16A34A"/>
              <path d="M14,-22 Q32,-12 28,8 Q18,16 14,-2 Z" fill="#16A34A"/>
              <!-- Red Atmospheric Heat Ring -->
              <circle cx="0" cy="0" r="47" fill="none" stroke="#EF4444" stroke-width="2.8" stroke-dasharray="6,4"/>
            </g>

            <!-- Top Center: Heavy Wooden Gavel & Red-Sand Hourglass Tilted in Deadlock -->
            <g transform="translate(154, 30)">
              <!-- Hourglass on left of apex -->
              <polygon points="-28,-16 -8,-16 -18,-2 -8,12 -28,12 -18,-2" fill="#FEF08A" stroke="#0F172A" stroke-width="2" stroke-linejoin="round"/>
              <line x1="-31" y1="-16" x2="-5" y2="-16" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
              <line x1="-31" y1="12" x2="-5" y2="12" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
              <!-- Wooden Gavel on right of apex -->
              <line x1="-2" y1="0" x2="30" y2="-8" stroke="#78350F" stroke-width="5.5" stroke-linecap="round"/>
              <rect x="20" y="-20" width="15" height="24" rx="2.5" transform="rotate(-14 27 -8)" fill="#B45309" stroke="#451A03" stroke-width="2"/>
            </g>

            <!-- Heavy Brass Balance Scale Beam & Chains -->
            <line x1="48" y1="60" x2="260" y2="82" stroke="#0F172A" stroke-width="6" stroke-linecap="round"/>
            <line x1="48" y1="60" x2="260" y2="82" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Left & Right Scale Suspension Chains -->
            <line x1="34" y1="118" x2="52" y2="61" stroke="#475569" stroke-width="2"/>
            <line x1="74" y1="118" x2="52" y2="61" stroke="#475569" stroke-width="2"/>
            <line x1="234" y1="136" x2="254" y2="81" stroke="#475569" stroke-width="2"/>
            <line x1="278" y1="136" x2="254" y2="81" stroke="#475569" stroke-width="2"/>

            <!-- Left Pan: Dark Factory Smokestacks Puffing Smoke & Black Oil Barrel -->
            <g transform="translate(8, 118)">
              <!-- Brass Scale Pan Dish -->
              <path d="M2,0 L94,0 L84,12 L12,12 Z" fill="#D97706" stroke="#78350F" stroke-width="2"/>
              <!-- Billowing dark smoke clouds -->
              <circle cx="24" cy="-54" r="8" fill="#64748B"/>
              <circle cx="34" cy="-60" r="10" fill="#475569"/>
              <circle cx="48" cy="-52" r="7.5" fill="#64748B"/>
              <!-- 2 Tall Factory Smokestacks -->
              <polygon points="16,0 20,-42 32,-42 36,0" fill="#334155" stroke="#0F172A" stroke-width="1.5"/>
              <rect x="19" y="-36" width="14" height="5" fill="#DC2626"/>
              <polygon points="38,0 42,-36 54,-36 58,0" fill="#334155" stroke="#0F172A" stroke-width="1.5"/>
              <rect x="41" y="-30" width="14" height="5" fill="#DC2626"/>
              <!-- Black Oil Drum Barrel -->
              <rect x="62" y="-32" width="24" height="32" rx="3" fill="#0F172A" stroke="#EF4444" stroke-width="2"/>
              <line x1="62" y1="-21" x2="86" y2="-21" stroke="#EF4444" stroke-width="2"/>
              <line x1="62" y1="-10" x2="86" y2="-10" stroke="#EF4444" stroke-width="2"/>
            </g>

            <!-- Right Pan: Bright Blue Solar Panel, White Wind Turbine & Gold $ Coin Stack -->
            <g transform="translate(204, 136)">
              <!-- Brass Scale Pan Dish -->
              <path d="M2,0 L94,0 L84,12 L12,12 Z" fill="#D97706" stroke="#78350F" stroke-width="2"/>
              <!-- Blue Solar Panel Array -->
              <polygon points="8,0 18,-28 48,-28 40,0" fill="#0284C7" stroke="#E0F2FE" stroke-width="2"/>
              <line x1="28" y1="-28" x2="22" y2="0" stroke="#7DD3FC" stroke-width="1.2"/>
              <line x1="38" y1="-28" x2="32" y2="0" stroke="#7DD3FC" stroke-width="1.2"/>
              <line x1="13" y1="-14" x2="44" y2="-14" stroke="#7DD3FC" stroke-width="1.2"/>
              <!-- White Wind Turbine -->
              <line x1="54" y1="-44" x2="54" y2="0" stroke="#0F172A" stroke-width="3"/>
              <path d="M54,-44 L40,-56 M54,-44 L70,-52 M54,-44 L56,-28" stroke="#0F766E" stroke-width="3" stroke-linecap="round"/>
              <circle cx="54" cy="-44" r="3" fill="#FACC15"/>
              <!-- Gold Climate-Finance Coin Stack -->
              <circle cx="76" cy="-16" r="15" fill="#FACC15" stroke="#B45309" stroke-width="2.2"/>
              <text x="76" y="-10" text-anchor="middle" fill="#78350F" font-size="18" font-weight="900">$</text>
            </g>
          </svg>
        </div>
        <p class="subtext">Talks stall on closing day as nations clash over <strong>fossil-fuel phaseout</strong> &amp; <strong>transition finance</strong>.</p>
      </article>

      <!-- STORY 6: HORMUZ TANKER FIRE & MIDEAST -->
      <article class="card row2-3">
        <div class="card-header">
          <div class="tag-group">
            <span class="story-num">6</span>
            <span class="beat-pill" style="background:#991B1B;">MIDDLE EAST · SECURITY</span>
          </div>
          <span class="loc-label">OMAN · GAZA · LEBANON</span>
        </div>
        <h2 class="headline" style="font-size:16.1px;letter-spacing:-0.35px;">Hormuz Tanker Fire &amp; Mideast Strikes</h2>
        <div class="art-box">
          <svg viewBox="0 0 308 164" xmlns="http://www.w3.org/2000/svg">
            <!-- Left/Center (62%): Turquoise Strait of Hormuz Channel & Burning Oil Supertanker -->
            <rect x="0" y="0" width="196" height="164" fill="#0369A1"/>
            <path d="M0,45 Q98,55 196,45 L196,164 L0,164 Z" fill="#075985"/>
            <!-- Northern sandy coastline -->
            <path d="M0,0 L196,0 L196,36 L160,28 L128,24 L96,36 L58,32 L28,24 L0,34 Z" fill="#E7E5E4" stroke="#78716C" stroke-width="2"/>
            <!-- Southern Musandam (Khasab, Oman) Peninsula jutting into Strait -->
            <path d="M16,164 L66,138 L100,108 L116,100 L128,108 L146,140 L182,164 Z" fill="#FDE68A" stroke="#B45309" stroke-width="2.2"/>
            <circle cx="114" cy="116" r="5" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.8"/>

            <!-- Large Dark Oil Supertanker Silhouette Billowing Bright Orange Flames & Black Smoke -->
            <g transform="translate(34, 66)">
              <!-- Towering Black Smoke Plume -->
              <path d="M52,14 C38,-14 64,-30 48,-56 C72,-42 86,-14 70,14 Z" fill="#1E293B" opacity="0.9"/>
              <circle cx="58" cy="-18" r="14" fill="#334155"/>
              <!-- Supertanker Hull, Bow, Deck Pipelines & Bridge Tower -->
              <polygon points="0,20 112,20 100,36 12,36" fill="#1E293B" stroke="#E2E8F0" stroke-width="1.8"/>
              <rect x="16" y="12" width="12" height="8" fill="#64748B"/>
              <rect x="80" y="4" width="16" height="16" fill="#F8FAFC" stroke="#475569" stroke-width="1.2"/>
              <!-- Vivid Multi-Layered Orange & Yellow Fireball on Tanker Deck -->
              <circle cx="52" cy="10" r="19" fill="#DC2626" opacity="0.9"/>
              <polygon points="52,-15 59,0 74,-3 63,10 72,22 52,18 35,22 42,10 31,-3 45,0" fill="#F97316"/>
              <circle cx="52" cy="10" r="8" fill="#FEF08A"/>
            </g>

            <!-- Divider Line -->
            <line x1="196" y1="0" x2="196" y2="164" stroke="#0F172A" stroke-width="3"/>

            <!-- Right (38%): Smoky Levant Horizon & White UN Humanitarian Relief Tent / Aid Emblem -->
            <rect x="197" y="0" width="111" height="164" fill="#1E293B"/>
            <!-- Smoky dusk horizon over hills -->
            <path d="M197,96 Q226,82 254,92 T308,88 L308,164 L197,164 Z" fill="#334155"/>
            <circle cx="228" cy="40" r="18" fill="#475569" opacity="0.6"/>
            <circle cx="248" cy="32" r="22" fill="#475569" opacity="0.5"/>

            <!-- Large Crisp UN Blue Circle & White Humanitarian Relief Tent + Red Cross/Crescent Aid Shield -->
            <g transform="translate(252, 86)">
              <circle cx="0" cy="0" r="40" fill="#0284C7" stroke="#FFFFFF" stroke-width="3"/>
              <!-- White Humanitarian Relief Tent Silhouette -->
              <polygon points="0,-24 -26,12 26,12" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="0,-6 -8,12 8,12" fill="#0369A1"/>
              <!-- Red Medical/Relief Cross on Tent Roof -->
              <path d="M0,-18 L0,-10 M-4,-14 L4,-14" stroke="#DC2626" stroke-width="3" stroke-linecap="round"/>
              <!-- Olive branch wreath arcs at bottom of medallion -->
              <path d="M-24,18 Q0,32 24,18" fill="none" stroke="#FEF08A" stroke-width="3" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
        <p class="subtext">Oil tanker explodes ablaze off <strong>Khasab</strong> in Strait of Hormuz; <strong>UN warns</strong> over Gaza &amp; south Lebanon displacement.</p>
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
          <svg viewBox="0 0 228 164" xmlns="http://www.w3.org/2000/svg">
            <!-- Soft blue ocean background -->
            <rect width="228" height="164" fill="#E0F2FE"/>
            <!-- Large Geographically Accurate Warm-Ochre Silhouette of Africa + Madagascar -->
            <path d="M44,14 L78,8 L104,16 L118,14 L132,24 L144,48 L164,54 L152,76 L138,98 L138,120 L122,142 L102,156 L88,154 L84,132 L78,106 L80,84 L68,68 L44,68 L24,58 L18,40 L26,22 Z" fill="#FBBF24" stroke="#92400E" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Madagascar Island -->
            <path d="M152,116 L160,114 L158,136 L150,134 Z" fill="#FBBF24" stroke="#92400E" stroke-width="2"/>

            <!-- Bright Blue 16-Star Ring Glowing on Dakar (West Africa) + Migration Route Arcs -->
            <path d="M22,42 Q44,22 76,24" fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-dasharray="4,3"/>
            <path d="M22,42 Q48,54 74,56" fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-dasharray="4,3"/>
            <g transform="translate(26, 42)">
              <circle cx="0" cy="0" r="18" fill="#1E3A8A" stroke="#FFFFFF" stroke-width="2"/>
              <circle cx="0" cy="0" r="12" fill="none" stroke="#FACC15" stroke-width="3" stroke-dasharray="2.5,2.2"/>
              <circle cx="0" cy="0" r="4.5" fill="#38BDF8" stroke="#FFFFFF" stroke-width="1.5"/>
            </g>

            <!-- Eastern DRC (Ituri) Pin & Connecting Line to Large Red Dry-Faucet Medallion -->
            <circle cx="116" cy="84" r="11" fill="#DC2626" opacity="0.35"/>
            <circle cx="116" cy="84" r="5.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
            <line x1="122" y1="84" x2="152" y2="96" stroke="#DC2626" stroke-width="3"/>

            <!-- Large Bold Red Circle on Right: Dry Faucet Tap & Crossed-Out Water Drop -->
            <g transform="translate(178, 108)">
              <circle cx="0" cy="0" r="40" fill="#991B1B" stroke="#FFFFFF" stroke-width="3"/>
              <!-- Brass Faucet Tap Spigot -->
              <path d="M-20,-18 L0,-18 L0,-10" fill="none" stroke="#FACC15" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="-10" y1="-25" x2="6" y2="-25" stroke="#FEF08A" stroke-width="3.5" stroke-linecap="round"/>
              <line x1="-2" y1="-25" x2="-2" y2="-18" stroke="#FEF08A" stroke-width="3.5"/>
              <!-- Blue Water Droplet Below Tap -->
              <path d="M0,-4 C0,-4 -14,12 -14,20 C-14,27.7 -7.7,33 0,33 C7.7,33 14,27.7 14,20 C14,12 0,-4 0,-4 Z" fill="#38BDF8" stroke="#E0F2FE" stroke-width="1.5"/>
              <!-- Bold Red Slash Across Water Droplet -->
              <line x1="-24" y1="26" x2="24" y2="-14" stroke="#EF4444" stroke-width="6" stroke-linecap="round"/>
              <line x1="-24" y1="26" x2="24" y2="-14" stroke="#FEF08A" stroke-width="2" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
        <p class="subtext"><strong>16 West African states</strong> back migration pact; UN says <strong>76,000 in Ituri</strong> lost safe water.</p>
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
          <svg viewBox="0 0 228 164" xmlns="http://www.w3.org/2000/svg">
            <rect width="228" height="164" fill="#FFF1F2"/>
            <!-- Left Half: Clean North, Central & South America Map with US, Mexico & Bolivia in Vivid Crimson -->
            <!-- Canada top silhouette -->
            <path d="M10,8 L74,8 L68,26 L14,26 Z" fill="#CBD5E1" stroke="#64748B" stroke-width="1.2"/>
            <!-- United States (Vivid Crimson) -->
            <path d="M12,26 L74,26 L78,40 L64,56 L44,58 L34,52 L12,50 Z" fill="#DC2626" stroke="#7F1D1D" stroke-width="1.8"/>
            <circle cx="44" cy="41" r="4" fill="#FEF08A"/>
            <!-- Mexico (Vivid Crimson) -->
            <path d="M18,50 L46,52 L56,68 L52,78 L32,76 L20,62 Z" fill="#E11D48" stroke="#7F1D1D" stroke-width="1.8"/>
            <circle cx="38" cy="65" r="3.8" fill="#FEF08A"/>
            <!-- Central America Isthmus -->
            <path d="M50,76 L62,86 L56,90 L46,80 Z" fill="#CBD5E1" stroke="#64748B" stroke-width="1.2"/>
            <!-- South America Continent -->
            <path d="M56,86 L88,92 L106,110 L94,138 L72,158 L60,156 L58,130 L48,106 Z" fill="#FECDD3" stroke="#FB7185" stroke-width="1.8"/>
            <!-- Bolivia Highlighted in Central South America (Vivid Crimson) -->
            <polygon points="60,108 82,108 84,128 66,130 58,120" fill="#9F1239" stroke="#FFFFFF" stroke-width="1.8"/>
            <circle cx="71" cy="119" r="3.8" fill="#FEF08A"/>

            <!-- Right Half: Large White-and-Red Medical Cross Shield, Syringe & Rising Outbreak Curve -->
            <!-- Medical Cross Shield (Top Right) -->
            <g transform="translate(144, 42)">
              <path d="M-26,-30 L26,-30 L26,4 C26,24 0,34 0,34 C0,34 -26,24 -26,4 Z" fill="#DC2626" stroke="#7F1D1D" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M-18,-23 L18,-23 L18,2 C18,16 0,24 0,24 C0,24 -18,16 -18,2 Z" fill="#FFFFFF"/>
              <!-- Red Medical Cross -->
              <path d="M0,-14 L0,10 M-12,-2 L12,-2" stroke="#DC2626" stroke-width="6" stroke-linecap="round"/>
            </g>

            <!-- Vaccine Syringe Icon (Top Far Right) -->
            <g transform="translate(198, 42) rotate(35)">
              <rect x="-5" y="-18" width="10" height="28" rx="1.5" fill="#E0F2FE" stroke="#0F172A" stroke-width="2"/>
              <rect x="-5" y="-4" width="10" height="14" fill="#38BDF8"/>
              <line x1="0" y1="-28" x2="0" y2="-18" stroke="#0F172A" stroke-width="2.5"/>
              <line x1="-6" y1="-28" x2="6" y2="-28" stroke="#0F172A" stroke-width="2.5"/>
              <line x1="0" y1="10" x2="0" y2="24" stroke="#475569" stroke-width="2"/>
            </g>

            <!-- Bold Rising Red Epidemic Outbreak Curve (Bottom Right) -->
            <g transform="translate(110, 88)">
              <rect x="0" y="0" width="110" height="68" rx="5" fill="#FFFFFF" stroke="#BE123C" stroke-width="2"/>
              <!-- Gridlines -->
              <line x1="10" y1="22" x2="100" y2="22" stroke="#FCE7F3" stroke-width="1.2"/>
              <line x1="10" y1="42" x2="100" y2="42" stroke="#FCE7F3" stroke-width="1.2"/>
              <!-- Red Shaded Fill Under Outbreak Curve -->
              <path d="M12,56 Q42,52 64,34 T98,12 L98,58 L12,58 Z" fill="#FFE4E6"/>
              <!-- Steep Red Outbreak Curve & Data Nodes -->
              <path d="M12,56 Q42,52 64,34 T98,12" fill="none" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round"/>
              <circle cx="38" cy="50" r="4" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
              <circle cx="68" cy="31" r="4.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
              <circle cx="98" cy="12" r="5.5" fill="#DC2626" stroke="#FEF08A" stroke-width="2"/>
            </g>
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
          <svg viewBox="0 0 228 164" xmlns="http://www.w3.org/2000/svg">
            <rect width="228" height="164" fill="#090D16"/>
            <!-- Deep Starfield -->
            <circle cx="16" cy="14" r="1.4" fill="#FFFFFF"/>
            <circle cx="108" cy="12" r="1.5" fill="#93C5FD"/>
            <circle cx="212" cy="18" r="1.4" fill="#FFFFFF"/>
            <circle cx="18" cy="146" r="1.5" fill="#FEF08A"/>
            <circle cx="122" cy="108" r="1.3" fill="#FFFFFF"/>
            <circle cx="72" cy="148" r="1.4" fill="#93C5FD"/>

            <!-- Diagonal Orbital Split Line -->
            <line x1="0" y1="92" x2="228" y2="66" stroke="#334155" stroke-width="2" stroke-dasharray="5,3"/>

            <!-- Upper-Left: ISS Golden Solar Wings + White SpaceX Dragon Capsule Undocking + Red 3D Vascular Medallion -->
            <g transform="translate(6, 6)">
              <!-- ISS Central Truss & Pressurized Modules -->
              <line x1="6" y1="36" x2="82" y2="36" stroke="#CBD5E1" stroke-width="4"/>
              <rect x="34" y="25" width="20" height="22" rx="3" fill="#F8FAFC" stroke="#475569" stroke-width="1.2"/>
              <!-- 4 Golden Gridded Solar Array Wings -->
              <rect x="10" y="6" width="14" height="25" fill="#D97706" stroke="#FDE047" stroke-width="1.5"/>
              <rect x="10" y="41" width="14" height="25" fill="#D97706" stroke="#FDE047" stroke-width="1.5"/>
              <rect x="64" y="6" width="14" height="25" fill="#D97706" stroke="#FDE047" stroke-width="1.5"/>
              <rect x="64" y="41" width="14" height="25" fill="#D97706" stroke="#FDE047" stroke-width="1.5"/>

              <!-- Thruster Plume & White Gumdrop SpaceX Dragon Capsule Undocking -->
              <path d="M84,36 L108,36" stroke="#38BDF8" stroke-width="3" stroke-dasharray="4,2"/>
              <path d="M112,24 C128,24 138,29 138,36 C138,43 128,48 112,48 L104,44 L104,28 Z" fill="#FFFFFF" stroke="#38BDF8" stroke-width="1.8"/>
              <rect x="99" y="19" width="5" height="34" rx="1" fill="#0284C7"/>
              <circle cx="122" cy="36" r="3.5" fill="#1E293B"/>

              <!-- Circular Red 3D-Bioprinted Blood Vessel Medallion -->
              <g transform="translate(178, 28)">
                <circle cx="0" cy="0" r="24" fill="#1E1B4B" stroke="#F43F5E" stroke-width="2.5"/>
                <path d="M-15,0 L2,0 M-4,0 Q4,-13 14,-14 M-4,0 Q4,13 14,14 M4,-8 L14,-6 M4,8 L14,6" fill="none" stroke="#FB7185" stroke-width="3.5" stroke-linecap="round"/>
              </g>
            </g>

            <!-- Lower-Right: Winged BepiColombo Sweeping in Bright Orbital Arc Scanning Cratered Crescent Mercury -->
            <g transform="translate(0, 74)">
              <!-- Bright Yellow Orbital Arc -->
              <path d="M8,72 Q68,18 158,32" fill="none" stroke="#FACC15" stroke-width="2.5" stroke-dasharray="5,3"/>

              <!-- Translucent Cyan X-Ray Fan Beam Scanning Mercury -->
              <polygon points="86,38 174,8 174,74" fill="#22D3EE" opacity="0.38"/>
              <line x1="86" y1="38" x2="174" y2="22" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4,2"/>
              <line x1="86" y1="38" x2="174" y2="58" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4,2"/>

              <!-- Winged BepiColombo Spacecraft -->
              <g transform="translate(76, 38) rotate(-14)">
                <polygon points="-38,-6 -12,-4 -12,4 -38,6" fill="#0284C7" stroke="#7DD3FC" stroke-width="1.5"/>
                <polygon points="12,-4 38,-6 38,6 12,4" fill="#0284C7" stroke="#7DD3FC" stroke-width="1.5"/>
                <rect x="-12" y="-10" width="24" height="20" rx="3" fill="#FACC15" stroke="#FFFFFF" stroke-width="1.8"/>
                <circle cx="0" cy="0" r="4.5" fill="#0F172A"/>
              </g>

              <!-- Large Cratered Grey Crescent Mercury -->
              <circle cx="184" cy="44" r="36" fill="#475569" stroke="#CBD5E1" stroke-width="2.5"/>
              <path d="M184,8 A36,36 0 0,0 184,80 A24,36 0 0,1 184,8 Z" fill="#CBD5E1"/>
              <circle cx="170" cy="30" r="6.5" fill="#64748B" stroke="#94A3B8" stroke-width="1.2"/>
              <circle cx="196" cy="50" r="8" fill="#334155" stroke="#64748B" stroke-width="1.2"/>
              <circle cx="176" cy="60" r="5" fill="#64748B"/>
            </g>
          </svg>
        </div>
        <p class="subtext">Dragon returns <strong>3D-printed blood vessels</strong>; <strong>BepiColombo</strong> tests X-ray gear at Mercury.</p>
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
          <svg viewBox="0 0 228 164" xmlns="http://www.w3.org/2000/svg">
            <rect width="228" height="164" fill="#F8FAFC"/>
            <!-- Left Half: Young Protesters Raising Pictorial Placards (House Icon & Euro Icon) Under EU Stars -->
            <rect x="4" y="4" width="108" height="156" rx="4" fill="#EFF6FF" stroke="#1D4ED8" stroke-width="1.8"/>
            <!-- Arc of Gold EU Stars at Top -->
            <g fill="#FACC15" stroke="#B45309" stroke-width="0.6">
              <circle cx="24" cy="18" r="3.5"/>
              <circle cx="38" cy="13" r="3.5"/>
              <circle cx="58" cy="11" r="3.5"/>
              <circle cx="78" cy="13" r="3.5"/>
              <circle cx="92" cy="18" r="3.5"/>
            </g>

            <!-- Raised Placard 1: House Icon (Housing Costs) -->
            <g transform="translate(10, 28) rotate(-5)">
              <rect x="0" y="0" width="44" height="38" rx="4" fill="#FEF08A" stroke="#0F172A" stroke-width="2"/>
              <!-- Red House Silhouette on Placard -->
              <polygon points="22,7 8,19 12,19 12,31 32,31 32,19 36,19" fill="#DC2626"/>
              <rect x="19" y="22" width="6" height="9" fill="#FEF08A"/>
              <line x1="22" y1="38" x2="22" y2="82" stroke="#0F172A" stroke-width="3.5"/>
            </g>

            <!-- Raised Placard 2: Euro / Living Cost Symbol -->
            <g transform="translate(60, 34) rotate(5)">
              <rect x="0" y="0" width="44" height="38" rx="4" fill="#FCA5A5" stroke="#7F1D1D" stroke-width="2"/>
              <text x="22" y="28" text-anchor="middle" fill="#7F1D1D" font-size="25" font-weight="900">€</text>
              <line x1="22" y1="38" x2="22" y2="78" stroke="#0F172A" stroke-width="3.5"/>
            </g>

            <!-- Expressive Marching Student Silhouettes with Raised Arms -->
            <g fill="#0F172A">
              <circle cx="24" cy="114" r="9"/>
              <path d="M10,152 C10,128 38,128 38,152 Z"/>
              <path d="M16,130 L30,98" stroke="#0F172A" stroke-width="5" stroke-linecap="round"/>

              <circle cx="58" cy="110" r="9.5"/>
              <path d="M42,152 C42,126 74,126 74,152 Z"/>
              <path d="M66,128 L78,100" stroke="#0F172A" stroke-width="5" stroke-linecap="round"/>

              <circle cx="90" cy="115" r="8.5"/>
              <path d="M76,152 C76,130 104,130 104,152 Z"/>
            </g>

            <!-- Right Half: Crisp Blue Indoor Turin Tennis Court, Net, Arcing Yellow Ball & Golden Trophy -->
            <rect x="116" y="4" width="108" height="156" rx="4" fill="#0F172A" stroke="#38BDF8" stroke-width="1.8"/>

            <!-- Golden ATP Championship Trophy Silhouette at Top -->
            <g transform="translate(170, 26)">
              <path d="M-12,-14 L12,-14 L9,2 C9,9 0,12 0,12 C0,12 -9,9 -9,2 Z" fill="#FACC15" stroke="#FEF08A" stroke-width="1.5"/>
              <path d="M-12,-10 C-18,-10 -18,-1 -10,0 M12,-10 C18,-10 18,-1 10,0" fill="none" stroke="#FACC15" stroke-width="2"/>
              <rect x="-4" y="12" width="8" height="5" fill="#D97706"/>
              <rect x="-10" y="17" width="20" height="4" rx="1" fill="#FACC15"/>
            </g>

            <!-- Isometric Blue Hardcourt Tennis Arena -->
            <polygon points="134,56 206,56 218,144 122,144" fill="#2563EB" stroke="#FFFFFF" stroke-width="2.2"/>
            <!-- Court Service Lines -->
            <line x1="129" y1="84" x2="211" y2="84" stroke="#E0F2FE" stroke-width="1.8"/>
            <line x1="125" y1="120" x2="215" y2="120" stroke="#E0F2FE" stroke-width="1.8"/>
            <line x1="170" y1="56" x2="170" y2="144" stroke="#FFFFFF" stroke-width="1.8"/>
            <!-- Center Tennis Net -->
            <line x1="124" y1="96" x2="216" y2="96" stroke="#FEF08A" stroke-width="2.5" stroke-dasharray="4,2"/>

            <!-- Glowing Yellow Tennis Ball & Dynamic Shot Arc -->
            <path d="M138,132 Q160,64 194,82" fill="none" stroke="#FEF08A" stroke-width="3.5" stroke-dasharray="5,3"/>
            <circle cx="194" cy="82" r="10.5" fill="#EAB308" stroke="#FFFFFF" stroke-width="2.2"/>
            <path d="M187,77 Q194,82 187,87 M201,77 Q194,82 201,87" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
          </svg>
        </div>
        <p class="subtext">Students march over <strong>living costs in 20+ EU states</strong>; <strong>Alcaraz &amp; Medvedev</strong> in ATP semis.</p>
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
