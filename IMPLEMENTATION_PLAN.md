# Kế hoạch hoàn thiện và mở rộng Emergency Vent Assist

**Dự án:** Hỗ trợ cài đặt ban đầu máy thở TECME Neumovent TS  
**Đơn vị sử dụng dự kiến:** Khoa Cấp cứu, Bệnh viện Quân y 13  
**Trạng thái tài liệu:** Kế hoạch triển khai; chưa phải phê duyệt lâm sàng  
**Ngày lập:** 08/11/2026  
**Phiên bản kế hoạch:** 1.0

## 1. Tóm tắt điều hành

Emergency Vent Assist hiện là PWA tĩnh, chạy ngoại tuyến, hỗ trợ ba việc: tính cài đặt ban đầu theo predicted body weight (PBW), theo dõi một số chỉ số sau nối máy và tạo tóm tắt chuyển giao SBAR. Bản hiện tại có nền tảng tốt cho thao tác trên điện thoại nhưng còn thiếu kiểm tra dữ liệu, kiểm soát trình tự, quản lý nguồn lâm sàng, kiểm thử tự động và cơ chế cập nhật PWA đáng tin cậy.

Kế hoạch chia thành sáu giai đoạn. Ba giai đoạn đầu ổn định sản phẩm hiện tại mà không thay đổi protocol lâm sàng. Giai đoạn 4 bổ sung theo dõi sau nối và chuyển giao. Giai đoạn 5 chỉ triển khai các profile bệnh lý sau khi Hội đồng chuyên môn phê duyệt từng nhánh. Giai đoạn 6 chuẩn bị phát hành nội bộ và vận hành lâu dài.

Mục tiêu của bản phát hành ổn định đầu tiên là: không dùng dữ liệu sai để tính hoặc cảnh báo; không để người dùng vô tình bỏ sót bước; khôi phục được ca đang làm sau khi tải lại trang; có nguồn và phiên bản cho mọi luật lâm sàng; hoạt động đúng trên điện thoại phổ biến; và có bằng chứng kiểm thử trước khi phát hành.

## 2. Giả định và nguyên tắc

### 2.1. Giả định

- Ứng dụng phục vụ người bệnh từ 18 tuổi trở lên.
- Người dùng chính là bác sĩ trực cấp cứu; người dùng phụ là bác sĩ Hồi sức và nhân viên phụ trách thiết bị.
- Thiết bị mục tiêu là TECME Neumovent TS. Tên thương mại và tên hiển thị trên máy phải được xác nhận từ thiết bị thực tế tại khoa.
- Ứng dụng chỉ hỗ trợ thiết lập ban đầu, tái đánh giá sớm và chuyển giao; không điều khiển máy thở.
- Ứng dụng không lưu họ tên, ngày sinh, mã bệnh án hoặc dữ liệu định danh khác.
- Ứng dụng phải hoạt động khi mất mạng sau lần tải đầu.
- Protocol đang dùng trong mã nguồn chưa được coi là đã phê duyệt chỉ vì đã được lập trình.
- Mọi nhánh điều trị mới phải có nguồn, người duyệt, ngày duyệt và phạm vi áp dụng.

### 2.2. Nguyên tắc sản phẩm

1. An toàn lâm sàng quan trọng hơn tốc độ nhập liệu.
2. Không dùng dữ liệu sai hoặc chưa đo để tạo kết luận.
3. Phép tính và luật cảnh báo phải tách khỏi giao diện.
4. Ứng dụng giải thích lý do cảnh báo và hành động cần làm, không tự tạo y lệnh.
5. Mọi thay đổi lâm sàng phải truy nguyên được đến nguồn và phiên bản protocol.
6. Không yêu cầu mạng để hoàn thành luồng cấp cứu.
7. Trải nghiệm chính được thiết kế cho màn hình 360–430 px và thao tác bằng một tay.
8. Không thêm chức năng lưu trữ máy chủ trong phạm vi kế hoạch này.

## 3. Phạm vi

### 3.1. Trong phạm vi

- Chuẩn hóa cấu trúc mã nguồn và quy trình build.
- Kiểm tra dữ liệu đầu vào và hiển thị lỗi.
- Luồng ba bước có trạng thái hoàn thành và cảnh báo bỏ sót.
- Tính PBW và thông số khởi đầu đã được đơn vị phê duyệt.
- Checklist trước nối, tái đánh giá sau nối và chuyển giao SBAR.
- Đồng hồ và timeline trong một phiên làm việc.
- Khôi phục phiên không có dữ liệu định danh.
- PWA, offline, cập nhật phiên bản và icon.
- Accessibility, responsive và hỗ trợ bàn phím.
- Kiểm thử tự động, smoke test trình duyệt và nhật ký phát hành.
- Khung quản trị nguồn lâm sàng và trạng thái phê duyệt.

### 3.2. Ngoài phạm vi

- Điều khiển trực tiếp máy thở.
- Kết nối HIS, EMR hoặc thiết bị monitoring.
- Lưu hồ sơ bệnh nhân trên máy chủ.
- Tự động chọn mode hoặc tự động thay đổi thông số điều trị.
- Đưa ra liều thuốc, thuốc an thần hoặc vận mạch.
- Hỗ trợ nhi khoa hoặc sơ sinh.
- Dùng ứng dụng thay cho Operator's Manual hoặc phán đoán lâm sàng.
- Phát hành công khai trên Internet trước khi có phê duyệt của đơn vị.

