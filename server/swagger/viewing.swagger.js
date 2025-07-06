/**
 * @swagger
 * tags:
 *   name: Viewing
 *   description: API quản lý lịch xem nhà
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Viewing:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của lịch xem nhà
 *         nguoi_dung_id:
 *           type: string
 *           description: ID người dùng đặt lịch
 *         bat_dong_san_id:
 *           type: string
 *           description: ID bất động sản
 *         thoi_gian:
 *           type: string
 *           format: date-time
 *           description: Thời gian xem nhà
 *         ghi_chu:
 *           type: string
 *           description: Ghi chú thêm
 *         trang_thai:
 *           type: string
 *           enum: [cho_xac_nhan, da_xac_nhan, da_huy]
 *           description: Trạng thái lịch xem nhà
 */

/**
 * @swagger
 * /api/viewing/getAllViewing:
 *   get:
 *     summary: Lấy danh sách tất cả lịch xem nhà
 *     tags: [Viewing]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Viewing'
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/viewing/createViewing:
 *   post:
 *     summary: Tạo lịch xem nhà mới
 *     tags: [Viewing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nguoi_dung_id
 *               - bat_dong_san_id
 *               - thoi_gian
 *             properties:
 *               nguoi_dung_id:
 *                 type: string
 *               bat_dong_san_id:
 *                 type: string
 *               thoi_gian:
 *                 type: string
 *                 format: date-time
 *               ghi_chu:
 *                 type: string
 *               trang_thai:
 *                 type: string
 *                 enum: [cho_xac_nhan, da_xac_nhan, da_huy]
 *     responses:
 *       201:
 *         description: Tạo lịch xem nhà thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viewing'
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/viewing/updateViewing/{id}:
 *   put:
 *     summary: Cập nhật lịch xem nhà
 *     tags: [Viewing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của lịch xem nhà
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               thoi_gian:
 *                 type: string
 *                 format: date-time
 *               ghi_chu:
 *                 type: string
 *               trang_thai:
 *                 type: string
 *                 enum: [cho_xac_nhan, da_xac_nhan, da_huy]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viewing'
 *       404:
 *         description: Không tìm thấy lịch xem nhà
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/viewing/deleteViewing/{id}:
 *   delete:
 *     summary: Xoá lịch xem nhà
 *     tags: [Viewing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của lịch xem nhà
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xoá thành công
 *       404:
 *         description: Không tìm thấy lịch xem nhà
 *       500:
 *         description: Lỗi server
 */
