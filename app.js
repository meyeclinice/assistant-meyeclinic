/* ===== Animations CSS (injectées) ===== */
const animCSS = `
@keyframes catOpac{0%,12%{opacity:0}55%,90%{opacity:1}100%{opacity:0}}
.an .opac{animation:catOpac 4.6s ease-in-out infinite}
@keyframes catSepia{0%,12%{opacity:0}55%,90%{opacity:.8}100%{opacity:0}}
.an .sepia{animation:catSepia 4.6s ease-in-out infinite}
@keyframes refA{0%,42%{opacity:1}52%,100%{opacity:0}} @keyframes refB{0%,42%{opacity:0}52%,95%{opacity:1}100%{opacity:0}}
.an .gemme{animation:refA 5s ease-in-out infinite}.an .gmyo{animation:refB 5s ease-in-out infinite}
@keyframes laserBeam{0%,15%{opacity:0}25%,60%{opacity:1}75%,100%{opacity:0}}
.an .beam{animation:laserBeam 4s linear infinite}.an .beam:nth-child(2){animation-delay:.1s}.an .beam:nth-child(3){animation-delay:.2s}.an .beam:nth-child(4){animation-delay:.3s}.an .beam:nth-child(5){animation-delay:.4s}.an .beam:nth-child(6){animation-delay:.5s}.an .beam:nth-child(7){animation-delay:.15s}
@keyframes ivtMove{0%{transform:translateY(-6px)}26%,44%{transform:translateY(30px)}66%,100%{transform:translateY(-6px)}}
.an .needle{animation:ivtMove 4.2s ease-in-out infinite}
@keyframes ivtDiff{0%,30%{transform:scale(.65);opacity:.4}50%{transform:scale(1.15);opacity:.9}72%,100%{transform:scale(.9);opacity:.6}}
.an .diffuse{animation:ivtDiff 4.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes tearShow{0%,12%{opacity:0;transform:scale(.4)}20%{opacity:1;transform:scale(1)}100%{opacity:1}}
.an .tear{animation:tearShow 5s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
`;
const st=document.createElement('style');st.textContent=animCSS;document.head.appendChild(st);

