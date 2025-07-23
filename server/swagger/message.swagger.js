/**
 * @swagger
 * tags:
 *   name: Message
 *   description: API quản lý tin nhắn chat
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
 *     RoomInfo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của phòng chat
 *         tenPhong:
 *           type: string
 *           description: Tên phòng chat
 *         loaiPhong:
 *           type: string
 *           enum: [private, group]
 *           description: Loại phòng chat
 *         thanhVien:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID thành viên
 *         nguoiTao:
 *           type: string
 *           description: ID người tạo phòng
 *         anhDaiDien:
 *           type: string
 *           description: URL ảnh đại diện phòng
 *         tinNhan:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID tin nhắn trong phòng
 *     Message:
 *       type: object
 *       required:
 *         - roomId
 *         - nguoiGuiId
 *         - noiDung
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của tin nhắn
 *           example: "507f1f77bcf86cd799439011"
 *         roomId:
 *           $ref: '#/components/schemas/RoomInfo'
 *           description: Thông tin phòng chat
 *         nguoiGuiId:
 *           $ref: '#/components/schemas/UserInfo'
 *           description: Thông tin người gửi tin nhắn
 *         noiDung:
 *           type: string
 *           maxLength: 500
 *           description: Nội dung tin nhắn
 *           example: "Xin chào mọi người!"
 *         hinhAnh:
 *           type: string
 *           description: URL hình ảnh đính kèm (tùy chọn)
 *           example: "https://example.com/image.jpg"
 *           default: ""
 *         daDoc:
 *           type: boolean
 *           default: false
 *           description: Trạng thái đã đọc tin nhắn
 *         trangThai:
 *           type: string
 *           enum: [sent, edited, deleted]
 *           default: sent
 *           description: Trạng thái tin nhắn
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo tin nhắn
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian cập nhật tin nhắn
 *     MessageCreate:
 *       type: object
 *       required:
 *         - roomId
 *         - nguoiGuiId
 *         - noiDung
 *       properties:
 *         roomId:
 *           type: string
 *           description: ID phòng chat
 *           example: "507f1f77bcf86cd799439011"
 *         nguoiGuiId:
 *           type: string
 *           description: ID người gửi tin nhắn
 *           example: "507f1f77bcf86cd799439012"
 *         noiDung:
 *           type: string
 *           maxLength: 500
 *           description: Nội dung tin nhắn
 *           example: "Xin chào mọi người!"
 *         hinhAnh:
 *           type: string
 *           description: URL hình ảnh đính kèm (tùy chọn)
 *           example: "https://example.com/image.jpg"
 *           default: ""
 *         daDoc:
 *           type: boolean
 *           default: false
 *           description: Trạng thái đã đọc tin nhắn
 *         trangThai:
 *           type: string
 *           enum: [sent, edited, deleted]
 *           default: sent
 *           description: Trạng thái tin nhắn
 *     MessageUpdate:
 *       type: object
 *       required:
 *         - noiDungMoi
 *       properties:
 *         noiDungMoi:
 *           type: string
 *           maxLength: 500
 *           description: Nội dung tin nhắn mới để cập nhật
 *           example: "Nội dung đã được chỉnh sửa"
 */

