const User = require("../models/nguoidung");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/authValidation");
let refreshTokens = [];

const authController = {
  register: async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    if (req.body.matKhau !== req.body.xacNhanMatKhau) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp" });
    }
    try {
      const existingUserByEmail = await User.findOne({ email: req.body.email });
      if (existingUserByEmail)
        return res.status(400).json({ message: "Email already exists" });

      const existingUserByUsername = await User.findOne({
        tenDangNhap: req.body.tenDangNhap,
      });
      if (existingUserByUsername)
        return res.status(400).json({ message: "Username already exists" });

      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.matKhau, saltRounds);

      const newUserData = new User({
        ten: req.body.ten,
        email: req.body.email,
        tenDangNhap: req.body.tenDangNhap,
        matKhau: hashedPassword,
        soDienThoai: req.body.soDienThoai,
      });

      const createdUser = await newUserData.save();
      return res
        .status(201)
        .json({ message: "Register successfully", user: createdUser });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  generateAccessToken: (userData) => {
    return jwt.sign(
      {
        id: userData.id,
        vaiTro: userData.vaiTro,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "15m" }
    );
  },

  generateRefreshToken: (userData) => {
    return jwt.sign(
      {
        id: userData.id,
        vaiTro: userData.vaiTro,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "365d" }
    );
  },

  login: async (req, res) => {
    try {
      const { error } = loginValidation(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });
      const userData = await User.findOne({
        tenDangNhap: req.body.tenDangNhap,
      });
      if (!userData) return res.status(404).json({ message: "User not found" });
      const isPasswordValid = await bcrypt.compare(
        req.body.matKhau,
        userData.matKhau
      );
      if (!isPasswordValid)
        return res.status(400).json({ message: "Password is incorrect" });
      const accessToken = authController.generateAccessToken(userData);
      const refreshToken = authController.generateRefreshToken(userData);
      refreshTokens.push(refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        secure: false,
        sameSite: "strict",
      });
      const { matKhau, ...userDetailsWithoutPassword } = userData._doc;
      return res
        .status(200)
        .json({
          message: "login successfully",
          ...userDetailsWithoutPassword,
          accessToken,
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("you're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("refresh token is not valid");
    }
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      (error, userData) => {
        if (error) {
          console.log(error);
          return res.status(403).json("refresh token is not valid");
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = authController.generateAccessToken(userData);
        const newRefreshToken = authController.generateRefreshToken(userData);
        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          path: "/",
          secure: false,
          sameSite: "strict",
        });
        return res.status(200).json({ accessToken: newAccessToken });
      }
    );
  },

  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json("Logout successfully");
  },
};

module.exports = authController;
