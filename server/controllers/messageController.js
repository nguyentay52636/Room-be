const TinNhan = require('../models/TinNhan');

// Lấy tin nhắn theo roomId
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

// Lấy tất cả tin nhắn
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

// Tạo tin nhắn mới
const createMessageHandler = async (req, res) => {
    try {
        const { roomId, nguoiGuiId, noiDung, hinhAnh, daDoc, trangThai } = req.body;

        if (!roomId || !nguoiGuiId || !noiDung) {
            return res.status(400).json({ 
                message: 'Thiếu thông tin bắt buộc (roomId, nguoiGuiId, noiDung)' 
            });
        }

        // Kiểm tra trạng thái hợp lệ
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
        
        // Populate thông tin để trả về
        const populatedMessage = await TinNhan.findById(newMessage._id)
            .populate('nguoiGuiId')
            .populate('roomId');

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo tin nhắn', error });
    }
};

// Cập nhật tin nhắn
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

// Xóa tin nhắn
const deleteMessageHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await TinNhan.findByIdAndUpdate(
            id,
            { noiDung: '[deleted]', trangThai: 'deleted' },
            { new: true }
        )
        .populate('nguoiGuiId')
        .populate('roomId');

        if (!deleted) {
            return res.status(404).json({ 
                message: 'Không tìm thấy tin nhắn' 
            });
        }

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

// Đánh dấu tin nhắn đã đọc
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