/* ===== SVG animations ===== */
const SVG={
cataracte:`<svg class="an" viewBox="0 0 280 150"><g><rect x="6" y="42" width="70" height="66" rx="8" fill="#bfe3ff"/><circle cx="28" cy="62" r="10" fill="#fcd34d"/><rect x="6" y="92" width="70" height="16" fill="#86efac"/><polygon points="56,72 46,86 66,86" fill="#dc2626"/><rect class="sepia" x="6" y="42" width="70" height="66" rx="8" fill="#2e1f0c"/><rect x="6" y="42" width="70" height="66" rx="8" fill="none" stroke="#0a3d8f" stroke-width="2"/></g><line x1="78" y1="60" x2="122" y2="72" stroke="#cbd5e1" stroke-width="1.5"/><line x1="78" y1="92" x2="122" y2="80" stroke="#cbd5e1" stroke-width="1.5"/><circle cx="190" cy="75" r="60" fill="#fdeede" stroke="#0a3d8f" stroke-width="3"/><path d="M218 30 A60 60 0 0 1 218 120" fill="none" stroke="#e8743b" stroke-width="6" opacity=".55"/><path d="M132 50 Q118 75 132 100" fill="#dff0ff" stroke="#1565d8" stroke-width="2"/><line x1="134" y1="52" x2="143" y2="60" stroke="#1565d8" stroke-width="4"/><line x1="134" y1="98" x2="143" y2="90" stroke="#1565d8" stroke-width="4"/><ellipse cx="150" cy="75" rx="14" ry="24" fill="#d3e6ff" stroke="#1565d8" stroke-width="2"/><g class="opac"><ellipse cx="150" cy="75" rx="14" ry="24" fill="#4a3a1e"/><ellipse cx="150" cy="75" rx="9.5" ry="18" fill="#241906"/></g></svg>`,
refraction:`<svg class="an" viewBox="0 0 230 155"><g class="gemme"><circle cx="120" cy="72" r="50" fill="#fff" stroke="#0a3d8f" stroke-width="3"/><ellipse cx="82" cy="72" rx="9" ry="19" fill="#cfe2ff" stroke="#1565d8" stroke-width="2"/><path d="M165 40 A50 50 0 0 1 165 104" fill="none" stroke="#16a34a" stroke-width="4"/><path d="M22 56 L82 67 L164 72" fill="none" stroke="#f0a500" stroke-width="2"/><path d="M22 88 L82 77 L164 72" fill="none" stroke="#f0a500" stroke-width="2"/><circle cx="164" cy="72" r="5" fill="#16a34a"/><text x="115" y="148" text-anchor="middle" class="lbl" fill="#0f766e">Emmétrope — net sur la rétine</text></g><g class="gmyo"><ellipse cx="116" cy="72" rx="64" ry="50" fill="#fff" stroke="#0a3d8f" stroke-width="3"/><ellipse cx="68" cy="72" rx="9" ry="19" fill="#cfe2ff" stroke="#1565d8" stroke-width="2"/><path d="M178 40 A50 50 0 0 1 178 104" fill="none" stroke="#16a34a" stroke-width="4"/><path d="M14 56 L68 67 L120 72" fill="none" stroke="#f0a500" stroke-width="2"/><path d="M14 88 L68 77 L120 72" fill="none" stroke="#f0a500" stroke-width="2"/><circle cx="120" cy="72" r="5" fill="#dc2626"/><text x="115" y="148" text-anchor="middle" class="lbl" fill="#b91c1c">Myope — l'œil s'allonge, foyer en avant</text></g></svg>`,
laser:`<svg class="an" viewBox="0 0 200 150"><path d="M30 118 Q100 22 170 118" fill="none" stroke="#0a3d8f" stroke-width="2" opacity=".25" stroke-dasharray="4 4"/><path stroke="#16b8a6" stroke-width="4" fill="none" stroke-linecap="round"><animate attributeName="d" dur="4s" repeatCount="indefinite" values="M30 118 Q100 24 170 118;M30 118 Q100 60 170 118;M30 118 Q100 60 170 118;M30 118 Q100 24 170 118" keyTimes="0;0.45;0.8;1" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"/></path><g stroke="#dc2626" stroke-width="2" stroke-linecap="round"><line class="beam" x1="55" y1="0" x2="55" y2="78"/><line class="beam" x1="70" y1="0" x2="70" y2="64"/><line class="beam" x1="85" y1="0" x2="85" y2="52"/><line class="beam" x1="100" y1="0" x2="100" y2="48"/><line class="beam" x1="115" y1="0" x2="115" y2="52"/><line class="beam" x1="130" y1="0" x2="130" y2="64"/><line class="beam" x1="145" y1="0" x2="145" y2="78"/></g><text x="100" y="142" text-anchor="middle" class="lbl" fill="#0a3d8f">LASIK</text></svg>`,
keratocone:`<svg class="an" viewBox="0 0 200 150"><path d="M150 35 a70 70 0 1 0 0 80" fill="#fff" stroke="#0a3d8f" stroke-width="3"/><circle cx="95" cy="75" r="13" class="pupil"/><circle cx="95" cy="75" r="26" fill="none" stroke="#1565d8" stroke-width="2" opacity=".5"/><path fill="none" stroke="#16b8a6" stroke-width="5" stroke-linecap="round"><animate attributeName="d" dur="3.6s" repeatCount="indefinite" values="M150 40 Q176 75 150 110;M150 40 Q205 75 150 110;M150 40 Q176 75 150 110" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/></path></svg>`,
ivt:`<svg class="an" viewBox="0 0 200 150"><g class="needle"><rect x="91" y="0" width="18" height="28" rx="3" fill="#cfe2ff" stroke="#1565d8" stroke-width="2"/><line x1="100" y1="28" x2="100" y2="60" stroke="#94a3b8" stroke-width="3"/></g><path d="M50 60 Q64 47 82 51" fill="none" stroke="#0a3d8f" stroke-width="3" stroke-linecap="round"/><circle cx="100" cy="90" r="52" fill="#fff" stroke="#0a3d8f" stroke-width="3"/><circle cx="100" cy="90" r="35" fill="#eaf3ff"/><circle class="diffuse" cx="100" cy="90" r="14" fill="#a9d2ff"/></svg>`,
decollement:`<svg class="an" viewBox="0 0 240 150"><circle cx="140" cy="75" r="62" fill="#fdeede" stroke="#0a3d8f" stroke-width="3"/><path d="M84 48 Q70 75 84 102" fill="#dff0ff" stroke="#1565d8" stroke-width="2"/><ellipse cx="96" cy="75" rx="11" ry="20" fill="#d3e6ff" stroke="#1565d8" stroke-width="1.5"/><path d="M172 26 A62 62 0 0 1 172 124" fill="none" stroke="#e8743b" stroke-width="7" opacity=".3"/><path class="tear" d="M176 44 l4 -7 l3 8 l6 -3 l-2 9 l-8 -2 z" fill="#f97316" stroke="#b91c1c" stroke-width="1.4"/><path fill="#f3a06a" fill-opacity=".5" stroke="#d9542a" stroke-width="2.5" stroke-opacity=".85" stroke-linejoin="round"><animate attributeName="d" dur="6.5s" repeatCount="indefinite" values="M176 48 C152 70 152 96 122 102 C152 106 170 112 176 120 Z;M176 48 C140 64 162 98 110 98 C152 110 170 114 176 120 Z;M176 48 C154 72 144 94 116 106 C150 100 170 110 176 120 Z;M176 48 C140 64 162 98 110 98 C152 110 170 114 176 120 Z;M176 48 C152 70 152 96 122 102 C152 106 170 112 176 120 Z" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/></path></svg>`,
strabisme:`<svg class="an" viewBox="0 0 230 130"><ellipse cx="64" cy="60" rx="48" ry="31" fill="#fff" stroke="#0a3d8f" stroke-width="3"/><circle cx="64" cy="60" r="17" class="iris"/><circle cx="64" cy="60" r="7.5" class="pupil"/><ellipse cx="166" cy="60" rx="48" ry="31" fill="#fff" stroke="#0a3d8f" stroke-width="3"/><circle cx="192" cy="60" r="17" class="iris"/><circle cx="192" cy="60" r="7.5" class="pupil"/></svg>`,
glaucome:`<svg class="an" viewBox="0 0 200 150"><circle cx="100" cy="75" r="60" fill="#fff" stroke="#0a3d8f" stroke-width="3"/><circle cx="100" cy="75" r="34" class="iris"/><circle cx="100" cy="75" r="14" class="pupil"/><g stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"><path d="M100 26 l0 -10"><animate attributeName="opacity" dur="3s" values="0;1;0" repeatCount="indefinite"/></path><path d="M149 75 l10 0"><animate attributeName="opacity" dur="3s" values="0;1;0" begin="0.4s" repeatCount="indefinite"/></path><path d="M51 75 l-10 0"><animate attributeName="opacity" dur="3s" values="0;1;0" begin="0.8s" repeatCount="indefinite"/></path></g><text x="100" y="142" text-anchor="middle" class="muted">Pression oculaire élevée</text></svg>`,
};

