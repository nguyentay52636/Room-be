const Review = require("../models/DanhGia");
const NguoiDung = require("../models/nguoidung");
const BatDongSan = require("../models/BatDongSan");
const mongoose = require("mongoose");
const reviewController = {
  // Lấy tất cả đánh giá
  getAllReviews: async (req, res) => {
    try {
      const reviews = await Review.find()
        .populate("nguoiDungId")
        .populate("batDongSanId");
      return res
        .status(200)
        .json({ message: "get successful review list", reviews });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error while getting review list", error: err.message });
    }
  },

  // Lấy đánh giá theo ID
  getReviewById: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id)
        .populate("nguoiDungId")
        .populate("batDongSanId");
      if (!review) return res.status(404).json({ message: "Review not found" });
      return res
        .status(200)
        .json({ message: "Get review by id successfully", review });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error while getting review by ID", error: err });
    }
  },

  // Lấy đánh giá theo bất động sản
  getReviewsByProperty: async (req, res) => {
    try {
      const reviews = await Review.find({
        batDongSanId: req.params.propertyId,
      }).populate("nguoiDungId");
      return res
        .status(200)
        .json({ message: "Get review by property successfully", reviews });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error while getting review by Id", error: err });
    }
  },

  // Lấy đánh giá theo user
  getReviewsByUser: async (req, res) => {
    try {
      const reviews = await Review.find({
        nguoiDungId: req.params.userId,
      }).populate("batDongSanId");
      return res
        .status(200)
        .json({ message: "Get review by user successfully", reviews });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error while getting review by User", error: err });
    }
  },

  // Tạo mới đánh giá
  createReview: async (req, res) => {
    try {
      const user = await NguoiDung.findById(req.body.nguoiDungId);
      if (!user) return res.status(404).json({ message: "User not found" });
      const property = await BatDongSan.findById(req.body.batDongSanId);
      if (!property)
        return res.status(404).json({ message: "Property not found" });
      const { soSao, binhLuan, nguoiDungId, batDongSanId } = req.body;
      if (!soSao || !binhLuan || !nguoiDungId || !batDongSanId) {
        return res
          .status(400)
          .json({ message: "Missing information needed review" });
      }
      const newReview = new Review({
        soSao,
        binhLuan,
        nguoiDungId,
        batDongSanId,
      });
      const savedReview = await newReview.save();
      return res
        .status(201)
        .json({ message: "Create review successfully", data: savedReview });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Create review failed", error: err });
    }
  },

  // Xóa đánh giá
  deleteReview: async (req, res) => {
    try {
      const deletedReview = await Review.findByIdAndDelete(req.params.id);
      if (!deletedReview)
        return res.status(404).json({ message: "Review not found" });
      return res.status(200).json({
        message: "Review deleted successfully",
        review: deletedReview,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error deleting review", error: err });
    }
  },

  // Cập nhật đánh giá
  updateReview: async (req, res) => {
    try {
      const { soSao, binhLuan } = req.body;
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        {
          soSao,
          binhLuan,
        },
        { new: true }
      );
      if (!updatedReview)
        return res.status(404).json({ message: "Review not found" });
      return res
        .status(200)
        .json({ message: "update succesfully", updatedReview });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error updating review", error: err });
    }
  },

  // Lấy thống kê điểm trung bình và tổng số đánh giá cho một bất động sản
  getRatingStatsByProperty: async (req, res) => {
    try {
      const stats = await Review.aggregate([
        {
          $match: {
            batDongSanId: new mongoose.Types.ObjectId(req.params.propertyId),
          },
        },
        {
          $group: {
            _id: "$batDongSanId",
            avgRating: { $avg: "$soSao" },
            total: { $sum: 1 },
          },
        },
      ]);
      if (stats.length === 0) {
        return res.status(200).json({ avgRating: 0, total: 0 });
      }
      return res.status(200).json(stats[0]);
    } catch (err) {
      return res.status(500).json({
        message: "Get rating stats failed",
        error: err.message || err,
      });
    }
  },
};

module.exports = reviewController;
