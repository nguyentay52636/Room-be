const Favorite = require('../models/YeuThich');

const favoriteController = {
  // Thêm vào yêu thích
  createFavorite: async (req, res) => {
    try {
      const { nguoi_dung_id, bat_dong_san_id } = req.body;

      if (!nguoi_dung_id || !bat_dong_san_id) {
        return res.status(400).json({ message: 'Missing user ID or property ID' });
      }

      const existingFavorite = await Favorite.findOne({ nguoi_dung_id, bat_dong_san_id });
      if (existingFavorite) {
        return res.status(400).json({ message: 'Already in favorites' });
      }

      const newFavorite = new Favorite({ nguoi_dung_id, bat_dong_san_id });
      await newFavorite.save();
      res.status(201).json({ message: 'Added to favorites', favorite: newFavorite });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Xoá khỏi yêu thích
  deleteFavorite: async (req, res) => {
    try {
      const { nguoi_dung_id, bat_dong_san_id } = req.body;

      const deleted = await Favorite.findOneAndDelete({ nguoi_dung_id, bat_dong_san_id });

      if (!deleted) {
        return res.status(404).json({ message: 'Favorite not found' });
      }

      res.status(200).json({ message: 'Removed from favorites' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = favoriteController;
