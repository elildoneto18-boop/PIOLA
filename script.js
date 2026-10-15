// O CELULAR DE ELIUDO — dados narrativos editáveis
const CONFIG = {
  lockPassword: "1234",
  // Deixe null até decidir a senha das conversas arquivadas.
  archivePassword: null,
  deviceOwner: "Diogo",
  contactName: "Eliudo",
  contactInitial: "E",
  startTime: "15:01"
};

const MESSAGES = [
 {date:"12 de outubro",type:"in",text:"Mano, tu vai entrar hoje?",time:"19:04"},
 {type:"out",text:"Vou sim, só terminar umas coisas aqui.",time:"19:06"},
 {type:"in",text:"Fechou. Depois te mando o negócio.",time:"19:06"},
 {date:"Ontem",type:"out",text:"Eliudo?",time:"22:41"},
 {type:"out",text:"Tu sumiu do nada, cara.",time:"22:43"},
 {type:"in",text:"",time:"22:47",call:"Chamada de voz",sub:"Atendida · 00:18"},
 {type:"out",text:"O que foi aquilo?",time:"22:49"},
 {type:"out",text:"Me responde quando ver isso.",time:"23:02"},
 {date:"Hoje",type:"out",text:"Cadê você?",time:"00:12"},
 {type:"out",text:"Mano, responde.",time:"00:13"},
 {type:"out",text:"Tu tá aí?",time:"00:18"},
 {type:"in",text:"",time:"00:21",call:"Chamada perdida",sub:"Não atendida"},
 {type:"out",text:"Me atende, por favor.",time:"00:22"},
 {type:"out",text:"Preciso falar contigo.",time:"00:37"},
 {type:"out",text:"Eliudo, onde você tá?",time:"01:06"},
 {type:"out",text:"",time:"01:13",audio:true},
 {type:"in",text:"",time:"01:17",call:"Chamada de voz",sub:"Atendida · 00:03"},
 {type:"out",text:"Por que tu desligou?",time:"01:18"},
 {type:"out",text:"Isso não tem graça.",time:"01:26"},
 {type:"out",text:"",time:"03:33",call:"Chamada perdida",sub:"Não atendida"},
 {type:"out",text:"Eu sei que tu tá vendo isso.",time:"03:34"}
];

const CALLS = [
 {type:"video",direction:"out",status:"perdida",date:"Hoje",time:"12:14",duration:"—"},
 {type:"voice",direction:"out",status:"perdida",date:"Hoje",time:"12:13",duration:"—"},
 {type:"video",direction:"out",status:"perdida",date:"Hoje",time:"12:10",duration:"—"},
 {type:"voice",direction:"out",status:"perdida",date:"Hoje",time:"12:07",duration:"—"},
 {type:"voice",direction:"out",status:"atendida",date:"Hoje",time:"01:17",duration:"00:03"},
 {type:"voice",direction:"out",status:"perdida",date:"Hoje",time:"00:21",duration:"—"},
 {type:"voice",direction:"out",status:"atendida",date:"Ontem",time:"22:47",duration:"00:18"},
 {type:"video",direction:"out",status:"perdida",date:"Ontem",time:"22:39",duration:"—"}
];

const screens = [...document.querySelectorAll(".screen")];
const toast = document.getElementById("toast");
let currentScreen = "lockscreen", pin = "", activeTab = "conversas", lastCall = CALLS[0], toastTimer;

function showScreen(id){screens.forEach(s=>s.classList.toggle("hidden",s.id!==id));currentScreen=id;document.getElementById("appMenu").classList.add("hidden");}
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2300);}
function openWhatsApp(tab="conversas"){activeTab=tab;showScreen("whatsapp");renderTab();}
function home(){showScreen("home");}
function makeAvatar(letter="E"){
 if(letter==="E") return `<div class="avatar eliudo-avatar"><img src="assets/images/profile-eliudo.jpg" alt="Foto de perfil de Eliudo"></div>`;
 return `<div class="avatar">${letter}</div>`;
}

