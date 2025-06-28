const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    versionKey: false, // Không sử dụng __v
    timestamps: true   // Tự động thêm createdAt và updatedAt
  }
);

module.exports = mongoose.model('account', accountSchema);
