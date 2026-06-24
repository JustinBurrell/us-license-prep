/* ============ ACCURATE SIGN SVG LIBRARY (100x100 viewBox) ============ */
/* ---- arrow builders: clean, mirrorable geometry shared by all directional signs ---- */
function aTurn(dir){ // L-shaped turn arrow, shaft from bottom-center bending toward dir
  const m = dir==='right' ? -1 : 1, cx=50;
  const hx = cx - m*14;                 // horizontal run end
  const tip = `${cx-m*30},44`, b1=`${cx-m*14},34`, b2=`${cx-m*14},54`;
  return `<path d="M${cx} 72 L${cx} 44 L${hx} 44" fill="none" stroke="#111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><polygon points="${b1} ${b2} ${tip}" fill="#111"/>`;
}
function aTurnSmall(dir,cx){ // smaller version for double/thru signs
  const m = dir==='right' ? -1 : 1;
  const hx = cx - m*11;
  const tip=`${cx-m*23},46`, b1=`${cx-m*11},38`, b2=`${cx-m*11},54`;
  return `<path d="M${cx} 72 L${cx} 46 L${hx} 46" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><polygon points="${b1} ${b2} ${tip}" fill="#111"/>`;
}
function aStraight(cx){
  return `<path d="M${cx} 74 L${cx} 34" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round"/><polygon points="${cx-8},38 ${cx+8},38 ${cx},22" fill="#111"/>`;
}
function aKeep(dir){ // shaft angles down toward dir like a merge, head points down-outward
  const m = dir==='right' ? 1 : -1, topX=50-m*8;
  // diagonal shaft from upper area down to lower-outer, with arrowhead at the end
  const x1=topX, y1=24, x2=50+m*14, y2=68;
  const ang=Math.atan2(y2-y1, x2-x1);
  const hl=15, hw=9;
  const hx=x2, hy=y2;
  const bx=hx-hl*Math.cos(ang), by=hy-hl*Math.sin(ang);
  const px=-Math.sin(ang), py=Math.cos(ang);
  const p1x=bx+hw*px, p1y=by+hw*py, p2x=bx-hw*px, p2y=by-hw*py;
  return `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="#111" stroke-width="7" stroke-linecap="round"/><polygon points="${hx},${hy} ${p1x},${p1y} ${p2x},${p2y}" fill="#111"/>`;
}
const wRectV = inner => `<svg viewBox="0 0 100 100"><rect x="26" y="8" width="48" height="84" rx="3" fill="#fff" stroke="#111" stroke-width="3"/>${inner}</svg>`;
const wRectWide = inner => `<svg viewBox="0 0 100 100"><rect x="16" y="8" width="68" height="84" rx="3" fill="#fff" stroke="#111" stroke-width="3"/>${inner}</svg>`;
const wProhibit = inner => `<svg viewBox="0 0 100 100"><rect x="9" y="9" width="82" height="82" rx="4" fill="#fff" stroke="#111" stroke-width="3"/>${inner}<circle cx="50" cy="50" r="36" fill="none" stroke="#d8232a" stroke-width="7"/><line x1="24" y1="76" x2="76" y2="24" stroke="#d8232a" stroke-width="7"/></svg>`;

