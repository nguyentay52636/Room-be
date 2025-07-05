const mongoose = require('mongoose');

const TienIchSchema = new mongoose.Schema({
  ten: {type : String, require : true},
  mo_ta: { type: String, maxlength: 300 }
  
});

module.exports = mongoose.model('TienIch', TienIchSchema);
