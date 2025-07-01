const mongoose = require('mongoose');

const HinhAnhSchema = new mongoose.Schema({
  bat_dong_san_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BatDongSan' },
  duong_dan: String,
  la_anh_chinh: { type: Boolean, default: false }
});

module.exports = mongoose.model('HinhAnh', HinhAnhSchema);
