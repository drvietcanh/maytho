# Lộ trình tối ưu chức năng và giao diện theo vai trò người dùng

**Đối tượng:** bác sĩ đa khoa/nội trực viện, bác sĩ Cấp cứu, bác sĩ Hồi sức, điều dưỡng/điều phối và phụ trách thiết bị.  
**Mục tiêu:** giúp người không chuyên sâu giữ người bệnh an toàn trong thời gian chờ Hồi sức; cung cấp workspace riêng cho Hồi sức mà không trộn quyền và trách nhiệm.  
**Phạm vi:** PWA offline, không điều khiển trực tiếp máy thở, không lưu định danh bệnh nhân.

## 1. Nguyên tắc thiết kế mới

1. Mode trực cấp cứu phải trả lời được ngay: “Tôi cần làm gì trong 60 giây tới?”
2. Mode chuyên sâu phải trả lời được: “Thông số hiện tại khác thông số dự kiến ở đâu và vì sao?”
3. Mọi profile chưa được phê duyệt chỉ được xem, không được thay đổi cảnh báo hoặc tạo hành động điều trị.
4. Nút giao tiếp phải mô tả đúng hành động. Nếu app chỉ ghi nhận thao tác gọi thì không dùng chữ “Gọi”.
5. Mọi số đo phải có đơn vị, thời điểm và trạng thái tin cậy.
6. Mọi cảnh báo phải có vấn đề, hành động, điều không nên làm và ngưỡng gọi hỗ trợ.
7. Checklist phải ưu tiên sinh mạng trước thiết bị và tài liệu.
8. Không dùng màu hoặc nhãn “đã xác minh” nếu chưa có nguồn, phiên bản và người duyệt.

## 2. Mô hình vai trò và mode

### 2.1. Mode 1 — Cấp cứu tạm thời

Đối tượng: bác sĩ đa khoa, bác sĩ nội, bác sĩ Cấp cứu chưa phải người điều chỉnh máy chuyên sâu.

Hiển thị:

- Bước hiện tại và một hành động chính.
- Thông số khởi đầu bị khóa.
- Checklist sinh mạng và mạch thở.
- SpO₂, nhịp tim, huyết áp, Ppeak, Pplat, PEEP, VT thực tế, auto-PEEP.
- DOPE/HOP.
- Ghi nhận đã liên lạc Hồi sức.
- Đồng hồ chờ và đường escalation.
- SBAR tối giản.

Ẩn:

- Các ô chỉnh VT/RR/PEEP/FiO₂/Pmax.
- Profile ARDS/COPD/hen chưa được duyệt.
- Các chỉ số chuyên sâu chưa có dữ liệu đầu vào.

### 2.2. Mode 2 — Theo dõi và điều phối

Đối tượng: điều dưỡng, điều phối, bác sĩ hỗ trợ ca.

Hiển thị:

- Giờ nối máy.
- Thời gian đã chờ Hồi sức.
- Đã gọi/chưa gọi.
- Đã kết nối/chưa kết nối.
- Hồi sức đã đến/chưa đến.
- Cảnh báo đỏ hiện tại.
- Số đo mới nhất và thời điểm đo.
- Nút tạo SBAR.

Ẩn:

- Tất cả trường chỉnh thông số.
- Các diễn giải yêu cầu bác sĩ chuyên ngành.

### 2.3. Mode 3 — Hồi sức chuyên sâu

Đối tượng: bác sĩ Hồi sức.

Điều kiện mở:

- Xác nhận vai trò.
- Hiển thị cảnh báo “chỉ là bảng tính/chuyển giao, không ghi trực tiếp lên máy”.
- Nếu có đăng nhập nội bộ trong tương lai, lưu người thao tác và thời điểm.

Chức năng:

- Chỉnh nhanh VT mL/kg PBW, VT tuyệt đối, RR, PEEP, FiO₂, I:E/Ti, peak flow, trigger, Pmax và alarm limits.
- So sánh “đang cài” với “dự kiến”.
- Ghi lý do thay đổi.
- Lưu snapshot trước và sau thay đổi.
- Tính Pplat, driving pressure, P/F ratio và các chỉ số được protocol cho phép.
- Đánh dấu thay đổi đã được ghi lên máy hoặc chỉ là dự kiến.

## 3. Các chức năng ưu tiên P0

### F-P0-01 — Profile chưa duyệt không tác động logic

Quy tắc:

- `DRAFT` và `TECHNICALLY_VERIFIED` chỉ hiển thị thông tin.
- Chỉ `APPROVED` được thay đổi ngưỡng cảnh báo.
- Khi profile chưa duyệt được chọn, cảnh báo dùng mục tiêu chung và hiển thị lý do.

Nghiệm thu:

- Chọn COPD bản nháp không làm ngưỡng cảnh báo thay đổi.
- Chọn profile được duyệt mới thay đổi target.
- SBAR ghi profile và trạng thái phê duyệt.

### F-P0-02 — Ghi nhận liên lạc đúng nghĩa

Thay nút “Gọi bác sĩ Hồi sức ngay” bằng flow:

