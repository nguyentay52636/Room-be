const mongoose = require('mongoose');

const nguoiDungSchema = new mongoose.Schema({
  ten: { type: String, required: true },
  email: { type: String, required: true, unique: true ,match: /^\S+@\S+\.\S+$/},
  tenDangNhap: { type: String, required: true, unique: true, minlength: 3, maxlength: 50 },
  matKhau: { type: String, required: true , minlength : 6},
  soDienThoai: { type: String ,match: /^[0-9]{9,11}$/},
  vaiTro: { type: String, enum: ['chu_tro', 'nguoi_thue', 'admin'], default: 'nguoi_thue' },
  anhDaiDien: { type: String, default: '' },
  trangThai: { type: String, enum: ['hoat_dong', 'khoa'], default: 'hoat_dong' },
}, {
  timestamps: true, 
  versionKey: false
});

module.exports = mongoose.model('NguoiDung', nguoiDungSchema);
