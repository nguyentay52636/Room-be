const mongoose = require('mongoose');

const TinNhanSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'PhongChat', required: true },
  nguoiGuiId: { type: mongoose.Schema.Types.ObjectId, ref: 'nguoiDung', required: true },
  noiDung: { type: String, maxlength: 500 },
  hinhAnh: { type: String }, 
  daDoc: { type: Boolean, default: false },
  trangThai: { type: String, enum: ['sent', 'edited', 'deleted'], default: 'sent' }
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('TinNhan', TinNhanSchema);
