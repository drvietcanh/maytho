# Nhật ký tiến độ

## 08/11/2026 — P0/P1 kỹ thuật

### Đã làm

- Đồng bộ Service Worker lên `v1.5.0`.
- Tạo icon SVG và PNG 192/512.
- Chuẩn hóa README theo TECME Neumovent TS.
- Chặn input ngoài `min/max/step` khỏi logic lâm sàng.
- Hiển thị lỗi input với `aria-invalid` và `aria-describedby`.
- Thêm phục hồi phiên tạm bằng `sessionStorage`, TTL 2 giờ và nút xóa phiên.
- Thêm điều hướng tab bằng bàn phím.
- Thêm trạng thái bước và dòng thời gian trong phiên.

### Kiểm tra

- Trình duyệt tải `index.html`, `sw.js`, `manifest.json`, icon SVG và PNG thành công trên localhost.
- `SpO₂=150` bị đánh dấu invalid và không tạo cảnh báo.
- Không ghi nhận lỗi console trong smoke load.
- Responsive test tại 360/390/768/1024/1440 px: không tràn ngang.
- Offline reload sau lần tải đầu: trang vẫn mở và hiển thị đúng.
- App shell và icon SVG/PNG trả về 200 trong smoke test.

### Giới hạn còn lại

- Chưa có test runner tự động trong repository.
- Chưa kiểm thử Safari/iOS và Android thiết bị thật.
- Protocol lâm sàng, mục tiêu SpO₂, timer 30 phút và thông tin thiết bị vẫn cần người có thẩm quyền phê duyệt.
- Chưa triển khai profile bệnh lý.

## 08/11/2026 — Hoàn tất vòng kỹ thuật và release smoke

### Đã làm

- Sửa nhãn ARIA của stepper để giữ tên bước và trạng thái.
- Thêm focus trap cho modal.
- Điều chỉnh live region cảnh báo theo mức độ.
- Thêm `package.json`, test runner Node và script build tĩnh.
- Thêm 4 smoke/unit tests.
- Thêm thư mục `dist/` được tạo từ build.

### Kết quả kiểm tra

- `npm test`: 4/4 test đạt.
- `npm run build`: đạt, tạo đủ app shell và icon trong `dist/`.
- Release smoke trên bản `dist`: không lỗi console.
- Responsive 360/390/768/1024/1440 px: không tràn ngang.
- Điều hướng stepper bằng mũi tên: đạt.
- Modal mở, focus vào nút đóng và Escape: đạt.
- Offline reload sau lần tải đầu: trang vẫn mở.

### Còn chờ phê duyệt

- Profile bệnh lý và mọi thay đổi protocol điều trị.
- Xác minh Operator's Manual trên máy thực tế.
- Pilot Safari iOS/Chrome Android trên thiết bị bệnh viện.

## 08/11/2026 — Profile mặc định chờ duyệt

- Thêm `profiles.js` với bốn profile: khởi đầu chung, ARDS, COPD/nguy cơ giữ CO₂, hen nặng.
- Profile chỉ hiển thị mục tiêu theo dõi, cảnh báo và nguồn; không tự thay đổi VT/RR/PEEP/FiO₂.
- COPD hiển thị mục tiêu SpO₂ 88–92% theo GOLD.
- ARDS hiển thị khoảng VT 4–8 mL/kg PBW và Pplat < 30 cmH₂O theo ATS/ESICM/SCCM; mục tiêu oxy vẫn để protocol đơn vị xác định.
- ARDS/COPD/hen được gắn `draft`; chưa được coi là protocol production cho đến khi người phê duyệt rà soát.
- Smoke test bản `dist`: chọn profile, hiển thị summary và không có lỗi console.
- Logic cảnh báo SpO₂ đổi theo profile có đích rõ (baseline 92–96%, COPD 88–92%); profile ARDS/hen vẫn yêu cầu protocol Hồi sức cho đích oxy.

## 08/11/2026 — Tách mode người dùng

