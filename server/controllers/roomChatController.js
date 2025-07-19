const PhongChat = require('../models/PhongChat');


const getRoomsOfUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const rooms = await PhongChat.find({ thanhVien: userId })
            .populate('thanhVien')
            .sort({ updatedAt: -1 });

        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy danh sách phòng chat', error });
    }
};


const createRoom = async (req, res) => {
    const { tenPhong, loaiPhong, thanhVien, nguoiTao, anhDaiDien } = req.body;
    if (!loaiPhong || !thanhVien?.length) {
        return res.status(400).json({ message: 'Thiếu thông tin phòng chat' });
    }

    try {
        const newRoom = await PhongChat.create({
            tenPhong,
            loaiPhong,
            thanhVien,
            nguoiTao,
            anhDaiDien
        });
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo phòng', error });
    }
};

// Xóa phòng chat (tùy chọn)
const deleteRoom = async (req, res) => {
    const { roomId } = req.params;
    try {
        await PhongChat.findByIdAndDelete(roomId);
        res.status(200).json({ message: 'Xóa phòng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi xóa phòng', error });
    }
};

module.exports = {
    getRoomsOfUser,
    createRoom,
    deleteRoom
};
