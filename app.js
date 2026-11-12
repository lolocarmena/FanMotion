(function(){
"use strict";
const C=window.CFG||{},$=s=>document.querySelector(s);
const WA=C.WHATSAPP||"542325597576";
const wa=t=>"https://wa.me/"+WA+"?text="+encodeURIComponent(t);
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const clean=n=>n.normalize("NFD").replace(/[^\w.\-]+/g,"_");
let sb=null,isAdmin=false,DATA=[];

/* Loader animado */
const lt=$("#lt");"FAN.MOTION".split("").forEach((ch,i)=>{const s=el("span",ch==="."?"d":"",ch);s.style.animationDelay=(i*.08)+"s,"+(1+i*.08)+"s";lt.appendChild(s)});
const t0=performance.now();
function hideLoader(){const w=Math.max(0,1900-(performance.now()-t0));setTimeout(()=>{$("#loader").classList.add("out");document.body.classList.remove("ld");setTimeout(()=>$("#loader").remove(),700)},w)}
window.addEventListener("load",hideLoader);setTimeout(hideLoader,6000);

$("#yr").textContent=new Date().getFullYear();
$("#wa1").href=$("#wa2").href=wa("Hola Juan Manuel, estoy interesado en tus servicios");

/* Reveal + videos solo reproducen cuando se ven */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll(".rv").forEach(x=>io.observe(x));
const vio=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.getAttribute("src"))v.src=v.dataset.src;v.preload="auto";if(window.innerWidth<=820)v.play().catch(()=>{})}else v.pause()}),{rootMargin:"300px"});

/* Galería: carrusel automático (se frena con el cursor encima) */
const track=$("#grid"),car=$(".car");let hov=false,hold=false,vis=true,tt=0;
function media(it,full){
  if(it.type==="video"){const v=document.createElement("video");v.muted=true;v.loop=true;v.playsInline=true;v.preload="metadata";
    if(it.poster)v.poster=it.poster;v.addEventListener("loadedmetadata",()=>{if(v.videoHeight>v.videoWidth*1.05)v.classList.add("tall")});
    if(full){v.src=it.url;v.controls=true;v.muted=false;v.autoplay=true}else{v.dataset.src=it.url+"#t=0.1";vio.observe(v)}return v}
  const i=document.createElement("img");i.alt=it.title;i.loading="lazy";i.decoding="async";
  i.onload=()=>{if(i.naturalHeight>i.naturalWidth*1.05)i.classList.add("tall")};i.src=it.url;return i}
