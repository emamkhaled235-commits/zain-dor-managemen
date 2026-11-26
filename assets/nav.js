(function(){
var onGallery=/gallery\.html$|\/$/.test(location.pathname)&&!!document.getElementById('collections');
var g=function(h){return onGallery?h:'./gallery.html'+h};
var L=[['المعرض','./gallery.html',''],['أقسام المعرض',g('#collections'),'#collections'],['الأكثر مبيعًا',g('#bestsellers'),'#bestsellers'],['الإرث الفرعوني',g('#pharaonic'),'#pharaonic'],['الترميم والصيانة','./repairs.html','feat'],['صُنع خصيصًا لك','./custom.html','feat'],['دخول المسوقين والإدارة','./login.html','']];
var shell=document.querySelector('.nav .shell');if(!shell)return;
var logo=shell.querySelector('.logo');var act=document.createElement('div');act.className='nav-actions';
[].slice.call(shell.children).forEach(function(c){if(c!==logo&&!c.classList.contains('nav-actions'))act.appendChild(c)});
var nl=act.querySelector('.navlinks');if(nl)nl.remove();
var b=document.createElement('button');b.type='button';b.className='nav-burger';b.setAttribute('aria-label','القائمة');b.setAttribute('aria-expanded','false');b.innerHTML='<i></i><i></i><i></i>';act.appendChild(b);shell.appendChild(act);
var ov=document.createElement('div');ov.className='drawer-ov';
var d=document.createElement('aside');d.className='drawer';d.setAttribute('role','dialog');d.setAttribute('aria-label','القائمة الرئيسية');d.setAttribute('aria-hidden','true');
d.innerHTML='<div class="drawer-top"><div class="drawer-brand">زيـن<small>ZAIN HANDCRAFTED</small></div><button type="button" class="drawer-x" aria-label="إغلاق">&times;</button></div><div class="drawer-line"></div>'+L.map(function(x){return '<a class="dl'+(x[2]==='feat'?' feat':'')+'" href="'+x[1]+'"><span class="o">✦</span>'+x[0]+'</a>'}).join('')+'<div class="dfoot">مشغولات بتفاصيل فريدة</div>';
document.body.appendChild(ov);document.body.appendChild(d);
function open(){document.body.classList.add('drawer-open');b.setAttribute('aria-expanded','true');d.setAttribute('aria-hidden','false')}
function close(){document.body.classList.remove('drawer-open');b.setAttribute('aria-expanded','false');d.setAttribute('aria-hidden','true')}
b.onclick=function(){document.body.classList.contains('drawer-open')?close():open()};
ov.onclick=close;d.querySelector('.drawer-x').onclick=close;
d.addEventListener('click',function(e){if(e.target.closest('a'))close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
})();
