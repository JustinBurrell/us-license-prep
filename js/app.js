/* ============ RENDER HELPERS ============ */
function gridHTML(data){
  return data.map(s=>`<div class="sign-card">${signMarkup(s[0],"grid-sign")}<div class="sign-name">${s[1]}</div><div class="sign-mean">${s[2]}</div></div>`).join("");
}
document.getElementById("shape-grid").innerHTML = gridHTML(SHAPES);
document.getElementById("reg-grid").innerHTML = gridHTML(REG_SIGNS);
document.getElementById("warn-grid").innerHTML = gridHTML(WARN_SIGNS);
document.getElementById("guide-grid").innerHTML = gridHTML(GUIDE_SIGNS);

/* ---- checklist render (state-aware) ---- */
function renderTestParts(){
  document.getElementById("testParts").innerHTML = buildTestParts().map(p=>`
    <div class="check-card">
      <h3>${p.icon} ${p.title}</h3>
      <div class="tagline">${p.tag}</div>
      <ul class="check-list">${p.items.map(i=>`<li><span class="check-box" role="checkbox"></span><span>${i}</span></li>`).join("")}</ul>
    </div>`).join("");
  wireCheckboxes();
}
function renderDocCols(){
  document.getElementById("docCols").innerHTML = buildDocCols().map(c=>`
    <div class="check-card">
      <h3>${c.title}</h3>
      <div class="tagline">Bring ${c.note}</div>
      <ul class="check-list">${c.items.map(i=>`<li><span class="check-box" role="checkbox"></span><span>${i}</span></li>`).join("")}</ul>
    </div>`).join("");
  wireCheckboxes();
}
function renderChecklistNote(){
  const s=CUR||{name:"your state",residency:0,dmv:"#"};
  const intro=document.getElementById("checklistIntro");
  if(intro) intro.innerHTML=`As a new ${s.name} resident, or a first-time driver, you take all four parts. Tap a box to check it off as you prep.`;
  const resTxt = s.residency>0
    ? `Most states require new residents to get a license within about <strong>${s.residency} days</strong> of moving. `
    : `New-resident deadlines vary, so check yours soon after moving. `;
  document.getElementById("docNote").innerHTML =
    `<strong>Heads up:</strong> applying for a ${s.name} license generally cancels licenses or permits from other states through the State-to-State Verification program, which is expected when you become a resident. ${resTxt}Vision, signs, and knowledge can usually be done the same day. Book or learn more at <a href="${s.dmv}" target="_blank" rel="noopener" style="color:var(--hwy);font-weight:700">your ${s.name} DMV</a>.`;
}
function wireCheckboxes(){
  document.querySelectorAll(".check-box").forEach(b=>{
    if(b.dataset.wired) return; b.dataset.wired="1";
    b.addEventListener("click",()=>{b.classList.toggle("on");b.textContent=b.classList.contains("on")?"\u2713":""});
  });
}
wireCheckboxes();

/* ---- rules render ---- */
document.getElementById("rulesList").innerHTML = RULES.map((r,i)=>`
  <details class="rule" ${i===0?"open":""}>
    <summary>${r.t}${r.star?'<span class="pill red">High yield</span>':''}</summary>
    <div class="body">${r.html}</div>
  </details>`).join("");

/* ============ TABS ============ */
document.querySelectorAll("#tabs button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll("#tabs button").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    document.getElementById(b.dataset.tab).classList.add("active");
    window.scrollTo({top:0,behavior:"instant"});
  });
});

/* ============ FLASHCARDS ============ */
let deck="all", cards=[], idx=0;
function buildDeck(){
  const all=[...SIGN_CARDS,...RULE_CARDS];
  cards = deck==="all"?all : all.filter(c=>c.deck===deck);
  idx=0; showCard();
}
function showCard(){
  const c=cards[idx];
  const fc=document.getElementById("flashcard");
  fc.classList.remove("flipped");
  document.getElementById("fcProgress").textContent=`Card ${idx+1} of ${cards.length}`;
  document.getElementById("fcTag").textContent=c.tag;
  const qEl=document.getElementById("fcQ");
  if(c.sign){ qEl.innerHTML=`<div class="fc-signbox">${signMarkup(c.sign,"big-sign")}</div>`; }
  else { qEl.textContent=c.q; }
  document.getElementById("fcA").textContent=c.a;
}
document.getElementById("flashcard").addEventListener("click",function(){this.classList.toggle("flipped")});
document.getElementById("flashcard").addEventListener("keydown",function(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();this.classList.toggle("flipped")}});
document.getElementById("fcNext").addEventListener("click",()=>{idx=(idx+1)%cards.length;showCard()});
document.getElementById("fcPrev").addEventListener("click",()=>{idx=(idx-1+cards.length)%cards.length;showCard()});
document.getElementById("fcShuffle").addEventListener("click",()=>{for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]]}idx=0;showCard()});
document.querySelectorAll("#deckpick button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll("#deckpick button").forEach(x=>x.classList.remove("on"));
    b.classList.add("on"); deck=b.dataset.deck; buildDeck();
  });
});
buildDeck();