function updNav(){$("#pv").disabled=track.scrollLeft<=4;$("#nx").disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-4}
function render(){
  track.replaceChildren();track.scrollLeft=0;
  if(!DATA.length){track.appendChild(el("div","empty","Pronto vas a ver acá los proyectos. ✦"));updNav();return}
  const fr=document.createDocumentFragment();
  DATA.forEach(it=>{const c=el("div","card"),m=media(it);c.appendChild(m);
    const cap=el("div","cap");cap.append(el("span","",it.title),el("span","tag",it.type==="video"?"Video":"Imagen"));c.appendChild(cap);
    if(it.type==="video"&&window.matchMedia("(hover:hover)").matches){c.onmouseenter=()=>{if(!m.getAttribute("src"))m.src=m.dataset.src;m.preload="auto";m.play().catch(()=>{})};c.onmouseleave=()=>m.pause()}
    c.onclick=()=>{const b=$("#lbc");b.className="box";b.replaceChildren(media(it,true),el("h3","",it.title));$("#lb").classList.add("open")};fr.appendChild(c)});
  track.appendChild(fr);updNav();
}
$("#pv").onclick=()=>track.scrollBy({left:-track.clientWidth*.8,behavior:"smooth"});
$("#nx").onclick=()=>track.scrollBy({left:track.clientWidth*.8,behavior:"smooth"});
track.addEventListener("scroll",updNav,{passive:true});
window.addEventListener("resize",updNav,{passive:true});
/* Avance automático: pausa con el cursor encima, al tocar, fuera de pantalla o con un video abierto */
car.addEventListener("mouseenter",()=>hov=true);car.addEventListener("mouseleave",()=>hov=false);
car.addEventListener("touchstart",()=>{hold=true;clearTimeout(tt)},{passive:true});
car.addEventListener("touchend",()=>{tt=setTimeout(()=>hold=false,5000)},{passive:true});
new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(car);
setInterval(()=>{
  if(hov||hold||!vis||document.hidden||$("#lb").classList.contains("open")||track.scrollWidth<=track.clientWidth+4)return;
  if(track.scrollLeft+track.clientWidth>=track.scrollWidth-4)track.scrollTo({left:0,behavior:"smooth"});
  else{const c=track.firstElementChild;track.scrollBy({left:(c?c.getBoundingClientRect().width:300)+18,behavior:"smooth"})}
},3500);
/* Luz del header: sigue al cursor (PC) o deriva lentamente al azar (celular) */
const hero=$(".hero"),gl=$(".glow");
if(hero&&gl){
  const fine=window.matchMedia("(any-pointer:fine)").matches,still=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  let tx=hero.clientWidth*.7,ty=hero.clientHeight*.3,x=tx,y=ty;
  const put=()=>{gl.style.transform=`translate3d(${x}px,${y}px,0)`};put();
  if(fine){let on=false;
    const loop=()=>{x+=(tx-x)*.1;y+=(ty-y)*.1;put();if(Math.abs(tx-x)+Math.abs(ty-y)>.5)requestAnimationFrame(loop);else on=false};
    hero.addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;const r=hero.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;if(!on){on=true;requestAnimationFrame(loop)}},{passive:true})
  }else if(!still){let nt=0,seen=true;
    const pick=()=>{tx=hero.clientWidth*(.1+Math.random()*.8);ty=hero.clientHeight*(.1+Math.random()*.8)};
    new IntersectionObserver(e=>{seen=e[0].isIntersecting}).observe(hero);
    const d=t=>{if(seen&&!document.hidden){if(t>nt){pick();nt=t+5000+Math.random()*3000}x+=(tx-x)*.006;y+=(ty-y)*.006;put()}requestAnimationFrame(d)};
    requestAnimationFrame(d)}
}
/* Miniatura (poster) del video para mostrar al instante */
function makePoster(file){return new Promise(res=>{const v=document.createElement("video"),u=URL.createObjectURL(file);let ok=false;
  const done=b=>{if(ok)return;ok=true;URL.revokeObjectURL(u);res(b)};
  v.muted=true;v.playsInline=true;v.preload="metadata";
  v.onloadedmetadata=()=>{v.currentTime=Math.min(1,(v.duration||2)/3)};
  v.onseeked=()=>{try{const s=Math.min(1,720/Math.max(v.videoWidth,v.videoHeight)),c=document.createElement("canvas");c.width=Math.round(v.videoWidth*s);c.height=Math.round(v.videoHeight*s);c.getContext("2d").drawImage(v,0,0,c.width,c.height);c.toBlob(done,"image/jpeg",.82)}catch(e){done(null)}};
  v.onerror=()=>done(null);setTimeout(()=>done(null),8000);v.src=u})}
async function loadProjects(){
  if(!sb){render();return}
  const {data}=await sb.from("projects").select("*").order("created_at",{ascending:false});
  DATA=data||[];render();
}
function closeAll(){document.querySelectorAll(".ov").forEach(o=>o.classList.remove("open"));const v=$("#lbc video");if(v)v.pause();$("#lbc").replaceChildren()}
document.querySelectorAll("[data-c]").forEach(b=>b.onclick=closeAll);
document.querySelectorAll(".ov").forEach(o=>o.addEventListener("click",e=>{if(e.target===o)closeAll()}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll()});

