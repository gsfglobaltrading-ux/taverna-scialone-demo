(function(){
var WA='393462326905';
// nav
var nav=document.getElementById('nav'),burger=document.getElementById('burger');
function onS(){nav.classList.toggle('solid',scrollY>40)}onS();addEventListener('scroll',onS,{passive:true});
burger.onclick=function(){nav.classList.toggle('open')};
nav.querySelectorAll('ul a').forEach(function(a){a.onclick=function(){nav.classList.remove('open')}});
// reveal
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
// braci
var cv=document.getElementById('braci'),cx=cv.getContext('2d'),P=[],W,H;
var red=matchMedia('(prefers-reduced-motion:reduce)').matches;
function rs(){W=cv.width=cv.offsetWidth*devicePixelRatio;H=cv.height=cv.offsetHeight*devicePixelRatio}rs();addEventListener('resize',rs);
function nuova(){return{x:W*(.25+Math.random()*.5),y:H*(.75+Math.random()*.3),r:(Math.random()*2+.6)*devicePixelRatio,vy:-(Math.random()*1.2+.5)*devicePixelRatio,vx:(Math.random()-.5)*.6*devicePixelRatio,a:1,d:Math.random()*.004+.002,f:Math.random()*6}}
for(var i=0;i<70;i++){var p=nuova();p.y=Math.random()*H;P.push(p)}
function loop(){cx.clearRect(0,0,W,H);P.forEach(function(p,i){p.f+=.04;p.x+=p.vx+Math.sin(p.f)*.4*devicePixelRatio;p.y+=p.vy;p.a-=p.d;
if(p.a<=0||p.y<0)P[i]=nuova();
cx.beginPath();cx.fillStyle='rgba(255,'+(150+Math.floor(p.a*60))+',70,'+p.a+')';cx.shadowColor='rgba(255,140,50,.9)';cx.shadowBlur=8*devicePixelRatio;cx.arc(p.x,p.y,p.r,0,7);cx.fill()});
requestAnimationFrame(loop)}
if(!red)loop();
// stagioni
var ST={
autunno:{t:'Autunno · porcini e castagne',p:'Il bosco del Partenio entra in cucina: funghi, castagne e i primi freddi che chiamano il camino.',l:['Fusilli porcini e provolone','Zuppetta di castagne e ceci','Filetto di maiale ai porcini e castagne','Tagliatelle al ragù di cinghiale']},
inverno:{t:'Inverno · zuppe e fuoco',p:'Piatti lenti, da cucchiaio, per le sere in cui fuori fa freddo e dentro il fuoco scoppietta.',l:['Trippa e fagioli','Zuppe di legumi','Cecatielli scarola e cotechino','Cotica ripiena']},
primavera:{t:'Primavera · erbe di campo',p:'Tornano le erbe spontanee e l\'agnello. I salumi della casa sono al punto giusto.',l:['Pasta con erbe e guanciale','Agnello alla brace','Capicollo e soppressata della casa','Ricotta di Montella']},
estate:{t:'Estate · brace e tavoli fuori',p:'Si mangia anche all\'aperto: carni alla brace, fiori di zucca e serate lunghe.',l:['Fiori di zucca con ricotta e baccalà','Tagliata di manzo','Coniglio fritto','Mela, caciocavallo e speck']}
};
var m=new Date().getMonth(),cur=[11,0,1].indexOf(m)>-1?'inverno':m<5?'primavera':m<8?'estate':'autunno';
var btns=document.querySelectorAll('#ruota button'),imgs=document.querySelectorAll('#stagImg img'),tx=document.getElementById('stagTesto'),ora=document.getElementById('stagOra');
function stag(s){btns.forEach(function(b){b.setAttribute('aria-selected',b.dataset.s===s)});imgs.forEach(function(im){im.classList.toggle('on',im.dataset.s===s)});
var d=ST[s];tx.innerHTML='<h3>'+d.t+'</h3><p>'+d.p+'</p><ul>'+d.l.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul>';
ora.textContent=s===cur?'In tavola adesso':'Torna in '+s;}
btns.forEach(function(b){b.onclick=function(){stag(b.dataset.s)}});stag(cur);
// menu tabs
var tabs=document.querySelectorAll('#tabs button'),mimg=document.getElementById('menuImg');
tabs.forEach(function(b){b.onclick=function(){tabs.forEach(function(x){x.setAttribute('aria-selected',x===b)});
document.querySelectorAll('.piatti').forEach(function(p){p.classList.toggle('on',p.dataset.t===b.dataset.t)});
mimg.style.opacity=0;setTimeout(function(){mimg.src=b.dataset.img;mimg.style.opacity=1},200)}});
// occasioni → WhatsApp
document.querySelectorAll('[data-occ]').forEach(function(el){el.addEventListener('click',function(e){e.preventDefault();
window.open('https://wa.me/'+WA+'?text='+encodeURIComponent('Ciao Carmine! '+el.dataset.occ+'. Mi date qualche informazione?'),'_blank','noopener')})});
// orari
var OR=[['Domenica','12:30 – 15:00',[[750,900]]],['Lunedì','12:30 – 15:00 · 19:00 – 24:00',[[750,900],[1140,1440]]],['Martedì','Chiuso',[]],['Mercoledì','12:30 – 15:00 · 19:00 – 24:00',[[750,900],[1140,1440]]],['Giovedì','12:30 – 15:00 · 19:00 – 24:00',[[750,900],[1140,1440]]],['Venerdì','12:30 – 15:00 · 19:00 – 24:00',[[750,900],[1140,1440]]],['Sabato','12:30 – 15:00 · 19:00 – 24:00',[[750,900],[1140,1440]]]];
var now=new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'})),g=now.getDay(),min=now.getHours()*60+now.getMinutes();
var tb=document.getElementById('orari'),ord=[1,2,3,4,5,6,0];
tb.innerHTML=ord.map(function(i){return'<tr'+(i===g?' class="oggi"':'')+'><td>'+OR[i][0]+'</td><td>'+OR[i][1]+'</td></tr>'}).join('');
var ap=OR[g][2].some(function(f){return min>=f[0]&&min<f[1]}),st=document.getElementById('stato');
st.classList.toggle('aperto',ap);st.querySelector('span').textContent=ap?'Aperto adesso':'Chiuso adesso';
// form
var f=document.getElementById('form'),msg=document.getElementById('msg'),dt=f.data;
var oggi=new Date(now);dt.min=oggi.toISOString().slice(0,10);
function chk(){if(!dt.value)return true;var d=new Date(dt.value+'T12:00').getDay();
if(d===2){msg.textContent='Il martedì la taverna è chiusa: scegli un altro giorno.';return false}
if(d===0&&f.turno.value==='cena'){msg.textContent='La domenica siamo aperti solo a pranzo.';return false}
msg.textContent='';return true}
dt.onchange=chk;f.turno.onchange=chk;
f.onsubmit=function(e){e.preventDefault();
if(!f.nome.value.trim()||!dt.value){msg.textContent='Inserisci nome e giorno.';return}
if(!chk())return;
var d=new Date(dt.value+'T12:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'});
var t='Ciao Carmine! Vorrei prenotare un tavolo.\n\nNome: '+f.nome.value.trim()+'\nPersone: '+f.persone.value+'\nGiorno: '+d+'\nTurno: '+f.turno.value+(f.note.value.trim()?'\nNote: '+f.note.value.trim():'');
window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(t),'_blank','noopener')};
})();
