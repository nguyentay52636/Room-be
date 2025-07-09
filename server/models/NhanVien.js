const mongoose = require("mongoose");

const NhanVienSchema = new mongoose.Schema({
  nguoiDungId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NguoiDung",
    required: true,
    unique: true,
  },
  phongBan: {
    type: String,
    required: true,
  },
  chucVu: {
    type: String,
    required: true,
  },
  luong: {
    type: Number,
    required: true,
  },
  hieuSuat: {
    type: Number,
    default: 0,
  },
  ngayVaoLam: {
    type: Date,
    required: true,
  },
  trangThai: {
    type: String,
    default: "active",
  },
}, { timestamps: true });

module.exports = mongoose.model("NhanVien", NhanVienSchema);
