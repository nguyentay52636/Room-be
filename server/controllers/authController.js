const NguoiDung = require('../models/nguoidung');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshTokens = []; 
const authController = {
  register : async (req, res) => {
    try{
      const existingUser = await NguoiDung.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã tồn tại' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.mat_khau, salt);
      // create new user
      const newUser = new NguoiDung({
        ten: req.body.ten,
        email: req.body.email,
        mat_khau: hashedPassword,
        so_dien_thoai: req.body.so_dien_thoai,
        vai_tro: req.body.vai_tro || 'nguoi_thue',
        anh_dai_dien: req.body.anh_dai_dien || '',
        trang_thai: req.body.trang_thai || 'hoat_dong'
      });
      // save user database
      const user = await newUser.save();
      res.status(200).json(user);
    }catch(err){
      res.status(500).json(err);
    }
  },
  //GENERATE JWT ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        vai_tro: user.vai_tro
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
        vai_tro: user.vai_tro
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '365d' }
    );
  },

  login : async (req, res) => {
    try {
      const user = await NguoiDung.findOne({ten: req.body.ten});
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
      const validPassword = await bcrypt.compare(req.body.mat_khau, user.mat_khau);
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
        const { mat_khau, ...otherDetails } = user._doc; 
        res.status(200).json({...otherDetails,accessToken});
      }
    }catch(err) {
      res.status(500).json(err);
    }
  },

  RequestrefreshToken: async (req, res) => {
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
      res.cookie('refreshToken', newrefreshToken, {
          httpOnly: true,
          path : '/', 
          secure: false,
          sameSite: 'strict', // Prevent CSRF attacks
      })
      res.status(200).json({accessToken: newAccessToken});
    })
  },
  userLogout: async (req, res) => {
    res.clearCookie('refreshToken')
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
    res.status(200).json("Logout successfully");
  }
}
module.exports = authController;