const mongoose = require('mongoose');

const YeuThichSchema = new mongoose.Schema({
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' ,rwequired: true },
  bat_dong_san_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BatDongSan' , required: true },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('YeuThich', YeuThichSchema);
