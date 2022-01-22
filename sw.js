const CACHE_ELEMENTS = [
    './',
    'https://unpkg.com/react@17/umd/react.development.js',
    'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    './js/index.js'
];

const CACHE_NAME = 'Proyecto-2-PWA-v1';

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Installing Service Worker ...', e);
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching app shell');
                cache.addAll(CACHE_ELEMENTS)
                .then(() => {
                    self.skipWaiting();
                });
            })
    );
});

self.addEventListener('activate', (e) => {

    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                console.log(cacheNames)
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim();
            })
            .catch((err) => {
                console.log(err);
            })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(e.request);
            })
    );
});