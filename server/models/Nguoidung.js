const mongoose = require('mongoose');

const nguoiDungSchema = new mongoose.Schema({
  ten: { type: String, required: true },
  email: { type: String, required: true, unique: true ,match: /^\S+@\S+\.\S+$/},
  mat_khau: { type: String, required: true , minlength : 6},
  so_dien_thoai: { type: String ,match: /^[0-9]{9,11}$/},
  vai_tro: { type: String, enum: ['chu_tro', 'nguoi_thue', 'admin'], default: 'nguoi_thue' },
  anh_dai_dien: { type: String, default: '' },
  trang_thai: { type: String, enum: ['hoat_dong', 'khoa'], default: 'hoat_dong' },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('NguoiDung', nguoiDungSchema);
