/* Clinical profile defaults for review. These profiles never change ventilator settings. */
window.VENT_PROFILES = [
  {
    id: 'baseline', name: 'Người lớn — khởi đầu chung', status: 'technically-verified',
    spo2Min: 92, spo2Max: 96, target: 'SpO₂ 92–96%', note: 'Giữ protocol khởi đầu hiện tại; bác sĩ Hồi sức quyết định điều chỉnh.',
    settings: 'VT 6 mL/kg PBW · Pplat ≤ 30 cmH₂O', source: 'Protocol nội bộ hiện tại'
  },
  {
    id: 'ards', name: 'Nghi ARDS — bản nháp', status: 'draft',
    spo2Min: null, spo2Max: null, target: 'Chưa đặt mục tiêu SpO₂ trong app', note: 'Đánh giá PaO₂/FiO₂, mức độ ARDS và nhu cầu prone/PEEP theo protocol Hồi sức.',
    settings: 'VT 4–8 mL/kg PBW · Pplat < 30 cmH₂O', source: 'ATS/ESICM/SCCM ARDS guideline 2017'
  },
  {
    id: 'copd', name: 'COPD/nguy cơ giữ CO₂ — bản nháp', status: 'draft',
    spo2Min: 88, spo2Max: 92, target: 'SpO₂ 88–92%', note: 'Cần khí máu và theo dõi pH/PaCO₂; không tăng thông khí chỉ dựa trên SpO₂.',
    settings: 'Không tự đặt VT/RR/PEEP trong profile này', source: 'GOLD COPD report'
  },
  {
    id: 'asthma', name: 'Hen nặng — bản nháp', status: 'draft',
    spo2Min: null, spo2Max: null, target: 'Theo protocol Hồi sức', note: 'Ưu tiên đánh giá auto-PEEP, bẫy khí và đồng bộ; gọi bác sĩ chuyên ngành sớm.',
    settings: 'Không tự đặt VT/RR/PEEP trong profile này', source: 'GINA severe asthma guidance'
  }
];
