/* ============ DATA: shapes ============ */
const SHAPES = [
  ["shapeOctagon","Octagon","Always means STOP. Only used for stop signs."],
  ["shapeTriangle","Triangle (point down)","Always means YIELD."],
  ["shapeDiamond","Diamond","Warning of a hazard or change ahead."],
  ["shapePentagon","Pentagon","School zone or school crossing."],
  ["shapeRound","Round","Railroad crossing ahead."],
  ["shapeCrossbuck","Crossbuck (X)","Railroad crossing at the tracks."],
  ["shapePennant","Pennant","No-passing zone, on the left side of the road."],
  ["shapeRectV","Vertical rectangle","Regulatory: a rule you must obey."],
  ["shapeRectH","Horizontal rectangle","Guide or information: directions and distances."]
];

/* ============ DATA: regulatory ============ */
const REG_SIGNS = [
  ["stop","Stop","Come to a full stop; yield to traffic and pedestrians, then go when clear"],
  ["yield","Yield","Slow down and give the right of way to other traffic"],
  ["speed","Speed Limit","Maximum legal speed in ideal conditions"],
  ["donotenter","Do Not Enter","Do not enter; wrong way or restricted road"],
  ["wrongway","Wrong Way","You are going against traffic; turn around"],
  ["nobikes","No Bicycles","Bicycles are prohibited on this road"],
  ["leftonly","Left Turn Only","This lane must turn left"],
  ["thruleft","Thru &amp; Left","This lane may go straight or turn left"],
  ["leftlanemust","Left Lane Must Turn Left","Vehicles in the left lane are required to turn left"],
  ["noleft","No Left Turn","Left turns are prohibited here"],
  ["noright","No Right Turn","Right turns are prohibited here"],
  ["nouturn","No U-Turn","U-turns are prohibited here"],
  ["doubleleft","Double Left Turns","Two lanes may turn left at the same time"],
  ["oneway","One Way","Traffic flows in one direction only"],
  ["keepright","Keep Right","Keep to the right of the median or obstruction"],
  ["keepleft","Keep Left","Keep to the left of the median or obstruction"],
  ["nopass","Do Not Pass","Passing is prohibited in this zone"],
  ["passwithcare","Pass With Care","Passing is allowed, but only when safe"],
  ["slowertraffic","Slower Traffic Keep Right","Slow vehicles must use the right lane"],
  ["keepoffmedian","Keep Off Median","Do not drive on or across the median"],
  ["handicap","Reserved Parking","Accessible parking; permit required"],
  ["busstop","Bus Stop / No Parking","No parking; this space is reserved for buses"],
  ["hourparking","Time-Limited Parking","Parking allowed only for the posted time and hours"],
  ["railroadCircle","Railroad Crossing","Tracks ahead; look, listen, and slow down"],
  ["donotstop","Do Not Stop On Tracks","Never stop on railroad tracks for any reason"]
];

/* ============ DATA: warning ============ */
const WARN_SIGNS = [
  ["signalAhead","Signal Ahead","A traffic light is ahead; be ready to stop"],
  ["merge","Merging Traffic","Traffic merges from the side; adjust your speed"],
  ["laneDrop","Lane Drop","A lane ends ahead; merge over"],
  ["dividedHwy","Divided Highway","The road divides into separated lanes ahead"],
  ["dividedEnds","Divided Highway Ends","Two-way traffic resumes ahead"],
  ["twoway","Two-Way Traffic","You are leaving a divided road; oncoming traffic ahead"],
  ["deer","Deer Crossing","Watch for deer, especially at dawn and dusk"],
  ["cattle","Cattle Crossing","Livestock may be on or near the road"],
  ["farmmach","Farm Machinery","Slow farm equipment may be on the road"],
  ["lowclear","Low Clearance","Overpass height limit ahead"],
  ["rightturn","Right Turn","A sharp right turn is ahead"],
  ["curveRight","Curve Right","The road curves; reduce speed"],
  ["windingRoad","Winding Road","A series of curves is ahead"],
  ["sideRoad","Side Road","Another road joins from the side"],
  ["crossRoad","Cross Road","A four-way intersection is ahead"],
  ["hill","Hill / Steep Grade","A steep downgrade is ahead; check your brakes"],
  ["slippery","Slippery When Wet","The road is slick in rain; slow down"],
  ["bikecross","Bike Crossing","Bicycles may cross here"],
  ["softShoulder","Soft Shoulder","The shoulder edge is unstable; stay on the pavement"],
  ["stopAhead","Stop Ahead","A stop sign is ahead; prepare to stop"],
  ["yieldAhead","Yield Ahead","A yield sign is ahead"],
  ["nopassZone","No Passing Zone","Pennant on the left; do not pass"],
  ["roadClosed","Road Closed","The road is closed ahead; find another route"],
  ["workZone","Work Zone","Construction ahead; orange means a work zone"],
  ["pedCross","Pedestrian Crossing","People may be crossing; yield to them"],
  ["school","School Zone","School area; watch for children and reduce speed"]
];