/* ============ QUIZ ============ */
let version=0, qSet=[], qi=0, score=0;
function loadVersion(v){
  version=v;
  if(v==="mix"){
    const pool=[...TESTS[0],...TESTS[1],...TESTS[2]];
    for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
    qSet=pool.slice(0,20);
  } else {
    qSet=[...TESTS[v]];
  }
  qi=0; score=0; sessionMisses=[];
  document.getElementById("quizResult").classList.add("hide");
  document.getElementById("quizLive").classList.remove("hide");
  renderQ();
}
function renderQ(){
  const q=qSet[qi];
  document.getElementById("qCount").textContent=`Question ${qi+1} of ${qSet.length}`;
  document.getElementById("qScore").textContent=`Score ${score}`;
  document.getElementById("qText").textContent=q.q;
  const signWrap=document.getElementById("qSign");
  if(q.sign){signWrap.classList.remove("hide");signWrap.innerHTML=`<div class="box">${signMarkup(q.sign,"big-sign")}</div>`}
  else{signWrap.classList.add("hide");signWrap.innerHTML=""}
  const letters=["A","B","C","D"];
  document.getElementById("qOpts").innerHTML=q.opts.map((o,i)=>`<button class="opt" data-i="${i}"><span class="ltr">${letters[i]}</span><span>${o}</span></button>`).join("");
  document.getElementById("qFb").className="quiz-fb";
  document.getElementById("qFb").textContent="";
  document.getElementById("qNext").classList.add("hide");
  document.querySelectorAll("#qOpts .opt").forEach(btn=>btn.addEventListener("click",pick));
}
function pick(e){
  const q=qSet[qi];
  const chosen=+e.currentTarget.dataset.i;
  document.querySelectorAll("#qOpts .opt").forEach((btn,i)=>{
    btn.disabled=true;
    if(i===q.c)btn.classList.add("correct");
    if(i===chosen&&chosen!==q.c)btn.classList.add("wrong");
  });
  const fb=document.getElementById("qFb");
  if(chosen===q.c){score++;fb.className="quiz-fb good show";fb.textContent="Correct. "+q.fb;}
  else{
    fb.className="quiz-fb bad show";fb.textContent="Not quite. "+q.fb;
    sessionMisses.push(quizTopic(q));
  }
  document.getElementById("qScore").textContent=`Score ${score}`;
  document.getElementById("qBar").style.width=((qi+1)/qSet.length*100)+"%";
  document.getElementById("qNext").classList.remove("hide");
}
document.getElementById("qNext").addEventListener("click",()=>{qi++; qi<qSet.length?renderQ():finishQuiz()});
function finishQuiz(){
  document.getElementById("quizLive").classList.add("hide");
  document.getElementById("quizResult").classList.remove("hide");
  const pct=Math.round(score/qSet.length*100);
  const need=passThreshold();
  const needPct=CUR?CUR.pct:80;
  const pass=score>=need;
  document.getElementById("rScore").textContent=`${score}/${qSet.length}`;
  const v=document.getElementById("rVerdict");
  v.textContent=pass?`Pass, ${pct}%`:`${pct}%, keep studying`;
  v.className="verdict "+(pass?"pass":"fail");
  document.getElementById("rMsg").textContent=pass
    ? `You are above the ${needPct}% line for ${CUR?CUR.name:"your state"}. Run the other versions to be sure it sticks, then book your appointment.`
    : `You need ${need} of ${qSet.length} (${needPct}%) to pass in ${CUR?CUR.name:"your state"}. Review the Rules tab and the signs you missed, then try again.`;
  recordResult(version, score, qSet.length, pass, sessionMisses);
}
document.getElementById("rRetry").addEventListener("click",()=>loadVersion(version));
document.getElementById("rNextV").addEventListener("click",()=>{
  const order=[0,1,2,"mix"];
  let cur=order.indexOf(version);
  const next=order[(cur+1)%order.length];
  document.querySelectorAll("#versionpick button").forEach(b=>b.classList.toggle("on", b.dataset.v==String(next)));
  loadVersion(next);
});
document.querySelectorAll("#versionpick button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll("#versionpick button").forEach(x=>x.classList.remove("on"));
    b.classList.add("on");
    loadVersion(b.dataset.v==="mix"?"mix":+b.dataset.v);
  });
});