1. `Ghi nhận bắt đầu liên lạc`.
2. `Đã kết nối`.
3. `Chưa kết nối — gọi lại sau`.
4. `Hồi sức đã tiếp nhận`.
5. `Báo trưởng trực/điều phối`.

Mỗi trạng thái có timestamp và người thao tác nếu có danh tính.

### F-P0-03 — Không ghi đè thời gian âm thầm

- Nhấn lại “Đã nối máy” phải hỏi xác nhận.
- Reset timer phải hỏi xác nhận.
- Ghi event cũ và event mới.
- Timer hết hạn phải tạo event “quá hạn chưa tiếp nhận”.

### F-P0-04 — Timestamp và độ mới của số đo

Mỗi trường số đo gồm:

- Giá trị.
- Đơn vị.
- Thời điểm đo.
- Người nhập hoặc nguồn nhập.
- Trạng thái: mới, cũ, không đo được, không hợp lệ.

### F-P0-05 — Sửa đơn vị và validation theo metadata

Không suy ra đơn vị bằng điều kiện giao diện. Tạo schema chung:

```js
{
  id: 'in-hr',
  label: 'Nhịp tim',
  unit: 'lần/phút',
  min: 20,
  max: 250,
  step: 1
}
```

Schema dùng cho input, lỗi, SBAR và test.

### F-P0-06 — Checklist theo mức độ

Nhóm 1: sinh mạng và hỗ trợ ngay

- O₂.
- Ambu.
- Đường thở.
- Nguồn điện.

Nhóm 2: máy, mạch thở và báo động

- Nhóm bệnh nhân.
- Rò mạch.
- Ngắt mạch.
- Pmax.
- Alarm minute ventilation/apnea.

Nhóm 3: đối chiếu manual

- Peak flow.
- Trigger.
- Pause.
- Các dải cài đặt thiết bị.

## 4. Các chức năng P1

### F-P1-01 — Dấu hiệu sinh tồn và khí máu

Thêm:

- Nhịp tim.
- Huyết áp tâm thu/tâm trương hoặc MAP.
- Nhiệt độ.
- pH.
- PaCO₂.
- PaO₂.
- HCO₃⁻.
- Lactate.
- FiO₂ lúc lấy khí máu.
- Thời điểm lấy khí máu.

### F-P1-02 — P/F ratio và driving pressure

Chỉ tính khi đủ đầu vào và hiển thị công thức:

- `P/F = PaO₂ / FiO₂ dạng thập phân`.
- `Driving pressure = Pplat − PEEP`.

Không tạo nhãn mức độ nếu thiếu tiêu chí chẩn đoán hoặc chưa được protocol đơn vị duyệt.

### F-P1-03 — Trend và snapshot

- Bảng 3–5 lần đo gần nhất.
- Mũi tên tăng/giảm.
- Snapshot trước chỉnh.
- Snapshot sau chỉnh.
- Ghi lý do thay đổi.
- Không xóa snapshot đã dùng trong SBAR.

### F-P1-04 — SBAR theo vai trò

SBAR cho mode trực:

- Thời điểm nối.
- Cấu hình tạm thời.
- Số đo mới nhất.
- Cảnh báo đỏ.
- Đã gọi ai, lúc nào, đã kết nối chưa.
- Mục còn thiếu.

SBAR cho mode Hồi sức:

- Cấu hình trước/sau.
- Lý do điều chỉnh.
- Khí máu và P/F.
- Pplat, PEEP, driving pressure.
- Các quyết định còn chờ.

### F-P1-05 — Đường escalation

Hiển thị theo SOP nội viện:

1. Gọi Hồi sức.
2. Gọi lại nếu chưa kết nối sau [CẦN SOP].
3. Báo trưởng trực/điều phối.
4. Chuẩn bị vận chuyển hoặc hỗ trợ cao hơn theo quyết định của bác sĩ.

Không tự điền số điện thoại hoặc thông tin liên lạc khi chưa có nguồn nội viện.

## 5. Các chức năng P2 cho Hồi sức

- Profile ARDS có điều kiện áp dụng, P/F, prone checklist và protocol PEEP.
- Profile COPD có SpO₂ 88–92%, ABG bắt buộc và cảnh báo giữ CO₂.
- Profile hen nặng có theo dõi auto-PEEP, bẫy khí và đồng bộ.
- Profile béo phì theo PBW và giới hạn đã được duyệt.
- Profile thần kinh cơ với lưu ý yếu cơ và thông khí.
- Weaning/SBT chỉ khi có protocol riêng.
- Theo dõi vận chuyển bệnh nhân.
- Phiếu bàn giao liên khoa.

## 6. Giao diện đích

### 6.1. Thanh trạng thái cố định

```text
Nối máy 00:23:41 | Hồi sức: chưa tiếp nhận | Cảnh báo đỏ: 2
```

Luôn hiển thị ở cả ba tab.

### 6.2. Thẻ “Việc cần làm ngay”

```text
VIỆC CẦN LÀM NGAY
1. Kiểm tra oxy và Ambu
2. Ghi SpO₂ và huyết áp
3. Ghi nhận liên lạc Hồi sức

[Đã kiểm tra] [Ghi nhận liên lạc]
```

