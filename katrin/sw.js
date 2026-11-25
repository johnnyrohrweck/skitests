// Stand 25.11.2026 19:54 – zuerst Netz (immer aktuell), ohne Netz der letzte Stand aus dem Speicher.
const C='skitest-katrin';
const DATEIEN=['./','index.html','manifest.json','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(DATEIEN)).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{
    if(r.ok){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));}
    return r;
  }).catch(()=>caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>r||c.match('index.html')))));
});
