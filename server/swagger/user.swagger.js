/**
 * @swagger
 * tags:
 *   name: User
 *   description: API quản lý người dùng
 */

/**
 * @swagger
 * /api/user/getAllUser:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Nguoidung'
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/user/deleteUser/{id}:
 *   delete:
 *     summary: Xoá người dùng theo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID người dùng cần xoá
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       500:
 *         description: Lỗi server
 */
