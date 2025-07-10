const mongoose = require("mongoose");

const nguoiDungSchema = new mongoose.Schema(
  {
    ten: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    tenDangNhap: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    matKhau: { type: String, required: true, minlength: 6 },
    soDienThoai: { type: String, match: /^[0-9]{9,11}$/ },
    vaiTro: {
      type: String,
      enum: ["chu_tro", "nguoi_thue", "nhan_vien", "admin"],
      default: "nguoi_thue",
    },
    anhDaiDien: { type: String, default: "" },
    trangThai: {
      type: String,
      enum: ["hoat_dong", "khoa"],
      default: "hoat_dong",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save middleware to ensure tenDangNhap is never null or empty
nguoiDungSchema.pre("save", function (next) {
  if (!this.tenDangNhap || this.tenDangNhap.trim() === "") {
    return next(new Error("tenDangNhap cannot be null or empty"));
  }
  this.tenDangNhap = this.tenDangNhap.trim();
  next();
});

module.exports = mongoose.model("nguoiDung", nguoiDungSchema);
