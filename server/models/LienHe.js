const mongoose = require('mongoose');

const LienHeSchema = new mongoose.Schema({
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },
  bat_dong_san_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BatDongSan' },
  tin_nhan: { type: String, required: true },
  trang_thai: { type: String, enum: ['chua_tra_loi', 'da_tra_loi'], default: 'chua_tra_loi' },
  ngay_gui: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LienHe', LienHeSchema);
