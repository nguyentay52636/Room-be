const mongoose = require('mongoose');

const PhongChatSchema = new mongoose.Schema({
  tenPhong: { type: String },
  loaiPhong: { type: String, enum: ['private', 'group'], required: true }, 
  thanhVien: [{ type: mongoose.Schema.Types.ObjectId, ref: 'nguoiDung' }],
  nguoiTao: { type: mongoose.Schema.Types.ObjectId, ref: 'nguoiDung' },
  anhDaiDien: { type: String },
  tinNhan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TinNhan' }],
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('PhongChat', PhongChatSchema);
