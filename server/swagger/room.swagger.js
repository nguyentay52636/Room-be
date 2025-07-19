/**
 * @swagger
 * tags:
 *   name: Room
 *   description: API quản lý phòng chat
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInfo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của người dùng
 *         ten:
 *           type: string
 *           description: Tên người dùng
 *         email:
 *           type: string
 *           description: Email người dùng
 *         tenDangNhap:
 *           type: string
 *           description: Tên đăng nhập
 *         anhDaiDien:
 *           type: string
 *           description: URL ảnh đại diện
 *         soDienThoai:
 *           type: string
 *           description: Số điện thoại
 *         trangThai:
 *           type: string
 *           description: Trạng thái người dùng
 *     Room:
 *       type: object
 *       required:
 *         - loaiPhong
 *         - thanhVien
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của phòng chat
 *           example: "507f1f77bcf86cd799439011"
 *         tenPhong:
 *           type: string
 *           description: Tên phòng chat
 *           example: "Nhóm chat ABC"
 *         loaiPhong:
 *           type: string
 *           enum: [private, group]
 *           description: Loại phòng chat (private cho chat 1-1, group cho nhóm)
 *           example: "group"
 *         thanhVien:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserInfo'
 *           description: Danh sách thành viên trong phòng chat
 *         nguoiTao:
 *           type: string
 *           description: ID người tạo phòng chat
 *           example: "507f1f77bcf86cd799439012"
 *         anhDaiDien:
 *           type: string
 *           description: URL ảnh đại diện của phòng chat
 *           example: "https://example.com/room-avatar.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo phòng chat
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian cập nhật phòng chat
 *     RoomCreate:
 *       type: object
 *       required:
 *         - loaiPhong
 *         - thanhVien
 *       properties:
 *         tenPhong:
 *           type: string
 *           description: Tên phòng chat (bắt buộc với phòng group)
 *           example: "Nhóm chat ABC"
 *         loaiPhong:
 *           type: string
 *           enum: [private, group]
 *           description: Loại phòng chat
 *           example: "group"
 *         thanhVien:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID thành viên
 *           example: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *         nguoiTao:
 *           type: string
 *           description: ID người tạo phòng
 *           example: "507f1f77bcf86cd799439012"
 *         anhDaiDien:
 *           type: string
 *           description: URL ảnh đại diện phòng
 *           example: "https://example.com/room-avatar.jpg"
 */

