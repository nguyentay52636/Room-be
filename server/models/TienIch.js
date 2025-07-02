const mongoose = require('mongoose');

const TienIchSchema = new mongoose.Schema({
  ten: String,
  mo_ta: String
});

module.exports = mongoose.model('TienIch', TienIchSchema);
