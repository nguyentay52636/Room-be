const mongoose = require("mongoose");

const NhanVienSchema = new mongoose.Schema(
  {
    nguoiDungId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
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
      default: 0,
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
      enum: ["dang_hoat_dong", "tam_nghi", "da_nghi"],
      default: "dang_hoat_dong",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.NhanVien || mongoose.model("NhanVien", NhanVienSchema);