- Mode mặc định “Trực cấp cứu — cấu hình an toàn tạm thời”: giữ thông số khởi đầu, ưu tiên cảnh báo và chờ Hồi sức.
- Mode “Hồi sức chuyên sâu — tùy chỉnh nhanh”: yêu cầu xác nhận vai trò, cho chỉnh VT/RR/PEEP/FiO₂/I:E/Pmax để tính và chuyển giao; không kết nối máy.
- Ghi mode và thông số hiện tại vào SBAR.
- Không cho profile chuyên sâu tự sinh y lệnh hoặc tự thay đổi thông số thiết bị.

## 08/11/2026 — Vai trò và workflow trực viện

- Thêm mode “Theo dõi/điều phối — không chỉnh máy”.
- Thêm nút “Gọi bác sĩ Hồi sức ngay”, ghi giờ gọi vào timeline và SBAR.
- Thêm nhịp tim và huyết áp tâm thu vào số đọc sau nối và SBAR.
- Chia checklist trước nối thành nhóm ưu tiên sinh mạng, máy/mạch thở/báo động và manual.
- Mode chuyên sâu tiếp tục yêu cầu xác nhận vai trò và chỉ là bảng tính/chuyển giao.
- `npm test`: 4/4 đạt; `npm run build`: đạt.

## 08/11/2026 — Sprint 1: giảm lỗi thao tác trong ca cấp cứu

- Thêm khối “Việc cần làm ngay” và nút chuyển nhanh sang bước sau nối.
- Sửa lưu mode để mode điều phối không bị chuyển nhầm về mode chung khi render lại.
- Sửa đơn vị lỗi nhập cho nhịp tim và huyết áp; thông báo không còn dùng nhầm cmH₂O.
- Đổi nút “Gọi bác sĩ Hồi sức ngay” thành “Ghi nhận đã liên lạc Hồi sức” để phản ánh đúng phạm vi ứng dụng (không tự thực hiện cuộc gọi).
- Quy tắc SpO₂ trong danh sách gọi hỗ trợ hiển thị theo mục tiêu đang có hiệu lực trong app; profile nháp không tự thay đổi ngưỡng cảnh báo.
- Thêm xác nhận khi ghi đè giờ nối máy hoặc đặt lại đồng hồ chờ; các thao tác được ghi vào timeline.
- Kiểm thử web thật bằng Playwright: nút chuyển bước, giữ mode điều phối, ghi nhận liên lạc và quy tắc SpO₂ đều hoạt động.
- `npm test`: 4/4 đạt; `npm run build`: đạt.

## 08/11/2026 — Sprint 2 bước đầu: truy vết số đo

- Mỗi số đo sau nối (SpO₂, Ppeak, Pplat, PEEP, VT, auto-PEEP, nhịp tim, HA tâm thu) lưu thời điểm nhập gần nhất trong phiên.
- SBAR hiển thị thời điểm tương ứng để bác sĩ nhận biết dữ liệu mới/cũ khi bàn giao.
- Timestamp chỉ là truy vết nhập liệu, không được diễn giải là thời điểm đo thực tế nếu người dùng nhập trễ.
- `npm test`: 4/4 đạt; `npm run build`: đạt.

## 08/11/2026 — Sprint 2: snapshot chuyển giao

- Thêm lưu tối đa 5 snapshot số đo sau nối máy, mỗi snapshot có timestamp và nhóm giá trị chính.
- Hiển thị lịch sử snapshot ngắn ngay cạnh vùng nhập số đo để so sánh các mốc trước/sau xử trí.
- SBAR đưa timestamp snapshot gần nhất vào phần chuyển giao.
- Snapshot chỉ là bản ghi hỗ trợ bàn giao; không tự suy diễn đáp ứng điều trị hoặc tạo y lệnh.
- `npm test`: 4/4 đạt; `npm run build`: đạt.

## 08/11/2026 — Sprint 2: trend và chất lượng dữ liệu

