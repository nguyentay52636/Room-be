const mongoose = require('mongoose');

const BDSchema = new mongoose.Schema({
  tieu_de: { type: String, required: true }, // Tiêu đề
  mo_ta: { type: String, required: true },   // Mô tả chi tiết
  loai_bds: { 
    type: String, 
    enum: ['can_ho', 'nha_nguyen_can', 'studio', 'penthouse'],
    required: true
  },
  gia: { type: Number, required: true },        // Giá
  dien_tich: { type: Number, required: true },  // Diện tích (m2)
  dia_chi: { type: String, required: true },    // Địa chỉ cụ thể
  tinh_thanh: { type: String, required: true }, // Tỉnh/Thành phố
  quan_huyen: { type: String, required: true }, // Quận/Huyện

  anh_dai_dien: { type: String, required: true }, // Ảnh đại diện (thumbnail)
  gallery: [String], // Mảng link ảnh gallery

  phong_ngu: { type: Number, required: true },    // Số phòng ngủ
  phong_tam: { type: Number, required: true },    // Số phòng tắm
  cho_dau_xe: { type: Number, required: true },   // Số chỗ đậu xe

  trang_thai: { 
    type: String, 
    enum: ['dang_hoat_dong', 'da_cho_thue'], 
    default: 'dang_hoat_dong'
  },

  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung', required: true },

  badge: String, // Nhãn nổi bật
  subtitle: String, // Phụ đề

  features: [
    {
      icon: String,
      text: String,
      color: String
    }
  ], // Các điểm nổi bật

  overlay: {
    category: String,
    location: String,
    price_display: String,
    rating: Number, // Điểm đánh giá trung bình (nếu tính toán động thì không cần lưu ở đây)
    reviews: Number, // Số lượng đánh giá (nếu tính toán động thì không cần lưu ở đây)
    amenities: [String] // Các tiện ích
  },

  color_gradient: String, // Gradient màu cho card (nếu cần)

  // Thông tin bổ sung cho tab "Thông tin chi tiết"
  thong_tin_chi_tiet: {
    tang: String,
    huong: String,
    ban_cong: String,
    noi_that: String
    // ...bổ sung thêm nếu UI có
  }
}, { timestamps: true });

module.exports = mongoose.model('BatDongSan', BDSchema);