/**
 * @swagger
 * tags:
 *   name: Property
 *   description: API quản lý bất động sản
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       required:
 *         - tieu_de
 *         - mo_ta
 *         - loai_bds
 *         - gia
 *         - dien_tich
 *         - dia_chi
 *         - tinh_thanh
 *         - quan_huyen
 *         - anh_dai_dien
 *         - phong_ngu
 *         - phong_tam
 *         - cho_dau_xe
 *         - nguoi_dung_id
 *       properties:
 *         tieu_de:
 *           type: string
 *         mo_ta:
 *           type: string
 *         loai_bds:
 *           type: string
 *           enum: [can_ho, nha_nguyen_can, studio, penthouse]
 *         gia:
 *           type: number
 *         dien_tich:
 *           type: number
 *         dia_chi:
 *           type: string
 *         tinh_thanh:
 *           type: string
 *         quan_huyen:
 *           type: string
 *         anh_dai_dien:
 *           type: string
 *         gallery:
 *           type: array
 *           items:
 *             type: string
 *         phong_ngu:
 *           type: number
 *         phong_tam:
 *           type: number
 *         cho_dau_xe:
 *           type: number
 *         trang_thai:
 *           type: string
 *           enum: [dang_hoat_dong, da_cho_thue]
 *         nguoi_dung_id:
 *           type: string
 *         badge:
 *           type: string
 *         subtitle:
 *           type: string
 *         features:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               icon:
 *                 type: string
 *               text:
 *                 type: string
 *               color:
 *                 type: string
 *         overlay:
 *           type: object
 *           properties:
 *             category:
 *               type: string
 *             location:
 *               type: string
 *             price_display:
 *               type: string
 *             rating:
 *               type: number
 *             reviews:
 *               type: number
 *             amenities:
 *               type: array
 *               items:
 *                 type: string
 *         color_gradient:
 *           type: string
 *         thong_tin_chi_tiet:
 *           type: object
 *           properties:
 *             tang:
 *               type: string
 *             huong:
 *               type: string
 *             ban_cong:
 *               type: string
 *             noi_that:
 *               type: string
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
 *             $ref: '#/components/schemas/Property'
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
 *     summary: Lấy thông tin bất động sản theo ID
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID bất động sản
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Không tìm thấy
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/property/updateProperty/{id}:
 *   put:
 *     summary: Cập nhật thông tin bất động sản
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID bất động sản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
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
 *         schema:
 *           type: string
 *         required: true
 *         description: ID bất động sản
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy
 *       500:
 *         description: Lỗi server
 */