/**
 * @swagger
 * /api/message/room/{roomId}:
 *   get:
 *     summary: Lấy tất cả tin nhắn trong phòng chat theo roomId
 *     tags: [Message]
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
 *         description: Danh sách tin nhắn trong phòng chat (sắp xếp theo thời gian tạo tăng dần) với thông tin đầy đủ của người gửi và phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Lỗi lấy tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi lấy tin nhắn"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/message:
 *   get:
 *     summary: Lấy tất cả tin nhắn trong hệ thống
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: Lấy tất cả tin nhắn thành công với thông tin đầy đủ của người gửi và phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get all messages successfully"
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       500:
 *         description: Lỗi lấy tất cả tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi lấy tất cả tin nhắn"
 *                 error:
 *                   type: object
 *   post:
 *     summary: Tạo tin nhắn mới
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageCreate'
 *           examples:
 *             text_message:
 *               summary: Tin nhắn text đầy đủ
 *               value:
 *                 roomId: "507f1f77bcf86cd799439011"
 *                 nguoiGuiId: "507f1f77bcf86cd799439012"
 *                 noiDung: "Xin chào mọi người!"
 *                 hinhAnh: ""
 *                 daDoc: false
 *                 trangThai: "sent"
 *             simple_message:
 *               summary: Tin nhắn chỉ có các field bắt buộc
 *               value:
 *                 roomId: "507f1f77bcf86cd799439011"
 *                 nguoiGuiId: "507f1f77bcf86cd799439012"
 *                 noiDung: "Tin nhắn đơn giản"
 *             image_message:
 *               summary: Tin nhắn có hình ảnh
 *               value:
 *                 roomId: "507f1f77bcf86cd799439011"
 *                 nguoiGuiId: "507f1f77bcf86cd799439012"
 *                 noiDung: "Chia sẻ hình ảnh"
 *                 hinhAnh: "https://example.com/image.jpg"
 *                 daDoc: false
 *                 trangThai: "sent"
 *     responses:
 *       201:
 *         description: Tin nhắn được tạo thành công với thông tin đầy đủ của người gửi và phòng chat (tin nhắn cũng được tự động thêm vào phòng chat)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
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
 *                   message: "Thiếu thông tin bắt buộc (roomId, nguoiGuiId, noiDung)"
 *               invalid_status:
 *                 summary: Trạng thái không hợp lệ
 *                 value:
 *                   message: "Trạng thái không hợp lệ. Các giá trị cho phép: sent, edited, deleted"
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
 *         description: Lỗi tạo tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi tạo tin nhắn"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/message/{id}:
 *   put:
 *     summary: Cập nhật nội dung tin nhắn (chỉnh sửa tin nhắn)
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần cập nhật
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageUpdate'
 *           example:
 *             noiDungMoi: "Nội dung đã được chỉnh sửa"
 *     responses:
 *       200:
 *         description: Tin nhắn được cập nhật thành công với thông tin đầy đủ của người gửi và phòng chat (trạng thái tự động chuyển thành 'edited')
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID tin nhắn không hợp lệ hoặc dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               invalid_id:
 *                 summary: ID không hợp lệ
 *                 value:
 *                   message: "ID tin nhắn không hợp lệ"
 *               missing_content:
 *                 summary: Thiếu nội dung
 *                 value:
 *                   message: "Thiếu nội dung tin nhắn mới"
 *       404:
 *         description: Không tìm thấy tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy tin nhắn"
 *       500:
 *         description: Lỗi cập nhật tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi cập nhật tin nhắn"
 *                 error:
 *                   type: object
 *   delete:
 *     summary: Xóa tin nhắn (soft delete - đánh dấu xóa)
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần xóa
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Tin nhắn được xóa thành công (soft delete - nội dung thay đổi thành '[deleted]' và trạng thái thành 'deleted') với thông tin đầy đủ của người gửi và phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID tin nhắn không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID tin nhắn không hợp lệ"
 *                 error:
 *                   type: object
 *       404:
 *         description: Không tìm thấy tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy tin nhắn"
 *       500:
 *         description: Lỗi xóa tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi xóa tin nhắn"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/message/{id}/read:
 *   put:
 *     summary: Đánh dấu tin nhắn đã đọc
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần đánh dấu đã đọc
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Tin nhắn được đánh dấu đã đọc thành công (daDoc = true) với thông tin đầy đủ của người gửi và phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID tin nhắn không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID tin nhắn không hợp lệ"
 *                 error:
 *                   type: object
 *       404:
 *         description: Không tìm thấy tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy tin nhắn"
 *       500:
 *         description: Lỗi đánh dấu tin nhắn đã đọc
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi đánh dấu tin nhắn đã đọc"
 *                 error:
 *                   type: object
 */
