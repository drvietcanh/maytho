# Cổng phê duyệt lâm sàng — ứng dụng hỗ trợ cài đặt máy thở

Tài liệu này là cổng kiểm duyệt trước pilot/production. `DRAFT` và `TECHNICALLY_VERIFIED` không được hiểu là protocol điều trị đã được bệnh viện phê duyệt.

| Profile | Quần thể | Nội dung hiển thị | Nguồn cần đối chiếu | Người duyệt | Trạng thái | Điều kiện bật production |
|---|---|---|---|---|---|---|
| baseline | Người lớn, cài đặt ban đầu | PBW, thông số khởi đầu nội bộ, cảnh báo chung | SOP bệnh viện + manual Neumovent TS | Trưởng khoa Hồi sức + phụ trách thiết bị | TECHNICALLY_VERIFIED | Ký duyệt SOP và pilot mô phỏng |
| ards | Người lớn nghi/đã xác định ARDS | VT theo PBW, Pplat và nhắc đánh giá chuyên sâu | ATS/ESICM/SCCM guideline 2017 + SOP đơn vị | Bác sĩ Hồi sức được phân công | DRAFT | Chốt quần thể, hành động, nguồn và test ca mô phỏng |
| copd | Đợt cấp COPD/nguy cơ giữ CO₂ | Nhắc mục tiêu oxy và khí máu | GOLD phiên bản bệnh viện áp dụng | Bác sĩ Hô hấp/Hồi sức | DRAFT | Chốt mục tiêu theo SOP và kiểm tra khí máu |
| asthma | Hen nặng | Nhắc auto-PEEP, bẫy khí, đồng bộ | GINA phiên bản bệnh viện áp dụng | Bác sĩ Hô hấp/Hồi sức | DRAFT | Chốt tiêu chí escalation và manual máy |

## Quy tắc không được tự suy diễn

- Không đổi `DRAFT` thành `APPROVED` chỉ vì có nguồn hoặc test kỹ thuật.
- Profile DRAFT chỉ được xem; không được đổi ngưỡng cảnh báo, thông số máy hoặc tạo y lệnh.
- Mỗi thay đổi phải ghi phiên bản nguồn, người duyệt, ngày duyệt, ca mô phỏng và test hồi quy.
- Khi nguồn không đủ chi tiết cho dòng máy thực tế, giữ profile ở DRAFT.

## Bằng chứng bắt buộc trước khi bật

1. Bảng mệnh đề–nguồn–quần thể–đơn vị–hành động.
2. Xác nhận manual/Operator’s Manual của máy đang dùng.
3. Rà soát độc lập bởi Hồi sức, Cấp cứu, Hô hấp và điều dưỡng/thiết bị.
4. Unit test, build, smoke test trình duyệt và ít nhất một ca mô phỏng biên.
5. Quyết định bằng văn bản của bệnh viện về phạm vi sử dụng và câu cảnh báo trách nhiệm.
