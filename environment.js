// Illustrated world layers; collision surfaces are still defined in game.js.
// Render with drawBackdrop(state), then (in world coordinates) drawRuins(),
// then platform(eachPlatform, state.eye). No gameplay geometry is changed.
function filledPath(color, draw) { ctx.beginPath(); draw(); ctx.fillStyle = color; ctx.fill(); }
function oval(x, y, rx, ry, color) { ctx.beginPath(); ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=color;ctx.fill(); }
function cloud(x,y,scale) {
  ctx.save(); ctx.translate(x,y);ctx.scale(scale,scale);
  ctx.globalAlpha=.8;
  filledPath('#fffaf0',()=>{ctx.moveTo(-64,13);ctx.bezierCurveTo(-70,-2,-51,-13,-35,-8);ctx.bezierCurveTo(-30,-29,-3,-35,10,-20);ctx.bezierCurveTo(26,-31,45,-21,45,-8);ctx.bezierCurveTo(69,-10,77,1,72,14);ctx.quadraticCurveTo(10,22,-64,13)});
  ctx.globalAlpha=.55; line(-43,14,51,14,'#dfebe4',2);ctx.restore();
}
function mountain(x,y,w,h,color) {
 filledPath(color,()=>{ctx.moveTo(x,y);ctx.bezierCurveTo(x+w*.13,y-h*.18,x+w*.18,y-h*.76,x+w*.32,y-h);ctx.bezierCurveTo(x+w*.47,y-h*.78,x+w*.53,y-h*.43,x+w*.66,y-h*.52);ctx.bezierCurveTo(x+w*.8,y-h*.38,x+w*.93,y-h*.16,x+w,y);ctx.closePath()});
}
function forest(x,y,scale,color) {
 ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
 filledPath(color,()=>{ctx.moveTo(-76,10);ctx.quadraticCurveTo(-91,-1,-73,-16);ctx.quadraticCurveTo(-71,-39,-50,-39);ctx.quadraticCurveTo(-36,-65,-15,-54);ctx.quadraticCurveTo(1,-75,22,-53);ctx.quadraticCurveTo(44,-63,56,-42);ctx.quadraticCurveTo(81,-40,78,-14);ctx.quadraticCurveTo(99,-4,83,10);ctx.closePath()});ctx.restore();
}
function drawBackdrop(s) {
 const night=s.eye;
 const sky=ctx.createLinearGradient(0,0,0,500);sky.addColorStop(0,night?'#6c709b':'#8bd4d7');sky.addColorStop(.58,night?'#c4a7bb':'#c6e5d2');sky.addColorStop(1,night?'#e7c8bf':'#f7dfb5');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
 // Sun has an atmospheric halo rather than a flat disc.
 let halo=ctx.createRadialGradient(790,95,5,790,95,108);halo.addColorStop(0,night?'#fff1d0':'#fff5c9');halo.addColorStop(.42,night?'#fbe4ceaa':'#fff1bbaa');halo.addColorStop(1,'#fff0c000');ctx.fillStyle=halo;ctx.fillRect(680,0,220,210);circle(790,95,35,night?'#ffedd4':'#fff2bc');
 cloud(160-s.camera*.035,100,.62);cloud(510-s.camera*.06,160,.45);cloud(860-s.camera*.04,83,.67);
 ctx.save();ctx.translate(-s.camera*.12,0);
 for(let i=-1;i<7;i++){const x=i*390;mountain(x,442,550,225,i%2?'#a1c9b4':'#9ec4b2');mountain(x+120,445,390,145,'#accfb8');}ctx.restore();
 ctx.save();ctx.translate(-s.camera*.23,0);
 for(let i=-1;i<11;i++){let x=i*230;forest(x,450,.86,i%2?'#8dbca0':'#83b498');forest(x+100,460,.65,'#9bc8a4')}ctx.restore();
 // Mist separates the background from the architecture and active platforms.
 let mist=ctx.createLinearGradient(0,300,0,455);mist.addColorStop(0,'#f9e9c500');mist.addColorStop(1,night?'#e9cfe430':'#fff3d640');ctx.fillStyle=mist;ctx.fillRect(0,300,W,155);
}
function arch(x,y,scale) {
 ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
 // Uneven stones and open arch, with low contrast against the action layer.
 filledPath('#9ebaa0',()=>{ctx.moveTo(0,0);ctx.lineTo(142,0);ctx.lineTo(142,155);ctx.lineTo(112,155);ctx.lineTo(112,71);ctx.bezierCurveTo(112,23,30,23,30,71);ctx.lineTo(30,155);ctx.lineTo(0,155);ctx.closePath()});
 line(15,13,126,13,'#c7d2b0',7);line(8,31,134,31,'#8eaf98',2);line(14,60,25,60,'#88a995',2);line(118,60,130,60,'#88a995',2);line(0,110,29,110,'#88a995',2);line(113,110,142,110,'#88a995',2);
 // Ivy vines emphasize height and make repeated arches less geometric.
 ctx.strokeStyle='#6eaa81';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(3,15);ctx.bezierCurveTo(23,35,-3,60,16,84);ctx.bezierCurveTo(26,100,10,119,17,135);ctx.stroke();
 for(let i=0;i<5;i++){let y=28+i*21;oval(10+(i%2)*6,y,7,3,i%2?'#7eb58b':'#8fc399');}
 ctx.restore();
}
function drawRuins(){
 // Asymmetric arch spacing keeps the level from looking tiled.
 arch(160,290,1.03);arch(520,337,.78);arch(1000,303,.98);arch(1460,334,.78);arch(1880,293,1.03);arch(2250,330,.8);
 // Low bushes sit behind the platforms and do not suggest collision surfaces.
 for (const ground of platforms.filter(q => !q.hidden && q.y === 455)) {
  for (let x=ground.x+40; x<ground.x+ground.w-40; x+=150) { forest(x,455,.3,Math.round(x/150)%3?'#8abb8e':'#76aa81'); }
 }
}
function platform(q,eye){
 if(q.hidden&&!eye)return;
 const hidden=!!q.hidden;
 ctx.save();
 // Clear, high-contrast top edge is exactly on the collision line.
 shape(q.x,q.y,q.w,q.h,Math.min(7,q.h/3),hidden?'#8b70a2':'#aa7757',hidden?'#e9c6f0':'#725c4d',2);
 ctx.save();ctx.beginPath();ctx.roundRect(q.x+1,q.y+1,q.w-2,Math.max(1,q.h-2),Math.min(6,q.h/3));ctx.clip();
 let stone=ctx.createLinearGradient(0,q.y,0,q.y+q.h);stone.addColorStop(0,hidden?'#cfadd2':'#c99e72');stone.addColorStop(1,hidden?'#806391':'#94694f');ctx.fillStyle=stone;ctx.fillRect(q.x,q.y,q.w,q.h);
 // Large irregular stones convey structure without cluttering the play surface.
 for(let x=q.x+26;x<q.x+q.w;x+=91){line(x,q.y+13,x-6,q.y+Math.min(q.h-2,33),hidden?'#a986ba':'#aa805f',2);if(q.h>40)line(x+40,q.y+38,x+32,q.y+q.h-3,hidden?'#a986ba':'#aa805f',2)}
 if(q.h>40){line(q.x,q.y+34,q.x+q.w,q.y+34,hidden?'#a986ba':'#ac805e',2);line(q.x,q.y+60,q.x+q.w,q.y+60,hidden?'#a986ba':'#a77a59',2)}ctx.restore();
 shape(q.x,q.y,q.w,10,4,hidden?'#e1bde9':'#6caa71',hidden?'#d5b2e4':'#567f61',1.5);
 line(q.x+5,q.y+2,q.x+q.w-5,q.y+2,hidden?'#fff2ff':'#a6d698',2);
 if(!hidden){for(let x=q.x+30;x<q.x+q.w-12;x+=109){line(x,q.y,x-3,q.y-6,'#669e6e',2);line(x,q.y,x+4,q.y-7,'#669e6e',2);circle(x+4,q.y-7,2,'#ffe5aa')}}else{for(let x=q.x+18;x<q.x+q.w-10;x+=30){circle(x,q.y-5,2,'#fff3ff')}}
 ctx.restore();
}