/* ===== Pathologies ===== */
const P=[
{id:'cataracte',svg:SVG.cataracte,title:'Cataracte',short:"Opacification du cristallin",lead:"Le cristallin, lentille naturelle de l'œil, devient progressivement opaque : la vision se voile et se teinte.",html:`<h3>Le mécanisme</h3><p>Avec l'âge, le cristallin perd sa transparence. La vision se brouille, l'éblouissement augmente, les couleurs ternissent.</p><h3>Le traitement</h3><p>La chirurgie remplace le cristallin opacifié par un implant transparent, en ambulatoire et sous anesthésie locale. La récupération est rapide.</p>`},
{id:'refraction',svg:SVG.refraction,title:'Myopie, hypermétropie, astigmatisme',short:"Quand l'image ne se forme pas sur la rétine",lead:"Selon la longueur de l'œil et la cornée, l'image se forme en avant ou en arrière de la rétine.",html:`<h3>Le mécanisme</h3><p>Dans la myopie, l'œil est trop long : l'image se forme en avant de la rétine (vision floue de loin). La correction (lunettes, lentilles ou laser) ramène l'image sur la rétine.</p>`},
{id:'laser',svg:SVG.laser,title:'Chirurgie laser réfractive',short:"LASIK, PKR, SMILE",lead:"Le laser remodèle la cornée pour se libérer des lunettes.",html:`<h3>Le principe</h3><p>Le laser modifie la courbure de la cornée afin que les rayons se focalisent sur la rétine. Un bilan pré-opératoire détermine si vous êtes opérable et quelle technique convient.</p>`},
{id:'keratocone',svg:SVG.keratocone,title:'Kératocône',short:"Déformation de la cornée en cône",lead:"La cornée s'amincit et se bombe en cône, déformant la vision.",html:`<h3>Le diagnostic</h3><p>La topographie cornéenne cartographie la cornée. Un suivi régulier détecte une évolution.</p><h3>Les traitements</h3><p>Cross-linking pour stabiliser, anneaux intracornéens, lentilles adaptées, et greffe dans les cas avancés.</p>`},
{id:'ivt',svg:SVG.ivt,title:'Injections intravitréennes (IVT)',short:"Traitement de la rétine",lead:"Une aiguille fine injecte un traitement dans la cavité vitréenne (DMLA, rétinopathie diabétique).",html:`<h3>Le déroulé</h3><p>L'injection est réalisée au cabinet, sous anesthésie locale par collyre, en conditions stériles. Le geste est rapide et bien toléré.</p>`},
{id:'decollement',svg:SVG.decollement,title:'Décollement de rétine',short:"Une urgence ophtalmologique",lead:"Après une déchirure, la rétine se décolle de la paroi du fond de l'œil.",html:`<h3>Les signes d'alerte</h3><p>Éclairs lumineux, pluie de corps flottants, voile ou rideau dans le champ de vision. <b>Consultez en urgence</b> : la rapidité de prise en charge est déterminante.</p>`},
{id:'strabisme',svg:SVG.strabisme,title:'Strabisme',short:"Déviation d'un œil",lead:"Les deux yeux ne sont pas alignés ; un œil dévie vers l'intérieur ou l'extérieur.",html:`<h3>La prise en charge</h3><p>Bilan orthoptique, correction optique, rééducation et, si besoin, chirurgie. Le dépistage précoce chez l'enfant est essentiel.</p>`},
{id:'glaucome',svg:SVG.glaucome,title:'Glaucome',short:"Pression oculaire et nerf optique",lead:"Une atteinte progressive et silencieuse du nerf optique, souvent liée à une pression oculaire élevée.",html:`<h3>Le dépistage</h3><p>Souvent sans symptôme, d'où l'importance d'un contrôle régulier après 40 ans. Traitements : collyres, laser ou chirurgie pour stabiliser la pression.</p>`},
];