/* Formulario de pedido */
$("#f").addEventListener("submit",async e=>{
  e.preventDefault();const f=e.target,d=new FormData(f),fm=$("#fm"),fb=$("#fb");
  const files=[...$("#files").files];
  if(files.some(x=>x.size>10*1024*1024)){fm.className="msg err";fm.textContent="Cada archivo debe pesar menos de 10 MB.";return}
  fb.disabled=true;fm.className="msg";fm.textContent="Enviando...";
  const txt=`Hola Juan Manuel, quiero mi logo animado en 48hs.\nEmpresa: ${d.get("empresa")}\nTeléfono: ${d.get("tel")}\nEmail: ${d.get("mail")}\nBusco: ${d.get("desc")}`;
  try{
    if(!sb)throw new Error("nosb");
    const paths=[],folder=crypto.randomUUID();
    for(const file of files){const p=folder+"/"+clean(file.name);const {error}=await sb.storage.from("logos").upload(p,file);if(error)throw error;paths.push(p)}
    const {error}=await sb.from("orders").insert({empresa:d.get("empresa"),tel:d.get("tel"),mail:d.get("mail"),descr:d.get("desc"),files:paths});
    if(error)throw error;
    fm.textContent="¡Pedido enviado! Te contactaré a la brevedad. También podés escribirme por WhatsApp.";f.reset();
    setTimeout(()=>window.open(wa(txt),"_blank","noopener"),600);
  }catch(err){
    fm.className="msg err";fm.textContent="No se pudo guardar el pedido. Te abro WhatsApp para enviarlo por ahí.";
    window.open(wa(txt),"_blank","noopener");
  }
  fb.disabled=false;
});

/* Auth */
let mode="in";
function setMode(m){mode=m;document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b.dataset.t===m));$("#ab").textContent=m==="in"?"Ingresar":"Crear cuenta";$("#af").p.autocomplete=m==="in"?"current-password":"new-password";$("#am").textContent=""}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>setMode(b.dataset.t));
$("#authBtn").onclick=async()=>{
  if(!sb){alert("Falta configurar Supabase en config.js (ver README).");return}
  const {data}=await sb.auth.getSession();
  if(data.session){isAdmin?openAdmin():await sb.auth.signOut().then(()=>alert("Sesión cerrada."))}else{setMode("in");$("#au").classList.add("open")}
};
$("#af").addEventListener("submit",async e=>{
  e.preventDefault();const f=e.target,am=$("#am"),ab=$("#ab");ab.disabled=true;am.className="msg";am.textContent="Procesando...";
  const cred={email:f.e.value.trim(),password:f.p.value};
  const {data,error}=mode==="in"?await sb.auth.signInWithPassword(cred):await sb.auth.signUp(cred);
  ab.disabled=false;
  if(error){am.className="msg err";am.textContent=error.message;return}
  if(mode==="up"&&!data.session){am.textContent="Cuenta creada. Revisá tu correo para confirmarla y luego ingresá.";return}
  closeAll();f.reset();
});
async function refreshAuth(session){
  isAdmin=false;const b=$("#authBtn");
  if(session){const {data}=await sb.rpc("is_admin");isAdmin=!!data;b.textContent=isAdmin?"Panel admin":"Salir"}else b.textContent="Ingresar";
}

