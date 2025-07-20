const PhongChat = require('../models/PhongChat');
const TinNhan = require('../models/TinNhan');

const getRoomsOfUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const rooms = await PhongChat.find({ thanhVien: userId })
            .populate('thanhVien')
            .populate('nguoiTao')
            .populate('tinNhan')
            .sort({ updatedAt: -1 });

        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy danh sách phòng chat', error });
    }
};

const getRoomById = async (req, res) => {
    const { roomId } = req.params;
    try {
        const room = await PhongChat.findById(roomId)
            .populate('thanhVien')
            .populate('nguoiTao')
            .populate({
                path: 'tinNhan',
                populate: 'nguoiGuiId',
                options: { sort: { createdAt: 1 } }
            });

        if (!room) {
            return res.status(404).json({ message: 'Không tìm thấy phòng chat' });
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy thông tin phòng chat', error });
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
            anhDaiDien,
            tinNhan: []
        });

        const populatedRoom = await PhongChat.findById(newRoom._id)
            .populate('thanhVien')
            .populate('nguoiTao');

        res.status(201).json(populatedRoom);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo phòng', error });
    }
};

const addMessageToRoom = async (req, res) => {
    const { roomId } = req.params;
    const { messageId } = req.body;

    try {
        const room = await PhongChat.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Không tìm thấy phòng chat' });
        }

        const message = await TinNhan.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Không tìm thấy tin nhắn' });
        }

        // Thêm tin nhắn vào phòng nếu chưa có
        if (!room.tinNhan.includes(messageId)) {
            room.tinNhan.push(messageId);
            await room.save();
        }

        res.status(200).json({ message: 'Thêm tin nhắn vào phòng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi thêm tin nhắn vào phòng', error });
    }
};

const removeMessageFromRoom = async (req, res) => {
    const { roomId, messageId } = req.params;

    try {
        const room = await PhongChat.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Không tìm thấy phòng chat' });
        }

        // Xóa tin nhắn khỏi phòng
        room.tinNhan = room.tinNhan.filter(id => id.toString() !== messageId);
        await room.save();

        res.status(200).json({ message: 'Xóa tin nhắn khỏi phòng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi xóa tin nhắn khỏi phòng', error });
    }
};

const updateRoom = async (req, res) => {
    const { roomId } = req.params;
    const updateData = req.body;

    try {
        const updatedRoom = await PhongChat.findByIdAndUpdate(
            roomId,
            updateData,
            { new: true, runValidators: true }
        )
        .populate('thanhVien')
        .populate('nguoiTao');

        if (!updatedRoom) {
            return res.status(404).json({ message: 'Không tìm thấy phòng chat' });
        }

        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi cập nhật phòng chat', error });
    }
};

// Xóa phòng chat (tùy chọn)
const deleteRoom = async (req, res) => {
    const { roomId } = req.params;
    try {
        const room = await PhongChat.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Không tìm thấy phòng chat' });
        }

        // Tùy chọn: Xóa tất cả tin nhắn trong phòng
        await TinNhan.deleteMany({ roomId: roomId });
        
        await PhongChat.findByIdAndDelete(roomId);
        res.status(200).json({ message: 'Xóa phòng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi xóa phòng', error });
    }
};

// Tìm hoặc tạo phòng chat private giữa 2 users
const findOrCreatePrivateRoom = async (req, res) => {
    const { userId1, userId2 } = req.body;
    
    if (!userId1 || !userId2) {
        return res.status(400).json({ message: 'Thiếu thông tin userId1 hoặc userId2' });
    }

    if (userId1 === userId2) {
        return res.status(400).json({ message: 'Không thể tạo phòng chat với chính mình' });
    }

    try {
        // Tìm phòng private đã tồn tại giữa 2 users
        const existingRoom = await PhongChat.findOne({
            loaiPhong: 'private',
            thanhVien: { 
                $all: [userId1, userId2],
                $size: 2
            }
        })
        .populate('thanhVien')
        .populate('nguoiTao')
        .populate({
            path: 'tinNhan',
            populate: 'nguoiGuiId',
            options: { sort: { createdAt: 1 } }
        });

        if (existingRoom) {
            return res.status(200).json({
                room: existingRoom,
                isNewRoom: false,
                message: 'Phòng chat đã tồn tại'
            });
        }

        // Tạo phòng mới nếu chưa có
        const newRoom = await PhongChat.create({
            tenPhong: `Chat ${userId1} - ${userId2}`,
            loaiPhong: 'private',
            thanhVien: [userId1, userId2],
            nguoiTao: userId1,
            anhDaiDien: '',
            tinNhan: []
        });

        const populatedRoom = await PhongChat.findById(newRoom._id)
            .populate('thanhVien')
            .populate('nguoiTao')
            .populate({
                path: 'tinNhan',
                populate: 'nguoiGuiId',
                options: { sort: { createdAt: 1 } }
            });

        res.status(201).json({
            room: populatedRoom,
            isNewRoom: true,
            message: 'Tạo phòng chat mới thành công'
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tìm/tạo phòng chat private', error });
    }
};

module.exports = {
    getRoomsOfUser,
    getRoomById,
    createRoom,
    addMessageToRoom,
    removeMessageFromRoom,
    updateRoom,
    deleteRoom,
    findOrCreatePrivateRoom
};
