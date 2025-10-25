const cacheName = "DefaultCompany-ESCAPEWDW-1.0";
const contentToCache = [
    "Build/8104ee2a3a1bddd498e0d8617a777ed1.loader.js",
    "Build/6066a7b1329a99132db789cfdc9cb202.framework.js.gz",
    "Build/04915624b769e61eb3e1f845171145eb.data.gz",
    "Build/212654a688f8d7118c5299af2c25994a.wasm.gz",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
