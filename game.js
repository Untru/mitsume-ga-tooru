const canvas=document.getElementById('game'), ctx=canvas.getContext('2d'), overlay=document.getElementById('overlay');
const W=960,H=540,world=2500,keys=new Set(); let state, last=0;
const platforms=[{x:0,y:455,w:650,h:85},{x:740,y:455,w:540,h:85},{x:1530,y:455,w:970,h:85},{x:470,y:370,w:125,h:20},{x:820,y:350,w:135,h:20},{x:1050,y:290,w:110,h:20},{x:1380,y:390,w:85,h:18,hidden:true}];
function reset(){state={p:{x:85,y:390,vx:0,vy:0,w:32,h:52,hp:3,face:1,ground:false,inv:0,attack:0},camera:0,eye:false,unlocked:false,artifact:true,shots:[],bossShots:[],checkpoint:{x:85,y:403},enemy:[{x:900,y:420,base:900,hp:2,alive:true},{x:1700,y:420,base:1700,hp:2,alive:true}],boss:{x:2200,y:365,w:90,h:90,hp:5,alive:true,cooldown:100},won:false,time:0,notice:'Найди древний артефакт в храме!',noticeTime:300};}
reset(); let running=false;
document.getElementById('start').onclick=()=>{reset();running=true;overlay.classList.add('hidden');last=performance.now();requestAnimationFrame(loop)};
window.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','Space','KeyW','KeyA','KeyD','KeyE','KeyJ','KeyR'].includes(e.code))e.preventDefault();if(!e.repeat){if(e.code==='KeyE'&&state.unlocked){state.eye=!state.eye;message(state.eye?'Третий глаз открыт! Так вот куда пропал тапок…':'Третий глаз отдыхает.');}if(e.code==='KeyJ'&&running&&!state.won&&state.p.attack<=0)shoot();if((e.code==='Space'||e.code==='ArrowUp'||e.code==='KeyW')&&state.p.ground){state.p.vy=-13;state.p.ground=false}if(e.code==='KeyR'){reset();if(!running){running=true;overlay.classList.add('hidden');last=performance.now();requestAnimationFrame(loop)}}}keys.add(e.code)});window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
function shoot(){const p=state.p;p.attack=18;state.shots.push({x:p.x+p.w/2,y:p.y+p.h-43.7,face:p.face,life:40});}
function message(s){state.notice=s;state.noticeTime=200}function hit(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}function damage(force=false){let p=state.p;if(p.inv&&!force)return false;p.hp--;p.inv=90;p.vy=-8;if(p.hp<=0){reset();message('Дух: «Попробуем ещё раз! Я никому не скажу.»');return true}return false}
function update(dt){let s=state,p=s.p;s.time+=dt;if(s.noticeTime>0)s.noticeTime-=dt;if(p.inv>0)p.inv-=dt;if(p.attack>0)p.attack-=dt;
let dir=(keys.has('ArrowRight')||keys.has('KeyD')?1:0)-(keys.has('ArrowLeft')||keys.has('KeyA')?1:0);p.vx=dir*4.2;if(dir)p.face=dir;p.x=Math.max(0,Math.min(world-p.w,p.x+p.vx*dt));let old=p.y+p.h;p.vy=Math.min(14,p.vy+.65*dt);p.y+=p.vy*dt;p.ground=false;for(const q of platforms){if(q.hidden&&!s.eye)continue;if(p.vy>=0&&old<=q.y+2&&p.y+p.h>=q.y&&p.x+p.w>q.x&&p.x<q.x+q.w){p.y=q.y-p.h;p.vy=0;p.ground=true;if(q.y===455&&!q.hidden&&p.x>q.x+30&&p.x+p.w<q.x+q.w-30){s.checkpoint={x:p.x,y:p.y}}}}if(p.y>H+60){if(damage(true))return;p.x=s.checkpoint.x;p.y=s.checkpoint.y;p.vy=0;p.vx=0;keys.clear();message('Ой! Возвращаемся на безопасное место.');}
if(s.artifact&&hit(p,{x:1090,y:235,w:35,h:55})){s.artifact=false;s.unlocked=true;message('Третий глаз пробудился! Нажми E, чтобы увидеть скрытое.');}
for(const e of s.enemy){if(!e.alive)continue;e.x=e.base+Math.sin(s.time/55+e.base)*70;let box={x:e.x,y:e.y,w:36,h:35};if(hit(p,box)){if(damage())return;}}
let b=s.boss;if(b.alive&&hit(p,b)){if(damage())return;}
if(b.alive&&Math.abs(p.x-b.x)<520){b.cooldown-=dt;if(b.cooldown<=0){s.bossShots.push({x:p.x<b.x?b.x:b.x+b.w,y:435,vx:p.x<b.x?-5:5,life:150});b.cooldown=105;}}
for(const orb of s.bossShots){orb.x+=orb.vx*dt;orb.life-=dt;if(hit(p,{x:orb.x-10,y:orb.y-10,w:20,h:20})){orb.life=0;if(damage())return;}}s.bossShots=s.bossShots.filter(orb=>orb.life>0&&orb.x>0&&orb.x<world);
for(const shot of s.shots){const from=shot.x;shot.x+=shot.face*10*dt;shot.life-=dt;const sweep={x:Math.min(from,shot.x)-9,y:shot.y-14,w:Math.abs(shot.x-from)+18,h:28};
for(const e of s.enemy){if(!e.alive||!hit(sweep,{x:e.x,y:e.y,w:36,h:35}))continue;e.hp--;shot.life=0;if(e.hp<=0){e.alive=false;message('Дух: «Осторожнее! Это был чей-то очень сердитый куст.»')}break;}
if(shot.life>0&&b.alive&&hit(sweep,b)){b.hp--;shot.life=0;if(b.hp<=0){b.alive=false;s.won=true;message('Победа! Тапок найден. Дух слегка растроган.')}}}
s.shots=s.shots.filter(shot=>shot.life>0&&shot.x>-20&&shot.x<world+20);
s.camera=Math.max(0,Math.min(world-W,p.x-280));}
function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h)}function circle(x,y,r,c){ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}function text(t,x,y,size=16,color='#344c47'){ctx.fillStyle=color;ctx.font=`800 ${size}px Nunito, system-ui`;ctx.fillText(t,x,y)}
// Draw energy projectiles in world coordinates after the scene.
const drawScene=draw;
draw=function(){drawScene();if(state.won)return;ctx.save();ctx.translate(-state.camera,0);for(const shot of state.shots){ctx.globalAlpha=.45;circle(shot.x-shot.face*9,shot.y,9,'#f5b7fc');ctx.globalAlpha=1;circle(shot.x,shot.y,8,'#db91f2');circle(shot.x,shot.y,4,'#fff8c5');}for(const orb of state.bossShots){circle(orb.x,orb.y,13,'#cc6b46');circle(orb.x,orb.y,8,'#f3bd6b');circle(orb.x-2,orb.y-2,3,'#fff1b8');}ctx.restore();};
function loop(now){if(!running)return;let dt=Math.min((now-last)/16.67,2);last=now;if(!state.won)update(dt);draw();requestAnimationFrame(loop)}
draw();
