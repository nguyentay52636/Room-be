const User = require("../models/nguoidung");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const usersList = await User.find();
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
      const deletedUserData = await User.findByIdAndDelete(id);
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
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(user);  
    } catch (error) { 
      return res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
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
    try {
      const newUser = await User.create(req.body);
      return res.status(201).json({ message: "Create user successfully", user: newUser });
    } catch (error) {
      return res.status(500).json(error); 
    }
  },  
};

module.exports = userController;
