/*
 * Service Worker: Hỗ Trợ Cài Đặt Máy Thở Cấp Cứu (Emergency Vent Assist)
 * Chiến lược: Cache-First cho tài nguyên nội bộ, chạy offline sau lần tải đầu.
 *
 * QUY TRÌNH CẬP NHẬT PHIÊN BẢN:
 * Mỗi khi thay đổi bất kỳ tệp nào trong APP_SHELL, tăng CACHE_VERSION.
 * Trình duyệt chỉ cài lại service worker khi nội dung tệp sw.js thay đổi,
 * nên bắt buộc phải đổi CACHE_VERSION để người dùng nhận bản mới.
 */

const CACHE_PREFIX = 'vent-assist-';
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;

// Tệp bắt buộc: thiếu một trong hai thì cài đặt thất bại, vì ứng dụng không chạy được.
const REQUIRED_ASSETS = ['./index.html', './manifest.json'];

// Tệp tùy chọn: thiếu thì bỏ qua, không làm hỏng cài đặt.
const OPTIONAL_ASSETS = ['./', './icon.svg', './icon-192.png', './icon-512.png'];

const SCOPE_URL = self.registration.scope;

function toAbsolute(path) {
  return new URL(path, SCOPE_URL).href;
}

// ---------- Cài đặt: lưu toàn bộ app shell vào cache ----------
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Tệp bắt buộc: lỗi thì ném ngoại lệ để cài đặt thất bại.
      for (const path of REQUIRED_ASSETS) {
        const url = toAbsolute(path);
        const response = await fetch(url, { cache: 'reload' });
        if (!response.ok) {
          throw new Error('Không tải được tệp bắt buộc: ' + path);
        }
        await cache.put(url, response.clone());
      }

      // Tệp tùy chọn: lỗi thì ghi cảnh báo và tiếp tục.
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

  // Kích hoạt ngay, không chờ đóng hết tab cũ.
  self.skipWaiting();
});

// ---------- Kích hoạt: xóa cache của các phiên bản cũ ----------
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

// ---------- Xử lý yêu cầu: Cache-First ----------
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Chỉ xử lý GET.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Chỉ xử lý tài nguyên cùng nguồn và nằm trong phạm vi ứng dụng.
  // Mọi yêu cầu ra ngoài đều để trình duyệt xử lý (ứng dụng không gọi mạng ngoài).
  if (url.origin !== self.location.origin) return;
  if (!request.url.startsWith(SCOPE_URL)) return;

  event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  // ignoreSearch: bỏ qua query string, ví dụ ?v=2 vẫn khớp tệp đã lưu.
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.ok && response.type === 'basic') {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // Mất mạng và không có trong cache.
    // Điều hướng trang: trả về index.html để ứng dụng vẫn mở được.
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

// ---------- Nhận lệnh từ trang (dùng khi cần ép cập nhật) ----------
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});