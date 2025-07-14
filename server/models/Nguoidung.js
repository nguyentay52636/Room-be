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
      type: mongoose.Schema.Types.ObjectId,
      ref: "VaiTro",
      required: true,
    },
    facebookId: { type: String, unique: true, sparse: true },
    anhDaiDien: { 
      type: String, 
      default: ""
    },
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

// Index để tối ưu performance cho Facebook login
nguoiDungSchema.index({ facebookId: 1 });
nguoiDungSchema.index({ email: 1, facebookId: 1 });

// Pre-save middleware để ensure tenDangNhap is never null or empty
nguoiDungSchema.pre("save", function (next) {
  if (!this.tenDangNhap || this.tenDangNhap.trim() === "") {
    return next(new Error("tenDangNhap cannot be null or empty"));
  }
  this.tenDangNhap = this.tenDangNhap.trim();

  // Special handling cho Facebook login - skip password length validation
  if (this.facebookId && this.matKhau === 'facebook_login_no_password') {
    // Bypass password validation cho Facebook users
    return next();
  }

  // Normal validation cho regular users
  if (this.matKhau && this.matKhau.length < 6 && !this.facebookId) {
    return next(new Error("Password must be at least 6 characters long"));
  }

  next();
});

// Virtual để check if user is Facebook user
nguoiDungSchema.virtual('isFacebookUser').get(function() {
  return !!this.facebookId;
});

// Method để safely update Facebook user info
nguoiDungSchema.methods.updateFromFacebook = function(facebookProfile) {
  if (facebookProfile.displayName) {
    this.ten = facebookProfile.displayName;
  }
  if (facebookProfile.photos?.[0]?.value) {
    this.anhDaiDien = facebookProfile.photos[0].value;
  }
  // Only update email if current email is a generated one
  if (facebookProfile.emails?.[0]?.value && this.email.includes('@noemail.local')) {
    this.email = facebookProfile.emails[0].value;
  }
  return this.save();
};

module.exports = mongoose.models.nguoiDung || mongoose.model("nguoiDung", nguoiDungSchema);
