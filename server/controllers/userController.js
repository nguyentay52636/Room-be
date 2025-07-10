const User = require("../models/nguoidung");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const usersList = await User.find().populate('vaiTro');
      return res
        .status(200)
        .json({ message: "get all users success", users: usersList });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUserData = await User.findByIdAndDelete(id).populate('vaiTro');
      if (!deletedUserData)
        return res.status(404).json({ message: "User not found" });
      return res
        .status(200)
        .json({
          message: "Delete user successfully",
          deletedUser: deletedUserData,
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate('vaiTro');
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(user);  
    } catch (error) { 
      return res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      có
      const updatedUserData = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });   
      if (!updatedUserData)
        return res.status(404).json({ message: "User not found" });
      return res
        .status(200)
        .json({ message: "Update user successfully", updatedUser: updatedUserData });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  createUser: async (req, res) => {
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

      const hashedPassword = await bcrypt.hash(req.body.matKhau, 10);

      const newUser = await User.create({
        ten: req.body.ten,
        email: req.body.email,
        tenDangNhap: req.body.tenDangNhap,
        matKhau: hashedPassword,
        soDienThoai: req.body.soDienThoai,
        vaiTro: req.body.vaiTro,
        anhDaiDien: req.body.anhDaiDien,
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
};

module.exports = userController;
