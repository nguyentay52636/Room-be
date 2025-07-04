const Review = require('../models/DanhGia');
const mongoose = require('mongoose');
const reviewController = {
    // Lấy tất cả đánh giá
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Review.find()
                .populate('nguoi_dung_id')
                .populate('bat_dong_san_id');
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách đánh giá',   error: err });
        }
    },

    // Lấy đánh giá theo bất động sản
    getReviewsByProperty: async (req, res) => {
        try {
            const reviews = await Review.find({ bat_dong_san_id: req.params.id })
                .populate('nguoi_dung_id');
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi lấy đánh giá', error: err });
        }
    },

    // Lấy đánh giá theo user
    getReviewsByUser: async (req, res) => {
        try {
            const reviews = await Review.find({ nguoi_dung_id: req.params.id })
                .populate('bat_dong_san_id');
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi lấy đánh giá của người dùng', error: err });
        }
    },

    // Tạo mới đánh giá
    createReview: async (req, res) => {
        try {
            const newReview = new Review({
                so_sao: req.body.so_sao,
                binh_luan: req.body.binh_luan,
                nguoi_dung_id: req.body.nguoi_dung_id,
                bat_dong_san_id: req.body.bat_dong_san_id
            });
            const savedReview = await newReview.save();
            res.status(201).json(savedReview);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi tạo đánh giá', error: err });
        }
    },

    // Xóa đánh giá
    deleteReview: async (req, res) => {
        try {
            const deletedReview = await Review.findByIdAndDelete(req.params.id);
            if (!deletedReview) {
                return res.status(404).json({ message: 'Không tìm thấy đánh giá để xóa' });
            }
            res.status(200).json({ message: 'Đã xóa đánh giá thành công', review: deletedReview });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi xóa đánh giá', error: err });
        }
    },

    // Cập nhật đánh giá
    updateReview: async (req, res) => {
        try {
            const updatedReview = await Review.findByIdAndUpdate(
                req.params.id,
                {
                    so_sao: req.body.so_sao,
                    binh_luan: req.body.binh_luan
                },
                { new: true }
            );
            if (!updatedReview) {
                return res.status(404).json({ message: 'Không tìm thấy đánh giá để cập nhật' });
            }
            res.status(200).json(updatedReview);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi cập nhật đánh giá', error: err });
        }
    },

    // Lấy thống kê điểm trung bình và tổng số đánh giá cho một bất động sản
    getRatingStatsByProperty: async (req, res) => {
        try {
            const stats = await Review.aggregate([
                { $match: { bat_dong_san_id: new mongoose.Types.ObjectId(req.params.id) } },
                {
                    $group: {
                        _id: "$bat_dong_san_id",
                        avgRating: { $avg: "$so_sao" },
                        total: { $sum: 1 }
                    }
                }
            ]);
            if (stats.length === 0) {
                return res.status(200).json({ avgRating: 0, total: 0 });
            }
            res.status(200).json(stats[0]);
        } catch (err) {
            console.error("DEBUG ERROR:", err);
            res.status(500).json({ message: 'Lỗi khi lấy thống kê đánh giá', error: err.message || err });
}
    }
};

module.exports = reviewController;