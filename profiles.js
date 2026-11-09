/* Clinical profile defaults for review. These profiles never change ventilator settings. */
window.VENT_PROFILES = [
  {
    id: 'baseline', name: 'Người lớn — khởi đầu chung', status: 'technically-verified',
    spo2Min: 92, spo2Max: 96, target: 'SpO₂ 92–96%', note: 'Điều chỉnh theo bác sĩ Hồi sức.',
    settings: 'VT 6 mL/kg PBW · Pplat ≤ 30 cmH₂O', source: 'Protocol nội bộ hiện tại'
  },
  {
    id: 'ards', name: 'Nghi ARDS', status: 'draft',
    spo2Min: null, spo2Max: null, target: 'Chưa có mục tiêu SpO₂ riêng', note: 'Đánh giá P/F, mức ARDS, prone và PEEP theo protocol Hồi sức.',
    settings: 'VT 4–8 mL/kg PBW · Pplat < 30 cmH₂O', source: 'ATS/ESICM/SCCM ARDS guideline 2017'
  },
  {
    id: 'copd', name: 'COPD/nguy cơ giữ CO₂', status: 'draft',
    spo2Min: 88, spo2Max: 92, target: 'SpO₂ 88–92%', note: 'Theo dõi khí máu, pH và PaCO₂; không tăng thông khí chỉ theo SpO₂.',
    settings: 'Không tự đặt VT/RR/PEEP trong profile này', source: 'GOLD COPD report'
  },
  {
    id: 'asthma', name: 'Hen nặng', status: 'draft',
    spo2Min: null, spo2Max: null, target: 'Theo protocol Hồi sức', note: 'Đánh giá auto-PEEP, bẫy khí, đồng bộ; gọi Hồi sức sớm.',
    settings: 'Không tự đặt VT/RR/PEEP trong profile này', source: 'GINA severe asthma guidance'
  }
];
