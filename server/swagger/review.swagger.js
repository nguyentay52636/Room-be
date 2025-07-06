/**
 * @swagger
 * tags:
 *   name: Review
 *   description: API quản lý đánh giá bất động sản
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
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
 *         so_sao:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         binh_luan:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/review/getAllReviews:
 *   get:
 *     summary: Lấy tất cả đánh giá
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Danh sách đánh giá
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */

/**
 * @swagger
 * /api/review/getReviewsByProperty/{id}:
 *   get:
 *     summary: Lấy đánh giá theo bất động sản
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID bất động sản
 *     responses:
 *       200:
 *         description: Danh sách đánh giá
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/review/getReviewsByUser/{id}:
 *   get:
 *     summary: Lấy đánh giá theo người dùng
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Danh sách đánh giá
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/review/createReview:
 *   post:
 *     summary: Tạo mới đánh giá
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nguoi_dung_id
 *               - bat_dong_san_id
 *               - so_sao
 *             properties:
 *               nguoi_dung_id:
 *                 type: string
 *               bat_dong_san_id:
 *                 type: string
 *               so_sao:
 *                 type: number
 *               binh_luan:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/review/deleteReview/{id}:
 *   delete:
 *     summary: Xóa đánh giá theo ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID đánh giá
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy
 */

/**
 * @swagger
 * /api/review/updateReview/{id}:
 *   put:
 *     summary: Cập nhật đánh giá
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID đánh giá
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               so_sao:
 *                 type: number
 *               binh_luan:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy đánh giá
 */

/**
 * @swagger
 * /api/review/getRatingStatsByProperty/{id}:
 *   get:
 *     summary: Lấy thống kê đánh giá theo bất động sản
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID bất động sản
 *     responses:
 *       200:
 *         description: Thống kê trung bình và tổng số đánh giá
 */