/* ============ DATA: guide / service ============ */
const GUIDE_SIGNS = [
  ["exit","Exit","Freeway exit and the direction to take it"],
  ["hospital","Hospital","A hospital is nearby in this direction"],
  ["gas","Gas / Fuel","Fuel is available at this exit"],
  ["rest","Rest Area","A rest area is ahead"],
  ["recreation","Recreation Area","A park or recreation area is ahead"]
];

/* ============ DATA: test parts & documents ============ */
function buildTestParts(){
  const q=CUR?CUR.q:25, pc=CUR?CUR.pass:20, pct=CUR?CUR.pct:80;
  return [
  {icon:"\uD83D\uDC41", title:"Vision", tag:"Eyesight screening",
   items:["Look into the machine or read the chart","Wear your glasses or contacts if you use them","If you fail without them, you get a corrective-lenses restriction"]},
  {icon:"\uD83D\uDEA6", title:"Traffic signs", tag:"Identify by shape & color",
   items:["Name each sign and say what it means","Covered fully in the Signs tab here","All answers come from your state handbook"]},
  {icon:"\uD83D\uDCDD", title:"Knowledge", tag:`${q} questions, ${pct}% to pass`,
   items:["Multiple choice on traffic laws and safe driving",`Need ${pc} of ${q} correct`,"Audio version often available on request","Retake rules vary; usually a short wait"]},
  {icon:"\uD83D\uDE97", title:"Road test", tag:"On-the-road driving",
   items:["Taken after you pass the other three","Required for a first-time license","Bring a registered, insured vehicle","Examiner checks the car's documents too"]}
  ];
}

function buildDocCols(){
  const st = CUR ? CUR.name : "your state";
  return [
  {title:"Proof of identity & age", note:"one document",
   items:["Valid US passport, OR","Certified birth certificate, OR","A current driver license or permit from another state also works as ID"]},
  {title:"Social Security", note:"one document",
   items:["Social Security card (no photocopy), OR","W-2 or 1099 with full SSN, OR","Pay stub showing your name and full SSN"]},
  {title:`${st} residency`, note:"usually two documents",
   items:[`A signed ${st} lease or mortgage statement`,`Plus one more: utility bill, bank statement, or pay stub with your ${st} address`,`An auto insurance policy at your ${st} address also counts`]},
  {title:"Insurance (road test / license)", note:"printed, not digital",
   items:[`Liability insurance from a carrier licensed in ${st}`,"An insurance card, binder, or your state's proof-of-insurance form","Must show your name; digital images are often not accepted"]}
  ];
}

