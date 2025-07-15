const mongoose = require("mongoose");
const crypto = require("crypto");
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "VaiTro",
      required: true,
    },
    anhDaiDien: {
      type: String,
      default: "",
    },
    trangThai: {
      type: String,
      enum: ["hoat_dong", "khoa"],
      default: "hoat_dong",
    },
    passwordChangedAt: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
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
nguoiDungSchema.methods = {
  createPasswordChangedToken: function(){
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpires = Date.now() + 15*60*1000;
  return resetToken;
  }
}

module.exports =
  mongoose.models.nguoiDung || mongoose.model("nguoiDung", nguoiDungSchema);