## 4. Người dùng và các tình huống chính

### 4.1. Bác sĩ trực cấp cứu

Nhu cầu chính:

- Tính nhanh PBW từ giới tính sinh học và chiều cao.
- Xem bộ thông số khởi đầu đã được khoa phê duyệt.
- Không bỏ sót kiểm tra máy, nguồn khí, mạch thở và báo động.
- Ghi thời điểm nối máy.
- Nhận biết nhanh chỉ số nguy hiểm sau nối.
- Chuyển giao ngắn gọn, có thời gian và dữ liệu còn thiếu.

### 4.2. Bác sĩ Hồi sức

Nhu cầu chính:

- Nhận được SBAR có cấu trúc.
- Biết thông số nào được cài, số đo nào được ghi và cảnh báo nào đã xuất hiện.
- Biết các mục còn thiếu hoặc dữ liệu không hợp lệ.
- Phân biệt đề xuất của ứng dụng với quyết định đã được bác sĩ thực hiện.

### 4.3. Quản trị nội dung lâm sàng

Nhu cầu chính:

- Biết luật nào đang được dùng và lấy từ nguồn nào.
- Biết ai duyệt, duyệt ngày nào và khi nào cần rà soát lại.
- Có thể so sánh thay đổi protocol giữa các phiên bản.

### 4.4. Nhân viên phụ trách triển khai

Nhu cầu chính:

- Cài PWA, xác nhận offline và biết phiên bản đang chạy.
- Cập nhật mà không để máy người dùng mắc kẹt ở cache cũ.
- Chạy checklist kiểm thử trước phát hành.

## 5. Kiến trúc đích

Giữ kiến trúc PWA tĩnh và JavaScript thuần trong giai đoạn đầu để hạn chế phụ thuộc. Tách tệp HTML đơn hiện tại thành các module nhỏ, có thể kiểm thử độc lập.

```text
maytho-main/
├── index.html
├── manifest.json
├── sw.js
├── package.json
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── app-version.js
│   │   ├── protocol.js
│   │   └── sources.js
│   ├── clinical/
│   │   ├── pbw.js
│   │   ├── initial-settings.js
│   │   ├── validation.js
│   │   ├── alerts.js
│   │   └── sbar.js
│   ├── state/
│   │   ├── session-state.js
│   │   └── migrations.js
│   ├── ui/
│   │   ├── stepper.js
│   │   ├── fields.js
│   │   ├── alerts.js
│   │   ├── modal.js
│   │   └── update-banner.js
│   └── styles/
│       ├── tokens.css
│       ├── base.css
│       └── components.css
├── tests/
│   ├── unit/
│   └── browser/
├── docs/
│   ├── clinical-sources.md
│   ├── protocol-approval.md
│   ├── test-checklist.md
│   ├── release-checklist.md
│   └── progress.md
└── assets/icons/
```

### 5.1. Quy tắc module lâm sàng

Mỗi luật phải có cấu trúc dữ liệu tương đương:

```js
{
  id: "plateau-pressure-high",
  population: "adult",
  inputs: ["pplat"],
  threshold: { operator: ">", value: 30, unit: "cmH2O" },
  severity: "critical",
  message: "...",
  immediateAction: "...",
  sourceIds: ["..."],
  verificationStatus: "draft | technically-verified | clinically-approved",
  approvedBy: null,
  approvedAt: null,
  reviewDueAt: null
}
```

Không đưa luật có trạng thái `draft` vào bản production. Trạng thái `technically-verified` chỉ xác nhận công thức hoặc thông tin thiết bị, chưa đồng nghĩa với phê duyệt sử dụng lâm sàng.

### 5.2. Quản lý trạng thái phiên

- Chỉ lưu dữ liệu không định danh trong `sessionStorage`.
- Gắn `schemaVersion` để có thể migration hoặc xóa an toàn khi cấu trúc thay đổi.
- Tự xóa sau thời hạn [CẦN BỔ SUNG: thời hạn được đơn vị phê duyệt, đề xuất ban đầu 2 giờ].
- Có nút “Kết thúc và xóa ca”.
- Không lưu clipboard, họ tên, mã bệnh án hoặc nội dung người dùng dán từ bên ngoài.
- Khi khôi phục, hiển thị rõ thời điểm dữ liệu được lưu và yêu cầu xác nhận tiếp tục.

## 6. Thiết kế luồng sử dụng

### 6.1. Bước 0 — Phạm vi áp dụng

Hiển thị ngắn trước khi bắt đầu:

- Người lớn từ 18 tuổi.
- Máy TECME Neumovent TS.
- Mục đích: cài đặt ban đầu và chuyển giao.
- Các trường hợp ngoài phạm vi hoặc cần gọi chuyên ngành sớm.
- Phiên bản protocol và trạng thái phê duyệt.

Người dùng xác nhận “Đã hiểu phạm vi”. Xác nhận chỉ có giá trị trong phiên.

### 6.2. Bước 1 — Thiết lập

1. Chọn giới tính dùng cho công thức PBW.
2. Nhập hoặc điều chỉnh chiều cao.
3. Chọn nguồn chiều cao.
4. Xem PBW và cài đặt khởi đầu.
5. Hoàn thành checklist trước nối.
6. Nhấn “Sẵn sàng nối máy”.

