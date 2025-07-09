const KhachHangSchema = new mongoose.Schema({
    nguoiDungId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
      required: true,
      unique: true,
    },
    diaChi: {
      type: String,
      required: true,
    },
    loai: {
      type: String,
      default: "standard",
    },
    tongChiTieu: {
      type: Number,
      default: 0,
    },
    soBdsDangThue: {
      type: Number,
      default: 0,
    },
    soBdsYeuThich: {
      type: Number,
      default: 0,
    },
    soDanhGia: {
      type: Number,
      default: 0,
    },
    diemTrungBinh: {
      type: Number,
      default: 0,
    },
    bdsDangThueHienTai: {
      type: String,
    },
    ngayKetThucHopDong: {
      type: Date,
    },
    lanHoatDongGanNhat: {
      type: Date,
    },
    ghiChu: {
      type: String,
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model("KhachHang", KhachHangSchema);
  