function renderTab(){
 document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===activeTab));
 const body=document.getElementById("waBody");
 if(activeTab==="conversas"){
  body.innerHTML=`<div class="section-heading">Conversas <span style="float:right">⌕　⋮</span><div style="font-size:10px;color:#737a82;margin-top:6px">Conta local de Diogo</div></div>
   <button class="conversation-row" id="openChat">${makeAvatar("E")}<div class="row-text"><b>Eliudo</b><small>Eu sei que tu tá vendo isso.</small></div><div class="row-meta">03:34<br><span class="unread">3</span></div></button>
   <button class="conversation-row" id="archiveRow"><div class="avatar">▣</div><div class="row-text"><b>Arquivadas</b><small>Conversas protegidas</small></div><div class="row-meta">1</div></button>
   <div class="empty-state">Suas conversas pessoais são armazenadas neste dispositivo.</div>`;
  document.getElementById("openChat").onclick=()=>openChat();
  document.getElementById("archiveRow").onclick=()=>openArchive();
 } else if(activeTab==="ligacoes"){
  body.innerHTML=`<div class="section-heading">Recentes <span style="float:right">＋</span></div>`+CALLS.map((c,i)=>`<button class="call-row" data-call="${i}"><span class="call-icon ${c.status==="perdida"?"missed":"answered"}">${c.type==="video"?"▣":"☎"}</span>${makeAvatar("E")}<div class="row-text"><b>Eliudo</b><small><span class="${c.status==="perdida"?"missed":"answered"}">${c.status==="perdida"?"↙":"↗"}</span>　${c.date} ${c.time} · ${c.status==="perdida"?"Não atendida":c.duration}</small></div><span class="header-icon">${c.type==="video"?"▣":"☎"}</span></button>`).join("");
  body.querySelectorAll("[data-call]").forEach(b=>b.onclick=()=>showCall(CALLS[Number(b.dataset.call)]));
 } else if(activeTab==="atualizacoes"){
  body.innerHTML=`<div class="section-heading">Status</div><div class="conversation-row">${makeAvatar("D")}<div class="row-text"><b>Meu status</b><small>Compartilhe uma atualização</small></div></div><div class="empty-state"><b>Nenhuma atualização recente</b>Não há novidades por aqui.</div>`;
 } else {
  body.innerHTML=`<div class="conversation-row">${makeAvatar("＋")}<div class="row-text"><b>Nova comunidade</b><small>Organize grupos em um só lugar</small></div></div><div class="empty-state"><b>Suas comunidades</b>Nenhuma comunidade disponível neste dispositivo.</div>`;
 }
}
function openChat(){showScreen("chat");renderMessages();}
function renderMessages(){
 const container=document.getElementById("messages");
 container.innerHTML=MESSAGES.map(m=>{
  let date=m.date?`<div class="date-separator">${m.date}</div>`:"";
  let content=m.call?`<div class="call-bubble"><span class="call-symbol">☎</span><span>${m.call}<br><small>${m.sub}</small></span><span class="time">${m.time}</span></div>`:
   m.audio?`<div class="audio-card"><button class="play-audio" aria-label="Tentar reproduzir áudio">▶</button><div style="flex:1"><div class="audio-track"></div><div class="audio-meta">Áudio　 0:17</div></div></div><span class="time">${m.time}</span>`:
   `${escapeHtml(m.text)}<span class="time">${m.time}${m.type==="out"?'<span class="checks"> ✓✓</span>':""}</span>`;
  return `${date}<div class="bubble ${m.type} ${m.call?"call-bubble":""} ${m.audio?"audio-bubble":""}">${content}</div>`;
 }).join("");
 container.querySelectorAll(".play-audio").forEach(b=>b.onclick=()=>{
  b.textContent="…";b.disabled=true;
  setTimeout(()=>{b.textContent="▶";b.disabled=false;notify("Não foi possível reproduzir este áudio.");},1800);
 });
 container.scrollTop=container.scrollHeight;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function showCall(c){
 lastCall=c;showScreen("callDetail");
 document.getElementById("callDetailBody").innerHTML=`${makeAvatar("E")}<h2>Eliudo</h2><p>WhatsApp · ${c.type==="video"?"Chamada de vídeo":"Chamada de voz"}</p><div class="detail-line"><span>Tipo</span><b class="${c.status==="perdida"?"missed":"answered"}">${c.status==="perdida"?"Chamada perdida":"Chamada atendida"}</b></div><div class="detail-line"><span>Data</span><b>${c.date}</b></div><div class="detail-line"><span>Horário</span><b>${c.time}</b></div><div class="detail-line"><span>Duração</span><b>${c.duration}</b></div><p style="margin-top:28px;font-size:12px">Registro local do dispositivo</p>`;
}
function openArchive(){showScreen("archiveLock");document.getElementById("archivePassword").value="";document.getElementById("archiveError").textContent="";}
function openPin(){document.getElementById("pinPanel").classList.remove("hidden");pin="";updatePin();}
function updatePin(){document.getElementById("pinDots").textContent=("● ".repeat(pin.length)+"○ ".repeat(4-pin.length)).trim();document.getElementById("pinError").textContent="";}
function submitPin(){if(pin===CONFIG.lockPassword){document.getElementById("pinPanel").classList.add("hidden");showScreen("home");notify("Celular de Diogo desbloqueado");}else{document.getElementById("pinError").textContent="Senha incorreta";pin="";updatePin();}}
const keypad=document.getElementById("keypad");
[1,2,3,4,5,6,7,8,9,"⌫",0,"✓"].forEach(n=>{const b=document.createElement("button");b.textContent=n;b.onclick=()=>{if(n==="⌫")pin=pin.slice(0,-1);else if(n==="✓"){submitPin();return}else if(pin.length<4)pin+=String(n);updatePin();if(pin.length===4)setTimeout(submitPin,180);};keypad.appendChild(b);});
document.getElementById("unlockHint").onclick=openPin;
document.getElementById("lockscreen").addEventListener("click",e=>{if(e.target.id==="lockscreen"||e.target.classList.contains("lock-shade"))openPin();});
document.getElementById("cancelPin").onclick=()=>document.getElementById("pinPanel").classList.add("hidden");
document.querySelectorAll("[data-home]").forEach(b=>b.onclick=home);
document.querySelectorAll("[data-wa]").forEach(b=>b.onclick=()=>openWhatsApp());
document.querySelectorAll("[data-back]").forEach(b=>b.onclick=()=>{if(currentScreen==="chat"||currentScreen==="callDetail"||currentScreen==="settings"||currentScreen==="archiveLock")openWhatsApp();else if(currentScreen==="whatsapp")home();else if(currentScreen==="home")notify("Você está na tela inicial.");});
document.querySelectorAll("[data-app]").forEach(b=>b.onclick=()=>b.dataset.app==="whatsapp"?openWhatsApp():notify("Aplicativo indisponível neste dispositivo."));
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{activeTab=b.dataset.tab;renderTab();});
document.getElementById("waMenu").onclick=()=>document.getElementById("appMenu").classList.toggle("hidden");
document.getElementById("closeMenu").onclick=()=>document.getElementById("appMenu").classList.add("hidden");
document.getElementById("openSettings").onclick=()=>showScreen("settings");
document.getElementById("openArchive").onclick=openArchive;
document.getElementById("waSearch").onclick=()=>notify("Nenhuma outra conversa encontrada.");
document.getElementById("chatCall").onclick=()=>notify("Chamadas reais estão desativadas.");
document.getElementById("archiveSubmit").onclick=()=>{
 const value=document.getElementById("archivePassword").value;
 if(!CONFIG.archivePassword){document.getElementById("archiveError").textContent="Acesso indisponível.";return;}
 if(value===CONFIG.archivePassword){notify("Esta parte ainda não foi adicionada ao ARG.");}else document.getElementById("archiveError").textContent="Senha incorreta.";
};
document.getElementById("archivePassword").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("archiveSubmit").click();});
document.querySelectorAll(".setting").forEach(b=>b.onclick=()=>notify("Esta configuração está indisponível."));
function updateClock(){const d=new Date();const time=d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});document.getElementById("homeTime").textContent=time;document.getElementById("lockClock").textContent=time;document.getElementById("lockDate").textContent=d.toLocaleDateString("pt-BR",{weekday:"short",day:"numeric",month:"long"}).replace(".-",".");}
updateClock();setInterval(updateClock,30000);
showScreen("lockscreen");