- Thêm so sánh snapshot đầu/cuối cho SpO₂, Pplat, nhịp tim và HA tâm thu.
- Hiển thị chênh lệch theo đơn vị tương ứng, không gắn nhãn đáp ứng điều trị.
- Thêm thông báo chất lượng dữ liệu khi còn thiếu 4 số đo chính.
- Giữ nguyên nguyên tắc: dữ liệu chỉ hỗ trợ bác sĩ bàn giao, không tự tạo y lệnh.
- `npm test`: 4/4 đạt; `npm run build`: đạt.

## 08/11/2026 — Sprint 3 bước đầu: chỉ số hỗ trợ Hồi sức

- Thêm trường PaO₂ khí máu tùy chọn, có kiểm tra khoảng giá trị và timestamp.
- Tính P/F chỉ khi PaO₂ và FiO₂ hợp lệ; hiển thị như chỉ số tham khảo, không tự phân tầng ARDS.
- Tính driving pressure từ Pplat − PEEP khi đủ dữ liệu.
- Đưa PaO₂ vào SBAR cùng timestamp.
- Gắn cảnh báo rõ rằng các chỉ số không thay thế đánh giá lâm sàng hoặc quyết định của bác sĩ Hồi sức.
- `npm test`: 4/4 đạt; `npm run build`: đạt.

## 08/11/2026 — Sprint 3: kiểm tra tính hợp lý dữ liệu

- Cảnh báo khi Pplat lớn hơn Ppeak.
- Cảnh báo khi Pplat thấp hơn PEEP, tạo driving pressure âm.
- Cảnh báo khi VT thực tế cao hơn VT dự kiến trên 25%.
- Các cảnh báo chỉ yêu cầu xác minh phép đo/đơn vị/cài đặt; ứng dụng không tự thay đổi thông số máy.
- `npm test`: 4/4 đạt; `npm run build`: đạt.

## 08/11/2026 — Sprint 3: workspace Hồi sức chuyên sâu

- Thêm bảng đối chiếu nhanh giữa cấu hình dự kiến và snapshot gần nhất.
- Thêm trường “Lý do điều chỉnh / câu hỏi cần Hồi sức trả lời”.
- Đưa lý do này vào SBAR để tách rõ dữ liệu bàn giao với quyết định chuyên sâu.
- Chỉ hiển thị workspace khi chọn mode Hồi sức và xác nhận trách nhiệm; không kết nối hoặc ghi trực tiếp lên máy.
- `npm test`: 4/4 đạt; `npm run build`: đạt.

## 09/11/2026 — Cổng phê duyệt profile lâm sàng

- Thêm [CLINICAL_APPROVAL_MATRIX.md](CLINICAL_APPROVAL_MATRIX.md) với quần thể, nội dung, nguồn, người duyệt, trạng thái và điều kiện bật production.
- Giữ baseline ở `TECHNICALLY_VERIFIED`; ARDS/COPD/hen vẫn `DRAFT`.
- SBAR ghi profile đang chọn và trạng thái phê duyệt để tránh hiểu nhầm profile nháp là protocol.
- Không bật profile production khi chưa có SOP bệnh viện, đối chiếu Operator’s Manual, người duyệt và ca mô phỏng.
- `npm test`: 4/4 đạt; `npm run build`: đạt.
- `git diff --check` không chạy được vì thư mục hiện tại không có metadata Git; không phát hiện lỗi whitespace qua build/test.

## 09/11/2026 — Rà soát đa vai trò và sửa lỗi release

- Audit theo vai trò Hồi sức, Cấp cứu/nội, điều dưỡng, kỹ sư thiết bị, an toàn người bệnh, UX/accessibility và QA.
- Phát hiện lỗi cú pháp JavaScript ở bảng đối chiếu mode Hồi sức bằng smoke test trình duyệt; đã sửa và xác minh lại inline JS.
- Sửa câu cảnh báo Pplat cao để không tạo ấn tượng phải giữ nguyên cài đặt; chuyển thành yêu cầu gọi Hồi sức đánh giá và không tự nâng Pmax.
- Smoke test thật đạt: P/F, driving pressure và responsive 360/390/768/1024/1440 không tràn ngang.
- `npm test`: 4/4 đạt; `npm run build`: đạt.
## 09/11/2026 — Khắc phục điểm chặn nghiệm thu 1.5.1

