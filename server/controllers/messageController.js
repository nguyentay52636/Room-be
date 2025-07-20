const TinNhan = require('../models/TinNhan');
const PhongChat = require('../models/PhongChat');

const getMessages = async (req, res) => {
    const { roomId } = req.params;

    try {
        const messages = await TinNhan.find({ roomId })
            .populate('nguoiGuiId')
            .populate('roomId')
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy tin nhắn', error });
    }
};

const getAllMessages = async (req, res) => { 
    try { 
        const messages = await TinNhan.find()
            .populate('nguoiGuiId')
            .populate('roomId');
        res.status(200).json({
            message: "Get all messages successfully",
            messages: messages
        });
    } catch (error) { 
        res.status(500).json({ message: 'Lỗi lấy tất cả tin nhắn', error });
    }
};

const createMessageHandler = async (req, res) => {
    try {
        const { roomId, nguoiGuiId, noiDung, hinhAnh, daDoc, trangThai } = req.body;

        if (!roomId || !nguoiGuiId || !noiDung) {
            return res.status(400).json({ 
                message: 'Thiếu thông tin bắt buộc (roomId, nguoiGuiId, noiDung)' 
            });
        }

        const room = await PhongChat.findById(roomId);
        if (!room) {
            return res.status(404).json({ 
                message: 'Không tìm thấy phòng chat' 
            });
        }

        const validStates = ['sent', 'edited', 'deleted'];
        if (trangThai && !validStates.includes(trangThai)) {
            return res.status(400).json({ 
                message: 'Trạng thái không hợp lệ. Các giá trị cho phép: ' + validStates.join(', ')
            });
        }

        const messageData = {
            roomId,
            nguoiGuiId,
            noiDung,
            hinhAnh: hinhAnh || "",
            daDoc: daDoc !== undefined ? daDoc : false,
            trangThai: trangThai || 'sent'
        };

        const newMessage = await TinNhan.create(messageData);
        
        // Thêm tin nhắn vào phòng chat
        room.tinNhan.push(newMessage._id);
        await room.save();
        
        // Populate thông tin để trả về
        const populatedMessage = await TinNhan.findById(newMessage._id)
            .populate('nguoiGuiId')
            .populate('roomId');

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo tin nhắn', error });
    }
};

const updateMessageHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { noiDungMoi } = req.body;

        if (!noiDungMoi) {
            return res.status(400).json({ 
                message: 'Thiếu nội dung tin nhắn mới' 
            });
        }

        const updated = await TinNhan.findByIdAndUpdate(
            id,
            { noiDung: noiDungMoi, trangThai: 'edited' },
            { new: true }
        )
        .populate('nguoiGuiId')
        .populate('roomId');

        if (!updated) {
            return res.status(404).json({ 
                message: 'Không tìm thấy tin nhắn' 
            });
        }

        res.json(updated);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'ID tin nhắn không hợp lệ' 
            });
        }
        res.status(500).json({ message: 'Lỗi cập nhật tin nhắn', error });
    }
};

const deleteMessageHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const message = await TinNhan.findById(id);
        if (!message) {
            return res.status(404).json({ 
                message: 'Không tìm thấy tin nhắn' 
            });
        }

        const deleted = await TinNhan.findByIdAndUpdate(
            id,
            { noiDung: '[deleted]', trangThai: 'deleted' },
            { new: true }
        )
        .populate('nguoiGuiId')
        .populate('roomId');


        res.json(deleted);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'ID tin nhắn không hợp lệ' 
            });
        }
        res.status(500).json({ message: 'Lỗi xóa tin nhắn', error });
    }
};


const markMessageAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await TinNhan.findByIdAndUpdate(
            id,
            { daDoc: true },
            { new: true }
        )
        .populate('nguoiGuiId')
        .populate('roomId');

        if (!updated) {
            return res.status(404).json({ 
                message: 'Không tìm thấy tin nhắn' 
            });
        }

        res.json(updated);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'ID tin nhắn không hợp lệ' 
            });
        }
        res.status(500).json({ message: 'Lỗi đánh dấu tin nhắn đã đọc', error });
    }
};

// Helper functions for socket usage
const createMessage = async (data) => {
    const newMsg = await TinNhan.create(data);
    
    // Thêm tin nhắn vào phòng chat
    await PhongChat.findByIdAndUpdate(
        data.roomId,
        { $push: { tinNhan: newMsg._id } }
    );
    
    const populatedMsg = await TinNhan.findById(newMsg._id)
        .populate('nguoiGuiId')
        .populate('roomId');
    return populatedMsg;
};

const updateMessage = async (id, noiDungMoi) => {
    const updated = await TinNhan.findByIdAndUpdate(
        id,
        { noiDung: noiDungMoi, trangThai: 'edited' },
        { new: true }
    )
    .populate('nguoiGuiId')
    .populate('roomId');
    return updated;
};

const deleteMessage = async (id) => {
    // Tìm tin nhắn để lấy roomId
    const message = await TinNhan.findById(id);
    
    const deleted = await TinNhan.findByIdAndUpdate(
        id,
        { noiDung: '[deleted]', trangThai: 'deleted' },
        { new: true }
    )
    .populate('nguoiGuiId')
    .populate('roomId');
    

    
    return deleted;
};

module.exports = {
    getMessages,
    createMessageHandler,
    updateMessageHandler,
    deleteMessageHandler,
    markMessageAsRead,
    createMessage,
    updateMessage,
    deleteMessage,
    getAllMessages
};
