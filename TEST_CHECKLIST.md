# Checklist kiểm thử Emergency Vent Assist

## 1. Trước khi chạy

- [ ] HTTPS hoặc `localhost`.
- [ ] Phiên bản trong `index.html`, `sw.js`, README khớp nhau.
- [ ] `icon.svg`, `icon-192.png`, `icon-512.png` tải được.
- [ ] Không có thay đổi protocol chưa được ghi nguồn và duyệt.

## 2. Smoke test chức năng

- [ ] Mở ứng dụng khi online.
- [ ] Chọn Nam, chiều cao 165 cm, nguồn “Đo khi nằm”.
- [ ] PBW hiển thị khoảng 61.5 kg; VT hiển thị 369 mL.
- [ ] Nhập SpO₂ 91% và kiểm tra cảnh báo đỏ.
- [ ] Nhập Pplat 31 cmH₂O và kiểm tra cảnh báo đỏ.
- [ ] Nhập Auto-PEEP 1 cmH₂O và kiểm tra cảnh báo đỏ.
- [ ] Nhập SpO₂ 150% và xác nhận lỗi trường, không tạo cảnh báo từ giá trị đó.
- [ ] Ghi giờ nối máy; timer bắt đầu.
- [ ] Đánh dấu bác sĩ chuyên ngành đã đến; timer dừng.
- [ ] Dòng thời gian có giờ nối máy và giờ chuyên ngành đến.
- [ ] SBAR không chứa họ tên hoặc mã bệnh án.
- [ ] SBAR phân biệt đề xuất của ứng dụng với VT/PEEP/FiO₂ nhập từ máy; không gọi đề xuất là cài đặt hiện tại.
- [ ] P/F chỉ tính khi có PaO₂ và FiO₂ trên máy lúc lấy khí máu.
- [ ] Profile COPD bản nháp hiển thị rõ cảnh báo vẫn dùng mục tiêu khởi đầu 92–96%.
- [ ] Snapshot không lưu số nhập sai hoặc tính xu hướng từ số sai.
- [ ] Đồng hồ không thể bắt đầu lại độc lập với giờ nối máy.
- [ ] Nút xóa phiên xóa input, checklist, timer và dòng thời gian.

## 3. Responsive và accessibility

- [ ] 360 × 800 không tràn ngang.
- [ ] 390 × 844 không tràn ngang.
- [ ] 768 × 1024 không tràn ngang.
- [ ] 1024 × 900 không tràn ngang.
- [ ] 1440 × 900 giữ chiều rộng đọc hợp lý.
- [ ] Điều hướng ba bước bằng Tab và mũi tên.
- [ ] Focus có viền rõ.
- [ ] Lỗi input được trình đọc màn hình đọc cùng trường.
- [ ] Modal mở, đóng bằng Escape và trả focus về nút mở.
- [ ] Zoom 200% không làm mất nội dung chính.

## 4. Offline và cập nhật

- [ ] Tải ứng dụng một lần khi online.
- [ ] Bật Offline rồi tải lại.
- [ ] PBW, cảnh báo, timer và SBAR vẫn hoạt động.
- [ ] Xác nhận cache là `vent-assist-v1.5.1`.
- [ ] Sau khi tăng version, bản mới xuất hiện sau reload.
- [ ] Không có request 404 trong app shell.

## 5. Thiết bị thật

- [ ] Chrome Android tại thiết bị pilot.
- [ ] Safari iOS tại thiết bị pilot.
- [ ] Cài lên màn hình chính.
- [ ] Mở từ biểu tượng khi offline.
- [ ] Kiểm tra safe area, bàn phím số và khóa màn hình.

## 6. Phê duyệt trước pilot

- [ ] Bác sĩ Cấp cứu duyệt luồng.
- [ ] Bác sĩ Hồi sức duyệt cảnh báo và SBAR.
- [ ] Phụ trách thiết bị đối chiếu Operator's Manual.
- [ ] Người phụ trách triển khai xác nhận rollback.
- [ ] Ghi kết quả vào nhật ký phát hành.
