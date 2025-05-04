const cacheName = 'piac-pwa-v2';
const filesToCache = [
  '/lista3/',
  '/lista3/index.html',
  '/lista3/style.css',
  '/lista3/js/main.js'
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      
      console.log('sprawdzam cache');
      return response || fetch(event.request).then((fetchResponse) => {
        console.log('Nie znaleziono w cache, pobieram z sieci');
        return caches.open(cacheName).then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => {
      // Fallback dla braku połączenia
      console.log('Brak połączenia, zwracam index.html');
      // if (event.request.mode === 'navigate') {
        // return caches.match('index.html');
      // }
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});




