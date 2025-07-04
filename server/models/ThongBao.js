const mongoose = require('mongoose');

const ThongBaoSchema = new mongoose.Schema({
  nguoi_nhan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung', required: true },
  tieu_de: { type: String, required: true },
  noi_dung: { type: String, required: true },
  tieu_de: { type: String, required: true, maxlength: 100 },
  noi_dung: { type: String, required: true, maxlength: 1000 },
  da_doc: { type: Boolean, default: false },
  loai: { type: String, enum: ['he_thong', 'ca_nhan', 'canh_bao'], default: 'he_thong' }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('ThongBao', ThongBaoSchema);
