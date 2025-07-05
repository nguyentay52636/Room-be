// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Property API',
      version: '1.0.0',
      description: 'Swagger tài liệu API cho hệ thống quản lý bất động sản',
    },
    servers: [
      {
        url: 'http://localhost:8000', 
      },
    ],
  },
  apis: ['./swagger/*.swagger.js'], // Đọc từ các file swagger riêng
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
