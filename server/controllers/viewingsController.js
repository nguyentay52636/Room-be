const viewings = require('../models/LichXemNha');
const mongoose = require('mongoose');

const viewingsController = {
    // Lấy tất cả lịch xem nhà
    getAllViewings: async (req, res) => {
        try {
            const viewingsList = await viewings.find()
                .populate('nguoi_dung_id')
                .populate('bat_dong_san_id');
            res.status(200).json(viewingsList);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách lịch xem nhà', error: err });
        }
    },

    // Tạo mới lịch xem nhà
    createViewing: async (req, res) => {
        try {
            const newViewing = new viewings({
                nguoi_dung_id: req.body.nguoi_dung_id,
                bat_dong_san_id: req.body.bat_dong_san_id,
                thoi_gian: req.body.thoi_gian,
                ghi_chu: req.body.ghi_chu,
                trang_thai: req.body.trang_thai
            });
            const savedViewing = await newViewing.save();
            res.status(201).json({message : "Created view successfully ",savedViewing});
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi tạo lịch xem nhà', error: err });
        }
    },
    // Cập nhật lịch xem nhà
    updateViewing: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedViewing = await viewings.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedViewing) {
                return res.status(404).json({ message: 'Không tìm thấy lịch xem nhà để cập nhật' });
            }
            res.status(200).json(updatedViewing);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi cập nhật lịch xem nhà', error: err });
        }
    },
    // Xóa lịch xem nhà
    deleteViewing: async (req, res) =>{
        try {
            const { id } = req.params;
            const deletedViewing = await viewings.findByIdAndDelete(id);
            if (!deletedViewing) {
                return res.status(404).json({ message: 'Không tìm thấy lịch xem nhà để xóa' });
            }
            res.status(200).json({ message: 'Đã xóa lịch xem nhà thành công', viewing: deletedViewing });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi xóa lịch xem nhà', error: err });
        }
    },
}
module.exports = viewingsController;