const V='inventario-v12';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='share-inbox').map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const r=e.request;
 if(r.method==='POST'&&new URL(r.url).pathname.endsWith('/share-target')){e.respondWith((async()=>{const fd=await r.formData(),f=fd.get('file'),t=((fd.get('text')||'')+' '+(fd.get('title')||'')).trim(),c=await caches.open('share-inbox');await c.delete('file');await c.delete('text');if(f&&f.size)await c.put('file',new Response(f,{headers:{'x-name':encodeURIComponent(f.name||'archivo')}}));else if(t)await c.put('text',new Response(t));return Response.redirect(new URL('./index.html?shared=1',self.registration.scope).href,303)})());return}
 if(r.method!=='GET')return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res})));
});
