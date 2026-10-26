// Illustrated scenery and characters. Gameplay coordinates stay in game.js.
function shape(x,y,w,h,r,fill,stroke='#365452',width=2){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke()}}
function line(x1,y1,x2,y2,color,width=2){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.stroke()}
function cloud(x,y,scale){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.globalAlpha=.7;circle(0,0,18,'#fff9e9');circle(23,-10,25,'#fff9e9');circle(50,0,18,'#fff9e9');shape(-15,0,80,15,9,'#fff9e9',null);ctx.restore()}
function hill(x,y,w,h,color){ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x+w*.15,y-h,x+w*.65,y-h,x+w,y);ctx.closePath();ctx.fillStyle=color;ctx.fill()}
function ruin(x){ctx.save();ctx.translate(x,0);shape(0,294,68,162,5,'#91b99c',null);shape(-9,282,86,17,6,'#b3c9a6',null);shape(10,309,48,147,5,'#aac9a8',null);line(24,315,24,451,'#8eb49a',4);line(44,315,44,451,'#8eb49a',4);shape(-13,448,96,14,5,'#8bb296',null);ctx.restore()}
function platform(q,eye){if(q.hidden&&!eye)return;let c=q.hidden?'#aa83bc':'#c39166',edge=q.hidden?'#e8c2f6':'#78b37a';shape(q.x,q.y,q.w,q.h,8,c,'#658778',2);shape(q.x,q.y,q.w,11,5,edge,null);for(let x=q.x+20;x<q.x+q.w-12;x+=58){line(x,q.y+25,x+20,q.y+25,q.hidden?'#9a75aa':'#a77958',2);if(q.h>35){line(x+20,q.y+48,x+37,q.y+48,'#aa7958',2);line(x+5,q.y+65,x+20,q.y+65,'#d3aa7b',2)}}if(!q.hidden&&q.y===455){for(let x=q.x+30;x<q.x+q.w-10;x+=93){line(x,q.y,x-4,q.y-7,'#5d9e71',2);line(x,q.y,x+4,q.y-8,'#5d9e71',2);circle(x+4,q.y-9,2,'#f5d792')}}}
function hero(p,s){ctx.save();ctx.translate(p.x+16,p.y+28);ctx.scale(p.face,1);let run=p.ground&&Math.abs(p.vx)>0?Math.sin(s.time*.28):0;let bob=p.ground?Math.abs(run)*1.5:0;ctx.translate(0,-bob);
// scarf tail, boots and swinging legs
ctx.beginPath();ctx.moveTo(-8,2);ctx.quadraticCurveTo(-23,3+run*2,-26,-4+run*2);ctx.lineTo(-21,8+run*2);ctx.lineTo(-8,10);ctx.fillStyle='#efb650';ctx.fill();ctx.strokeStyle='#805d4d';ctx.lineWidth=1.5;ctx.stroke();
line(-6,13,-8+run*4,23,'#36565a',7);line(6,13,8-run*4,23,'#36565a',7);shape(-13+run*4,20,12,7,3,'#674d45','#364f4a',1.5);shape(3-run*4,20,12,7,3,'#674d45','#364f4a',1.5);
shape(-11,-1,22,22,7,'#ec805d','#80554c',2);shape(-8,3,16,13,5,'#f09b70',null);line(-10,3,-16,12+run*2,'#e3a27e',5);circle(-16,12+run*2,3,'#f4be91');line(10,3,15,10-run*2,'#e3a27e',5);circle(15,10-run*2,3,'#f4be91');
// oversized head, hair and curious expression
shape(-14,-25,28,27,12,'#f5c29a','#80584c',1.8);circle(-14,-11,4,'#f5c29a');circle(14,-11,4,'#f5c29a');ctx.beginPath();ctx.moveTo(-14,-13);ctx.quadraticCurveTo(-20,-29,-6,-31);ctx.quadraticCurveTo(1,-37,5,-31);ctx.quadraticCurveTo(17,-32,15,-17);ctx.lineTo(10,-21);ctx.lineTo(6,-17);ctx.lineTo(1,-23);ctx.lineTo(-4,-19);ctx.lineTo(-8,-23);ctx.closePath();ctx.fillStyle='#443b3d';ctx.fill();ctx.strokeStyle='#3f383a';ctx.lineWidth=2;ctx.stroke();
shape(-12,-18,24,5,2,'#f5d37a',null);circle(2,-11,3.5,'#fffaf0');circle(3,-11,1.9,'#374a47');circle(10,-11,3,'#fffaf0');circle(11,-11,1.7,'#374a47');line(4,-4,9,-3,'#a75555',1.5);circle(11,-6,2,'#ed9f8d');if(s.eye){circle(0,-16,5,'#fff0a5');circle(0,-16,2.2,'#b986cf')}
if(p.attack>0){ctx.beginPath();ctx.arc(12,-2,31,-1.15,1.1);ctx.strokeStyle='#fff2b5';ctx.lineWidth=6;ctx.stroke();ctx.beginPath();ctx.arc(12,-2,31,-1.05,1);ctx.strokeStyle='#f5c66d';ctx.lineWidth=2;ctx.stroke()}ctx.restore()}
function bush(e,t){ctx.save();ctx.translate(e.x+18,e.y+18+Math.sin(t/17+e.base)*1.4);shape(-13,7,10,11,5,'#6c945a','#42694b',1.5);shape(5,7,10,11,5,'#6c945a','#42694b',1.5);circle(-10,0,13,'#78b766');circle(9,0,13,'#78b766');circle(0,-9,15,'#91cb79');circle(-7,-3,6,'#fff8df');circle(7,-3,6,'#fff8df');circle(-6,-3,2.5,'#405344');circle(8,-3,2.5,'#405344');line(-8,-11,-3,-9,'#476548',2);line(3,-9,8,-11,'#476548',2);line(-3,7,4,8,'#486148',2);ctx.restore()}
function boss(b,t){ctx.save();ctx.translate(b.x,b.y);let wobble=Math.sin(t/22)*2;shape(-12,26+wobble,21,51,8,'#ad9a7d','#716b61',3);shape(82,26-wobble,21,51,8,'#ad9a7d','#716b61',3);shape(0,0,90,90,14,'#b5a48a','#706b60',3);shape(8,9,74,70,10,'#c6b596',null);shape(10,-13,70,18,5,'#cbbb99','#706b60',2);line(30,12,24,23,'#a3957d',2);line(24,23,30,29,'#a3957d',2);shape(14,26,25,18,6,'#f7e8b2','#827a6b',2);shape(53,26,25,18,6,'#f7e8b2','#827a6b',2);circle(29,35,3,'#62584e');circle(64,35,3,'#62584e');line(27,21,40,24,'#776858',4);line(53,24,68,21,'#776858',4);shape(32,58,28,10,4,'#6b6158',null);line(35,61,57,61,'#ead9bc',2);circle(13,8,5,'#83aa70');circle(18,5,4,'#94bd79');ctx.restore();text('СТРАЖ ХРАМА',b.x-15,b.y-35,12);for(let i=0;i<b.hp;i++)circle(b.x+20+i*13,b.y-22,4,'#e48969')}
const templeArt = new Image();
templeArt.src = 'assets/temple-background.png';
templeArt.onload = () => { if (typeof state !== 'undefined') draw(); };
function draw(){let s=state,p=s.p;ctx.clearRect(0,0,W,H);
if (templeArt.complete && templeArt.naturalWidth) {
  // Crop the painted foreground so the illustration never implies walkable ground.
  const cropHeight = Math.floor(templeArt.naturalHeight * .77);
  const artWidth = templeArt.naturalWidth / cropHeight * 470;
  ctx.drawImage(templeArt, 0, 0, templeArt.naturalWidth, cropHeight, -s.camera * .30, 0, artWidth, 470);
  ctx.fillStyle=s.eye?'#8170b955':'#fff3cf33';ctx.fillRect(0,0,W,470);
  ctx.fillStyle=s.eye?'#39314f':'#28443f';ctx.fillRect(0,455,W,85);
} else { drawBackdrop(s); }
ctx.save();ctx.translate(-s.camera,0);for(let q of platforms)platform(q,s.eye);
if(s.artifact){let pulse=3*Math.sin(s.time/12);circle(1107,262,25+pulse,'#fff5bd88');circle(1107,262,17,'#f8d98b');shape(1097,251,20,22,7,'#e68c6c','#9c705b',2);text('✦',1100,267,17,'#fff5d7')}
for(const e of s.enemy)if(e.alive)bush(e,s.time);if(s.boss.alive)boss(s.boss,s.time);if(s.won){text('✦',2240,365,40,'#fff2a8');text('ТАПОК!',2210,395,15)}if(!p.inv||Math.floor(p.inv/6)%2)hero(p,s);ctx.restore();
shape(18,17,160,42,12,'#fff9e9','#ffffff',2);text('♥ '.repeat(p.hp),30,45,22,'#e98272');shape(186,17,160,42,12,'#fff9e9','#ffffff',2);text(s.unlocked?(s.eye?'✦ ГЛАЗ ОТКРЫТ':'✦ ГЛАЗ: E'):'✦ ГЛАЗ СПИТ',198,43,13,'#45635a');if(s.noticeTime>0){shape(176,70,608,42,14,'#fff9e9','#ffffff',2);ctx.fillStyle='#405b51';ctx.font='800 14px Nunito, system-ui';ctx.fillText(s.notice,192,96,576)}if(s.won){ctx.fillStyle='#24463bc9';ctx.fillRect(0,0,W,H);shape(240,145,480,230,24,'#fff8e1','#ffffff',4);text('Храм пройден!',340,215,36);text('Дух: «Мой тапок! Я скучал по тебе…»',305,265,16);text('Нажми R, чтобы начать заново',324,315,14,'#a3755a')}}
