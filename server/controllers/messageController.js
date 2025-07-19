const TinNhan = require('../models/TinNhan');


const getMessages = async (req, res) => {
    const { sender, receiver } = req.params;

    try {
        const messages = await TinNhan.find({
            $or: [
                { nguoiGuiId: sender, nguoiNhanId: receiver },
                { nguoiGuiId: receiver, nguoiNhanId: sender }
            ]
        })
        .populate('nguoiGuiId')
        .populate('nguoiNhanId')
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
        .populate('nguoiNhanId');
    res.status(200).json({
        message: "Get all messages successfully",
        messages: messages
    });
} catch (error) { 
    res.status(500).json({ message: 'Lỗi lấy tất cả tin nhắn', error });
}
 } 



const createMessageHandler = async (req, res) => {
    try {
        const { nguoiGuiId, nguoiNhanId, noiDung, hinhAnh, daDoc, trangThai } = req.body;

   
        if (!nguoiGuiId || !nguoiNhanId || !noiDung) {
            return res.status(400).json({ 
                message: 'Thiếu thông tin bắt buộc (nguoiGuiId, nguoiNhanId, noiDung)' 
            });
        }

        const validStates = ['sent', 'delivered', 'read', 'edited', 'deleted'];
        if (trangThai && !validStates.includes(trangThai)) {
            return res.status(400).json({ 
                message: 'Trạng thái không hợp lệ. Các giá trị cho phép: ' + validStates.join(', ')
            });
        }

        const messageData = {
            nguoiGuiId,
            nguoiNhanId,
            noiDung,
            hinhAnh: hinhAnh || "",
            daDoc: daDoc !== undefined ? daDoc : false,
            trangThai: trangThai || 'sent'
        };

        const newMessage = await TinNhan.create(messageData);
        
        // Populate user information for the response
        const populatedMessage = await TinNhan.findById(newMessage._id)
            .populate('nguoiGuiId')
            .populate('nguoiNhanId');

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo tin nhắn', error });
    }
};


// Route handler cho PUT /api/message/:id
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
        .populate('nguoiNhanId');

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


// Route handler cho DELETE /api/message/:id
const deleteMessageHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await TinNhan.findByIdAndUpdate(
            id,
            { noiDung: '[deleted]', trangThai: 'deleted' },
            { new: true }
        )
        .populate('nguoiGuiId')
        .populate('nguoiNhanId');

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


// Helper functions for socket usage
const createMessage = async (data) => {
    const newMsg = await TinNhan.create(data);
    const populatedMsg = await TinNhan.findById(newMsg._id)
        .populate('nguoiGuiId')
        .populate('nguoiNhanId');
    return populatedMsg;
};


const updateMessage = async (id, noiDungMoi) => {
    const updated = await TinNhan.findByIdAndUpdate(
        id,
        { noiDung: noiDungMoi, trangThai: 'edited' },
        { new: true }
    )
    .populate('nguoiGuiId')
    .populate('nguoiNhanId');
    return updated;
};


const deleteMessage = async (id) => {
    const deleted = await TinNhan.findByIdAndUpdate(
        id,
        { noiDung: '[deleted]', trangThai: 'deleted' },
        { new: true }
    )
    .populate('nguoiGuiId')
    .populate('nguoiNhanId');
    return deleted;
};

module.exports = {
    getMessages,
    createMessageHandler,
    updateMessageHandler,
    deleteMessageHandler,
    createMessage,
    updateMessage,
    deleteMessage,
    getAllMessages
};
