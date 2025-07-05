const mongoose = require('mongoose');

const DanhGiaSchema = new mongoose.Schema({
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },
  bat_dong_san_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BatDongSan' },
  so_sao: { type: Number, min: 1, max: 5 , required: true },
  binh_luan: String
}, { timestamps: true });

module.exports = mongoose.model('DanhGia', DanhGiaSchema);
