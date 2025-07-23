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
 *         tinNhan:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID tin nhắn trong phòng
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
 *     PrivateRoomRequest:
 *       type: object
 *       required:
 *         - userId1
 *         - userId2
 *       properties:
 *         userId1:
 *           type: string
 *           description: ID người dùng thứ nhất
 *           example: "507f1f77bcf86cd799439012"
 *         userId2:
 *           type: string
 *           description: ID người dùng thứ hai
 *           example: "507f1f77bcf86cd799439013"
 *     AddMessageRequest:
 *       type: object
 *       required:
 *         - messageId
 *       properties:
 *         messageId:
 *           type: string
 *           description: ID tin nhắn cần thêm vào phòng
 *           example: "507f1f77bcf86cd799439014"
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
 * /api/room/{roomId}:
 *   get:
 *     summary: Lấy thông tin phòng chat theo ID
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của phòng chat
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Thông tin phòng chat với tin nhắn được populate và sắp xếp theo thời gian
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
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
 *         description: Lỗi lấy thông tin phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi lấy thông tin phòng chat"
 *                 error:
 *                   type: object
 *   put:
 *     summary: Cập nhật thông tin phòng chat
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của phòng chat cần cập nhật
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenPhong:
 *                 type: string
 *                 description: Tên phòng chat mới
 *                 example: "Tên phòng đã cập nhật"
 *               anhDaiDien:
 *                 type: string
 *                 description: URL ảnh đại diện mới
 *                 example: "https://example.com/new-avatar.jpg"
 *               thanhVien:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Danh sách thành viên mới
 *                 example: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *     responses:
 *       200:
 *         description: Phòng chat được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
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
 *         description: Lỗi cập nhật phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi cập nhật phòng chat"
 *                 error:
 *                   type: object
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
 *         description: Phòng chat được xóa thành công (cùng với tất cả tin nhắn trong phòng)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xóa phòng thành công"
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
 *     responses:
 *       201:
 *         description: Phòng chat được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thiếu thông tin phòng chat"
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
 * /api/room/find-or-create-private:
 *   post:
 *     summary: Tìm hoặc tạo phòng chat private giữa 2 người dùng
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrivateRoomRequest'
 *           example:
 *             userId1: "507f1f77bcf86cd799439012"
 *             userId2: "507f1f77bcf86cd799439013"
 *     responses:
 *       200:
 *         description: Tìm thấy phòng chat private đã tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room:
 *                   $ref: '#/components/schemas/Room'
 *                 isNewRoom:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Phòng chat đã tồn tại"
 *       201:
 *         description: Tạo phòng chat private mới thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room:
 *                   $ref: '#/components/schemas/Room'
 *                 isNewRoom:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tạo phòng chat mới thành công"
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
 *               missing_users:
 *                 summary: Thiếu thông tin người dùng
 *                 value:
 *                   message: "Thiếu thông tin userId1 hoặc userId2"
 *               same_user:
 *                 summary: Cùng một người dùng
 *                 value:
 *                   message: "Không thể tạo phòng chat với chính mình"
 *       500:
 *         description: Lỗi tìm/tạo phòng chat private
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi tìm/tạo phòng chat private"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/room/{roomId}/message:
 *   post:
 *     summary: Thêm tin nhắn vào phòng chat
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của phòng chat
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMessageRequest'
 *           example:
 *             messageId: "507f1f77bcf86cd799439014"
 *     responses:
 *       200:
 *         description: Thêm tin nhắn vào phòng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thêm tin nhắn vào phòng thành công"
 *       404:
 *         description: Không tìm thấy phòng chat hoặc tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               room_not_found:
 *                 summary: Không tìm thấy phòng chat
 *                 value:
 *                   message: "Không tìm thấy phòng chat"
 *               message_not_found:
 *                 summary: Không tìm thấy tin nhắn
 *                 value:
 *                   message: "Không tìm thấy tin nhắn"
 *       500:
 *         description: Lỗi thêm tin nhắn vào phòng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi thêm tin nhắn vào phòng"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/room/{roomId}/message/{messageId}:
 *   delete:
 *     summary: Xóa tin nhắn khỏi phòng chat
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của phòng chat
 *         example: "507f1f77bcf86cd799439011"
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần xóa khỏi phòng
 *         example: "507f1f77bcf86cd799439014"
 *     responses:
 *       200:
 *         description: Xóa tin nhắn khỏi phòng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xóa tin nhắn khỏi phòng thành công"
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
 *         description: Lỗi xóa tin nhắn khỏi phòng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi xóa tin nhắn khỏi phòng"
 *                 error:
 *                   type: object
 */