Nếu thiếu mục, ứng dụng liệt kê chính xác mục còn thiếu. Trong tình huống cấp cứu, người dùng có thể tiếp tục bằng nút “Tiếp tục khẩn cấp”, nhưng lý do bỏ qua phải được ghi vào timeline và SBAR dưới dạng “chưa xác nhận”; không yêu cầu nhập văn bản dài.

### 6.3. Bước 2 — Sau nối

1. Nhấn “Đã nối máy” để ghi mốc thời gian và bắt đầu đồng hồ.
2. Nhập số đọc theo nhóm:
   - Oxy hóa.
   - Thông khí.
   - Áp lực đường thở.
   - Huyết động.
3. Ứng dụng kiểm tra dữ liệu.
4. Cảnh báo được sắp theo mức độ và hành động cần làm.
5. Người dùng đánh dấu “Đã kiểm tra” cho các cảnh báo hành động, nếu protocol yêu cầu.

### 6.4. Bước 3 — Chuyển giao

1. Hiển thị tóm tắt thiết lập và timeline.
2. Liệt kê số đo mới nhất cùng thời điểm.
3. Liệt kê cảnh báo hiện tại và cảnh báo đã hết.
4. Liệt kê checklist còn thiếu.
5. Ghi thời điểm bác sĩ chuyên ngành đến.
6. Sao chép SBAR.
7. Xác nhận đã dán vào hồ sơ.
8. Kết thúc và xóa phiên.

## 7. Danh mục chức năng

### 7.1. F-01 — Kiểm tra dữ liệu đầu vào

Yêu cầu:

- Mỗi trường có kiểu dữ liệu, đơn vị, min, max và bước tăng rõ ràng.
- Dùng cùng một schema cho HTML, validation và test.
- Không dùng giá trị sai để tính, cảnh báo hoặc tạo SBAR.
- Lỗi hiển thị cạnh trường và được liên kết bằng `aria-describedby`.
- Giá trị trống được hiểu là “chưa ghi”; số 0 chỉ hợp lệ ở trường được phép.
- Không tự sửa giá trị người dùng mà không thông báo.

Tiêu chí nghiệm thu:

- `SpO₂ = 150%` hiển thị lỗi và không tạo kết luận “SpO₂ đạt”.
- `Pplat = -1` bị từ chối.
- Dấu thập phân, bàn phím số và quy tắc làm tròn hoạt động nhất quán.
- SBAR ghi “không hợp lệ/chưa ghi”, không chép giá trị sai.

### 7.2. F-02 — PBW và cài đặt khởi đầu

Yêu cầu:

- Tách công thức PBW khỏi giao diện.
- Giữ đầy đủ độ chính xác trong tính toán; chỉ làm tròn khi hiển thị.
- Công bố công thức, dân số, giới hạn chiều cao và quy ước sàn 30 kg.
- Quy ước sàn 30 kg phải được đánh dấu riêng là quy tắc nội bộ và cần phê duyệt.
- Mỗi thông số khởi đầu có nguồn hoặc mã protocol nội bộ.

Tiêu chí nghiệm thu:

- Có test cho nam/nữ ở chiều cao điển hình, giới hạn 130/210 cm và trường hợp chạm sàn.
- Hiển thị nhất quán mL và L.
- Không tính khi chưa chọn giới tính dùng cho công thức.

### 7.3. F-03 — Stepper và kiểm soát trình tự

Yêu cầu:

- Mỗi bước có trạng thái: chưa bắt đầu, đang làm, hoàn tất, cần xem lại.
- Không ngăn truy cập thông tin cấp cứu.
- Khi bỏ qua bước, hiển thị cảnh báo và ghi nhận trong phiên.
- Hỗ trợ phím mũi tên, Home và End theo ARIA Tabs hoặc chuyển sang cấu trúc stepper/navigation phù hợp hơn.

Tiêu chí nghiệm thu:

- Không thể vô tình tạo SBAR có vẻ hoàn chỉnh khi chưa nhập dữ liệu nền.
- Người dùng bàn phím chuyển bước được mà không dùng chuột.
- Sau tải lại trang, bước hiện tại và trạng thái hoàn thành được phục hồi.

### 7.4. F-04 — Checklist trước nối

Yêu cầu:

- Chia nhóm: máy/nguồn, mạch thở, oxy, báo động, thông số.
- Mục tự động và mục người dùng xác nhận phải có kiểu hiển thị khác nhau.
- Mỗi mục liên quan thiết bị phải dẫn tới trang/đoạn Operator's Manual hoặc SOP nội bộ.
- Cho phép đánh dấu “không áp dụng” chỉ khi có quy tắc rõ.

Tiêu chí nghiệm thu:

- Tổng số hoàn thành không tính mục lỗi hoặc chưa áp dụng sai quy tắc.
- Các mục thiếu xuất hiện trong SBAR.
- Nội dung được kiểm tra trên máy thực tế tại khoa.

### 7.5. F-05 — Ghi giờ và timeline

Yêu cầu:

- Ghi giờ nối máy, giờ bắt đầu/đặt lại timer, giờ cảnh báo, giờ bác sĩ chuyên ngành đến.
- Timer dựa trên timestamp tuyệt đối, không chỉ dựa trên số lần `setInterval`.
- Tải lại trang không làm mất deadline trong phiên.
- Mọi thao tác ghi lại giờ phải có khả năng sửa với nhãn “đã hiệu chỉnh”.