/* ============ DATA: rules ============ */
const RULES = [
  {t:"School bus stopping rules", star:true, html:`
    <p>The single most-tested topic. Whether oncoming traffic stops depends on what separates you from the bus.</p>
    <ul>
      <li><strong>Two-lane road:</strong> all traffic in both directions stops.</li>
      <li><strong>Two-lane with a center turn lane:</strong> all traffic in both directions stops.</li>
      <li><strong>Four-lane with no median:</strong> all traffic in both directions stops.</li>
      <li><strong>Four-lane with a center turn lane:</strong> only traffic behind the bus stops.</li>
      <li><strong>Divided highway with a median:</strong> only traffic behind the bus stops.</li>
    </ul>
    <p>Shortcut: a physical median or center turn lane between you and the bus means oncoming traffic keeps going. Otherwise everyone stops. Bus max speed is 45 mph.</p>`},
  {t:"Right of way", star:true, html:`
    <ul>
      <li><strong>Four-way stop:</strong> first to arrive goes first; a tie goes to the vehicle on the right.</li>
      <li><strong>Left turns</strong> yield to oncoming traffic.</li>
      <li><strong>Roundabout:</strong> yield to traffic already in the circle.</li>
      <li><strong>Pedestrians</strong> get the right of way at marked and unmarked crosswalks; yield even when they are not strictly entitled to it.</li>
      <li><strong>Blind pedestrian</strong> with a white cane or guide dog always gets the right of way.</li>
      <li><strong>Emergency vehicles</strong> with lights or siren: pull to the right edge and stop until they pass.</li>
    </ul>`},
  {t:"Headlights & visibility", star:true, html:`
    <ul>
      <li>Required from <strong>30 minutes after sunset to 30 minutes before sunrise</strong>.</li>
      <li>Required any time visibility is under <strong>500 feet</strong>.</li>
      <li>Use headlights, not just parking lights, in rain, fog, or snow.</li>
      <li>Use low beams in fog; high beams reflect back and reduce your vision.</li>
    </ul>`},
  {t:"Move Over law", star:false, html:`
    <p>When an emergency or utility vehicle is stopped on the roadside with its lights on:</p>
    <ul>
      <li><strong>Multiple lanes your direction:</strong> move over one lane away from it.</li>
      <li><strong>One lane or can't move safely:</strong> slow to a reduced, safe speed as you pass.</li>
    </ul>`},
  {t:"Speed & following distance", star:false, html:`
    <ul>
      <li>The posted limit is the maximum for ideal conditions, not a target.</li>
      <li>Leave enough room to stop safely; add distance in rain, fog, and ice.</li>
      <li>Slow down before a curve, not during it.</li>
      <li>On a steep downgrade, shift to a lower gear to save your brakes.</li>
    </ul>`},
  {t:"Hazardous conditions", star:false, html:`
    <ul>
      <li><strong>Hydroplaning:</strong> ease off the gas; do not brake hard.</li>
      <li><strong>Bridges and overpasses ice first</strong>, before the regular road.</li>
      <li><strong>Skid:</strong> steer in the direction you want the front of the car to go.</li>
      <li>If your brakes get wet, dry them by pressing the pedal lightly while driving slowly.</li>
    </ul>`},
  {t:"Work zones", star:false, html:`
    <ul>
      <li>Black-on-orange signs mean you are entering a work zone; stay alert.</li>
      <li>Fines are often doubled in work zones.</li>
      <li>Obey flaggers; their directions override signs and signals.</li>
    </ul>`},
  {t:"Alcohol & DWI", star:false, html:`
    <ul>
      <li>Everyone is impaired at <strong>0.08% BAC</strong> (0.04% in a commercial vehicle).</li>
      <li>First DWI: one-year license revocation.</li>
      <li>Refusing the breath or blood test: immediate 30-day revocation plus a 12-month DMV revocation.</li>
      <li><strong>Under 21:</strong> any detectable alcohol means a one-year revocation.</li>
      <li>Only time sobers you up; coffee and cold showers do not.</li>
    </ul>`},
  {t:"Seat belts & child safety", star:false, html:`
    <ul>
      <li>Driver and all passengers must be belted whenever the vehicle is in motion.</li>
      <li>Under 16: an age and weight appropriate restraint.</li>
      <li>Under 8 and under 80 lbs: a weight-appropriate child restraint.</li>
      <li>Air bag plus a rear seat: a child under 5 and under 40 lbs rides in the rear.</li>
    </ul>`},
  {t:"Cell phones & distraction", star:false, html:`
    <ul>
      <li>Texting or emailing while driving is illegal for everyone.</li>
      <li>Under 18: no cell phone use at all while driving, except a 911 emergency.</li>
      <li>Pull over to a safe spot if you must use your phone.</li>
    </ul>`},
  {t:"Pavement markings", star:false, html:`
    <ul>
      <li><strong>Yellow lines</strong> separate traffic moving in opposite directions.</li>
      <li><strong>White lines</strong> separate traffic moving in the same direction.</li>
      <li>A solid line means do not cross or pass; a broken line means you may.</li>
      <li>A solid yellow on your side means no passing.</li>
    </ul>`},
  {t:"Points & suspension", star:false, html:`
    <ul>
      <li>7 points may land you in a driver improvement clinic.</li>
      <li>12 points in three years may suspend your license.</li>
      <li>Passing a stopped school bus is 5 points, one of the highest.</li>
    </ul>`},
  {t:"Three-point turnabout", star:false, html:`
    <p>Tested on both the written and the road test.</p>
    <ul>
      <li>Start at the right edge. Signal left, pull forward turning left, stop near the left curb.</li>
      <li>Reverse turning right, stop near the right curb.</li>
      <li>Pull forward turning left to complete the turn.</li>
    </ul>`}
];

