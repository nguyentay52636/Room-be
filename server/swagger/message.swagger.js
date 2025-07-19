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
 *     Message:
 *       type: object
 *       required:
 *         - nguoiGuiId
 *         - nguoiNhanId
 *         - noiDung
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của tin nhắn
 *           example: ""
 *         nguoiGuiId:
 *           $ref: '#/components/schemas/UserInfo'
 *           description: Thông tin người gửi tin nhắn
 *         nguoiNhanId:
 *           $ref: '#/components/schemas/UserInfo'
 *           description: Thông tin người nhận tin nhắn
 *         noiDung:
 *           type: string
 *           maxLength: 500
 *           description: Nội dung tin nhắn
 *           example: ""
 *         hinhAnh:
 *           type: string
 *           description: URL hình ảnh đính kèm (tùy chọn)
 *           example: ""
 *         daDoc:
 *           type: boolean
 *           default: false
 *           description: Trạng thái đã đọc tin nhắn
 *         trangThai:
 *           type: string
 *           enum: [sent, delivered, read, edited, deleted]
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
 *         - nguoiGuiId
 *         - nguoiNhanId
 *         - noiDung
 *       properties:
 *         nguoiGuiId:
 *           type: string
 *           description: ID người gửi tin nhắn
 *           example: ""
 *         nguoiNhanId:
 *           type: string
 *           description: ID người nhận tin nhắn
 *           example: ""
 *         noiDung:
 *           type: string
 *           maxLength: 500
 *           description: Nội dung tin nhắn
 *           example: ""
 *         hinhAnh:
 *           type: string
 *           description: URL hình ảnh đính kèm (tùy chọn)
 *           example: ""
 *         daDoc:
 *           type: boolean
 *           default: false
 *           description: Trạng thái đã đọc tin nhắn
 *         trangThai:
 *           type: string
 *           enum: [sent, delivered, read, edited, deleted]
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
 *           example: ""
 */

