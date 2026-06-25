/* ============ STATE DATA (50 states + DC) ============ */
const STATES={
  AL:{name:"Alabama",abbr:"AL",dmv:"https://alea.gov/dps/driver-license",q:30,pass:24,pct:80,residency:30},
  AK:{name:"Alaska",abbr:"AK",dmv:"https://doa.alaska.gov/dmv",q:20,pass:16,pct:80,residency:0},
  AZ:{name:"Arizona",abbr:"AZ",dmv:"https://azdot.gov/mvd",q:30,pass:24,pct:80,residency:0},
  AR:{name:"Arkansas",abbr:"AR",dmv:"https://dfa.arkansas.gov",q:25,pass:20,pct:80,residency:30},
  CA:{name:"California",abbr:"CA",dmv:"https://dmv.ca.gov",q:36,pass:30,pct:83,residency:10},
  CO:{name:"Colorado",abbr:"CO",dmv:"https://dmv.colorado.gov",q:25,pass:20,pct:80,residency:30},
  CT:{name:"Connecticut",abbr:"CT",dmv:"https://portal.ct.gov/dmv",q:25,pass:20,pct:80,residency:30},
  DE:{name:"Delaware",abbr:"DE",dmv:"https://dmv.de.gov",q:30,pass:24,pct:80,residency:60},
  DC:{name:"District of Columbia",abbr:"DC",dmv:"https://dmv.dc.gov",q:25,pass:20,pct:80,residency:30},
  FL:{name:"Florida",abbr:"FL",dmv:"https://flhsmv.gov",q:50,pass:40,pct:80,residency:30},
  GA:{name:"Georgia",abbr:"GA",dmv:"https://dds.georgia.gov",q:20,pass:15,pct:75,residency:30},
  HI:{name:"Hawaii",abbr:"HI",dmv:"https://honolulu.gov/csd",q:30,pass:24,pct:80,residency:0},
  ID:{name:"Idaho",abbr:"ID",dmv:"https://itd.idaho.gov/dmv",q:40,pass:34,pct:85,residency:90},
  IL:{name:"Illinois",abbr:"IL",dmv:"https://ilsos.gov",q:35,pass:28,pct:80,residency:90},
  IN:{name:"Indiana",abbr:"IN",dmv:"https://in.gov/bmv",q:50,pass:42,pct:84,residency:60},
  IA:{name:"Iowa",abbr:"IA",dmv:"https://iowadot.gov/mvd",q:35,pass:28,pct:80,residency:30},
  KS:{name:"Kansas",abbr:"KS",dmv:"https://ksrevenue.gov/dmv",q:25,pass:20,pct:80,residency:90},
  KY:{name:"Kentucky",abbr:"KY",dmv:"https://drive.ky.gov",q:40,pass:32,pct:80,residency:30},
  LA:{name:"Louisiana",abbr:"LA",dmv:"https://expresslane.org",q:40,pass:32,pct:80,residency:30},
  ME:{name:"Maine",abbr:"ME",dmv:"https://maine.gov/sos/bmv",q:30,pass:24,pct:80,residency:30},
  MD:{name:"Maryland",abbr:"MD",dmv:"https://mva.maryland.gov",q:25,pass:22,pct:88,residency:60},
  MA:{name:"Massachusetts",abbr:"MA",dmv:"https://mass.gov/rmv",q:25,pass:18,pct:72,residency:0},
  MI:{name:"Michigan",abbr:"MI",dmv:"https://michigan.gov/sos",q:50,pass:40,pct:80,residency:0},
  MN:{name:"Minnesota",abbr:"MN",dmv:"https://dvs.dps.mn.gov",q:40,pass:32,pct:80,residency:60},
  MS:{name:"Mississippi",abbr:"MS",dmv:"https://dps.ms.gov",q:30,pass:24,pct:80,residency:60},
  MO:{name:"Missouri",abbr:"MO",dmv:"https://dor.mo.gov",q:25,pass:20,pct:80,residency:30},
  MT:{name:"Montana",abbr:"MT",dmv:"https://dojmt.gov/driving",q:33,pass:27,pct:82,residency:60},
  NE:{name:"Nebraska",abbr:"NE",dmv:"https://dmv.nebraska.gov",q:25,pass:20,pct:80,residency:30},
  NV:{name:"Nevada",abbr:"NV",dmv:"https://dmv.nv.gov",q:50,pass:40,pct:80,residency:30},
  NH:{name:"New Hampshire",abbr:"NH",dmv:"https://dmv.nh.gov",q:40,pass:32,pct:80,residency:60},
  NJ:{name:"New Jersey",abbr:"NJ",dmv:"https://nj.gov/mvc",q:50,pass:40,pct:80,residency:60},
  NM:{name:"New Mexico",abbr:"NM",dmv:"https://mvd.newmexico.gov",q:25,pass:18,pct:72,residency:0},
  NY:{name:"New York",abbr:"NY",dmv:"https://dmv.ny.gov",q:20,pass:14,pct:70,residency:0},
  NC:{name:"North Carolina",abbr:"NC",dmv:"https://ncdot.gov/dmv",q:25,pass:20,pct:80,residency:60},
  ND:{name:"North Dakota",abbr:"ND",dmv:"https://dot.nd.gov",q:25,pass:20,pct:80,residency:0},
  OH:{name:"Ohio",abbr:"OH",dmv:"https://bmv.ohio.gov",q:40,pass:30,pct:75,residency:30},
  OK:{name:"Oklahoma",abbr:"OK",dmv:"https://oklahoma.gov/dps",q:50,pass:40,pct:80,residency:0},
  OR:{name:"Oregon",abbr:"OR",dmv:"https://oregon.gov/odot/dmv",q:35,pass:28,pct:80,residency:0},
  PA:{name:"Pennsylvania",abbr:"PA",dmv:"https://dmv.pa.gov",q:18,pass:15,pct:83,residency:60},
  RI:{name:"Rhode Island",abbr:"RI",dmv:"https://dmv.ri.gov",q:25,pass:20,pct:80,residency:30},
  SC:{name:"South Carolina",abbr:"SC",dmv:"https://scdmvonline.com",q:30,pass:24,pct:80,residency:90},
  SD:{name:"South Dakota",abbr:"SD",dmv:"https://dps.sd.gov",q:25,pass:20,pct:80,residency:90},
  TN:{name:"Tennessee",abbr:"TN",dmv:"https://tn.gov/safety",q:30,pass:24,pct:80,residency:30},
  TX:{name:"Texas",abbr:"TX",dmv:"https://dps.texas.gov",q:30,pass:21,pct:70,residency:90},
  UT:{name:"Utah",abbr:"UT",dmv:"https://dld.utah.gov",q:25,pass:20,pct:80,residency:60},
  VT:{name:"Vermont",abbr:"VT",dmv:"https://dmv.vermont.gov",q:20,pass:16,pct:80,residency:60},
  VA:{name:"Virginia",abbr:"VA",dmv:"https://dmv.virginia.gov",q:35,pass:30,pct:86,residency:60},
  WA:{name:"Washington",abbr:"WA",dmv:"https://dol.wa.gov",q:40,pass:32,pct:80,residency:30},
  WV:{name:"West Virginia",abbr:"WV",dmv:"https://transportation.wv.gov/dmv",q:25,pass:20,pct:80,residency:30},
  WI:{name:"Wisconsin",abbr:"WI",dmv:"https://wisconsindot.gov",q:50,pass:40,pct:80,residency:60},
  WY:{name:"Wyoming",abbr:"WY",dmv:"https://dot.state.wy.us",q:25,pass:20,pct:80,residency:0}
};

