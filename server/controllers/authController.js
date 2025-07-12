const User = require("../models/nguoidung");
const RefreshToken = require("../models/RefreshToken");
const bcrypt = require("bcrypt");
const Customer = require("../models/KhachHang");
const VaiTro = require("../models/vaiTro");
const {registerValidation,loginValidation} = require("../middleware/authValidation");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

const authController = {
  register: async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    if (req.body.matKhau !== req.body.xacNhanMatKhau)
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp" });

    try {
      const [emailExists, usernameExists] = await Promise.all([
        User.findOne({ email: req.body.email }),
        User.findOne({ tenDangNhap: req.body.tenDangNhap }),
      ]);
      if (emailExists)
        return res.status(400).json({ message: "Email already exists" });
      if (usernameExists)
        return res.status(400).json({ message: "Username already exists" });
      let vaiTro = await VaiTro.findOne({ ten: "nguoi_thue" });
      if (!vaiTro) {
        vaiTro = await VaiTro.create({ 
          ten: "nguoi_thue",
          moTa: "Vai trò người thuê"
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.matKhau, 10);
      const newUser = await User.create({
        ten: req.body.ten,
        email: req.body.email,
        tenDangNhap: req.body.tenDangNhap,
        matKhau: hashedPassword,
        soDienThoai: req.body.soDienThoai,
        vaiTro: vaiTro._id,
      });

      const newCustomer = await Customer.create({
        nguoiDungId: newUser._id,
      });

      return res.status(201).json({
        message: "Register successfully",
        user: newUser,
        customer: newCustomer,
      });
    } catch (err) {
      return res.status(500).json({ message: "Server error", error: err });
    }
  },


  login: async (req, res) => {
    try {
      const { error } = loginValidation(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const user = await User.findOne({ tenDangNhap: req.body.tenDangNhap }).populate('vaiTro');
      if (!user) return res.status(404).json({ message: "User not found" });

      const isValid = await bcrypt.compare(req.body.matKhau, user.matKhau);
      if (!isValid)
        return res.status(400).json({ message: "Password is incorrect" });

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await RefreshToken.create({ token: refreshToken, userId: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      const { matKhau, ...userData } = user._doc;
      return res.status(200).json({
        message: "Login successful",
        user: userData,
        accessToken,
      });
    } catch (err) {
      return res.status(500).json({ message: "Server error", error: err });
    }
  },

  requestRefreshToken: async (req, res) => {
    try {
      const token = req.cookies.refreshToken;
      if (!token)
        return res.status(401).json({ message: "Not authenticated" });

      const storedToken = await RefreshToken.findOne({ token });
      if (!storedToken)
        return res.status(403).json({ message: "Invalid refresh token" });

      const userData = verifyRefreshToken(token);
      const newAccessToken = generateAccessToken(userData);
      const newRefreshToken = generateRefreshToken(userData);

      await RefreshToken.deleteOne({ token }); 
      await RefreshToken.create({
        token: newRefreshToken,
        userId: userData.id,
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
      return res.status(403).json({ message: "Invalid token", error: err });
    }
  },

  userLogout: async (req, res) => {
    try {
      const token = req.cookies.refreshToken;
      if (!token) return res.status(200).json("Already logged out");

      await RefreshToken.deleteOne({ token });
      res.clearCookie("refreshToken");
      return res.status(200).json("Logout successfully");
    } catch (err) {
      return res.status(500).json({ message: "Logout error", error: err });
    }
  },
};

module.exports = authController;
