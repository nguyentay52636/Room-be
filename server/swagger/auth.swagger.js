/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API xác thực người dùng
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NguoiDung:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         ten:
 *           type: string
 *         email:
 *           type: string
 *         ten_dang_nhap:
 *           type: string
 *         mat_khau:
 *           type: string
 *         so_dien_thoai:
 *           type: string
 *         vai_tro:
 *           type: string
 *           enum: [chu_tro, nguoi_thue, admin]
 *         anh_dai_dien:
 *           type: string
 *         trang_thai:
 *           type: string
 *           enum: [hoat_dong, khoa]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ten
 *               - email
 *               - ten_dang_nhap
 *               - mat_khau
 *               - xac_nhan_mat_khau
 *             properties:
 *               ten:
 *                 type: string
 *               email:
 *                 type: string
 *               ten_dang_nhap:
 *                 type: string
 *               mat_khau:
 *                 type: string
 *                 format: password
 *               xac_nhan_mat_khau:
 *                 type: string
 *                 format: password
 *               so_dien_thoai:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi xác thực hoặc mật khẩu không khớp
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ten_dang_nhap
 *               - mat_khau
 *             properties:
 *               ten_dang_nhap:
 *                 type: string
 *               mat_khau:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai tài khoản hoặc mật khẩu
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Cấp lại access token
 *       403:
 *         description: Token không hợp lệ
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Đăng xuất
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 */