const S = {
  /* ---- shape demo tiles ---- */
  shapeOctagon:`<svg viewBox="0 0 100 100"><polygon points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32" fill="#d8232a" stroke="#111" stroke-width="3"/><text x="50" y="58" font-size="18" fill="#fff" font-weight="900" text-anchor="middle" font-family="Arial">STOP</text></svg>`,
  shapeTriangle:`<svg viewBox="0 0 100 100"><polygon points="50,90 8,18 92,18" fill="#d8232a" stroke="#111" stroke-width="3"/><polygon points="50,79 21,26 79,26" fill="#fff"/><text x="50" y="45" font-size="11" fill="#d8232a" font-weight="900" text-anchor="middle" font-family="Arial">YIELD</text></svg>`,
  shapeDiamond:`<svg viewBox="0 0 100 100"><polygon points="50,8 92,50 50,92 8,50" fill="#f5c518" stroke="#111" stroke-width="3"/><text x="50" y="56" font-size="34" fill="#111" font-weight="900" text-anchor="middle" font-family="Arial">!</text></svg>`,
  shapePentagon:`<svg viewBox="0 0 100 100"><polygon points="50,8 86,40 72,88 28,88 14,40" fill="#caf36a" stroke="#111" stroke-width="3"/></svg>`,
  shapeRound:`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#f5c518" stroke="#111" stroke-width="3"/><line x1="24" y1="24" x2="76" y2="76" stroke="#111" stroke-width="6"/><line x1="76" y1="24" x2="24" y2="76" stroke="#111" stroke-width="6"/><text x="40" y="46" font-size="16" fill="#111" font-weight="900" text-anchor="middle" font-family="Arial">R</text><text x="60" y="62" font-size="16" fill="#111" font-weight="900" text-anchor="middle" font-family="Arial">R</text></svg>`,
  shapePennant:`<svg viewBox="0 0 100 100"><polygon points="12,30 92,42 12,54" fill="#f5c518" stroke="#111" stroke-width="3"/><text x="40" y="46" font-size="8" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">NO PASS</text></svg>`,
  shapeRectV:`<svg viewBox="0 0 100 100"><rect x="26" y="10" width="48" height="80" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><text x="50" y="34" font-size="11" fill="#111" font-weight="700" text-anchor="middle" font-family="Arial">SPEED</text><text x="50" y="48" font-size="11" fill="#111" font-weight="700" text-anchor="middle" font-family="Arial">LIMIT</text><text x="50" y="76" font-size="24" fill="#111" font-weight="900" text-anchor="middle" font-family="Arial">55</text></svg>`,
  shapeRectH:`<svg viewBox="0 0 100 100"><rect x="8" y="34" width="84" height="32" rx="3" fill="#1d4e3f" stroke="#111" stroke-width="2"/><text x="50" y="55" font-size="14" fill="#fff" font-weight="800" text-anchor="middle" font-family="Arial">EXIT 12</text></svg>`,
  shapeCrossbuck:`<svg viewBox="0 0 100 100"><rect x="6" y="36" width="88" height="12" rx="2" fill="#fff" stroke="#111" stroke-width="2.5" transform="rotate(35 50 42)"/><rect x="6" y="36" width="88" height="12" rx="2" fill="#fff" stroke="#111" stroke-width="2.5" transform="rotate(-35 50 42)"/><text x="50" y="80" font-size="11" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">RAILROAD</text></svg>`,

  /* ---- regulatory ---- */
  stop:`<svg viewBox="0 0 100 100"><polygon points="32,7 68,7 93,32 93,68 68,93 32,93 7,68 7,32" fill="#d8232a" stroke="#fff" stroke-width="3.5"/><polygon points="32,7 68,7 93,32 93,68 68,93 32,93 7,68 7,32" fill="none" stroke="#111" stroke-width="1.5"/><text x="50" y="60" font-size="22" fill="#fff" font-weight="900" text-anchor="middle" font-family="Arial">STOP</text></svg>`,
  yield:`<svg viewBox="0 0 100 100"><polygon points="50,92 6,14 94,14" fill="#d8232a" stroke="#fff" stroke-width="3.5"/><polygon points="50,92 6,14 94,14" fill="none" stroke="#111" stroke-width="1.5"/><polygon points="50,79 21,25 79,25" fill="#fff"/><text x="50" y="44" font-size="13" fill="#d8232a" font-weight="900" text-anchor="middle" font-family="Arial">YIELD</text></svg>`,
  speed:`<svg viewBox="0 0 100 100"><rect x="24" y="8" width="52" height="84" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><text x="50" y="28" font-size="11" fill="#111" font-weight="700" text-anchor="middle" font-family="Arial">SPEED</text><text x="50" y="42" font-size="11" fill="#111" font-weight="700" text-anchor="middle" font-family="Arial">LIMIT</text><text x="50" y="76" font-size="28" fill="#111" font-weight="900" text-anchor="middle" font-family="Arial">55</text></svg>`,
  donotenter:`<svg viewBox="0 0 100 100"><rect x="9" y="9" width="82" height="82" rx="4" fill="#fff" stroke="#111" stroke-width="3"/><circle cx="50" cy="42" r="27" fill="#d8232a"/><rect x="31" y="37" width="38" height="10" fill="#fff"/><text x="50" y="82" font-size="10.5" fill="#d8232a" font-weight="900" text-anchor="middle" font-family="Arial">DO NOT ENTER</text></svg>`,
  wrongway:`<svg viewBox="0 0 100 100"><rect x="16" y="22" width="68" height="56" rx="3" fill="#d8232a" stroke="#111" stroke-width="2.5"/><text x="50" y="48" font-size="15" fill="#fff" font-weight="900" text-anchor="middle" font-family="Arial">WRONG</text><text x="50" y="66" font-size="15" fill="#fff" font-weight="900" text-anchor="middle" font-family="Arial">WAY</text></svg>`,
  nobikes:`<svg viewBox="0 0 100 100"><rect x="9" y="9" width="82" height="82" rx="4" fill="#fff" stroke="#111" stroke-width="3"/><circle cx="35" cy="58" r="11" fill="none" stroke="#111" stroke-width="3"/><circle cx="65" cy="58" r="11" fill="none" stroke="#111" stroke-width="3"/><path d="M35 58 L47 43 L61 43 M47 43 L53 58 L65 58" fill="none" stroke="#111" stroke-width="3"/><circle cx="50" cy="50" r="40" fill="none" stroke="#d8232a" stroke-width="7"/><line x1="22" y1="78" x2="78" y2="22" stroke="#d8232a" stroke-width="7"/></svg>`,
  leftonly: wRectV(aTurn('left')+`<text x="50" y="84" font-size="12" fill="#111" font-weight="900" text-anchor="middle" font-family="Arial">ONLY</text>`),
  thruleft: wRectWide(aStraight(62)+aTurnSmall('left',40)),
  leftlanemust:`<svg viewBox="0 0 100 100"><rect x="14" y="20" width="72" height="60" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><text x="50" y="38" font-size="11" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">LEFT LANE</text><text x="50" y="52" font-size="11" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">MUST</text><text x="50" y="66" font-size="11" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">TURN LEFT</text></svg>`,
  noleft: wProhibit(aTurn('left')),
  noright: wProhibit(aTurn('right')),
  nouturn:`<svg viewBox="0 0 100 100"><rect x="9" y="9" width="82" height="82" rx="4" fill="#fff" stroke="#111" stroke-width="3"/><path d="M37 68 L37 47 a13 13 0 0 1 26 0 L63 58" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/><polygon points="56,58 63,68 70,58" fill="#111"/><circle cx="50" cy="50" r="35" fill="none" stroke="#d8232a" stroke-width="6.5"/><line x1="25" y1="75" x2="75" y2="25" stroke="#d8232a" stroke-width="6.5"/></svg>`,
  doubleleft: wRectWide(aTurnSmall('left',38)+aTurnSmall('left',58)+`<text x="50" y="86" font-size="10" fill="#111" font-weight="900" text-anchor="middle" font-family="Arial">ONLY</text>`),
  oneway:`<svg viewBox="0 0 100 100"><rect x="10" y="32" width="80" height="36" rx="2" fill="#111"/><text x="44" y="48" font-size="13" fill="#fff" font-weight="800" text-anchor="middle" font-family="Arial">ONE</text><text x="44" y="61" font-size="13" fill="#fff" font-weight="800" text-anchor="middle" font-family="Arial">WAY</text><path d="M64 50 L80 50 M75 45 L82 50 L75 55" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  keepright: wRectV(aKeep('right')),
  keepleft: wRectV(aKeep('left')),
  nopass:`<svg viewBox="0 0 100 100"><rect x="24" y="8" width="52" height="84" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><text x="50" y="36" font-size="13" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">DO</text><text x="50" y="54" font-size="13" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">NOT</text><text x="50" y="72" font-size="13" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">PASS</text></svg>`,
  passwithcare:`<svg viewBox="0 0 100 100"><rect x="18" y="14" width="64" height="72" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><text x="50" y="38" font-size="12" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">PASS</text><text x="50" y="54" font-size="12" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">WITH</text><text x="50" y="70" font-size="12" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">CARE</text></svg>`,
  slowertraffic:`<svg viewBox="0 0 100 100"><rect x="20" y="12" width="60" height="76" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><text x="50" y="33" font-size="10" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">SLOWER</text><text x="50" y="47" font-size="10" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">TRAFFIC</text><text x="50" y="61" font-size="10" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">KEEP</text><text x="50" y="75" font-size="10" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">RIGHT</text></svg>`,
  keepoffmedian:`<svg viewBox="0 0 100 100"><rect x="22" y="14" width="56" height="72" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><text x="50" y="40" font-size="11" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">KEEP</text><text x="50" y="55" font-size="11" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">OFF</text><text x="50" y="70" font-size="11" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">MEDIAN</text></svg>`,
  handicap:`<svg viewBox="0 0 100 100"><rect x="14" y="14" width="72" height="72" rx="3" fill="#fff" stroke="#1f6fb2" stroke-width="3"/><text x="50" y="27" font-size="9" fill="#1f6fb2" font-weight="800" text-anchor="middle" font-family="Arial">RESERVED</text><text x="50" y="38" font-size="9" fill="#1f6fb2" font-weight="800" text-anchor="middle" font-family="Arial">PARKING</text><circle cx="50" cy="60" r="15" fill="#1f6fb2"/><circle cx="45" cy="53" r="3.2" fill="#fff"/><path d="M43 60 h8 l4 10 M43 60 a9 9 0 1 0 9 9" fill="none" stroke="#fff" stroke-width="2.6"/></svg>`,
  busstop:`<svg viewBox="0 0 100 100"><rect x="20" y="14" width="60" height="72" rx="3" fill="#fff" stroke="#d8232a" stroke-width="3"/><rect x="20" y="14" width="60" height="17" fill="#d8232a"/><text x="50" y="26" font-size="9.5" fill="#fff" font-weight="800" text-anchor="middle" font-family="Arial">NO PARKING</text><text x="50" y="52" font-size="13" fill="#d8232a" font-weight="900" text-anchor="middle" font-family="Arial">BUS</text><text x="50" y="68" font-size="13" fill="#d8232a" font-weight="900" text-anchor="middle" font-family="Arial">STOP</text></svg>`,
  hourparking:`<svg viewBox="0 0 100 100"><rect x="20" y="16" width="60" height="68" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><text x="50" y="34" font-size="10" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">ONE HOUR</text><text x="50" y="47" font-size="10" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">PARKING</text><text x="50" y="60" font-size="9" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">9AM-7PM</text></svg>`,
  railroadCircle:`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#f5c518" stroke="#111" stroke-width="3"/><line x1="24" y1="24" x2="76" y2="76" stroke="#111" stroke-width="6"/><line x1="76" y1="24" x2="24" y2="76" stroke="#111" stroke-width="6"/><text x="40" y="46" font-size="16" fill="#111" font-weight="900" text-anchor="middle" font-family="Arial">R</text><text x="60" y="62" font-size="16" fill="#111" font-weight="900" text-anchor="middle" font-family="Arial">R</text></svg>`,
  donotstop:`<svg viewBox="0 0 100 100"><rect x="28" y="8" width="44" height="84" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><text x="50" y="28" font-size="9.5" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">DO NOT</text><text x="50" y="44" font-size="9.5" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">STOP</text><text x="50" y="60" font-size="9.5" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">ON</text><text x="50" y="76" font-size="9.5" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">TRACKS</text></svg>`,

  /* ---- warning (yellow diamonds + special) ---- */
  signalAhead:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><rect x="42" y="28" width="16" height="42" rx="6" fill="#111"/><circle cx="50" cy="37" r="4.5" fill="#d8232a"/><circle cx="50" cy="49" r="4.5" fill="#f5c518"/><circle cx="50" cy="61" r="4.5" fill="#2ca05a"/></svg>`,
  merge:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M40 74 L40 38 M40 38 L33 46 M40 38 L47 46" stroke="#111" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M64 74 C64 54 50 50 44 46" stroke="#111" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`,
  laneDrop:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><rect x="40" y="30" width="6" height="42" fill="#111"/><path d="M60 30 L60 52 C60 64 53 68 48 70" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
  dividedHwy:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M42 74 L42 52 a8 8 0 0 1 16 0 L58 74" stroke="#111" stroke-width="4.5" fill="none"/><path d="M42 40 L42 28 M42 28 L37 34 M42 28 L47 34" stroke="#111" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M58 40 L58 28 M58 28 L53 34 M58 28 L63 34" stroke="#111" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  dividedEnds:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M42 28 L42 50 a8 8 0 0 0 16 0 L58 28" stroke="#111" stroke-width="4.5" fill="none"/><path d="M42 62 L42 74 M42 74 L37 68 M42 74 L47 68" stroke="#111" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M58 62 L58 74 M58 74 L53 68 M58 74 L63 68" stroke="#111" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  twoway:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M42 70 L42 34 M42 34 L37 40 M42 34 L47 40" stroke="#111" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M58 30 L58 66 M58 66 L53 60 M58 66 L63 60" stroke="#111" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  deer:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M37 72 C37 58 41 54 45 51 C40 47 43 40 47 41 C48 35 53 35 54 41 C59 41 60 46 60 50 L67 41 M60 50 C65 53 68 58 68 70" fill="none" stroke="#111" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M45 53 L45 72 M61 56 L63 72" stroke="#111" stroke-width="3.6" stroke-linecap="round"/></svg>`,
  cattle:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M33 48 C30 41 37 40 41 45 L41 42 C41 37 59 37 59 42 L59 45 C63 40 70 41 67 48 C67 63 59 70 50 70 C41 70 33 63 33 48 Z" fill="#111"/><path d="M33 48 C28 46 28 40 32 41 M67 48 C72 46 72 40 68 41" fill="none" stroke="#111" stroke-width="3"/><rect x="43" y="66" width="3.5" height="8" fill="#111"/><rect x="53" y="66" width="3.5" height="8" fill="#111"/></svg>`,
  farmmach:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><circle cx="40" cy="62" r="13" fill="#111"/><circle cx="40" cy="62" r="5" fill="#f5c518"/><circle cx="67" cy="63" r="7" fill="#111"/><path d="M34 50 L44 42 L58 42 L62 56" fill="#111"/></svg>`,
  lowclear:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M38 36 L38 26 M38 26 L33 32 M38 26 L43 32" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M62 36 L62 26 M62 26 L57 32 M62 26 L67 32" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="34" y1="36" x2="66" y2="36" stroke="#111" stroke-width="3.5"/><text x="50" y="64" font-size="15" fill="#111" font-weight="900" text-anchor="middle" font-family="Arial">12'6"</text></svg>`,
  rightturn:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M40 74 L40 52 C40 44 47 44 54 44" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/><polygon points="50,36 50,52 66,44" fill="#111"/></svg>`,
  curveRight:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M42 76 L42 54 C42 42 58 42 58 32" stroke="#111" stroke-width="5.5" fill="none" stroke-linecap="round"/><polygon points="50,32 66,32 58,18" fill="#111"/></svg>`,
  windingRoad:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M44 78 C44 66 60 64 60 52 C60 40 44 40 44 30" stroke="#111" stroke-width="5.5" fill="none" stroke-linecap="round"/><polygon points="36,32 52,32 44,18" fill="#111"/></svg>`,
  sideRoad:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><rect x="44" y="26" width="11" height="48" fill="#111"/><path d="M55 52 L70 38" stroke="#111" stroke-width="11" stroke-linecap="butt"/></svg>`,
  crossRoad:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><rect x="44" y="28" width="12" height="44" fill="#111"/><rect x="28" y="44" width="44" height="12" fill="#111"/></svg>`,
  hill:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M30 58 L62 36 L70 36 L70 58 Z" fill="#111"/><rect x="28" y="58" width="44" height="5" fill="#111"/></svg>`,
  slippery:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><rect x="40" y="32" width="22" height="11" rx="3" fill="#111"/><rect x="44" y="40" width="14" height="20" rx="2" fill="#111"/><circle cx="44" cy="62" r="5" fill="#111"/><circle cx="58" cy="62" r="5" fill="#111"/><path d="M36 70 q4 -6 8 0 M52 70 q4 -6 8 0" fill="none" stroke="#111" stroke-width="2.6"/></svg>`,
  bikecross:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><circle cx="36" cy="60" r="10" fill="none" stroke="#111" stroke-width="3"/><circle cx="64" cy="60" r="10" fill="none" stroke="#111" stroke-width="3"/><path d="M36 60 L47 45 L60 45 M47 45 L53 60 L64 60" fill="none" stroke="#111" stroke-width="3"/></svg>`,
  softShoulder:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><text x="50" y="46" font-size="12" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">SOFT</text><text x="50" y="62" font-size="10.5" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">SHOULDER</text></svg>`,
  stopAhead:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><path d="M44 78 L44 60 M56 78 L56 60" stroke="#111" stroke-width="4.5"/><polygon points="42,42 58,42 65,49 65,57 58,64 42,64 35,57 35,49" fill="#d8232a"/><text x="50" y="56" font-size="7.5" fill="#fff" font-weight="900" text-anchor="middle" font-family="Arial">STOP</text></svg>`,
  yieldAhead:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#f5c518" stroke="#111" stroke-width="3"/><polygon points="50,68 33,40 67,40" fill="#fff" stroke="#111" stroke-width="3"/><text x="50" y="80" font-size="8.5" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">AHEAD</text></svg>`,
  nopassZone:`<svg viewBox="0 0 100 100"><polygon points="10,30 92,42 10,54" fill="#f5c518" stroke="#111" stroke-width="3"/><text x="38" y="40" font-size="7.5" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">NO</text><text x="38" y="49" font-size="7.5" fill="#111" font-weight="800" text-anchor="middle" font-family="Arial">PASSING</text></svg>`,
  roadClosed:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#e8531a" stroke="#111" stroke-width="3"/><text x="50" y="44" font-size="11" fill="#fff" font-weight="800" text-anchor="middle" font-family="Arial">ROAD</text><text x="50" y="58" font-size="11" fill="#fff" font-weight="800" text-anchor="middle" font-family="Arial">CLOSED</text><text x="50" y="71" font-size="8.5" fill="#fff" font-weight="800" text-anchor="middle" font-family="Arial">1500 FT</text></svg>`,
  workZone:`<svg viewBox="0 0 100 100"><polygon points="50,6 94,50 50,94 6,50" fill="#e8531a" stroke="#111" stroke-width="3"/><path d="M42 40 a8 8 0 0 1 16 0 v4 h-16 z" fill="#111"/><rect x="46" y="44" width="8" height="14" fill="#111"/><path d="M38 70 L50 58 L62 70 Z" fill="#111"/></svg>`,
  pedCross:`<svg viewBox="0 0 100 100"><polygon points="50,8 78,50 50,92 22,50" fill="#caf36a" stroke="#111" stroke-width="3"/><circle cx="50" cy="34" r="5" fill="#111"/><path d="M50 40 L50 58 M50 46 L42 52 M50 46 L58 52 M50 58 L44 72 M50 58 L56 72" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
  school:`<svg viewBox="0 0 100 100"><polygon points="50,8 78,50 50,92 22,50" fill="#caf36a" stroke="#111" stroke-width="3"/><circle cx="43" cy="40" r="5" fill="#111"/><circle cx="58" cy="42" r="5" fill="#111"/><path d="M39 50 l-4 18 M47 50 l0 18 M55 50 l2 18 M61 52 l4 16" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M37 52 h26" stroke="#111" stroke-width="3.5"/></svg>`,

  /* ---- guide / service ---- */
  hospital:`<svg viewBox="0 0 100 100"><rect x="14" y="22" width="72" height="56" rx="3" fill="#1f6fb2" stroke="#111" stroke-width="2.5"/><rect x="44" y="34" width="12" height="32" fill="#fff"/><rect x="34" y="44" width="32" height="12" fill="#fff"/><text x="26" y="52" font-size="16" fill="#fff" font-weight="900" font-family="Arial">H</text></svg>`,
  rest:`<svg viewBox="0 0 100 100"><rect x="14" y="26" width="72" height="48" rx="3" fill="#1f6fb2" stroke="#111" stroke-width="2.5"/><text x="50" y="56" font-size="16" fill="#fff" font-weight="800" text-anchor="middle" font-family="Arial">REST</text></svg>`,
  gas:`<svg viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" rx="3" fill="#1f6fb2" stroke="#111" stroke-width="2.5"/><rect x="34" y="32" width="22" height="38" fill="#fff"/><rect x="38" y="38" width="14" height="10" fill="#1f6fb2"/><path d="M56 40 l8 6 v18 a4 4 0 0 1 -8 0" fill="none" stroke="#fff" stroke-width="3"/></svg>`,
  exit:`<svg viewBox="0 0 100 100"><rect x="8" y="30" width="84" height="40" rx="3" fill="#1d4e3f" stroke="#111" stroke-width="2.5"/><text x="44" y="56" font-size="16" fill="#fff" font-weight="800" text-anchor="middle" font-family="Arial">EXIT</text><path d="M70 50 L84 50 M79 45 L86 50 L79 55" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  recreation:`<svg viewBox="0 0 100 100"><rect x="16" y="22" width="68" height="56" rx="3" fill="#6b3f1d" stroke="#111" stroke-width="2.5"/><path d="M50 36 L40 60 L60 60 Z" fill="#2ca05a"/><path d="M50 44 L43 60 L57 60 Z" fill="#1d4e3f"/><rect x="48" y="60" width="4" height="8" fill="#fff"/></svg>`
};

/* ============ REAL MUTCD SIGN IMAGES (Wikimedia Commons) ============ */
/* Loaded online via Special:FilePath. If an image fails to load (offline or
   404), the drawn SVG fallback in S[] is swapped in, so nothing looks broken. */
const MUTCD = {
  shapeOctagon:"MUTCD R1-1.svg", shapeTriangle:"MUTCD R1-2.svg",
  shapeDiamond:"MUTCD W1-2R.svg", shapePentagon:"MUTCD S1-1.svg",
  shapeRound:"MUTCD W10-1.svg", shapeCrossbuck:"MUTCD R15-1.svg",
  shapePennant:"MUTCD W14-3.svg", shapeRectV:"MUTCD R2-1.svg",
  stop:"MUTCD R1-1.svg", yield:"MUTCD R1-2.svg", speed:"MUTCD R2-1.svg",
  donotenter:"MUTCD R5-1.svg", wrongway:"MUTCD R5-1a.svg", nobikes:"MUTCD R5-6.svg",
  leftonly:"MUTCD R3-5L.svg", thruleft:"MUTCD R3-6L.svg", leftlanemust:"MUTCD R3-7L.svg",
  noleft:"MUTCD R3-2.svg", noright:"MUTCD R3-1.svg", nouturn:"MUTCD R3-4.svg",
  doubleleft:"MUTCD R3-5L.svg", oneway:"MUTCD R6-1R.svg",
  keepright:"MUTCD R4-7.svg", keepleft:"MUTCD R4-8.svg",
  nopass:"MUTCD R4-1.svg", passwithcare:"MUTCD R4-2.svg", slowertraffic:"MUTCD R4-3.svg",
  keepoffmedian:"MUTCD R4-19.svg", handicap:"MUTCD R7-8.svg",
  railroadCircle:"MUTCD W10-1.svg", donotstop:"MUTCD R8-8.svg",
  signalAhead:"MUTCD W3-3.svg", merge:"MUTCD W4-1R.svg", laneDrop:"MUTCD W4-2R.svg",
  dividedHwy:"MUTCD W6-1.svg", dividedEnds:"MUTCD W6-2.svg", twoway:"MUTCD W6-3.svg",
  deer:"MUTCD W11-3.svg", cattle:"MUTCD W11-4.svg", farmmach:"MUTCD W11-5.svg",
  lowclear:"MUTCD W12-2P.svg", rightturn:"MUTCD W1-1R.svg", curveRight:"MUTCD W1-2R.svg",
  windingRoad:"MUTCD W1-5R.svg", sideRoad:"MUTCD W2-2R.svg", crossRoad:"MUTCD W2-1.svg",
  hill:"MUTCD W7-1.svg", slippery:"MUTCD W8-5.svg", bikecross:"MUTCD W11-1.svg",
  softShoulder:"MUTCD W8-4.svg", stopAhead:"MUTCD W3-1.svg", yieldAhead:"MUTCD W3-2.svg",
  nopassZone:"MUTCD W14-3.svg", roadClosed:"MUTCD R11-2.svg", workZone:"MUTCD W21-1.svg",
  pedCross:"MUTCD W11-2.svg", school:"MUTCD S1-1.svg"
};
const COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";
/* Returns markup for a sign: real MUTCD image with the drawn SVG as fallback.
   The fallback SVG is stored as a data attribute and swapped in on error. */
function signMarkup(key, cls){
  const fileName = MUTCD[key];
  const fallback = (S[key]||"").replace(/"/g,"&quot;");
  if(!fileName){ return `<span class="signwrap ${cls||''}">${S[key]||""}</span>`; }
  const url = COMMONS + encodeURIComponent(fileName.replace(/ /g,"_"));
  return `<span class="signwrap ${cls||''}"><img src="${url}" alt="${key}" loading="lazy"
    onerror="this.outerHTML=this.getAttribute('data-fb')" data-fb="${fallback}"></span>`;
}
