const mongoose = require('mongoose');

const TinNhanSchema = new mongoose.Schema({
  nguoiGuiId: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },
  nguoiNhanId: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },
  noiDung: { type: String , required: true, maxlength: 500 },
  hinhAnh: { type: String }, // nếu có ảnh đính kèm
  daDoc: { type: Boolean, default: false }
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('TinNhan', TinNhanSchema);
