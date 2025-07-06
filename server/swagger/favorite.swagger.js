/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: API quản lý danh sách yêu thích
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nguoi_dung_id:
 *           type: string
 *           description: ID người dùng
 *         bat_dong_san_id:
 *           type: string
 *           description: ID bất động sản
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/favorite/createFavorite:
 *   post:
 *     summary: Thêm bất động sản vào danh sách yêu thích
 *     tags: [Favorite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nguoi_dung_id
 *               - bat_dong_san_id
 *             properties:
 *               nguoi_dung_id:
 *                 type: string
 *               bat_dong_san_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã thêm vào danh sách yêu thích
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Dữ liệu thiếu hoặc đã tồn tại
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/favorite/deleteFavorite:
 *   delete:
 *     summary: Xoá bất động sản khỏi danh sách yêu thích
 *     tags: [Favorite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nguoi_dung_id
 *               - bat_dong_san_id
 *             properties:
 *               nguoi_dung_id:
 *                 type: string
 *               bat_dong_san_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã xoá khỏi danh sách yêu thích
 *       404:
 *         description: Không tìm thấy mục yêu thích
 *       500:
 *         description: Lỗi server
 */
