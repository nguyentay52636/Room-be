const mongoose = require('mongoose');

const LichSchema = new mongoose.Schema({
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },
  bat_dong_san_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BatDongSan' },
  thoi_gian: Date,
  ghi_chu: String,
  trang_thai: { type: String, enum: ['cho_xac_nhan', 'da_xac_nhan', 'da_huy'], default: 'cho_xac_nhan' }
});

module.exports = mongoose.model('LichXemNha', LichSchema);
