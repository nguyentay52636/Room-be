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
            res.status(500).json({ message: 'Get all viewings failed', error: err });
        }
    },

    // Tạo mới lịch xem nhà
    createViewing: async (req, res) => {
        try {
            const { nguoiDungId, batDongSanId, thoiGian, ghiChu, trangThai } = req.body;
            const newViewing = new viewings({
                nguoi_dung_id: nguoiDungId,
                bat_dong_san_id: batDongSanId,
                thoi_gian: thoiGian,
                ghi_chu: ghiChu,
                trang_thai: trangThai
            });
            const savedViewing = await newViewing.save();
            res.status(201).json({message : "Created view successfully ",savedViewing});
        } catch (err) {
            res.status(500).json({ message: 'Create viewing failed', error: err });
        }
    },
    // Cập nhật lịch xem nhà
    updateViewing: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedViewing = await viewings.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedViewing) {
                return res.status(404).json({ message: 'Viewing not found' });
            }
            res.status(200).json(updatedViewing);
        } catch (err) {
            res.status(500).json({ message: 'Update viewing failed', error: err });
        }
    },
    // Xóa lịch xem nhà
    deleteViewing: async (req, res) =>{
        try {
            const { id } = req.params;
            const deletedViewing = await viewings.findByIdAndDelete(id);
            if (!deletedViewing) {
                return res.status(404).json({ message: 'Viewing not found' });
            }
            res.status(200).json({ message: 'Delete viewing successfully', viewing: deletedViewing });
        } catch (err) {
            res.status(500).json({ message: 'Delete viewing failed', error: err });
        }
    },
}
module.exports = viewingsController;