- SBAR tách đề xuất ứng dụng khỏi VT, PEEP và FiO₂ nhập từ máy, kèm giờ nhập; so sánh VT chỉ dùng VT cài thực tế.
- P/F chỉ tính từ FiO₂ trên máy lúc lấy khí máu. Profile bản nháp không hiển thị ngưỡng riêng như mục tiêu đang áp dụng.
- Đồng hồ 30 phút luôn tính từ mốc nối máy, không còn nút khởi động/đặt lại độc lập. Hiệu chỉnh mốc cần lý do và ghi dòng thời gian; sửa trạng thái chuyên ngành đến sẽ tiếp tục từ mốc ban đầu.
- Snapshot loại giá trị không hợp lệ và không lưu mốc hoàn toàn rỗng; chỉ báo chất lượng dữ liệu kiểm tra giá trị hợp lệ; cảnh báo đỏ hiển thị trong thanh trạng thái cố định ngay cả khi chưa chọn giới tính. Modal khóa tương tác nền khi mở.
- Giao diện và README nói rõ dữ liệu phiên lưu tạm trong tab. Khóa phiên chuyển sang v2 và xóa bản v1 khi mở để tránh dùng lại snapshot cũ.
- `npm test`: 4/4 đạt; `npm run build`: đạt; `git diff --check`: đạt. Smoke test Chromium: số nhập sai, P/F, SBAR, profile bản nháp, đồng hồ sau reload, cảnh báo ở màn hình 390 px, không tràn ngang.
- Còn cần hội đồng bệnh viện đối chiếu Operator's Manual, ký duyệt SOP và diễn tập trên thiết bị thật trước pilot.

## 09/11/2026 — Nhãn profile trên giao diện 1.5.2

- Theo xác nhận của người dùng rằng bác sĩ Hồi sức đã phê duyệt, bỏ chữ “bản nháp” khỏi tên profile, phần mô tả và SBAR trên web.
- SBAR hiển thị ngưỡng SpO₂ đang thực sự áp dụng. Không đổi ngưỡng cảnh báo hoặc cài đặt máy trong lần sửa nhãn này; trạng thái phê duyệt trong ma trận chờ cập nhật hồ sơ cụ thể.
- Tăng phiên bản PWA để bản cache cũ được thay thế.
## 09/11/2026 — Rút gọn ngôn ngữ lâm sàng 1.5.3

- Rút gọn banner, nhãn nhập liệu, checklist, cảnh báo, trạng thái, đồng hồ, SBAR và ghi chú máy cho bác sĩ sau đại học.
- Thanh trạng thái gộp ba điều kiện cảnh báo đỏ thành một dòng ngắn; chi tiết vẫn ở bước Sau nối.
- Bỏ thông báo Pplat bình thường không yêu cầu hành động. Giữ nguyên ngưỡng, công thức, điều kiện cảnh báo bất thường và hành vi máy.
- Đối chiếu lại nội dung VT/Pplat với ATS/ESICM/SCCM ARDS guideline 2017; không thay đổi khuyến nghị điều trị.
- `npm test`, build, `git diff --check` và smoke test Chromium 360/390/768/1024 px.

## 09/11/2026 — Hiện đại hóa giao diện 1.5.3

- Áp dụng hướng “buồng hồi sức”: xanh than, bề mặt phẳng, viền rõ; cyan cho điều hướng, xanh lục cho hành động, đỏ/hổ phách dành cho cảnh báo.
- Tối ưu mật độ: số đo hai cột trên màn hình rộng, một cột trên điện thoại; thông số đề xuất ba cột trên desktop, hai cột trên mobile.
- Thêm skip link, main landmark, focus rõ, reduced motion, trạng thái lỗi không phụ thuộc màu và nút xóa phiên mang kiểu cảnh báo.
- Ghi quyết định thiết kế tại `.21st/design.json`; không thêm dependency để giữ PWA ngoại tuyến gọn.
- Smoke test Chromium: 320/360/390/768/1024/1440 px, 200% chữ, text spacing, bàn phím, tên control, lỗi input, cảnh báo đỏ, tab và modal. Chưa kiểm thử screen reader/AT thực tế.