Tiêu chí nghiệm thu:

- Đưa ứng dụng xuống nền rồi mở lại vẫn hiển thị thời gian đúng.
- Qua mốc 30 phút, thông báo chỉ xuất hiện một lần cho trình đọc màn hình.
- Đặt lại timer không xóa giờ nối máy nếu người dùng chưa xác nhận.

### 7.6. F-06 — Cảnh báo sau nối

Yêu cầu:

- Mỗi cảnh báo gồm mức độ, vấn đề, hành động tức thời, dữ liệu kích hoạt và nguồn.
- Mức độ dự kiến: nguy kịch, cần xử trí, theo dõi, thông tin.
- Khử cảnh báo trùng và sắp xếp theo ưu tiên.
- Phân biệt cảnh báo đang hoạt động và đã hết.
- Không phát cảnh báo từ giá trị không hợp lệ.
- Không tự động đề xuất thay đổi mode hoặc liều thuốc.

Tiêu chí nghiệm thu:

- Một tổ hợp dữ liệu chỉ tạo một danh sách hành động không mâu thuẫn.
- Cập nhật một trường không làm trình đọc màn hình đọc lại toàn bộ danh sách.
- Có test riêng cho từng ngưỡng, đúng ngưỡng và hai phía của ngưỡng.

### 7.7. F-07 — Tái đánh giá theo mốc

Phạm vi dữ liệu dự kiến:

- SpO₂ và FiO₂ hiện tại.
- Tần số thở thực tế.
- VT thở ra và minute ventilation.
- Ppeak, Pplat, PEEP và auto-PEEP.
- Nhịp tim và huyết áp.
- pH, PaCO₂, PaO₂ nếu có khí máu.
- Đồng bộ người bệnh–máy.
- Vị trí ống, cuff, cố định ống và tình trạng đờm.

Mốc thời gian cuối cùng phải do đơn vị phê duyệt. Thiết kế ban đầu có thể hỗ trợ 5, 10 và 30 phút nhưng không đưa vào production trước khi duyệt.

Tiêu chí nghiệm thu:

- Mỗi số đo có timestamp.
- Có thể ghi “không đo được” mà không dùng số giả.
- Chỉ số dẫn xuất ghi rõ đầu vào và thời điểm tương ứng.

### 7.8. F-08 — SBAR

Yêu cầu:

- S: người bệnh thuộc phạm vi nào, giờ nối máy, tình trạng gọi chuyên ngành.
- B: chiều cao, nguồn chiều cao, PBW, protocol và thông số khởi đầu.
- A: số đo mới nhất, timestamp, cảnh báo và checklist còn thiếu.
- R: yêu cầu chuyển giao và mục cần bác sĩ chuyên ngành đánh giá.
- Không chứa định danh bệnh nhân.
- Cho phép xem trước, sao chép và xác nhận đã dán.

Tiêu chí nghiệm thu:

- Không xuất `NaN`, `undefined` hoặc giá trị không hợp lệ.
- SBAR vẫn đọc được khi một số trường chưa đo.
- Nội dung sao chép giống nội dung xem trước.

### 7.9. F-09 — Khôi phục và xóa phiên

Yêu cầu:

- Tự lưu trạng thái hợp lệ sau mỗi thay đổi có debounce.
- Khi mở lại, hỏi tiếp tục hoặc xóa phiên cũ.
- Có thời hạn hết hiệu lực.
- Xóa phiên phải xóa state, timer và clipboard nội bộ nếu có.

Tiêu chí nghiệm thu:

- Reload không làm mất ca đang làm.
- Đóng phiên rồi mở lại không phục hồi dữ liệu cũ ngoài thời hạn.
- Migration lỗi dẫn đến xóa an toàn và thông báo, không làm ứng dụng hỏng.

### 7.10. F-10 — PWA và cập nhật

Yêu cầu:

- Một nguồn duy nhất cho phiên bản ứng dụng.
- Service Worker không giữ mã cũ sau phát hành mới.
- Hiển thị trạng thái offline và bản cập nhật.
- Có icon SVG, 192 px, 512 px và maskable nếu cần.
- Kiểm tra installability trên Android và Add to Home Screen trên iOS.

Tiêu chí nghiệm thu:

- Bản mới được nhận sau một thao tác tải lại có hướng dẫn.
- Offline vẫn hoàn thành được toàn bộ luồng.
- Không có request 404 trong app shell.

### 7.11. F-11 — Nguồn và phê duyệt

Yêu cầu:

- Trang nguồn hiển thị tên tài liệu, tổ chức, năm/phiên bản và URL HTTPS.
- Phân biệt nguồn nhà sản xuất, guideline và protocol nội bộ.
- Mọi luật có `verificationStatus`.
- Production chỉ dùng nội dung có trạng thái được cho phép.

Các mục hiện cần xác minh:

- Tên model và tên mode hiển thị trên máy tại khoa.
- Chế độ khẩn cấp sau 30 giây.
- Phím và thời gian inspiratory pause.
- Dải peak flow và trigger.
- Alarm limits và hành vi khi Pmax đạt ngưỡng.
- Công thức PBW có sẵn trên máy.
- Quy ước sàn PBW 30 kg.
- Mục tiêu SpO₂ và các trường hợp ngoại lệ.

### 7.12. F-12 — Chế độ demo

Yêu cầu:

- Nhãn “DEMO” cố định, dễ nhận biết.
- Dữ liệu mẫu không chứa định danh.
- Không chia sẻ session với chế độ production.
- Cho phép chạy các ca huấn luyện đã được duyệt.

## 8. Thiết kế giao diện

### 8.1. Hướng thị giác

- Nền xanh than hoặc xám đậm, tương phản cao, phù hợp môi trường ánh sáng thấp.
- Màu xanh dương cho điều hướng, xanh lá cho hoàn tất, vàng cho cần chú ý, đỏ chỉ cho nguy kịch.
- Không dùng gradient trang trí, glassmorphism hoặc animation không phục vụ thao tác.
- Cỡ chữ cơ bản tối thiểu 16 px; thông số chính 28–40 px tùy màn hình.
- Khoảng cách theo thang 4/8/12/16/24/32 px.
- Touch target tối thiểu 48 × 48 px.

### 8.2. Bố cục màn hình

- Header gọn: tên công cụ, trạng thái online/offline, phiên bản.
- Stepper cố định phía trên hoặc ngay dưới header.
- Nội dung chính rộng tối đa khoảng 720 px.
- Một hành động chính cố định cuối màn hình; tôn trọng safe area của iOS.
- Điện thoại: một cột.
- Tablet: nhóm số đọc có thể dùng hai cột.
- Desktop: giữ chiều rộng đọc, không kéo form tràn toàn màn hình.

### 8.3. Trình bày thông số

Mỗi thông số có:

- Tên đầy đủ và từ viết tắt.
- Giá trị lớn.
- Đơn vị ngay cạnh giá trị.
- Nguồn hoặc nhãn protocol khi cần.
- Trạng thái đã xác nhận/chưa xác nhận.
- Ghi chú ngắn, không chèn đoạn văn dài vào card.

### 8.4. Trình bày cảnh báo

Thứ tự trong card cảnh báo:

1. Tiêu đề vấn đề.
2. Hành động ngay.
3. Dữ liệu kích hoạt.
4. Các nguyên nhân cần kiểm tra.
5. Nguồn hoặc protocol.

Không dựa vào màu sắc đơn thuần; dùng biểu tượng, tiêu đề và văn bản mức độ.

### 8.5. Accessibility

- Dùng heading theo thứ tự.
- Label thực cho mọi input.
- Lỗi liên kết với trường bằng `aria-describedby` và `aria-invalid`.
- Focus rõ, không bị sticky header che.
- Modal có focus trap, đóng bằng Escape và trả focus đúng chỗ.
- Tab/stepper hỗ trợ bàn phím theo mẫu ARIA tương ứng.
- Vùng live chỉ thông báo thay đổi ngắn; không đọc lại toàn màn hình.
- Kiểm tra zoom 200%, forced colors và reduced motion.

## 9. Kế hoạch triển khai theo giai đoạn

### Giai đoạn 0 — Chốt phạm vi và nguồn

**Mục tiêu:** tạo baseline có thể kiểm chứng trước khi thay đổi mã.

Công việc:

- Lập danh mục toàn bộ phép tính, ngưỡng và nội dung thiết bị hiện có.
- Gắn nguồn và trạng thái xác minh cho từng mục.
- Đối chiếu Operator's Manual với máy thực tế tại khoa.
- Chốt người có thẩm quyền phê duyệt protocol.
- Chốt phạm vi loại trừ.
- Tạo `docs/progress.md`, `clinical-sources.md` và `protocol-approval.md`.

Đầu ra:

- Ma trận luật lâm sàng.
- Danh sách điểm chưa được duyệt.
- Quyết định phạm vi bản 1.0 nội bộ.

Điều kiện hoàn tất:

- Không còn luật nào trong production mà không biết nguồn hoặc chủ sở hữu phê duyệt.

### Giai đoạn 1 — Nền tảng kỹ thuật và phát hành

**Mục tiêu:** loại bỏ lỗi phiên bản, cache, tài sản thiếu và tạo khung test.

Công việc:

- Thêm `package.json` và công cụ build/test tối thiểu.
- Tách CSS và JavaScript thành module.
- Tạo nguồn phiên bản duy nhất.
- Sửa Service Worker và luồng cập nhật.
- Tạo bộ icon PWA.
- Đồng bộ README và tên thiết bị.
- Tạo checklist phát hành và test thiết bị thật.

Đầu ra:

- PWA cài được, không có lỗi 404.
- Build tái lập được.
- Bộ test unit đầu tiên.

Điều kiện hoàn tất:

- Build thành công.
- Offline smoke test thành công.
- Cập nhật từ phiên bản cũ sang mới thành công.

### Giai đoạn 2 — An toàn dữ liệu và logic

**Mục tiêu:** bảo đảm mọi kết quả chỉ dùng dữ liệu hợp lệ.

Công việc:

- Xây validation schema.
- Viết lại PBW, settings, alerts và SBAR thành hàm thuần.
- Thêm lỗi theo trường.
- Xử lý missing/invalid/not-measured.
- Viết test ngưỡng và ca biên.

Đầu ra:

- Module lâm sàng có test.
- Không còn kết quả tạo từ input sai.

Điều kiện hoàn tất:

- 100% luật cảnh báo có ít nhất ba test: dưới, đúng và trên ngưỡng khi áp dụng.
- Có test cho từng giới hạn input.

### Giai đoạn 3 — Luồng và giao diện mới

