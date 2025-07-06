const NguoiDung = require('../models/nguoidung');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validations/authValidation');
let refreshTokens = []; 

const authController = {
  register : async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // So sánh mật khẩu và xác nhận mật khẩu
    if (req.body.matKhau !== req.body.xacNhanMatKhau) {
      return res.status(400).json({ message: 'Mật khẩu xác nhận không khớp' });
    }
    try{
      const existingUser = await NguoiDung.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã tồn tại' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.matKhau, salt);
      // create new user
      const newUser = new NguoiDung({
        ten: req.body.ten,
        email: req.body.email,
        tenDangNhap: req.body.tenDangNhap,
        matKhau: hashedPassword,
        soDienThoai: req.body.soDienThoai
      });
      // save user database
      const user = await newUser.save();
      res.status(201).json({message: 'Đăng ký thành công', user: user});
    }catch(err){
      res.status(500).json(err);
    }
  },
  //GENERATE JWT ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        vaiTro: user.vaiTro
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '15m' }
    );
  },
  //GENERATE JWT REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        vaiTro: user.vaiTro
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '365d' }
    );
  },

  login : async (req, res) => {
    try {
      const {error} = loginValidation(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const user = await NguoiDung.findOne({tenDangNhap: req.body.tenDangNhap});
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
      const validPassword = await bcrypt.compare(req.body.matKhau, user.matKhau);
      if (!validPassword) {
        return res.status(400).json({ message: 'Mật khẩu không đúng' });
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken); // Store refresh token
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          path : '/', 
          secure: false,
          sameSite: 'strict', // Prevent CSRF attacks
        });
        const { matKhau, ...otherDetails } = user._doc; 
        res.status(200).json({message :"login successfully" ,...otherDetails,accessToken});
      }
    }catch(err) {
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken)  return res.status(401).json("you're not authenticated");
    if(!refreshTokens.includes(refreshToken)){
      return res.status(403).json("refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET,  (err, user) => {
      if(err) {
        console.log(err);
      }
    
      refreshTokens = refreshTokens.filter(token => token !== refreshToken); // Remove used refresh token
      // create new access token, refresh token
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken); 
      res.cookie('refreshToken', newRefreshToken ,{
          httpOnly: true,
          path : '/', 
          secure: false,
          sameSite: 'strict', // Prevent CSRF attacks
      })
      res.status(200).json({accessToken: newAccessToken});
    })
  },
  userLogout: async (req, res) => {
    res.clearCookie('refreshToken');
    res.status(200).json("Logout successfully");
  }
}
module.exports = authController;