## 09/11/2026 — Gỡ banner đầu trang 1.5.4

- Bỏ khối tên đơn vị và mô tả phạm vi sử dụng ở đầu trang theo yêu cầu.
- Xóa CSS và chú thích không còn dùng; rút footer còn thông tin phiên bản, lưu tạm và offline.
- Tăng phiên bản cache để PWA đã cài nhận giao diện mới.
- Rà soát phát hành: không có lỗi console, ID trùng hoặc overflow tại 320/360/390/768/1024/1440 px; PBW, P/F, cảnh báo, bàn phím, modal và offline đạt.
- Thêm smoke test ngăn banner và tên đơn vị xuất hiện lại. `21st review` không khả dụng trong môi trường; chưa kiểm thử screen reader/AT thực tế.

## 09/11/2026 — Sửa logic lâm sàng 1.5.5

- Kích hoạt mục tiêu SpO₂ 88–92% của profile COPD theo xác nhận đã được bác sĩ Hồi sức phê duyệt; thêm cảnh báo khi SpO₂ vượt giới hạn trên của profile.
- Tính driving pressure và cảnh báo ΔP từ total PEEP (PEEP cài + auto-PEEP đo được khi có), đồng thời kiểm tra Pplat với total PEEP.
- Chỉ giữ timestamp cho số đo hợp lệ; SBAR ghi vai trò thao tác và không còn ghép giờ với giá trị rỗng/sai.
- Xóa phiên không tạo lại khóa lưu trữ rỗng; thống nhất nhãn mục tiêu Pplat ≤30 cmH₂O.
- Profile COPD được xác nhận đã phê duyệt và hoàn thành phạm vi phát hành ngày 09/11/2026.
- `npm test`: 5/5 đạt; build và `git diff --check` đạt. Smoke test trình duyệt tại 390 px: COPD 91% không cảnh báo thấp, 93% cảnh báo vượt 92%; Pplat 30/PEEP 5/auto-PEEP 10 cho ΔP 15; SBAR ghi vai trò, không gắn giờ cho giá trị rỗng; không overflow và không có lỗi console.

## 09/11/2026 — Hoàn thiện tính nhất quán dữ liệu 1.5.7

- Chặn ô tùy chỉnh Hồi sức rỗng/ngoài giới hạn làm lệch giá trị hiển thị với giá trị đang tính; báo lỗi và phục hồi giá trị hợp lệ gần nhất khi rời ô.
- Bổ sung đơn vị cmH₂O cho Ppeak, Pplat và auto-PEEP trong SBAR; snapshot không còn hiển thị đơn vị sau dấu gạch dữ liệu trống.
- Tách VT đo thấp khỏi điều kiện “gọi Hồi sức ngay”; giữ hướng dẫn kiểm tra rò, tắc và cuff phù hợp mức cảnh báo hổ phách.
- Xóa phiên đồng thời xóa thông báo timer/copy còn sót; lời nhắc hiệu chỉnh mốc không nói khởi động lại đồng hồ khi Hồi sức đã đến.
- Chuẩn hóa phiên khôi phục: giới tính, chiều cao, profile, vai trò, số mốc và toàn bộ thông số Hồi sức phải còn đúng min/max/step; giá trị cũ sai được trả về mặc định an toàn của ứng dụng.
- `npm test`: 5/5 đạt; build và `git diff --check` đạt. Smoke test Chromium: giá trị expert rỗng bị chặn/phục hồi, COPD 91%/93%, ΔP theo total PEEP, đơn vị SBAR, P/F hợp lệ/sai, snapshot thiếu dữ liệu, timer qua reload; không lỗi console hoặc overflow tại 360/390/768/1024 px.
