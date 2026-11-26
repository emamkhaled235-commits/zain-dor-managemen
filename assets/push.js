/* ZAIN web push: staff (admin/manager) opt-in. Public VAPID key only. */
(function(){
var VAPID='BMqno1kFUtYhPnw9J0QDpyi4_c7bsYThzu8dGQQTenxNDayKmhbkpYlS3xsq_ZyJWADCiCHAQ4iQeuOLuyQ5BU4';
function b64(s){var p='='.repeat((4-s.length%4)%4),r=(s+p).replace(/-/g,'+').replace(/_/g,'/'),raw=atob(r),o=new Uint8Array(raw.length);for(var i=0;i<raw.length;i++)o[i]=raw.charCodeAt(i);return o}
function btn(){var b=document.getElementById('zainPushBtn');if(b)return b;b=document.createElement('button');b.id='zainPushBtn';b.type='button';b.style.cssText='position:fixed;bottom:18px;right:18px;z-index:9999;background:#d9b77a;color:#21151a;border:0;border-radius:40px;padding:12px 18px;box-shadow:0 6px 24px #0008;font-weight:bold;cursor:pointer;font-family:inherit';document.body.appendChild(b);return b}
window.zainPushInit=async function(client,role){
 try{
  if(!['admin','manager'].includes(role))return;
  var b=btn();
  if(!('serviceWorker' in navigator)||!('PushManager' in window)||!('Notification' in window)){b.hidden=true;return}
  var reg=await navigator.serviceWorker.register('./sw.js');await navigator.serviceWorker.ready;
  async function save(sub){var j=sub.toJSON();var r=await client.rpc('zain_push_subscribe',{p_endpoint:j.endpoint,p_p256dh:j.keys.p256dh,p_auth:j.keys.auth});if(r.error)throw r.error}
  var sub=await reg.pushManager.getSubscription();
  if(sub&&Notification.permission==='granted'){await save(sub);b.hidden=true;return}
  b.hidden=false;b.textContent='🔔 تفعيل إشعارات الطلبات الجديدة';
  b.onclick=async function(){
   try{
    var perm=await Notification.requestPermission();
    if(perm!=='granted'){b.textContent='الإشعارات محظورة من إعدادات المتصفح';return}
    var s=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64(VAPID)});
    await save(s);b.textContent='✓ تم تفعيل الإشعارات';setTimeout(function(){b.hidden=true},2500);
   }catch(e){b.textContent='تعذر التفعيل: '+(e&&e.message||e)}
  };
 }catch(e){console.warn('push init',e)}
};
})();