/* ============ DATA: flashcards ============ */
const SIGN_CARDS = [...SHAPES.filter(s=>s[0]!=="shapeRectV"&&s[0]!=="shapeRectH"), ...REG_SIGNS, ...WARN_SIGNS, ...GUIDE_SIGNS].map(s=>({
  deck:"signs", tag:"NAME THIS SIGN", sign:s[0], a:`${s[1].replace(/&amp;/g,"&")} - ${s[2].replace(/&amp;/g,"&")}`
}));
const RULE_CARDS = [
  {deck:"rules",tag:"RULE",q:"At a four-way stop, two cars arrive at the same time. Who goes?",a:"The car on the right goes first."},
  {deck:"rules",tag:"RULE",q:"When must you use headlights by time of day?",a:"From 30 minutes after sunset to 30 minutes before sunrise."},
  {deck:"rules",tag:"RULE",q:"Below what visibility distance are headlights required?",a:"Under 500 feet."},
  {deck:"rules",tag:"RULE",q:"Two-lane road, a school bus stops with red lights. Who must stop?",a:"All traffic in both directions."},
  {deck:"rules",tag:"RULE",q:"Divided highway with a median, the bus stops on the other side. Must you stop?",a:"No. A median means only traffic behind the bus stops."},
  {deck:"rules",tag:"RULE",q:"Making a left turn, who do you yield to?",a:"Oncoming, straight-through traffic."},
  {deck:"rules",tag:"RULE",q:"Entering a roundabout, who has the right of way?",a:"Traffic already in the circle."},
  {deck:"rules",tag:"RULE",q:"What is the BAC limit for an under-21 driver in NC?",a:"Zero. Any detectable amount means a one-year revocation."},
  {deck:"rules",tag:"RULE",q:"You start to hydroplane. What do you do?",a:"Ease off the gas; do not brake hard."},
  {deck:"rules",tag:"RULE",q:"What ices over before the rest of the road?",a:"Bridges and overpasses."},
  {deck:"rules",tag:"RULE",q:"Emergency vehicle on the shoulder, lights on, two lanes your way. What do you do?",a:"Move over one lane away from it."},
  {deck:"rules",tag:"RULE",q:"How many points for passing a stopped school bus?",a:"5 points, one of the highest."},
  {deck:"rules",tag:"RULE",q:"Refusing a breath or blood test costs you what?",a:"An immediate 30-day revocation plus a 12-month DMV revocation."},
  {deck:"rules",tag:"RULE",q:"A blind pedestrian with a white cane steps off the curb. What is your duty?",a:"Always yield; they get special right of way."},
  {deck:"rules",tag:"RULE",q:"What does a flashing yellow traffic light mean?",a:"Slow down and proceed with caution."},
  {deck:"rules",tag:"RULE",q:"What do yellow pavement lines separate?",a:"Traffic moving in opposite directions."},
  {deck:"rules",tag:"RULE",q:"What do white pavement lines separate?",a:"Traffic moving in the same direction."},
  {deck:"rules",tag:"RULE",q:"You see black-on-orange signs. What do they mean?",a:"You are entering a work zone; stay alert and slow down."},
  {deck:"rules",tag:"RULE",q:"You go into a skid. Which way do you steer?",a:"In the direction you want the front of the car to go."},
  {deck:"rules",tag:"RULE",q:"In fog, which headlights should you use?",a:"Low beams. High beams reflect back and reduce your vision."}
];

