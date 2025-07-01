const mongoose = require('mongoose');

const BDSTienIchSchema = new mongoose.Schema({
  bat_dong_san_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BatDongSan' },
  tien_ich_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TienIch' }
});

module.exports = mongoose.model('BatDongSan_TienIch', BDSTienIchSchema);