**Mục tiêu:** giảm bỏ sót và tăng khả năng sử dụng trong cấp cứu.

Công việc:

- Thêm bước phạm vi áp dụng.
- Xây stepper và trạng thái hoàn tất.
- Thiết kế lại phiếu thông số.
- Thiết kế card cảnh báo theo hành động.
- Thêm bottom action bar.
- Hoàn thiện modal, keyboard và live regions.
- Thêm session recovery và nút xóa ca.

Đầu ra:

- Luồng hoàn chỉnh trên điện thoại.
- Accessibility và responsive đạt gate.

Điều kiện hoàn tất:

- Không overflow ở 360, 390, 768, 1024 và 1440 px.
- Hoàn thành ca mẫu bằng bàn phím.
- Không có lỗi accessibility nghiêm trọng trong kiểm tra tự động và thủ công.

### Giai đoạn 4 — Tái đánh giá và chuyển giao

**Mục tiêu:** hỗ trợ theo dõi sớm và bàn giao đầy đủ hơn.

Công việc:

- Chốt tập số đo và mốc thời gian với khoa Hồi sức.
- Thêm timeline.
- Thêm nhóm oxy hóa, thông khí, áp lực và huyết động.
- Thêm khí máu dạng tùy chọn.
- Nâng cấp SBAR.
- Thêm xác nhận đã chuyển nội dung vào hồ sơ.

Đầu ra:

- Checklist sau nối đã được duyệt.
- SBAR có timestamp và mục còn thiếu.

Điều kiện hoàn tất:

- Bác sĩ trực và bác sĩ Hồi sức thử tối thiểu các kịch bản do đơn vị xác định.
- Nội dung SBAR được người nhận chuyển giao chấp thuận.

### Giai đoạn 5 — Profile lâm sàng

**Mục tiêu:** hỗ trợ các nhóm bệnh lý mà không tự động hóa quyết định điều trị.

Profile dự kiến để đánh giá:

- Phổi chưa có tổn thương rõ sau đặt nội khí quản.
- ARDS hoặc nghi ARDS.
- COPD/nguy cơ giữ CO₂.
- Hen nặng/nguy cơ auto-PEEP.
- Béo phì.
- Bệnh thần kinh cơ.
- Ngoài phạm vi công cụ.

Với từng profile phải hoàn thành:

- Dân số áp dụng và tiêu chí nhận diện.
- Chống chỉ định và tình huống cần chuyên gia.
- Thông số, mục tiêu, giới hạn và nguồn.
- Xử lý khi dữ liệu không đủ.
- Phê duyệt lâm sàng có ngày và người duyệt.
- Bộ test riêng.

Điều kiện hoàn tất:

- Không có profile tự động chọn dựa trên một chỉ số đơn lẻ.
- Mọi profile production có trạng thái `clinically-approved`.

### Giai đoạn 6 — Thử nghiệm nội bộ và vận hành

**Mục tiêu:** chứng minh ứng dụng hoạt động ổn định trong môi trường sử dụng thực.

Công việc:

- Chạy thử trên thiết bị iOS và Android của đơn vị.
- Thử mất mạng, tải lại, khóa màn hình và chuyển ứng dụng nền.
- Diễn tập ca bình thường và ca có cảnh báo.
- Thu phản hồi có cấu trúc.
- Khắc phục lỗi P0/P1.
- Lập SOP cập nhật và rollback.
- Chốt lịch rà soát protocol định kỳ.

Điều kiện phát hành nội bộ:

- Không còn lỗi P0.
- Lỗi P1 có phương án và người chấp nhận rủi ro.
- Có chữ ký/phê duyệt theo quy trình của đơn vị.
- Có hướng dẫn người dùng và người quản trị.

## 10. Backlog ưu tiên

### P0 — bắt buộc trước thử nghiệm lâm sàng

- Đồng bộ phiên bản 1.5.0/Service Worker.
- Bổ sung icon và loại bỏ 404.
- Validation và lỗi theo trường.
- Không đưa input sai vào cảnh báo/SBAR.
- Chuẩn hóa nguồn và trạng thái phê duyệt.
- Xác minh tên máy, mode và thông tin Operator's Manual.
- Test PBW, ngưỡng cảnh báo và SBAR.
- Checklist phát hành/offline.
- Chốt phạm vi áp dụng và loại trừ.

### P1 — cần có cho pilot nội bộ

- Stepper và trạng thái bước.
- Session recovery và xóa ca.
- Timeline.
- Cảnh báo theo hành động.
- SBAR nâng cấp.
- Keyboard, modal focus và live region.
- Thông báo cập nhật PWA.
- Chế độ demo.

### P2 — sau pilot

- Tái đánh giá theo mốc.
- Khí máu tùy chọn.
- Các profile đã được phê duyệt.
- Báo cáo kiểm thử và dashboard quản trị nội dung cục bộ.

### P3 — xem xét riêng

- Tích hợp HIS/EMR.
- Đồng bộ dữ liệu thiết bị.
- Quản trị tập trung nhiều cơ sở.
- Phân tích sử dụng có bảo vệ dữ liệu.

## 11. Chiến lược kiểm thử

### 11.1. Unit test

- PBW nam/nữ và ca biên.
- Chuyển đổi mL/L.
- Ti và flow tối thiểu.
- Mỗi luật cảnh báo.
- Validation từng trường.
- Tạo SBAR với dữ liệu đầy đủ, thiếu và sai.
- Migration trạng thái phiên.
- Timer từ timestamp.

