const mongoose = require('mongoose');

const TinNhanSchema = new mongoose.Schema({
  nguoiGuiId: { type: mongoose.Schema.Types.ObjectId, ref: 'nguoiDung' },
  nguoiNhanId: { type: mongoose.Schema.Types.ObjectId, ref: 'nguoiDung' },
  noiDung: { type: String , required: true, maxlength: 500 },
  hinhAnh: { type: String }, 
  daDoc: { type: Boolean, default: false },
  trangThai: { type: String, enum: ['sent', 'edited', 'deleted'], default: 'sent' }

}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('TinNhan', TinNhanSchema);