/**
 * @swagger
 * /api/message/{sender}/{receiver}:
 *   get:
 *     summary: Lấy tất cả tin nhắn giữa hai người dùng
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: sender
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người gửi
 *         example: ""
 *       - in: path
 *         name: receiver
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người nhận
 *         example: ""
 *     responses:
 *       200:
 *         description: Danh sách tin nhắn giữa hai người dùng (sắp xếp theo thời gian tạo) với thông tin đầy đủ của người gửi và người nhận
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *             examples:
 *               success:
 *                 summary: Ví dụ danh sách tin nhắn với thông tin người dùng đầy đủ
 *                 value:
 *                   - _id: ""
 *                     nguoiGuiId:
 *                       _id: ""
 *                       ten: ""
 *                       email: ""
 *                       tenDangNhap: ""
 *                       anhDaiDien: ""
 *                       soDienThoai: ""
 *                       trangThai: ""
 *                     nguoiNhanId:
 *                       _id: ""
 *                       ten: ""
 *                       email: ""
 *                       tenDangNhap: ""
 *                       anhDaiDien: ""
 *                       soDienThoai: ""
 *                       trangThai: ""
 *                     noiDung: ""
 *                     hinhAnh: ""
 *                     daDoc: false
 *                     trangThai: "sent"
 *                     createdAt: ""
 *                     updatedAt: ""
 *       500:
 *         description: Lỗi lấy tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ""
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
 *         description: Lấy tất cả tin nhắn thành công với thông tin đầy đủ của người gửi và người nhận
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ""
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
 *                   example: ""
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
 *                 nguoiGuiId: ""
 *                 nguoiNhanId: ""
 *                 noiDung: ""
 *                 hinhAnh: ""
 *                 daDoc: false
 *                 trangThai: "sent"
 *             simple_message:
 *               summary: Tin nhắn chỉ có các field bắt buộc
 *               value:
 *                 nguoiGuiId: ""
 *                 nguoiNhanId: ""
 *                 noiDung: ""
 *             image_message:
 *               summary: Tin nhắn có hình ảnh
 *               value:
 *                 nguoiGuiId: ""
 *                 nguoiNhanId: ""
 *                 noiDung: ""
 *                 hinhAnh: ""
 *                 daDoc: false
 *                 trangThai: "sent"
 *     responses:
 *       201:
 *         description: Tin nhắn được tạo thành công với thông tin đầy đủ của người gửi và người nhận
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               _id: ""
 *               nguoiGuiId:
 *                 _id: ""
 *                 ten: ""
 *                 email: ""
 *                 tenDangNhap: ""
 *                 anhDaiDien: ""
 *                 soDienThoai: ""
 *                 trangThai: ""
 *               nguoiNhanId:
 *                 _id: ""
 *                 ten: ""
 *                 email: ""
 *                 tenDangNhap: ""
 *                 anhDaiDien: ""
 *                 soDienThoai: ""
 *                 trangThai: ""
 *               noiDung: ""
 *               hinhAnh: ""
 *               daDoc: false
 *               trangThai: "sent"
 *               createdAt: ""
 *               updatedAt: ""
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
 *                   message: ""
 *               invalid_status:
 *                 summary: Trạng thái không hợp lệ
 *                 value:
 *                   message: ""
 *       500:
 *         description: Lỗi tạo tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ""
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/message/{id}:
 *   put:
 *     summary: Cập nhật nội dung tin nhắn
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần cập nhật
 *         example: ""
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageUpdate'
 *           example:
 *             noiDungMoi: ""
 *     responses:
 *       200:
 *         description: Tin nhắn được cập nhật thành công với thông tin đầy đủ của người gửi và người nhận
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               _id: ""
 *               nguoiGuiId:
 *                 _id: ""
 *                 ten: ""
 *                 email: ""
 *                 tenDangNhap: ""
 *                 anhDaiDien: ""
 *                 soDienThoai: ""
 *                 trangThai: ""
 *               nguoiNhanId:
 *                 _id: ""
 *                 ten: ""
 *                 email: ""
 *                 tenDangNhap: ""
 *                 anhDaiDien: ""
 *                 soDienThoai: ""
 *                 trangThai: ""
 *               noiDung: ""
 *               hinhAnh: ""
 *               daDoc: false
 *               trangThai: "edited"
 *               createdAt: ""
 *               updatedAt: ""
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
 *                   message: ""
 *               missing_content:
 *                 summary: Thiếu nội dung
 *                 value:
 *                   message: ""
 *       404:
 *         description: Không tìm thấy tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ""
 *       500:
 *         description: Lỗi cập nhật tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ""
 *                 error:
 *                   type: object
 *   delete:
 *     summary: Xóa tin nhắn (soft delete)
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần xóa
 *         example: ""
 *     responses:
 *       200:
 *         description: Tin nhắn được xóa thành công (soft delete - nội dung thay đổi thành '[deleted]') với thông tin đầy đủ của người gửi và người nhận
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               _id: ""
 *               nguoiGuiId:
 *                 _id: ""
 *                 ten: ""
 *                 email: ""
 *                 tenDangNhap: ""
 *                 anhDaiDien: ""
 *                 soDienThoai: ""
 *                 trangThai: ""
 *               nguoiNhanId:
 *                 _id: ""
 *                 ten: ""
 *                 email: ""
 *                 tenDangNhap: ""
 *                 anhDaiDien: ""
 *                 soDienThoai: ""
 *                 trangThai: ""
 *               noiDung: "[deleted]"
 *               hinhAnh: ""
 *               daDoc: false
 *               trangThai: "deleted"
 *               createdAt: ""
 *               updatedAt: ""
 *       400:
 *         description: ID tin nhắn không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ""
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
 *                   example: ""
 *       500:
 *         description: Lỗi xóa tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ""
 *                 error:
 *                   type: object
 */
