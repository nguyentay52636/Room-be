const User = require("../models/nguoidung");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ message: "get all users success", users });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ message: "Delete user successfully", deletedUser });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = userController;