/* ===== Rendu ===== */
function el(html){const d=document.createElement('div');d.innerHTML=html;return d.firstElementChild;}
document.getElementById('heroStage').innerHTML=SVG.refraction;
const pgrid=document.getElementById('pgrid');
P.forEach(p=>{
  const c=el(`<div class="pcard"><div class="thumb">${p.svg}</div><div class="body"><h3>${p.title}</h3><p>${p.short}</p><div class="more">En savoir plus →</div></div></div>`);
  c.onclick=()=>openDetail(p.id);pgrid.appendChild(c);
});
function openDetail(id){const p=P.find(x=>x.id===id);if(!p)return;
  document.getElementById('dstage').innerHTML=p.svg;
  document.getElementById('dcontent').innerHTML=`<h1>${p.title}</h1><p class="lead">${p.lead}</p>${p.html}<div style="margin-top:1.6rem"><a class="btn btn-primary" href="https://www.doctolib.fr/cabinet-medical/nice/m-eye-clinic" target="_blank" rel="noopener">Prendre rendez-vous</a></div>`;
  go('detail');scrollTo(0,0);
}
/* ===== Navigation ===== */
function go(v){document.querySelectorAll('.view').forEach(s=>s.classList.remove('active'));document.getElementById(v).classList.add('active');
  document.querySelectorAll('.menu a[data-v]').forEach(a=>a.classList.toggle('on',a.dataset.v===v));
  document.getElementById('menu').classList.remove('open');
  if(v==='chat')setTimeout(()=>document.getElementById('input').focus(),100);}
window.go=go;

/* ===== Chat ===== */
const msgsEl=document.getElementById('msgs');let history=[];
const suggestions=["Comment se passe l'opération de la cataracte ?","Suis-je opérable au laser ?","Que faire après mon injection (IVT) ?","Quand consulter en urgence ?"];
const sg=document.getElementById('suggest');
suggestions.forEach(s=>{const c=el(`<span class="chip">${s}</span>`);c.onclick=()=>{document.getElementById('input').value=s;send()};sg.appendChild(c);});
function fmt(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>');}
function addMsg(role,text){const m=el(`<div class="msg ${role==='user'?'u':'a'}">${role==='user'?fmt(text):text}</div>`);msgsEl.appendChild(m);msgsEl.scrollTop=msgsEl.scrollHeight;return m;}
if(!msgsEl.children.length)addMsg('assistant',"Bonjour 👋 Je suis l'assistant de M'Eye Clinic. Posez-moi vos questions sur vos yeux, vos examens ou votre opération. <i style='color:#94a3b8'>(Je donne des informations générales, je ne remplace pas votre médecin.)</i>");
async function send(){
  const inp=document.getElementById('input');const text=inp.value.trim();if(!text)return;
  inp.value='';document.getElementById('suggest').style.display='none';
  addMsg('user',text);history.push({role:'user',content:text});
  const wait=addMsg('assistant',"<i style='color:#94a3b8'>L'assistant réfléchit…</i>");
  try{
    const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history})});
    const data=await r.json();
    const reply=(data&&data.reply)?data.reply:"Désolé, une erreur est survenue. Réessayez ou appelez le 04 97 19 30 46.";
    wait.innerHTML=fmt(reply);history.push({role:'assistant',content:reply});msgsEl.scrollTop=msgsEl.scrollHeight;
  }catch(e){wait.innerHTML="Connexion impossible pour le moment. Réessayez, ou appelez le <b>04 97 19 30 46</b>.";}
}
window.send=send;