/* ============ SESSION + PROGRESS TRACKING ============ */
let sessionMisses=[];
function quizTopic(q){ return q.sign ? signName(q.sign) : shortRule(q.q); }
function signName(key){
  const all=[...SHAPES,...REG_SIGNS,...WARN_SIGNS,...GUIDE_SIGNS];
  const hit=all.find(s=>s[0]===key);
  return hit ? hit[1].replace(/&amp;/g,"&") : key;
}
function shortRule(text){
  // condense a rules question into a short topic label
  const map=[
    [/school bus/i,"School bus rules"],[/four-way stop|4-way|right of way/i,"Right of way"],
    [/headlight/i,"Headlights"],[/move over/i,"Move Over law"],[/hydroplan|skid|ice|bridge/i,"Hazard driving"],
    [/blood alcohol|bac|dwi|drink|alcohol/i,"Alcohol & DWI"],[/seat belt|child|restraint/i,"Seat belts"],
    [/cell phone|text/i,"Phones & distraction"],[/pavement|yellow line|white line|solid|broken/i,"Pavement markings"],
    [/point|suspen/i,"Points & suspension"],[/roundabout/i,"Roundabouts"],[/follow|distance/i,"Following distance"],
    [/work zone|orange/i,"Work zones"],[/knowledge test|how many questions/i,"Test format"],[/left turn|yield to oncoming/i,"Left turns"]
  ];
  for(const [re,lbl] of map){ if(re.test(text)) return lbl; }
  return text.slice(0,38)+"...";
}
function pkey(){ return "ncdmv_progress_"+(CUR?CUR.abbr:"NA"); }
function loadProgress(){
  try{ return JSON.parse(localStorage.getItem(pkey())) || {history:[],weak:{}}; }
  catch(e){ return {history:[],weak:{}}; }
}
function saveProgress(p){ try{ localStorage.setItem(pkey(),JSON.stringify(p)); }catch(e){} }
function recordResult(ver,score,total,pass,misses){
  const p=loadProgress();
  const vname = ver==="mix" ? "Random Mix" : "Test "+["A","B","C"][ver];
  p.history.unshift({ver:vname, score, total, pass:!!pass, date:Date.now()});
  if(p.history.length>30) p.history=p.history.slice(0,30);
  misses.forEach(m=>{ p.weak[m]=(p.weak[m]||0)+1; });
  saveProgress(p);
  renderProgress();
}
let progScope="state";
function allStatesData(){
  // aggregate every ncdmv_progress_XX key in this browser
  const agg={history:[],weak:{},byState:{}};
  try{
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k && k.indexOf("ncdmv_progress_")===0){
        const abbr=k.replace("ncdmv_progress_","");
        let d; try{ d=JSON.parse(localStorage.getItem(k)); }catch(e){ continue; }
        if(!d) continue;
        (d.history||[]).forEach(r=>{ agg.history.push(Object.assign({state:abbr},r)); });
        Object.entries(d.weak||{}).forEach(([t,c])=>{ agg.weak[t]=(agg.weak[t]||0)+c; });
        if((d.history||[]).length) agg.byState[abbr]=(d.history||[]).length;
      }
    }
  }catch(e){}
  agg.history.sort((a,b)=>b.date-a.date);
  return agg;
}
let progFilterState="";
function renderProgress(){
  const allMode = progScope==="all";
  let p = allMode ? allStatesData() : loadProgress();
  // populate + apply filter dropdown in all-states mode
  const filterWrap=document.getElementById("progFilter");
  if(allMode){
    filterWrap.classList.remove("hide");
    const studied=Object.keys(p.byState||{}).sort((a,b)=>{
      const na=(STATES[a]&&STATES[a].name)||a, nb=(STATES[b]&&STATES[b].name)||b; return na.localeCompare(nb);
    });
    const sel=document.getElementById("progStateFilter");
    const opts=`<option value="">All states</option>`+studied.map(ab=>`<option value="${ab}">${(STATES[ab]&&STATES[ab].name)||ab}</option>`).join("");
    if(sel.innerHTML!==opts){ sel.innerHTML=opts; }
    sel.value=progFilterState;
    if(progFilterState){
      p={
        history:p.history.filter(r=>r.state===progFilterState),
        weak:{}, byState:{[progFilterState]:p.byState[progFilterState]}
      };
      // rebuild weak from filtered state only
      try{
        const d=JSON.parse(localStorage.getItem("ncdmv_progress_"+progFilterState))||{weak:{}};
        p.weak=d.weak||{};
      }catch(e){}
    }
  } else {
    filterWrap.classList.add("hide");
  }
  const h=p.history;
  const attempts=h.length;
  const passes=h.filter(r=>r.pass).length;
  const best=attempts ? Math.max(...h.map(r=>Math.round(r.score/r.total*100))) : 0;
  // summary stats differ by scope
  let summary;
  if(allMode){
    const statesStudied=Object.keys(p.byState||{}).length;
    summary=`
      <div class="stat"><div class="big">${attempts}</div><div class="lbl">Tests taken</div></div>
      <div class="stat ${best>=80?'pass':''}"><div class="big">${attempts?best+'%':'--'}</div><div class="lbl">Best score</div></div>
      <div class="stat ${passes?'pass':''}"><div class="big">${passes}</div><div class="lbl">Times passed</div></div>
      <div class="stat ${statesStudied?'pass':''}"><div class="big">${statesStudied}</div><div class="lbl">States studied</div></div>`;
  } else {
    const versionsPassed=new Set(h.filter(r=>r.pass).map(r=>r.ver)).size;
    summary=`
      <div class="stat"><div class="big">${attempts}</div><div class="lbl">Tests taken</div></div>
      <div class="stat ${best>=80?'pass':''}"><div class="big">${attempts?best+'%':'--'}</div><div class="lbl">Best score</div></div>
      <div class="stat ${passes?'pass':''}"><div class="big">${passes}</div><div class="lbl">Times passed</div></div>
      <div class="stat ${versionsPassed>=3?'pass':''}"><div class="big">${versionsPassed}/3</div><div class="lbl">Versions cleared</div></div>`;
  }
  document.getElementById("progSummary").innerHTML=summary;
  // history list
  let hist;
  if(!attempts){
    hist=`<div class="hist-empty">No tests yet. Take a practice test and your results show up here.</div>`;
  } else if(allMode){
    hist = h.slice(0,12).map(r=>{
      const pct=Math.round(r.score/r.total*100);
      const d=new Date(r.date);
      const ds=d.toLocaleDateString(undefined,{month:"short",day:"numeric"});
      const sName=(STATES[r.state]&&STATES[r.state].name)||r.state;
      return `<div class="hist-row"><span class="htest">${sName} · ${r.ver}</span><span style="color:var(--muted);font-size:12.5px">${ds}</span><span class="hscore ${r.pass?'p':'f'}">${r.score}/${r.total} · ${pct}%</span></div>`;
    }).join("");
  } else {
    const verNames=["Test A","Test B","Test C","Random Mix"];
    const verRow=verNames.map(vn=>{
      const runs=h.filter(r=>r.ver===vn);
      if(!runs.length) return `<div class="ver-card untaken"><div class="vname">${vn}</div><div class="vbest">--</div><div class="vstatus">Not taken</div></div>`;
      const vbest=Math.max(...runs.map(r=>r.score));
      const passed=runs.some(r=>r.pass);
      return `<div class="ver-card ${passed?'passed':'notyet'}"><div class="vname">${vn}</div><div class="vbest">${vbest}/20</div><div class="vstatus">${passed?'Passed':'Keep trying'}</div></div>`;
    }).join("");
    hist = `<div class="ver-row">${verRow}</div>` + h.slice(0,8).map(r=>{
      const pct=Math.round(r.score/r.total*100);
      const d=new Date(r.date);
      const ds=d.toLocaleDateString(undefined,{month:"short",day:"numeric"})+" "+d.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"});
      return `<div class="hist-row"><span class="htest">${r.ver}</span><span style="color:var(--muted);font-size:12.5px">${ds}</span><span class="hscore ${r.pass?'p':'f'}">${r.score}/${r.total} · ${pct}%</span></div>`;
    }).join("");
  }
  document.getElementById("progHistory").innerHTML=hist;
  // weak topics
  const weak=Object.entries(p.weak).sort((a,b)=>b[1]-a[1]);
  if(!weak.length){
    document.getElementById("progWeak").innerHTML=`<div class="weak-empty">Nothing flagged yet. Miss a question and the topic shows up here so you know what to review.</div>`;
  } else {
    document.getElementById("progWeak").innerHTML=weak.slice(0,18).map(([t,c])=>
      `<span class="weak-chip">${t}<span class="cnt">${c}</span></span>`).join("");
  }
}
document.querySelectorAll("#progScope button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll("#progScope button").forEach(x=>x.classList.remove("on"));
    b.classList.add("on"); progScope=b.dataset.scope; progFilterState=""; renderProgress();
  });
});
document.getElementById("progStateFilter").addEventListener("change",e=>{
  progFilterState=e.target.value; renderProgress();
});
document.getElementById("progReset").addEventListener("click",()=>{
  if(progScope==="all"){
    if(confirm("Reset progress for ALL states in this browser? This cannot be undone.")){
      try{
        const keys=[];
        for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k&&k.indexOf("ncdmv_progress_")===0) keys.push(k); }
        keys.forEach(k=>localStorage.removeItem(k));
      }catch(e){}
      renderProgress();
    }
  } else {
    if(confirm("Reset saved progress for "+(CUR?CUR.name:"this state")+"? This cannot be undone.")){
      try{ localStorage.removeItem(pkey()); }catch(e){}
      renderProgress();
    }
  }
});