### 11.2. Integration test

- Chọn giới tính → nhập chiều cao → nhận settings.
- Hoàn thành checklist → ghi giờ nối máy.
- Nhập số đo → nhận cảnh báo → tạo SBAR.
- Reload → phục hồi phiên.
- Kết thúc → xóa toàn bộ phiên.
- Nhận bản cập nhật Service Worker.

### 11.3. Browser smoke test

Trình duyệt và kích thước:

- Chrome Android: 360 × 800 và 390 × 844.
- Safari iOS: kích thước thiết bị đang dùng tại đơn vị.
- Tablet: 768 × 1024.
- Desktop: 1024 px và 1440 px.

Ca bắt buộc:

1. Ca hợp lệ không có cảnh báo.
2. Ca có SpO₂ thấp.
3. Ca có Pplat cao và driving pressure cao.
4. Ca có auto-PEEP.
5. Ca nhập sai/out-of-range.
6. Ca thiếu dữ liệu.
7. Mất mạng sau khi đã tải ứng dụng.
8. Reload khi timer đang chạy.
9. Cập nhật từ bản trước.

### 11.4. Accessibility test

- Thứ tự Tab và focus.
- Điều hướng stepper bằng bàn phím.
- Trình đọc màn hình đọc label, đơn vị và lỗi.
- Zoom 200%.
- Contrast và forced colors.
- Không thông báo lặp quá mức qua live region.

### 11.5. Gate mỗi vòng phát hành

- Unit/integration tests đạt.
- Build đạt.
- Không có lỗi lint hoặc `git diff --check`.
- Smoke test ca hợp lệ, ca biên và ca lỗi.
- Không overflow ở các viewport bắt buộc.
- Offline và update test đạt.
- `docs/progress.md` được cập nhật.
- Nguồn/phê duyệt được cập nhật nếu thay đổi nội dung lâm sàng.

## 12. Ma trận nghiệm thu lâm sàng

| Module | Input/đơn vị | Công thức hoặc luật | Nguồn yêu cầu | Trạng thái ban đầu |
|---|---|---|---|---|
| PBW | Giới tính, chiều cao cm | Devine/ARDSNet dạng cm | Guideline gốc hoặc hiệp hội | Cần xác minh quy ước sàn |
| VT khởi đầu | PBW kg | 6 mL/kg PBW hiện tại | Protocol đơn vị + guideline | Chờ phê duyệt phạm vi |
| Pplat | cmH₂O | Cảnh báo trên ngưỡng | Guideline ARDS + protocol | Chờ phê duyệt thông điệp |
| Driving pressure | Pplat, PEEP cmH₂O | Pplat − PEEP | Nguồn chuyên ngành | Chờ phê duyệt vai trò |
| SpO₂ | % | So với mục tiêu | Protocol theo quần thể | Chưa đủ cho mọi người lớn |
| Auto-PEEP | cmH₂O | Có/không và ngưỡng | Protocol + manual | Chờ xác minh cách đo |
| VT thực tế | mL | So với VT cài | Protocol đơn vị | Chờ phê duyệt ngưỡng 10% |
| Timer chuyển giao | phút | 30 phút | Quy định nội bộ | Cần văn bản/SOP |
| Thông tin thiết bị | N/A | Theo manual | TECME Operator's Manual | Đối chiếu máy thực tế |

## 13. Quản trị rủi ro

| Rủi ro | Mức | Kiểm soát |
|---|---|---|
| Protocol chưa duyệt được trình bày như chuẩn chung | Rất cao | Chặn production, hiển thị trạng thái, phê duyệt theo module |
| Input sai tạo cảnh báo sai | Rất cao | Validation schema, test biên, không xử lý giá trị invalid |
| Cache giữ phiên bản cũ | Cao | Version source duy nhất, update banner, test nâng cấp |
| Người dùng bỏ sót bước | Cao | Stepper, missing-items summary, emergency bypass có ghi nhận |
| Mất dữ liệu khi reload | Cao | Session recovery có TTL |
| Session cũ bị dùng nhầm | Cao | Hiển thị thời điểm, xác nhận phục hồi, TTL, nút xóa rõ |
| Màu cảnh báo gây nhầm | Trung bình | Kèm chữ, biểu tượng và hành động; kiểm tra contrast |
| Trình đọc màn hình đọc lặp | Trung bình | Live region nhỏ, debounce và thông báo thay đổi |
| Mở rộng profile quá sớm | Cao | Gate phê duyệt và test riêng từng profile |
| Tài liệu và mã không đồng bộ | Cao | Nguồn cấu hình chung, release checklist và progress log |

## 14. Quy trình thay đổi nội dung lâm sàng

1. Tạo đề xuất thay đổi, nêu lý do và phạm vi.
2. Gắn nguồn gốc có URL, tổ chức, năm/phiên bản.
3. Xác định dân số, đơn vị, ngưỡng và ngoại lệ.
4. Viết test trước hoặc cùng lúc với luật.
5. Bác sĩ được phân quyền rà soát nội dung.
6. Ghi người duyệt, ngày duyệt và ngày cần xem lại.
7. Thử trên môi trường demo.
8. Phát hành với version và changelog.
9. Chạy checklist sau phát hành và kiểm tra offline.

