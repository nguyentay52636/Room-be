const viewings = require("../models/LichXemNha");
const mongoose = require("mongoose");

const viewingsController = {
  // Lấy tất cả lịch xem nhà
  getAllViewings: async (req, res) => {
    try {
      const viewingsList = await viewings
        .find()
        .populate("nguoiDungId")
        .populate("batDongSanId");
      return res.status(200).json(viewingsList);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Get all viewings failed", error: err });
    }
  },
  getViewingById: async (req, res) => {
    try {
      const { id } = req.params;
      const viewing = await viewings
        .findById(id)
        .populate("nguoiDungId")
        .populate("batDongSanId");
      if (!viewing)
        return res.status(404).json({ message: "Viewing not found" });
      return res.status(200).json(viewing);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Get viewing by id failed", error: err });
    }
  },

  // Tạo mới lịch xem nhà
  createViewing: async (req, res) => {
    try {
      const { nguoiDungId, batDongSanId, thoiGian, ghiChu, trangThai } =
        req.body;
      const newViewing = new viewings({
        nguoiDungId,
        batDongSanId,
        thoiGian,
        ghiChu,
        trangThai,
      });
      const savedViewing = await newViewing.save();
      return res
        .status(201)
        .json({ message: "Created view successfully ", savedViewing });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Create viewing failed", error: err });
    }
  },
  // Cập nhật lịch xem nhà
  updateViewing: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedViewing = await viewings.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedViewing)
        return res.status(404).json({ message: "Viewing not found" });
      return res.status(200).json(updatedViewing);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Update viewing failed", error: err });
    }
  },
  // Xóa lịch xem nhà
  deleteViewing: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedViewing = await viewings.findByIdAndDelete(id);
      if (!deletedViewing)
        return res.status(404).json({ message: "Viewing not found" });
      return res.status(200).json({
        message: "Delete viewing successfully",
        viewing: deletedViewing,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Delete viewing failed", error: err });
    }
  },
};

module.exports = viewingsController;