/* ============ ROAD TEST RENDER ============ */
document.getElementById("rtSkills").innerHTML=RT_SKILLS.map((s,i)=>`
  <div class="rt-skill"><div class="num">${i+1}</div><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("");
document.getElementById("rtFails").innerHTML=RT_FAILS.map(f=>`
  <div class="rt-fail"><span class="x">!</span><span>${f}</span></div>`).join("");
document.getElementById("rtCar").innerHTML=RT_CAR.map(c=>`
  <div class="check-card"><h3>${c.title}</h3><div class="tagline">Bring ${c.note}</div>
    <ul class="check-list">${c.items.map(i=>`<li><span class="check-box" role="checkbox"></span><span>${i}</span></li>`).join("")}</ul>
  </div>`).join("");
function renderRtNote(){
  const s=CUR||{name:"your state"};
  document.getElementById("rtNote").innerHTML=`<strong>Bringing a borrowed car?</strong> Most states allow it, including ${s.name}, but the car needs its own valid registration and insurance, and the examiner checks the vehicle's documents, not just yours. Line this up before you book the road test slot.`;
}
// wire road test checkboxes through shared wirer
wireCheckboxes();

/* ---- state-specific rules format note ---- */
function renderRulesFormatCard(){
  if(!CUR) return;
  document.getElementById("rulesFormat").innerHTML=
    `<strong>${CUR.name} test format:</strong> ${CUR.q} multiple-choice questions, ${CUR.pass} correct (${CUR.pct}%) to pass. These figures are study guidance and can change, so confirm them in the current ${CUR.name} driver handbook. The rules below apply nationwide; a few details (exact penalties, deadlines) can vary by state.`;
  renderRtNote();
}