### 6.3. Màn hình mode trực

Thứ tự:

1. Việc cần làm ngay.
2. Thông số khởi đầu khóa.
3. Số đo và cảnh báo.
4. DOPE/HOP.
5. Liên lạc và timer.
6. SBAR.

### 6.4. Màn hình mode chuyên sâu

Desktop/tablet:

- Cột trái: thông tin, PBW, ABG, số đo.
- Cột giữa: đang cài/dự kiến/snapshot.
- Cột phải: cảnh báo, timeline, SBAR.

Điện thoại:

1. Nguy hiểm hiện tại.
2. Số đo.
3. Thông số chỉnh.
4. Lý do thay đổi.
5. SBAR.

### 6.5. Cảnh báo

Mỗi cảnh báo có 4 phần:

```text
Pplat cao — nguy cơ
Làm ngay: kiểm tra lại bằng inspiratory pause và gọi Hồi sức
Không làm: không nâng Pmax để đạt VT
Dữ liệu: Pplat 32 cmH₂O lúc 14:34
```

Không để một `role="alert"` đọc lại cả danh sách sau mỗi lần gõ.

## 7. Cổng kiểm duyệt lâm sàng

Mỗi profile cần bảng:

| Mệnh đề | Quần thể | Đơn vị/ngưỡng | Nguồn | Phiên bản | Người duyệt | Trạng thái |
|---|---|---|---|---|---|---|
| VT bảo vệ phổi | ARDS người lớn | mL/kg PBW | ATS/ESICM/SCCM | 2017 | [CẦN BỔ SUNG] | DRAFT |
| SpO₂ COPD | COPD cấp | % | GOLD | [CẦN BỔ SUNG] | [CẦN BỔ SUNG] | DRAFT |
| Peak flow/trigger | Neumovent TS | L/phút/% | Operator’s Manual | [CẦN BỔ SUNG] | Thiết bị | DRAFT |

Không chuyển `DRAFT` thành `APPROVED` chỉ vì đã có nguồn hoặc test kỹ thuật.

## 8. Bộ kiểm thử mới

### Logic

- Profile draft không thay đổi cảnh báo.
- Profile approved thay đổi đúng target.
- COPD không cảnh báo đỏ ở SpO₂ 90% nếu profile đã được duyệt.
- SpO₂ 87% vẫn cảnh báo trong COPD.
- P/F không tính khi FiO₂ thiếu hoặc nhập 0.
- Driving pressure không tính khi Pplat/PEEP thiếu.
- Đơn vị HR, BP, SpO₂, Pplat đúng.
- Timer không bị ghi đè khi nhấn lặp.
- Gọi Hồi sức có trạng thái và timestamp.

### Giao diện

- Mode trực không hiển thị ô chỉnh chuyên sâu.
- Mode điều phối không hiển thị trường chỉnh máy.
- Mode Hồi sức yêu cầu xác nhận trước khi mở.
- Thanh trạng thái luôn hiện ở mọi tab.
- Không tràn ở 360, 390, 768, 1024 và 1440 px.
- Focus trap và Escape trong modal.
- Trình đọc màn hình đọc được đơn vị và timestamp.

## 9. Thứ tự triển khai

### Sprint 1 — an toàn mode trực

- Khóa profile draft khỏi logic.
- Sửa flow liên lạc.
- Sửa timestamp.
- Sửa timer không ghi đè.
- Sửa schema đơn vị.
- Thêm “Việc cần làm ngay”.

### Sprint 2 — theo dõi và chuyển giao

- Dấu hiệu sinh tồn.
- ABG.
- Timeline đầy đủ.
- SBAR theo vai trò.
- Trend và snapshot.

### Sprint 3 — workspace Hồi sức

- So sánh thông số.
- Ghi lý do chỉnh.
- P/F và driving pressure.
- Cảnh báo tính hợp lý.

### Sprint 4 — profile bệnh lý

- ARDS.
- COPD.
- Hen.
- Béo phì.
- Weaning/SBT.

Chỉ bật từng profile sau khi hoàn tất bảng mệnh đề–nguồn–người duyệt–test.

## 10. Tiêu chí đạt trước pilot

- Mode trực không cho chỉnh thông số máy.
- Không có profile draft ảnh hưởng cảnh báo.
- Mọi số đo có timestamp.
- Có log liên lạc và escalation.
- SBAR tách rõ cấu hình tạm thời với quyết định chuyên sâu.
- Không có nút tạo cảm giác đã gọi nếu app chỉ ghi nhận.
- Unit test, build, offline test và responsive test đạt.
- Bác sĩ Cấp cứu, Hồi sức, điều dưỡng và phụ trách thiết bị cùng chạy ca mô phỏng.

## 11. Quyết định chưa được tự suy diễn

- Thời điểm gọi lại và báo trưởng trực.
- Số liên lạc nội viện.
- Thời gian timer 30 phút có phải SOP chính thức không.
- Mục tiêu SpO₂ cho ARDS/hen.
- Dải peak flow/trigger thật trên máy.
- Ngưỡng P/F và hành động gắn với từng mức.
- Điều kiện bật profile production.
