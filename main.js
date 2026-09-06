const works=[
 ["work-01.jpg","1 Billion Followers Summit","Event identity · Dubai"],
 ["work-06.jpg","Aramco GIITS","Land of Opportunities"],
 ["work-12.jpg","Richard Mille Desert Polo","Luxury event identity · AlUla"],
 ["work-04.jpg","Amazon × Twitch","Wayfinding and print"],
 ["work-07.jpg","Aramco × GITEX","Spatial identity"],
 ["work-11.jpg","Al Fursan Endurance","Identity and hospitality"],
 ["work-09.jpg","Brand systems","G20 · SHOOF · Google"],
 ["work-16.jpg","Exhibition environments","Amazon · Google · Aramco"],
 ["work-17.jpg","Knowledge Summit","Event experience · Dubai"],
 ["work-10.jpg","Creating stories","SHOOF · Al Qadsiah"],
 ["work-15.jpg","Tamer Centennial","100-year celebration"],
 ["work-14.jpg","Identity systems","Made in Saudi · Tamer"]
];
const grid=document.querySelector('#project-grid');
grid.innerHTML=works.map((w,i)=>`<button class="project" data-i="${i}"><figure><img src="assets/images/${w[0]}" alt="${w[1]}" loading="lazy"><figcaption><strong>${String(i+1).padStart(2,'0')} / ${w[1]}</strong><small>${w[2]}</small></figcaption></figure></button>`).join('');
const dlg=document.querySelector('#lightbox'),img=document.querySelector('#lightbox-image'),title=document.querySelector('#lightbox-title'),sub=document.querySelector('#lightbox-subtitle');let current=0;
function openWork(i){current=(i+works.length)%works.length;img.src=`assets/images/${works[current][0]}`;img.alt=works[current][1];title.textContent=works[current][1];sub.textContent=works[current][2];dlg.showModal()}
grid.addEventListener('click',e=>{const card=e.target.closest('.project');if(card)openWork(+card.dataset.i)});document.querySelector('.close').onclick=()=>dlg.close();document.querySelector('.prev').onclick=()=>openWork(current-1);document.querySelector('.next').onclick=()=>openWork(current+1);dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
document.querySelector('.view-cv').onclick=()=>openWork(6);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
const glow=document.querySelector('.cursor-glow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});document.querySelector('#year').textContent=new Date().getFullYear();

document.body.classList.add('is-loading');
window.addEventListener('load',()=>setTimeout(()=>{document.querySelector('.page-loader').classList.add('done');document.body.classList.remove('is-loading')},650));
const progress=document.querySelector('.scroll-progress');
window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max?scrollY/max:0})`;document.querySelectorAll('[data-parallax]').forEach(el=>el.style.transform=`translateY(${(el.getBoundingClientRect().top-innerHeight/2)*-.035}px)`)},{passive:true});
document.querySelector('.experience figure').dataset.parallax='';
const projectObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const cards=[...grid.children];const n=cards.indexOf(entry.target);entry.target.style.transitionDelay=`${(n%3)*90}ms`;entry.target.classList.add('in-view');projectObserver.unobserve(entry.target)}}),{threshold:.12});
[...grid.children].forEach(card=>projectObserver.observe(card));
const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=+el.dataset.count,start=performance.now(),duration=1100;const tick=now=>{const p=Math.min((now-start)/duration,1),value=Math.round(target*(1-Math.pow(1-p,3)));el.textContent=String(value).padStart(+(el.dataset.pad||1),'0')+(el.dataset.suffix||'');if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);counterObserver.unobserve(el)}),{threshold:.7});counters.forEach(el=>counterObserver.observe(el));
document.querySelectorAll('.round-link,.view-cv').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.14}px,${(e.clientY-r.top-r.height/2)*.14}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
