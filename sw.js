/* Shot Lab service worker: lets the app open and run with no signal on the course.
   The app page is fetched fresh whenever there is a connection (so new uploads to GitHub
   show up on their own), and served from the phone's cache when there is not.
   If you ever change this file, bump VERSION so phones pick up the change. */
const VERSION = 'shotlab-v3.0.0';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './fonts/barlow-condensed-latin-500-normal.woff2',
  './fonts/barlow-condensed-latin-600-normal.woff2',
  './fonts/barlow-condensed-latin-700-normal.woff2',
  './fonts/public-sans-latin-wght-normal.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('shotlab-') && k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms));

/* Page and app files: try the network for up to 3.5 s, then fall back to the cache. */
async function networkFirst(req){
  const cache = await caches.open(VERSION);
  try {
    const res = await Promise.race([fetch(req, { cache: 'no-cache' }), timeout(3500)]);
    if (res && res.ok) cache.put(req.mode === 'navigate' ? './index.html' : req, res.clone());
    return res;
  } catch (err){
    const hit = await cache.match(req.mode === 'navigate' ? './index.html' : req, { ignoreSearch: true });
    return hit || (await cache.match('./index.html')) || Response.error();
  }
}

/* Fonts and icons never change: cache first. */
async function cacheFirst(req){
  const cache = await caches.open(VERSION);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; /* GitHub sync and anything else external goes straight to the network */
  if (req.mode === 'navigate' || /\.(html|webmanifest|js)$/.test(url.pathname) || url.pathname.endsWith('/')) e.respondWith(networkFirst(req));
  else e.respondWith(cacheFirst(req));
});
