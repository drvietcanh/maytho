/*
 * Service Worker: Cài Đặt Ban Đầu Máy Thở Cấp Cứu
 * Chiến lược: Cache-First cho tài nguyên nội bộ, chạy offline sau lần tải đầu.
 *
 * QUY TRÌNH CẬP NHẬT PHIÊN BẢN:
 * Mỗi khi thay đổi bất kỳ tệp nào trong APP_SHELL, tăng CACHE_VERSION.
 */

const CACHE_PREFIX = 'vent-assist-';
const CACHE_VERSION = 'v1.4.0';
const CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;

const REQUIRED_ASSETS = ['./index.html', './manifest.json'];
const OPTIONAL_ASSETS = ['./', './icon.svg', './icon-192.png', './icon-512.png'];

const SCOPE_URL = self.registration.scope;

function toAbsolute(path) {
  return new URL(path, SCOPE_URL).href;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      for (const path of REQUIRED_ASSETS) {
        const url = toAbsolute(path);
        const response = await fetch(url, { cache: 'reload' });
        if (!response.ok) {
          throw new Error('Không tải được tệp bắt buộc: ' + path);
        }
        await cache.put(url, response.clone());
      }

      for (const path of OPTIONAL_ASSETS) {
        const url = toAbsolute(path);
        try {
          const response = await fetch(url, { cache: 'reload' });
          if (response.ok) {
            await cache.put(url, response.clone());
          }
        } catch (err) {
          console.warn('[SW] Bỏ qua tệp tùy chọn:', path, err);
        }
      }
    })()
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (!request.url.startsWith(SCOPE_URL)) return;

  event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.ok && response.type === 'basic') {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    if (request.mode === 'navigate') {
      const fallback = await cache.match(toAbsolute('./index.html'));
      if (fallback) return fallback;
    }
    return new Response('Ngoại tuyến: tài nguyên chưa được lưu trong bộ nhớ đệm.', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
