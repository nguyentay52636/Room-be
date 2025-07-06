const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    ten: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    tenDangNhap: Joi.string().required(),
    matKhau: Joi.string().min(6).required(),
    xacNhanMatKhau: Joi.any().valid(Joi.ref('matKhau')).required().messages({
      'any.only': 'Mật khẩu xác nhận không khớp'
    }),
    soDienThoai: Joi.string().pattern(/^[0-9]{10,11}$/).required()
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    tenDangNhap: Joi.string().required(),
    matKhau: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
