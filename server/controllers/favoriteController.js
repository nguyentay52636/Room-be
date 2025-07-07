const Favorite = require("../models/YeuThich");

const favoriteController = {
  // Thêm vào yêu thích
  createFavorite: async (req, res) => {
    try {
      const { nguoiDungId, batDongSanId } = req.body;
      if (!nguoiDungId || !batDongSanId) {
        return res
          .status(400)
          .json({ message: "Missing user ID or property ID" });
      }
      const existingFavorite = await Favorite.findOne({
        nguoiDungId,
        batDongSanId,
      });
      if (existingFavorite) {
        return res.status(400).json({ message: "Already in favorites" });
      }
      const newFavorite = new Favorite({
        nguoiDungId,
        batDongSanId,
      });
      await newFavorite.save();
      return res
        .status(201)
        .json({ message: "Added to favorites", favorite: newFavorite });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  // Lấy yêu thích theo user
  getFavoritesByUser : async (req,res) => {
    try {
      const {userId} = req.params;
      const favorites = await Favorite.find({nguoiDungId: userId});
      return res.status(200).json(favorites);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getAllFavorites : async (req,res) => {
    try {
      const favorites = await Favorite.find();
      return res.status(200).json(favorites);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Xoá khỏi yêu thích
  deleteFavorite: async (req, res) => {
    try {
      const { nguoiDungId, batDongSanId } = req.body;
      const deleted = await Favorite.findOneAndDelete({
        nguoiDungId,
        batDongSanId,
      });
      if (!deleted) {
        return res.status(404).json({ message: "Favorite not found" });
      }
      return res.status(200).json({ message: "Removed from favorites" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = favoriteController;
