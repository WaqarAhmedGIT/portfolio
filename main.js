const projects=[
  ['work-01.jpg','1 Billion Followers Summit','Event experience'],['work-12.jpg','Richard Mille Desert Polo','Luxury event identity'],['work-06.jpg','Aramco GIITS','Production & spatial'],['work-04.jpg','Amazon × Twitch','Wayfinding & print'],['work-11.jpg','Al Fursan Endurance','Identity & hospitality'],['work-16.jpg','Exhibition Environments','Amazon · Google · Aramco'],['work-09.jpg','Brand Systems','G20 · SHOOF · Google'],['work-17.jpg','Knowledge Summit','Event experience']
];
const stage=document.querySelector('#project-stage');
stage.innerHTML=projects.map((p,i)=>`<article class="project ${i===0?'active':''}" data-index="${i}"><figure><img src="assets/images/${p[0]}" alt="${p[1]}"></figure><div class="project-copy"><span>${String(i+1).padStart(2,'0')} / PROJECT</span><h3>${p[1]}</h3><p>${p[2]}</p><button>VIEW CASE ↗</button></div></article>`).join('');
let active=0;
const index=document.querySelector('#active-index'),line=document.querySelector('.nav-line i');
function show(n){active=(n+projects.length)%projects.length;document.querySelectorAll('.project').forEach((el,i)=>el.classList.toggle('active',i===active));index.textContent=String(active+1).padStart(2,'0');line.style.transform=`translateX(${active*100}%)`}
document.querySelector('#next').onclick=()=>show(active+1);document.querySelector('#prev').onclick=()=>show(active-1);
const dialog=document.querySelector('#project-dialog');
document.querySelectorAll('.project button').forEach((button,i)=>button.onclick=()=>{dialog.querySelector('img').src=`assets/images/${projects[i][0]}`;dialog.querySelector('strong').textContent=projects[i][1];dialog.querySelector('small').textContent=projects[i][2];dialog.showModal()});
document.querySelector('.dialog-close').onclick=()=>dialog.close();
const cv=document.querySelector('#cv-dialog');document.querySelectorAll('.cv-open').forEach(b=>b.onclick=()=>cv.showModal());document.querySelector('.cv-close').onclick=()=>cv.close();
[dialog,cv].forEach(d=>d.onclick=e=>{if(e.target===d)d.close()});
const panel=document.querySelector('.menu-panel');document.querySelector('.menu-button').onclick=()=>panel.classList.add('open');document.querySelector('.menu-close').onclick=()=>panel.classList.remove('open');panel.querySelectorAll('a').forEach(a=>a.onclick=()=>panel.classList.remove('open'));
const cursor=document.querySelector('.cursor');addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('.project figure,.reference-list a').forEach(el=>{el.onmouseenter=()=>cursor.classList.add('show');el.onmouseleave=()=>cursor.classList.remove('show')});
let y=scrollY,sy=scrollY;const progress=document.querySelector('.progress');
function frame(){y=scrollY;sy+=(y-sy)*.08;const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?y/max*100:0)+'%';const art=document.querySelector('.launch-art');art.style.transform=`translate(-50%,calc(-50% + ${Math.min(sy*.08,55)}px)) rotate(${Math.min(sy*.006,3)}deg)`;document.querySelectorAll('.launch h1 span').forEach((el,i)=>el.style.transform=`translateX(${(i?1:-1)*Math.min(sy*.07,80)}px)`);requestAnimationFrame(frame)}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)frame();
const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.animate([{opacity:0,transform:'translateY(50px)'},{opacity:1,transform:'none'}],{duration:850,fill:'forwards',easing:'cubic-bezier(.16,1,.3,1)'})),{threshold:.14});document.querySelectorAll('.career-list article,.reference-list a').forEach(el=>{el.style.opacity=0;obs.observe(el)});
document.querySelectorAll('.year').forEach(el=>el.textContent=new Date().getFullYear());
addEventListener('load',()=>{let n=0;const c=document.querySelector('.loader-count');const t=setInterval(()=>{n+=2;c.textContent=String(Math.min(n,100)).padStart(2,'0');if(n>=100){clearInterval(t);setTimeout(()=>{document.querySelector('.loader').classList.add('done');document.body.classList.remove('loading')},650)}},75)});
