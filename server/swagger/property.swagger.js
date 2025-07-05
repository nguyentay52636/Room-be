/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của bất động sản
 *         tieu_de:
 *           type: string
 *           description: Tiêu đề bất động sản
 *         mo_ta:
 *           type: string
 *           description: Mô tả bất động sản
 *         gia:
 *           type: number
 *           description: Giá bất động sản
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/property/getAllproperty:
 *   get:
 *     summary: Lấy tất cả bất động sản
 *     tags: [Property]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/property/getpropertyById/{id}:
 *   get:
 *     summary: Lấy bất động sản theo ID
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bất động sản
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Không tìm thấy bất động sản
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/property/createProperty:
 *   post:
 *     summary: Tạo mới bất động sản
 *     tags: [Property]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tieu_de
 *               - mo_ta
 *               - gia
 *             properties:
 *               tieu_de:
 *                 type: string
 *                 description: Tiêu đề bất động sản
 *               mo_ta:
 *                 type: string
 *                 description: Mô tả bất động sản
 *               gia:
 *                 type: number
 *                 description: Giá bất động sản
 *     responses:
 *       201:
 *         description: Đã tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/property/updateProperty/{id}:
 *   put:
 *     summary: Cập nhật bất động sản
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bất động sản
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tieu_de:
 *                 type: string
 *                 description: Tiêu đề bất động sản
 *               mo_ta:
 *                 type: string
 *                 description: Mô tả bất động sản
 *               gia:
 *                 type: number
 *                 description: Giá bất động sản
 *     responses:
 *       200:
 *         description: Đã cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Không tìm thấy bất động sản
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/property/deleteProperty/{id}:
 *   delete:
 *     summary: Xóa bất động sản
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bất động sản
 *     responses:
 *       200:
 *         description: Đã xóa thành công
 *       404:
 *         description: Không tìm thấy bất động sản
 *       500:
 *         description: Lỗi server
 */ 