/**
 * @swagger
 * /api/room/user/{userId}:
 *   get:
 *     summary: Lấy danh sách phòng chat của người dùng
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *         example: "507f1f77bcf86cd799439012"
 *     responses:
 *       200:
 *         description: Danh sách phòng chat của người dùng (sắp xếp theo thời gian cập nhật mới nhất) với thông tin đầy đủ của thành viên
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *             examples:
 *               success:
 *                 summary: Ví dụ danh sách phòng chat với thông tin đầy đủ
 *                 value:
 *                   - _id: "507f1f77bcf86cd799439011"
 *                     tenPhong: "Nhóm chat ABC"
 *                     loaiPhong: "group"
 *                     thanhVien:
 *                       - _id: "507f1f77bcf86cd799439012"
 *                         ten: "Nguyễn Văn A"
 *                         email: "nguyenvana@example.com"
 *                         tenDangNhap: "nguyenvana"
 *                         anhDaiDien: "https://example.com/avatar1.jpg"
 *                         soDienThoai: "0123456789"
 *                         trangThai: "online"
 *                       - _id: "507f1f77bcf86cd799439013"
 *                         ten: "Trần Thị B"
 *                         email: "tranthib@example.com"
 *                         tenDangNhap: "tranthib"
 *                         anhDaiDien: "https://example.com/avatar2.jpg"
 *                         soDienThoai: "0987654321"
 *                         trangThai: "offline"
 *                     nguoiTao: "507f1f77bcf86cd799439012"
 *                     anhDaiDien: "https://example.com/room-avatar.jpg"
 *                     createdAt: "2023-12-07T10:00:00.000Z"
 *                     updatedAt: "2023-12-07T10:30:00.000Z"
 *                   - _id: "507f1f77bcf86cd799439014"
 *                     tenPhong: null
 *                     loaiPhong: "private"
 *                     thanhVien:
 *                       - _id: "507f1f77bcf86cd799439012"
 *                         ten: "Nguyễn Văn A"
 *                         email: "nguyenvana@example.com"
 *                         tenDangNhap: "nguyenvana"
 *                         anhDaiDien: "https://example.com/avatar1.jpg"
 *                         soDienThoai: "0123456789"
 *                         trangThai: "online"
 *                       - _id: "507f1f77bcf86cd799439015"
 *                         ten: "Lê Văn C"
 *                         email: "levanc@example.com"
 *                         tenDangNhap: "levanc"
 *                         anhDaiDien: "https://example.com/avatar3.jpg"
 *                         soDienThoai: "0555666777"
 *                         trangThai: "online"
 *                     nguoiTao: "507f1f77bcf86cd799439012"
 *                     anhDaiDien: ""
 *                     createdAt: "2023-12-07T09:00:00.000Z"
 *                     updatedAt: "2023-12-07T09:45:00.000Z"
 *       500:
 *         description: Lỗi lấy danh sách phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi lấy danh sách phòng chat"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/room:
 *   post:
 *     summary: Tạo phòng chat mới
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoomCreate'
 *           examples:
 *             group_room:
 *               summary: Tạo phòng chat nhóm đầy đủ
 *               value:
 *                 tenPhong: "Nhóm chat dự án ABC"
 *                 loaiPhong: "group"
 *                 thanhVien: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013", "507f1f77bcf86cd799439014"]
 *                 nguoiTao: "507f1f77bcf86cd799439012"
 *                 anhDaiDien: "https://example.com/room-avatar.jpg"
 *             private_room:
 *               summary: Tạo phòng chat riêng tư (1-1)
 *               value:
 *                 loaiPhong: "private"
 *                 thanhVien: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *                 nguoiTao: "507f1f77bcf86cd799439012"
 *             minimal_group:
 *               summary: Tạo phòng nhóm với thông tin tối thiểu
 *               value:
 *                 tenPhong: "Nhóm chat"
 *                 loaiPhong: "group"
 *                 thanhVien: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *     responses:
 *       201:
 *         description: Phòng chat được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *             example:
 *               _id: "507f1f77bcf86cd799439011"
 *               tenPhong: "Nhóm chat dự án ABC"
 *               loaiPhong: "group"
 *               thanhVien: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013", "507f1f77bcf86cd799439014"]
 *               nguoiTao: "507f1f77bcf86cd799439012"
 *               anhDaiDien: "https://example.com/room-avatar.jpg"
 *               createdAt: "2023-12-07T10:30:00.000Z"
 *               updatedAt: "2023-12-07T10:30:00.000Z"
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               missing_required:
 *                 summary: Thiếu thông tin bắt buộc
 *                 value:
 *                   message: "Thiếu thông tin phòng chat"
 *               invalid_room_type:
 *                 summary: Loại phòng không hợp lệ
 *                 value:
 *                   message: "Loại phòng không hợp lệ. Các giá trị cho phép: private, group"
 *               empty_members:
 *                 summary: Danh sách thành viên trống
 *                 value:
 *                   message: "Danh sách thành viên không được để trống"
 *       500:
 *         description: Lỗi tạo phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi tạo phòng"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/room/{roomId}:
 *   delete:
 *     summary: Xóa phòng chat
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của phòng chat cần xóa
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Phòng chat được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xóa phòng thành công"
 *       400:
 *         description: ID phòng chat không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID phòng chat không hợp lệ"
 *                 error:
 *                   type: object
 *       404:
 *         description: Không tìm thấy phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy phòng chat"
 *       500:
 *         description: Lỗi xóa phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi xóa phòng"
 *                 error:
 *                   type: object
 */