Thay đổi ngưỡng, công thức hoặc hành động phải tăng major version của protocol. Thay đổi giao diện không ảnh hưởng logic có thể tăng minor/patch theo quy ước được chốt trong dự án.

## 15. Tài liệu cần tạo

- `README.md`: cài đặt, chạy, build và triển khai.
- `docs/clinical-sources.md`: danh mục nguồn.
- `docs/protocol-approval.md`: trạng thái duyệt từng module.
- `docs/test-checklist.md`: checklist thiết bị và trình duyệt.
- `docs/release-checklist.md`: gate phát hành.
- `docs/progress.md`: nhật ký từng vòng.
- `docs/user-guide.md`: hướng dẫn bác sĩ trực.
- `docs/admin-guide.md`: cập nhật và rollback.
- `CHANGELOG.md`: thay đổi theo phiên bản.

## 16. Vai trò và trách nhiệm

| Vai trò | Trách nhiệm |
|---|---|
| Chủ sở hữu sản phẩm | Chốt phạm vi, ưu tiên và nghiệm thu nghiệp vụ |
| Bác sĩ Cấp cứu | Duyệt luồng trực, checklist và SBAR |
| Bác sĩ Hồi sức | Duyệt protocol, ngưỡng và profile lâm sàng |
| Phụ trách thiết bị | Đối chiếu Operator's Manual và máy thực tế |
| Lập trình viên | Cài đặt, test, tài liệu kỹ thuật và bản phát hành |
| Người kiểm thử | Ca biên, responsive, accessibility, offline và update |
| Phụ trách triển khai | Host HTTPS, thiết bị, rollback và hỗ trợ người dùng |

Tên người cụ thể cho từng vai trò: **[CẦN BỔ SUNG]**.

## 17. Ước lượng và phụ thuộc

Ước lượng dưới đây dùng để lập thứ tự, không phải cam kết lịch. Một “ngày công” là một người làm tập trung và đã có quyền truy cập cần thiết.

| Giai đoạn | Ước lượng sơ bộ | Phụ thuộc chính |
|---|---:|---|
| 0. Nguồn và phạm vi | 3–5 ngày công kỹ thuật + thời gian chuyên gia | Manual, bác sĩ phê duyệt |
| 1. Nền tảng/PWA | 4–6 ngày công | Quyết định công cụ build |
| 2. Validation/logic/test | 5–8 ngày công | Ma trận luật đã chốt |
| 3. UX/accessibility/session | 7–10 ngày công | Thiết kế luồng được duyệt |
| 4. Tái đánh giá/SBAR | 5–8 ngày công | Dataset và mốc thời gian được duyệt |
| 5. Mỗi profile lâm sàng | 3–6 ngày công/profile + chuyên gia | Guideline và phê duyệt |
| 6. Pilot/phát hành | 5–10 ngày công phân tán | Thiết bị thật, người thử |

Không lập ngày phát hành trước khi hoàn tất giai đoạn 0 và xác định người phê duyệt lâm sàng.

## 18. Definition of Done

Một hạng mục chỉ được coi là hoàn tất khi:

- Yêu cầu và tiêu chí nghiệm thu đã được đáp ứng.
- Có test phù hợp và test đạt.
- Không tạo lỗi console mới.
- Giao diện được kiểm tra ở viewport liên quan.
- Accessibility được kiểm tra nếu thay đổi UI.
- Nguồn và trạng thái phê duyệt được cập nhật nếu liên quan lâm sàng.
- Tài liệu và changelog được cập nhật.
- Không còn TODO ẩn trong mã; giới hạn còn lại được ghi trong `docs/progress.md`.
- Bản build/offline đã được smoke test.

## 19. Quyết định cần chốt trước khi bắt đầu

1. Ai là chủ sở hữu protocol và ai có quyền phê duyệt?
2. Tên chính xác của máy và mode hiển thị trên thiết bị tại khoa là gì?
3. Protocol khởi đầu hiện tại áp dụng cho toàn bộ người lớn hay một nhóm xác định?
4. Quy ước PBW tối thiểu 30 kg có được giữ không?
5. Mục tiêu SpO₂ mặc định và các trường hợp ngoại lệ là gì?
6. Mốc 30 phút chờ bác sĩ chuyên ngành dựa trên SOP nào?
7. Dữ liệu phiên được phép giữ trong `sessionStorage` bao lâu?
8. Có bắt buộc xác nhận từng cảnh báo đã được kiểm tra không?
9. Thiết bị iOS/Android nào sẽ dùng cho pilot?
10. Ai chịu trách nhiệm cập nhật ứng dụng và rollback khi có lỗi?

## 20. Thứ tự thực hiện đề xuất

Thực hiện ngay theo thứ tự:

1. Hoàn thành ma trận nguồn và các quyết định ở mục 19.
2. Sửa phiên bản, Service Worker, icon và tài liệu sai lệch.
3. Tách logic, thêm validation và unit test.
4. Xây stepper, session recovery và giao diện cảnh báo.
5. Nâng cấp SBAR và timeline.
6. Pilot trên thiết bị thật.
7. Chỉ sau pilot mới bắt đầu profile lâm sàng.

Kế hoạch này không tự phê duyệt các thông số hiện tại. Phần mềm chỉ sẵn sàng dùng thử lâm sàng khi các gate kỹ thuật và phê duyệt của đơn vị đều hoàn tất.