/* ============ DATA: three practice tests ============ */
const TESTS = [
  /* ---- TEST A ---- */
  [
    {sign:"yield",q:"What does this sign mean?",opts:["Stop completely","Slow down and give the right of way","No entry","Merge left"],c:1,fb:"A downward triangle is always Yield."},
    {q:"At a four-way stop, two vehicles arrive at the same time. Who has the right of way?",opts:["The faster vehicle","The vehicle on the left","The vehicle on the right","Whoever honks first"],c:2,fb:"A tie goes to the vehicle on the right."},
    {sign:"railroadCircle",q:"What does this round yellow sign warn of?",opts:["A roundabout","A railroad crossing ahead","A rest area","A detour"],c:1,fb:"A round yellow sign means a railroad crossing is ahead."},
    {q:"On a two-lane road, a school bus stops ahead with red lights flashing. What must you do?",opts:["Only stop if you are behind the bus","Slow to 20 mph and pass","Stop; all traffic both directions must stop","Stop only if children are visible"],c:2,fb:"On a two-lane road, traffic in both directions stops."},
    {sign:"slippery",q:"What does this yellow diamond mean?",opts:["Winding road","Slippery when wet","Loose gravel","Sharp curve"],c:1,fb:"The skidding-car symbol means slippery when wet."},
    {q:"When are headlights required by time of day in NC?",opts:["Only when fully dark","From 30 min after sunset to 30 min before sunrise","Only on highways","Sunset to midnight"],c:1,fb:"30 minutes after sunset until 30 minutes before sunrise."},
    {sign:"donotenter",q:"What does this sign mean?",opts:["One way","Do not enter; wrong way","No parking","Dead end"],c:1,fb:"The red circle with a white bar means Do Not Enter."},
    {q:"For a driver under 21, what blood alcohol level triggers a revocation?",opts:["0.08%","0.05%","0.02%","Any detectable amount"],c:3,fb:"NC has zero tolerance under 21."},
    {sign:"stopAhead",q:"What is this sign telling you?",opts:["A stop sign is ahead; prepare to stop","No stopping","Stop for inspection","Dead end ahead"],c:0,fb:"The stop symbol in a yellow diamond warns a stop sign is ahead."},
    {q:"An emergency vehicle is stopped on the shoulder with lights flashing and there are two lanes your direction. What does the Move Over law require?",opts:["Stop completely","Move over one lane away from it","Honk and continue","Speed up to clear the area"],c:1,fb:"With multiple lanes, move over one lane away."},
    {sign:"school",q:"What does this pentagon-shaped sign mean?",opts:["Hospital zone","School zone; watch for children","Park ahead","Pedestrian mall"],c:1,fb:"The five-sided sign marks a school zone."},
    {q:"You begin to skid. What is the correct response?",opts:["Brake hard immediately","Steer where you want the front to go","Accelerate","Pull the parking brake"],c:1,fb:"Steer in the direction you want the front of the car to go."},
    {sign:"nopass",q:"What does this sign mean?",opts:["Pass with care","Do not pass","Slow traffic keep right","One way"],c:1,fb:"DO NOT PASS means passing is prohibited in this zone."},
    {q:"When you see a flashing yellow traffic light, you should:",opts:["Stop completely","Slow down and proceed with caution","Speed up to clear it","Treat it as a red light"],c:1,fb:"A flashing yellow light means slow down and proceed with caution."},
    {sign:"deer",q:"What does this sign warn of?",opts:["A petting zoo","Deer crossing","A farm exit","Wildlife refuge entrance"],c:1,fb:"Watch for deer, especially at dawn and dusk."},
    {q:"What do solid yellow pavement lines tell you?",opts:["Lanes go the same direction","Traffic moves in opposite directions","The road ends","A bike lane"],c:1,fb:"Yellow separates opposing directions of traffic."},
    {sign:"keepright",q:"What does this sign instruct?",opts:["Keep right of the median","Right turn only","No right turn","Merge right"],c:0,fb:"Keep to the right of the median or obstruction."},
    {q:"You are making a left turn on a solid green light with no arrow. Who do you yield to?",opts:["Pedestrians only","Nobody; green means go","Oncoming traffic","Traffic behind you"],c:2,fb:"On a solid green, a left turn yields to oncoming traffic."},
    {sign:"merge",q:"What does this sign mean?",opts:["Lane ends","Merging traffic from the right","Divided highway","Y intersection"],c:1,fb:"Traffic merges from the side; adjust your speed."},
    {q:"What is the maximum speed limit for a school bus in NC?",opts:["35 mph","45 mph","55 mph","25 mph"],c:1,fb:"A school bus max speed is 45 mph."}
  ],
  /* ---- TEST B ---- */
  [
    {sign:"stop",q:"What must you do at this sign?",opts:["Slow and roll through","Come to a full stop","Yield only if cars are coming","Honk"],c:1,fb:"A full stop is required; then go when clear."},
    {q:"On a divided highway with a median, a school bus stops on the opposite side. What must you do?",opts:["Stop completely","Keep going; the median separates you","Slow to 10 mph","Pull onto the shoulder"],c:1,fb:"A median means only traffic behind the bus stops."},
    {sign:"nouturn",q:"What does this sign mean?",opts:["No left turn","No U-turn","No right turn","Roundabout"],c:1,fb:"U-turns are prohibited here."},
    {q:"Refusing a breath or blood test in NC results in what?",opts:["A warning","Immediate 30-day plus 12-month revocation","A small fine","Nothing if you pass later"],c:1,fb:"Immediate 30-day revocation plus a 12-month DMV revocation."},
    {sign:"workZone",q:"What does an orange diamond sign indicate?",opts:["A scenic area","A work zone ahead","A school zone","A hospital"],c:1,fb:"Orange always means a work zone."},
    {q:"What do white pavement lines separate?",opts:["Opposing traffic","Traffic moving the same direction","Parking spaces","Bike lanes only"],c:1,fb:"White separates traffic going the same direction."},
    {sign:"oneway",q:"What does this sign mean?",opts:["Dead end","One-way traffic","Detour","Do not enter"],c:1,fb:"Traffic flows one direction only."},
    {q:"In fog, which headlights should you use?",opts:["High beams","Low beams","Parking lights only","Hazards only"],c:1,fb:"Low beams; high beams reflect back and reduce vision."},
    {sign:"pedCross",q:"What does this yellow-green sign mean?",opts:["School bus stop","Pedestrian crossing","Playground","Hospital"],c:1,fb:"People may be crossing; yield to them."},
    {q:"You approach a roundabout. Who has the right of way?",opts:["You do","Traffic already in the circle","The larger vehicle","Whoever is fastest"],c:1,fb:"Yield to traffic already in the roundabout."},
    {sign:"dividedHwy",q:"What does this sign warn of?",opts:["Divided highway begins","Road ends","Narrow bridge","Two-way traffic"],c:0,fb:"The road divides into separated lanes ahead."},
    {q:"On a steep downgrade, how do you protect your brakes?",opts:["Ride the brakes","Shift to a lower gear","Turn off the engine","Speed up"],c:1,fb:"A lower gear uses engine braking and saves your brakes."},
    {sign:"hill",q:"What does this sign warn of?",opts:["A bump","A steep downgrade ahead","A speed hump","A ramp"],c:1,fb:"A steep downgrade; check your brakes."},
    {q:"How many license points come from passing a stopped school bus?",opts:["2","3","5","1"],c:2,fb:"5 points, one of the highest penalties."},
    {sign:"yieldAhead",q:"What is this sign telling you?",opts:["Yield sign ahead","Merge ahead","Stop ahead","Dead end"],c:0,fb:"A yield sign is ahead."},
    {q:"A blind pedestrian with a white cane steps into the crosswalk. What must you do?",opts:["Proceed carefully","Always yield to them","Honk a warning","Continue if you have green"],c:1,fb:"They always get the right of way."},
    {sign:"nobikes",q:"What does this sign mean?",opts:["Bike route","No bicycles allowed","Bike crossing","Bike parking"],c:1,fb:"Bicycles are prohibited on this road."},
    {q:"What is the first thing that ices over in cold weather?",opts:["Tunnels","Bridges and overpasses","Hills","Parking lots"],c:1,fb:"Bridges and overpasses freeze first."},
    {sign:"curveRight",q:"What does this sign mean?",opts:["Sharp right turn","Gradual curve to the right","Right lane ends","Detour right"],c:1,fb:"The road curves right; reduce speed."},
    {q:"What does a solid yellow line on your side of the road mean?",opts:["Pass freely","No passing on your side","Two-way left turn","Bike lane"],c:1,fb:"A solid yellow on your side means no passing."}
  ],
  /* ---- TEST C ---- */
  [
    {sign:"speed",q:"What does this sign tell you?",opts:["Minimum speed","Maximum legal speed in ideal conditions","Suggested speed only","Speed for trucks only"],c:1,fb:"It is the maximum legal speed in ideal conditions."},
    {q:"On a four-lane road with no median, a school bus stops. Who must stop?",opts:["Only traffic behind the bus","All traffic both directions","Nobody","Only the lane next to the bus"],c:1,fb:"With no median, all traffic both directions stops."},
    {sign:"wrongway",q:"You see this sign facing you. What does it mean?",opts:["Detour","You are going the wrong way; turn around","One way ahead","Road work"],c:1,fb:"You are driving against traffic; turn around."},
    {q:"What should you do when you see black-on-orange signs?",opts:["Speed up to clear the area","Recognize a work zone and stay alert","Ignore them","Stop immediately"],c:1,fb:"Black-on-orange marks a work zone."},
    {sign:"railroadCircle",q:"What does this sign mean?",opts:["Roundabout","Railroad crossing ahead","Hospital","Rest stop"],c:1,fb:"A round yellow sign warns of a railroad crossing ahead."},
    {q:"What sobers up someone who has been drinking?",opts:["Coffee","A cold shower","Only time","A big meal"],c:2,fb:"Only time lowers blood alcohol."},
    {sign:"thruleft",q:"What does this sign allow?",opts:["Left turn only","Go straight or turn left","Right turn only","No turns"],c:1,fb:"This lane may go straight or turn left."},
    {q:"When following another car, how should you set your distance?",opts:["As close as possible","Enough room to stop safely, more in bad weather","Exactly one car length","It does not matter"],c:1,fb:"Leave enough room to stop; add distance in rain, fog, and ice."},
    {sign:"farmmach",q:"What does this sign warn of?",opts:["A factory","Slow farm machinery","A construction crane","A toll booth"],c:1,fb:"Slow farm equipment may be on the road."},
    {q:"For a driver in a commercial vehicle, what BAC counts as impaired?",opts:["0.08%","0.04%","0.10%","0.02%"],c:1,fb:"Commercial drivers are impaired at 0.04%."},
    {sign:"keepleft",q:"What does this sign instruct?",opts:["Keep left of the median","Left turn only","Merge left","No left turn"],c:0,fb:"Keep to the left of the median or obstruction."},
    {q:"How long must you wait to retake the knowledge test if you fail?",opts:["The same day","7 calendar days","30 days","One year"],c:1,fb:"You can retake in 7 calendar days."},
    {sign:"twoway",q:"What does this sign warn of?",opts:["One-way ahead","Two-way traffic ahead","Divided highway begins","Dead end"],c:1,fb:"You are entering a two-way road; watch for oncoming traffic."},
    {q:"Where must a child under 5 and under 40 lbs sit if the car has a rear seat and a passenger air bag?",opts:["Front seat","Rear seat","Either seat","Driver's lap"],c:1,fb:"They ride in the rear seat."},
    {sign:"lowclear",q:"What does this sign tell you?",opts:["Speed limit","Overpass height limit ahead","Narrow road","Low shoulder"],c:1,fb:"It marks an overpass height limit ahead."},
    {q:"What does a broken pavement line mean?",opts:["Never cross it","You may cross or pass when safe","The road ends","Bike lane only"],c:1,fb:"A broken line means you may cross or pass when safe."},
    {sign:"slowertraffic",q:"What does this sign mean?",opts:["Speed up","Slower traffic keep right","No trucks","Right lane ends"],c:1,fb:"Slow vehicles must use the right lane."},
    {q:"At a stop sign, after stopping, when may you proceed?",opts:["Immediately","After yielding to traffic and pedestrians","Only on a green light","After 3 seconds no matter what"],c:1,fb:"Yield to traffic and pedestrians, then go when clear."},
    {sign:"donotstop",q:"What does this sign remind drivers?",opts:["Do not park here","Never stop on the railroad tracks","No standing","Tracks closed"],c:1,fb:"Never stop on railroad tracks for any reason."},
    {q:"Two cars reach a four-way stop, you are on the left. Who goes first?",opts:["You do","The car on the right","The bigger car","Flip a coin"],c:1,fb:"The vehicle on the right goes first."}
  ]
];

