# Hỗ Trợ Cài Đặt Máy Thở Cấp Cứu (Emergency Vent Assist)

Công cụ tham khảo thông số khởi đầu cho máy thở Neumovent GraphNet trong cấp cứu và hồi sức tích cực. Ứng dụng là Progressive Web App (PWA), chạy hoàn toàn trên trình duyệt, không có máy chủ và không lưu dữ liệu bệnh nhân.

> **Cảnh báo:** Đây là công cụ tham khảo, không phải thiết bị y tế đã được thẩm định. Mọi thông số phải đối chiếu với hướng dẫn sử dụng của máy (Operator's Manual) và phác đồ của đơn vị trước khi áp dụng. Không dùng ứng dụng này để thay thế phán đoán lâm sàng.

---

## 1. Cấu trúc thư mục

```
vent-assist/
├── index.html        # Giao diện, CSS và JavaScript (một tệp)
├── manifest.json     # Cấu hình Web App Manifest
├── sw.js             # Service Worker (Cache-First, chạy offline)
├── icon.svg          # Biểu tượng (cần tạo, xem mục 4)
├── icon-192.png      # Biểu tượng 192×192 cho Android (cần tạo)
├── icon-512.png      # Biểu tượng 512×512 cho Android (cần tạo)
├── README.md
└── TEST_CHECKLIST.md
```

Tất cả đường dẫn đều tương đối, nên thư mục có thể đặt ở gốc của host hoặc trong một thư mục con.

---

## 2. Yêu cầu triển khai

- **HTTPS bắt buộc.** Service Worker và Web App Manifest chỉ hoạt động trên HTTPS. Ngoại lệ là `localhost` khi thử nghiệm trên máy tính.
- **Không cần máy chủ đặc biệt.** Chỉ cần host tệp tĩnh (GitHub Pages, Netlify, Cloudflare Pages, hoặc máy chủ nội bộ của bệnh viện có HTTPS).
- **Không cần cấu hình gì thêm.** Ứng dụng không gọi API, không dùng CDN và không tải font ngoài.

### Triển khai nội bộ trong bệnh viện

Nếu đưa lên máy chủ nội bộ, nên đặt sau tường lửa, dùng chứng chỉ TLS của bệnh viện và chỉ cho phép truy cập từ mạng nội bộ. Không công khai ứng dụng ra Internet khi chưa có thẩm định.

---

## 3. Cách cài đặt lên màn hình chính

Người dùng cần truy cập ứng dụng một lần khi có mạng để trình duyệt lưu bộ nhớ đệm.

**iOS (Safari):**
1. Mở địa chỉ ứng dụng trong **Safari** (không dùng Chrome trên iOS, vì Chrome không hỗ trợ cài đặt PWA).
2. Chạm nút **Chia sẻ** (biểu tượng hình vuông có mũi tên).
3. Chọn **Thêm vào Màn hình chính** (Add to Home Screen).
4. Chạm **Thêm**. Ứng dụng sẽ mở ở chế độ toàn màn hình.

**Android (Chrome):**
1. Mở địa chỉ ứng dụng trong **Chrome**.
2. Chạm menu ba chấm, chọn **Cài đặt ứng dụng** (Install app) hoặc **Thêm vào màn hình chính**.
3. Xác nhận. Ứng dụng sẽ mở ở chế độ standalone.

**Lưu ý:**
- Trên iOS, ứng dụng ở chế độ màn hình chính có vùng lưu trữ tách biệt với Safari. Sau khi cài, mở ứng dụng từ biểu tượng để dùng offline.
- Safari trên iOS có thể xóa bộ nhớ đệm của trang nếu ít dùng trong thời gian dài. Nên mở ứng dụng định kỳ, hoặc kiểm tra lại sau khi cập nhật.

---

## 4. Tạo biểu tượng

Ứng dụng vẫn chạy nếu thiếu biểu tượng, nhưng khi cài lên màn hình chính sẽ không có icon đúng, và Chrome trên Android có thể không hiện nút cài đặt. Cần tạo ba tệp sau trước khi triển khai thật.

**Tệp `icon.svg`:**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#0f172a"/>
  <rect x="96" y="96" width="320" height="320" rx="48" fill="none" stroke="#38bdf8" stroke-width="24"/>
  <path d="M120 300 H180 L210 220 L250 360 L290 180 L320 300 H392" fill="none" stroke="#10b981" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**Tạo PNG từ SVG:** Dùng một trong các cách sau.
- Mở `icon.svg` trong trình duyệt, chụp hoặc xuất ảnh kích thước 512×512, rồi lưu thành `icon-512.png`. Thu nhỏ còn 192×192 để lưu `icon-192.png`.
- Hoặc dùng ImageMagick trên máy có cài sẵn: `convert -background none -resize 512x512 icon.svg icon-512.png`, và `-resize 192x192` cho bản 192.

Sau khi tạo các tệp này, nhớ tăng `CACHE_VERSION` trong `sw.js` (xem mục 6) để trình duyệt lưu biểu tượng mới.

---

## 5. Kiểm tra sau khi triển khai

1. Mở ứng dụng trên trình duyệt máy tính bằng HTTPS.
2. Mở DevTools (F12) → tab **Application** → **Service Workers**. Xác nhận trạng thái là `activated and is running`.
3. Mở **Application** → **Cache Storage**. Xác nhận có cache tên `vent-assist-v1.0.0` chứa `index.html` và `manifest.json`.
4. Bật chế độ **Offline** trong DevTools (tab Network), tải lại trang. Ứng dụng phải vẫn mở và tính toán được.
5. Cài lên màn hình chính trên iOS và Android, rồi làm lại bước 4 trên thiết bị thật.

Chi tiết đầy đủ nằm trong `TEST_CHECKLIST.md`.

---

## 6. Cập nhật phiên bản

Service Worker dùng chiến lược Cache-First, nên khi sửa bất kỳ tệp nào, người dùng sẽ tiếp tục thấy bản cũ cho đến khi cache được thay thế. Quy trình bắt buộc:

1. Sửa tệp cần thay đổi (ví dụ `index.html`).
2. Mở `sw.js`, đổi `CACHE_VERSION`, ví dụ từ `'v1.0.0'` thành `'v1.0.1'`.
3. Đồng bộ số phiên bản trong `index.html` (dòng chú thích phía trên thẻ `<style>`) và trong chân trang.
4. Triển khai lên host.

Khi `sw.js` thay đổi, trình duyệt sẽ cài Service Worker mới. Cache cũ bị xóa ở sự kiện `activate`. Người dùng thường thấy bản mới sau khi đóng hết tab hoặc tải lại trang một đến hai lần.

**Quy tắc đặt số phiên bản:**
- Tăng số cuối (`v1.0.1`) khi sửa lỗi hoặc đổi nội dung nhỏ.
- Tăng số giữa (`v1.1.0`) khi thêm tính năng.
- Tăng số đầu (`v2.0.0`) khi thay đổi khoảng thông số lâm sàng hoặc logic tính toán. Các thay đổi này cần được bác sĩ thẩm định lại trước khi phát hành.

---

## 7. Ghi chú về dữ liệu và bảo mật

- Ứng dụng không thu thập họ tên, số bệnh án hay ngày sinh. Không có ô nhập nào cho các thông tin này.
- Không dùng `localStorage`, `IndexedDB` hay cookie. Giá trị nhập trong mục "Kiểm tra giá trị đang cài" chỉ tồn tại trong bộ nhớ của trang và mất khi đóng ứng dụng.
- `sw.js` chỉ lưu tệp tĩnh của ứng dụng. Không lưu dữ liệu người dùng nhập.
- Không gửi dữ liệu ra ngoài. Ứng dụng không có phân tích (analytics) hay theo dõi.
- Nếu cần ghi nhận lịch sử sử dụng cho mục đích kiểm định, phải thiết kế riêng và tuân thủ Nghị định 13/2023/NĐ-CP. Không thêm vào phiên bản này.

---

## 8. Việc còn lại trước khi đưa vào sử dụng

- [ ] Tạo `icon.svg`, `icon-192.png`, `icon-512.png` (mục 4).
- [ ] Đối chiếu toàn bộ mục gắn nhãn "Đối chiếu Operator's Manual" với tài liệu chính thức của Neumovent GraphNet, gồm chế độ thở khẩn cấp, chu kỳ tự hiệu chuẩn, tên phím giữ thở, dải cài đặt thực tế của Peak flow, Flow trigger và EtCO₂.
- [ ] Bác sĩ hồi sức thẩm định các khoảng gợi ý theo bộ câu hỏi đã nêu.
- [ ] Xác định ứng dụng có thuộc phạm vi quản lý trang thiết bị y tế hoặc phần mềm y tế theo quy định của Bộ Y tế hay không. Nếu có, phải thực hiện thủ tục tương ứng trước khi dùng trong lâm sàng.
- [ ] Hoàn thành `TEST_CHECKLIST.md` trên thiết bị iOS và Android thật.

---

## 9. Giấy phép và trách nhiệm

Ứng dụng là tài liệu tham khảo nội bộ. Đơn vị triển khai chịu trách nhiệm về nội dung, việc cập nhật phiên bản và việc thẩm định trước khi sử dụng. Người dùng cuối vẫn phải tự đánh giá và chịu trách nhiệm về quyết định lâm sàng của mình.