const mongoose = require('mongoose');

const TinTucSchema = new mongoose.Schema({
  tieu_de: { type: String , required: true , maxlength: 200 },
  mo_ta: { type: String , required: true },
  danh_muc: { type: String , required: true, enum: ['chung_cu', 'nha_o', 'dat_nen', 'khac'] },
  noi_dung: { type: String , required: true },
  anh_dai_dien: { type: String },
  tac_gia_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('TinTuc', TinTucSchema);