/* Panel admin */
function openAdmin(){
  const b=$("#adb");b.replaceChildren();$("#ad").classList.add("open");
  b.append(el("h3","","Panel de administrador"));
  const tabs=el("div","tabs");tabs.style.marginTop="14px";
  const bp=el("button","on","Proyectos"),bo=el("button","","Pedidos"),bs=el("button","","Salir");[bp,bo,bs].forEach(x=>x.type="button");
  tabs.append(bp,bo,bs);const body=el("div");b.append(tabs,body);
  const sel=x=>{bp.classList.toggle("on",x===bp);bo.classList.toggle("on",x===bo)};
  bp.onclick=()=>{sel(bp);viewProjects(body)};bo.onclick=()=>{sel(bo);viewOrders(body)};
  bs.onclick=async()=>{await sb.auth.signOut();closeAll()};
  viewProjects(body);
}
function viewProjects(body){
  body.replaceChildren();
  const f=el("form");const ti=el("input");ti.placeholder="Título (opcional)";
  const fi=el("input");fi.type="file";fi.accept="video/*,image/*";fi.multiple=true;
  const bt=el("button","btn","Subir");bt.type="submit";const ms=el("p","msg");f.append(ti,fi,bt,ms);
  const list=el("div");body.append(f,list);
  const draw=()=>{list.replaceChildren();DATA.forEach(it=>{const r=el("div","row");r.append(el("span","",(it.type==="video"?"🎬 ":"🖼 ")+it.title));
    const d=el("button","","Eliminar");d.type="button";d.onclick=async()=>{if(!confirm("¿Eliminar \""+it.title+"\"?"))return;d.disabled=true;
      if(it.path)await sb.storage.from("media").remove([it.path,"posters/"+it.path+".jpg"]);const {error}=await sb.from("projects").delete().eq("id",it.id);
      if(error){ms.className="msg err";ms.textContent=error.message;d.disabled=false;return}
      DATA=DATA.filter(x=>x.id!==it.id);render();draw()};r.append(d);list.append(r)})};
  draw();
  f.onsubmit=async e=>{e.preventDefault();const fs=[...fi.files];if(!fs.length){ms.className="msg err";ms.textContent="Elegí un archivo.";return}
    bt.disabled=true;ms.className="msg";
    try{for(const [i,file] of fs.entries()){ms.textContent=`Subiendo ${i+1}/${fs.length}: ${file.name}`+(file.size>20e6?` (${Math.round(file.size/1e6)} MB: conviene optimizarlo, ver README)`:"")+"...";
      const path=Date.now()+"_"+clean(file.name);const {error}=await sb.storage.from("media").upload(path,file,{cacheControl:"31536000"});if(error)throw error;
      const url=sb.storage.from("media").getPublicUrl(path).data.publicUrl;let poster=null;
      if(file.type.startsWith("video")){const pb=await makePoster(file);if(pb){const pp="posters/"+path+".jpg";const {error:pe}=await sb.storage.from("media").upload(pp,pb,{contentType:"image/jpeg",cacheControl:"31536000"});if(!pe)poster=sb.storage.from("media").getPublicUrl(pp).data.publicUrl}}
      const row={title:(fs.length===1&&ti.value.trim())||file.name.replace(/\.[^.]+$/,""),type:file.type.startsWith("video")?"video":"image",url,path,poster};let r2=await sb.from("projects").insert(row).select().single();if(r2.error&&/poster/i.test(r2.error.message)){delete row.poster;r2=await sb.from("projects").insert(row).select().single()}if(r2.error)throw r2.error;const data=r2.data;DATA.unshift(data)}
      ms.textContent="¡Listo!";fi.value="";ti.value="";render();draw()}
    catch(err){ms.className="msg err";ms.textContent="Error: "+err.message}
    bt.disabled=false};
}
async function viewOrders(body){
  body.replaceChildren(el("p","msg","Cargando pedidos..."));
  const {data,error}=await sb.from("orders").select("*").order("created_at",{ascending:false});
  body.replaceChildren();
  if(error){body.append(el("p","msg err",error.message));return}
  if(!data.length){body.append(el("p","msg","Todavía no hay pedidos."));return}
  for(const o of data){
    const c=el("div","ord");
    const h=el("p");h.append(Object.assign(el("b","",o.empresa)),el("small","","  "+new Date(o.created_at).toLocaleString("es-AR")));
    const ml=el("a","",o.mail);ml.href="mailto:"+o.mail;
    const tl=el("a","",o.tel);tl.href="https://wa.me/"+o.tel.replace(/\D/g,"");tl.target="_blank";tl.rel="noopener";
    const p2=el("p");p2.append("📞 ",tl," · ✉️ ",ml);
    c.append(h,p2,el("p","",o.descr));
    for(const p of o.files||[]){const {data:s}=await sb.storage.from("logos").createSignedUrl(p,3600);
      if(s){const a=el("a","","📎 "+p.split("/").pop());a.href=s.signedUrl;a.target="_blank";a.rel="noopener";const w=el("p");w.append(a);c.append(w)}}
    const d=el("button","","Eliminar pedido");d.type="button";d.onclick=async()=>{if(!confirm("¿Eliminar este pedido?"))return;
      if(o.files&&o.files.length)await sb.storage.from("logos").remove(o.files);
      await sb.from("orders").delete().eq("id",o.id);c.remove()};
    c.append(d);body.append(c)}
}

/* Inicio: Supabase se carga diferido */
function init(){
  if(C.SUPABASE_URL&&C.SUPABASE_KEY&&window.supabase){
    let base;try{base=new URL(C.SUPABASE_URL.trim()).origin}catch(e){console.error("SUPABASE_URL inválida en config.js");loadProjects();return}
    sb=window.supabase.createClient(base,C.SUPABASE_KEY.trim());
    sb.auth.onAuthStateChange((_e,s)=>{setTimeout(()=>refreshAuth(s),0)});
    sb.auth.getSession().then(({data})=>refreshAuth(data.session));
  }
  loadProjects();
}
init();
})();
