const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    ten: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    ten_dang_nhap: Joi.string().required(),
    mat_khau: Joi.string().min(6).required(),
    xac_nhan_mat_khau: Joi.any().valid(Joi.ref('mat_khau')).required().messages({
      'any.only': 'Mật khẩu xác nhận không khớp'
    }),
    so_dien_thoai: Joi.string().pattern(/^[0-9]{10,11}$/).required()
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    ten_dang_nhap: Joi.string().required(),
    mat_khau: Joi.string().required()
  });

  return schema.validate(data);
};


module.exports = { registerValidation, loginValidation };
