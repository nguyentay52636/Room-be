const mongoose = require('mongoose');

const TinNhanSchema = new mongoose.Schema({
  nguoi_gui_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },
  nguoi_nhan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },
  noi_dung: { type: String },
  hinh_anh: { type: String }, // nếu có ảnh đính kèm
  da_doc: { type: Boolean, default: false }
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('TinNhan', TinNhanSchema);
