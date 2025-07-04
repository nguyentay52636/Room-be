const mongoose = require('mongoose');

const TinTucSchema = new mongoose.Schema({
  tieu_de: { type: String },
  mo_ta: { type: String },
  noi_dung: { type: String },
  anh_dai_dien: { type: String },
  tac_gia_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('TinTuc', TinTucSchema);
