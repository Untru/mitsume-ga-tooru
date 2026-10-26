// Character art is independent from collision boxes. Feet are anchored to the physics floor.
function charPath(points, fill, stroke='#3b4850', width=1.7) {
  ctx.beginPath(); ctx.moveTo(points[0][0],points[0][1]);
  for (let i=1;i<points.length;i++) ctx.lineTo(points[i][0],points[i][1]);
  ctx.closePath(); ctx.fillStyle=fill; ctx.fill();
  if(stroke){ctx.lineWidth=width;ctx.lineJoin='round';ctx.strokeStyle=stroke;ctx.stroke()}
}
function charEllipse(x,y,rx,ry,fill,stroke=null,width=1.5){
  ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();
  if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke()}
}
function hero(p,s){
  const moving=p.ground&&Math.abs(p.vx)>.1;
  const step=moving?Math.sin(s.time*.24):0;
  const air=!p.ground;
  const bob=moving?Math.abs(step)*1.8:Math.sin(s.time*.06)*.5;
  ctx.save();ctx.translate(p.x+p.w/2,p.y+p.h);ctx.scale(p.face,.78);ctx.translate(0,-bob);
  // Back of the scarf, pack, and a wide, legible running silhouette.
  ctx.beginPath();ctx.moveTo(-7,-34);ctx.quadraticCurveTo(-26,-35-step*3,-31,-43-step*4);ctx.quadraticCurveTo(-29,-31,-17,-27);ctx.lineTo(-9,-28);ctx.closePath();ctx.fillStyle='#eec351';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#834c43';ctx.stroke();
  shape(-19,-34,13,22,5,'#b96045','#70483c',2);shape(-17,-31,9,11,3,'#e99a56',null);
  let backFoot=air?-5:step*5,frontFoot=air?5:-step*5;
  line(-6,-17,-9+backFoot,-6,'#42586a',7);line(5,-17,8+frontFoot,-6,'#42586a',7);
  shape(-17+backFoot,-8,14,8,4,'#6f4639','#443f3e',1.8);shape(2+frontFoot,-8,15,8,4,'#784c3a','#443f3e',1.8);
  shape(-13,-39,26,25,8,'#dc644c','#70483e',2);shape(-10,-36,20,16,6,'#ef835c',null);
  charPath([[-10,-36],[4,-36],[10,-17],[5,-14]],'#ddaa62','#925c48',1);circle(2,-25,2,'#ffd489');
  line(-11,-33,-19,-21+step*3,'#bc714e',6);charEllipse(-19,-20+step*3,4,4,'#f8c28f','#865d4c',1);
  line(10,-33,18,-24-step*3,'#bc714e',6);charEllipse(18,-23-step*3,4,4,'#f8c28f','#865d4c',1);
  // Strongly outlined chibi head with expressive brows and individual locks of hair.
  charEllipse(-15,-51,5,6,'#efb082','#805548',1.5);charEllipse(15,-51,5,6,'#efb082','#805548',1.5);
  shape(-16,-67,32,32,13,'#f5c99d','#805548',2);
  charEllipse(-6,-46,5,2,'#e99d88');charEllipse(10,-46,4,2,'#e99d88');
  charPath([[-16,-53],[-18,-62],[-15,-70],[-8,-74],[-4,-78],[1,-74],[7,-77],[9,-72],[15,-71],[18,-63],[15,-55],[11,-62],[8,-57],[3,-64],[-1,-59],[-5,-65],[-10,-60],[-13,-64]],'#35434a','#283940',2);
  charPath([[-11,-70],[-6,-74],[-4,-70],[0,-74],[4,-71],[8,-72],[5,-68],[-2,-67],[-7,-68]],'#6c6970',null);
  // A visible third-eye mark on the headband; actual open eye glows only after E.
  shape(-13,-59,26,6,3,'#f1ce6c','#a66e4e',1);
  if(s.eye){charEllipse(0,-56,7,5,'#ffe8ac','#a4639d',1.5);charEllipse(0,-56,2.4,3,'#764e93');circle(1,-57,1,'#fffdf0')}
  else{charEllipse(0,-56,3,2.1,'#b37e5e');line(-2,-56,2,-56,'#774f4b',1)}
  charEllipse(-6,-50,4.3,5,'#fff9ed');charEllipse(6,-50,4.3,5,'#fff9ed');charEllipse(-5,-49.4,2,3,'#374853');charEllipse(7,-49.4,2,3,'#374853');circle(-4.5,-51,1,'#fff');circle(7.5,-51,1,'#fff');
  ctx.beginPath();ctx.moveTo(1,-44);ctx.quadraticCurveTo(5,-41,9,-44);ctx.strokeStyle='#a2524c';ctx.lineWidth=1.4;ctx.stroke();
  shape(-12,-38,24,7,3,'#f2c354','#a37143',1);charEllipse(10,-35,4,4,'#e4a943','#a37143',1);
  if(p.attack>0){ctx.beginPath();ctx.arc(10,-33,36,-1.05,1.1);ctx.strokeStyle='#fff8bd';ctx.lineWidth=7;ctx.lineCap='round';ctx.stroke();ctx.beginPath();ctx.arc(10,-33,36,-1.05,1.1);ctx.strokeStyle='#f5b64e';ctx.lineWidth=2.5;ctx.stroke();circle(31,-58,3,'#fff7b1');}
  ctx.restore();
}
function bush(e,t){
  const bounce=Math.sin(t*.12+e.base)*2;
  ctx.save();ctx.translate(e.x+18,e.y+35);
  charEllipse(0,-1,18,3,'#314c3a33');ctx.translate(0,bounce);
  shape(-15,-10,13,9,5,'#638c4d','#3d684b',1.5);shape(3,-10,13,9,5,'#638c4d','#3d684b',1.5);
  charPath([[-18,-12],[-21,-21],[-15,-28],[-16,-35],[-8,-38],[-3,-44],[4,-40],[10,-44],[15,-37],[21,-32],[19,-24],[21,-18],[16,-10]],'#65a957','#3e6c47',2);
  charEllipse(-9,-30,9,8,'#8bc976');charEllipse(4,-34,10,8,'#8acb75');charEllipse(13,-25,6,8,'#75b767');
  charEllipse(-7,-23,6.5,6.5,'#fff6d9','#52714d',1);charEllipse(7,-23,6.5,6.5,'#fff6d9','#52714d',1);
  charEllipse(-5,-22,2.5,3.5,'#334a3c');charEllipse(9,-22,2.5,3.5,'#334a3c');circle(-4,-24,1,'#fff');circle(10,-24,1,'#fff');
  line(-13,-31,-4,-28,'#416447',2.8);line(4,-28,13,-31,'#416447',2.8);
  charEllipse(0,-12,5,3,'#385d40');charEllipse(1,-11,2,1,'#ef9d8b');charEllipse(14,-36,3,3,'#f2ce66');
  ctx.restore();
}
function boss(b,t){
  const wobble=Math.sin(t*.045)*2;
  ctx.save();ctx.translate(b.x+45,b.y+90);
  charEllipse(0,0,48,6,'#314c3a33');ctx.scale(.80,.82);
  // Limbs sit behind the body; one wobbles loose, a nod to the comic brief.
  shape(-57,-64+wobble,24,48,10,'#9b8f7e','#625c56',2.5);shape(35,-62-wobble,25,46,10,'#a89a84','#625c56',2.5);
  charEllipse(-46,-16+wobble,14,11,'#b3a48b','#625c56',2);charEllipse(48,-19-wobble,14,11,'#b3a48b','#625c56',2);
  shape(-41,-28,28,28,8,'#817b6e','#625c56',2);shape(13,-28,28,28,8,'#817b6e','#625c56',2);
  charPath([[-43,-18],[-46,-69],[-35,-88],[-22,-97],[22,-97],[35,-88],[46,-69],[43,-18],[28,-9],[-29,-9]],'#ad9d84','#625c56',3);
  shape(-37,-83,74,60,15,'#c2b299',null);charPath([[-38,-66],[-26,-79],[-9,-76],[0,-83],[10,-76],[27,-80],[39,-66],[36,-48],[-36,-48]],'#d3c3a5',null);
  shape(-40,-99,80,15,6,'#c9b89b','#625c56',2.5);shape(-29,-106,58,9,4,'#dfcda8','#756a5d',2);
  charEllipse(-19,-57,12,10,'#fff2bd','#887b68',1.5);charEllipse(19,-57,12,10,'#fff2bd','#887b68',1.5);charEllipse(-16,-56,3,4,'#504c45');charEllipse(22,-56,3,4,'#504c45');circle(-15,-58,1,'#fff');circle(23,-58,1,'#fff');
  line(-30,-72,-8,-68,'#756355',5);line(8,-68,30,-72,'#756355',5);
  shape(-15,-36,30,12,5,'#635a52','#756858',1);charPath([[-11,-33],[-3,-33],[-2,-29],[-10,-29]],'#f5e7c5',null);charPath([[2,-33],[10,-33],[9,-29],[2,-29]],'#f5e7c5',null);
  line(-34,-83,-28,-77,'#8b806f',2);line(-28,-77,-32,-72,'#8b806f',2);line(32,-44,26,-38,'#8b806f',2);
  charEllipse(-33,-90,7,4,'#6d9d6a');charEllipse(-25,-92,5,5,'#7fb474');charEllipse(32,-19,6,3,'#6d9d6a');
  ctx.restore();
  text('СТРАЖ ХРАМА',b.x-15,b.y-37,12);for(let i=0;i<b.hp;i++)circle(b.x+20+i*13,b.y-24,4,'#e48969');
}