/* ============ ROAD TEST CONTENT ============ */
const RT_SKILLS=[
  ["Pre-drive check","Before moving, you adjust mirrors and seat, fasten your belt, and know where the controls are. The examiner may ask you to point out the defroster, horn, or hazard lights."],
  ["Controlled stops","Smooth, complete stops behind the line at stop signs and lights. No rolling stops, no stopping past the crosswalk."],
  ["Turns &amp; signaling","Signal early, get in the correct lane, yield when required, and complete turns into the matching lane. Check mirrors and blind spots."],
  ["Lane changes","Signal, check mirrors, look over your shoulder, and change lanes only when it is clear and smooth."],
  ["Three-point turnabout","Turn the car to face the opposite direction on a narrow road using forward and reverse, without hitting the curb."],
  ["Backing up","Reverse in a straight line, looking over your right shoulder, keeping the car controlled and on track."],
  ["Following &amp; speed","Keep a safe following distance, obey the speed limit, and adjust to traffic and conditions."],
  ["Intersections","Approach at a safe speed, scan left and right, yield correctly, and proceed only when clear."]
];
const RT_FAILS=[
  "Causing an accident or a dangerous situation the examiner has to react to",
  "Disobeying a stop sign, signal, or traffic law",
  "Refusing to perform a required maneuver, or doing it unsafely",
  "Speeding or driving so slowly you impede traffic",
  "Any moving violation, or the examiner taking control of the wheel or brakes"
];
const RT_CAR=[
  {title:"The vehicle", note:"all must be valid", items:[
    "Current registration","Valid liability insurance","License plate properly displayed","Recent safety inspection if required"]},
  {title:"Working equipment", note:"examiner checks these", items:[
    "Working headlights, brake lights, and turn signals","Working horn and windshield wipers","Two working mirrors","Seat belts for you and the examiner"]}
];