/* shared per-state rule notes: most US driving rules are uniform; we surface the
   few values that differ (test format, residency deadline, DMV link) per state. */
let CUR=null;
function stateList(){ return Object.values(STATES).sort((a,b)=>a.name.localeCompare(b.name)); }

function applyState(abbr){
  CUR=STATES[abbr];
  if(!CUR) return;
  try{ sessionStorage.setItem("ncdmv_state",abbr); }catch(e){}
  document.title=`${CUR.name} DMV Prep · Signs & Knowledge Test`;
  const pct=CUR.pct;
  // shield + compact header line
  document.getElementById("shieldAbbr").textContent=CUR.abbr;
  document.getElementById("heroEyebrow").textContent=`${CUR.name} · ${CUR.q} Q, ${pct}% to pass`;
  // dropdown current value
  const sw=document.getElementById("stateSwitch"); if(sw) sw.value=abbr;
  // re-render all state-dependent content
  renderTestParts();
  renderChecklistNote();
  renderDocCols();
  renderRulesFormatCard();
  renderProgress();
  // reset quiz to apply new pass threshold/state label
  if(typeof loadVersion==="function") loadVersion(typeof version!=="undefined"?version:0);
}
function passThreshold(){ return Math.ceil(20 * (CUR? CUR.pct:80)/100); }