/* ============ LANDING SCREEN + STATE SWITCHER ============ */
function fillStateSelects(){
  const opts = stateList().map(s=>`<option value="${s.abbr}">${s.name}</option>`).join("");
  const sel=document.getElementById("stateSelect");
  sel.innerHTML=`<option value="">Select a state...</option>`+opts;
  const sw=document.getElementById("stateSwitch");
  sw.innerHTML=opts;
}
function showApp(abbr){
  applyState(abbr);
  document.getElementById("landing").style.display="none";
  document.getElementById("siteFooter").style.display="block";
  const y=document.getElementById("sfYear"); if(y) y.textContent=new Date().getFullYear();
}
function initState(){
  fillStateSelects();
  const sel=document.getElementById("stateSelect");
  const go=document.getElementById("landGo");
  sel.addEventListener("change",()=>{ go.disabled=!sel.value; });
  go.addEventListener("click",()=>{ if(sel.value) showApp(sel.value); });
  sel.addEventListener("keydown",e=>{ if(e.key==="Enter"&&sel.value) showApp(sel.value); });
  document.getElementById("stateSwitch").addEventListener("change",e=>{ applyState(e.target.value); });
  // per-session memory: if a state was chosen this session, skip landing
  let saved=null;
  try{ saved=sessionStorage.getItem("ncdmv_state"); }catch(e){}
  if(saved && STATES[saved]){ showApp(saved); }
}
initState();
renderProgress();
loadVersion(0);
