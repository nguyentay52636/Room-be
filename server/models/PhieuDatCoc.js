const mongoose = require('mongoose');

const PhieuDatCocSchema = new mongoose.Schema({
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung', required: true },
  bat_dong_san_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BatDongSan', required: true },
  so_tien_coc: { type: Number, required: true , min: 1000 },
  trang_thai: { type: String, enum: ['cho_xac_nhan', 'da_xac_nhan', 'da_huy'], default: 'cho_xac_nhan' },
  ngay_dat_coc: { type: Date, default: Date.now },
  ngay_het_han: { type: Date, required: true },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('PhieuDatCoc', PhieuDatCocSchema);
