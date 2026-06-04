const CACHE_NAME = 'athar-food-v3.00';
const ASSETS = [
  './',
  './index.html'
];

// انسٹالیشن اور فائلیں سیو کرنا
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// پرانا کیشے صاف کرنا اور نئی اپڈیٹ لانا
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// آف لائن موڈ میں فائلوں کو موبائل سے ہی چلانا
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).catch(() => caches.match('./index.html'));
    })
  );
});
