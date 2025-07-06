const User = require('../models/nguoidung');

const userController = {
    getAllUser: async (req, res) =>{
        try {
            const user = await User.find();
            res.status(200).json({message :"lấy dữ liệu thành công",user});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteUser: async (req,res) =>{
        try{
            const {id} = req.params;     
            const user = await User.findById(id); //findByIdAndDelete
            res.status(200).json("Delete user successfully");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports = userController;