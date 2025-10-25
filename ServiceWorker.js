const cacheName = "DefaultCompany-ESCAPEWDW-1.0";
const contentToCache = [
    "Build/e622c4d2d90fc816cd89666df533ab9c.loader.js",
    "Build/644b4b17f789d70a957727fd8731ab14.framework.js",
    "Build/0285d2dad32e921935823c4d55b0d9df.data",
    "Build/2763a13998a508612fb446c43e191a83.wasm",
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
