const mongoose = require('mongoose');

const BDSchema = new mongoose.Schema({
  tieu_de: String,
  mo_ta: String,
  loai_bds: { type: String, enum: ['can_ho', 'nha_nguyen_can', 'studio', 'penthouse'] , require : true},
  gia: Number,
  dien_tich: Number,
  dia_chi: String,
  tinh_thanh: String,
  quan_huyen: String,
  anh_dai_dien: String,
  trang_thai: { type: String, enum: ['dang_hoat_dong', 'da_cho_thue'], default: 'dang_hoat_dong' },
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },

  // Từ slide
  badge: String,
  subtitle: String,
  features: [
    {
      icon: String,
      text: String,
      color: String
    }
  ],
  overlay: {
    category: String,
    location: String,
    price_display: String,
    rating: Number,
    reviews: Number,
    amenities: [String]
  },
  color_gradient: String
}, { timestamps: true });

module.exports = mongoose.model('BatDongSan', BDSchema);
