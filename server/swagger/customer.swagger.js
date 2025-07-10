/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: API for customer management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - nguoiDungId
 *         - diaChi
 *       properties:
 *         _id:
 *           type: string
 *         nguoiDungId:
 *           type: string
 *           description: User reference (ObjectId)
 *         diaChi:
 *           type: string
 *         loai:
 *           type: string
 *           default: "standard"
 *         tongChiTieu:
 *           type: number
 *           default: 0
 *         soBdsDangThue:
 *           type: number
 *           default: 0
 *         soBdsYeuThich:
 *           type: number
 *           default: 0
 *         soDanhGia:
 *           type: number
 *           default: 0
 *         diemTrungBinh:
 *           type: number
 *           default: 0
 *         bdsDangThueHienTai:
 *           type: string
 *         ngayKetThucHopDong:
 *           type: string
 *           format: date
 *         lanHoatDongGanNhat:
 *           type: string
 *           format: date
 *         ghiChu:
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
 * /api/customer:
 *   get:
 *     summary: Get all customers
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: List of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Get all customers failed
 *   post:
 *     summary: Create a new customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nguoiDungId
 *               - diaChi
 *             properties:
 *               nguoiDungId:
 *                 type: string
 *               diaChi:
 *                 type: string
 *               loai:
 *                 type: string
 *               tongChiTieu:
 *                 type: number
 *               soBdsDangThue:
 *                 type: number
 *               soBdsYeuThich:
 *                 type: number
 *               soDanhGia:
 *                 type: number
 *               diemTrungBinh:
 *                 type: number
 *               bdsDangThueHienTai:
 *                 type: string
 *               ngayKetThucHopDong:
 *                 type: string
 *                 format: date
 *               lanHoatDongGanNhat:
 *                 type: string
 *                 format: date
 *               ghiChu:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer:
 *                   $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Missing required fields or Nguoi dung not found
 *       500:
 *         description: Create customer failed
 */

/**
 * @swagger
 * /api/customer/{id}:  
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer:
 *                   $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Customer not found or invalid ID
 *       500:
 *         description: Get customer by id failed
 *   put:
 *     summary: Update customer
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nguoiDungId:
 *                 type: string
 *               diaChi:
 *                 type: string
 *               loai:
 *                 type: string
 *               tongChiTieu:
 *                 type: number
 *               soBdsDangThue:
 *                 type: number
 *               soBdsYeuThich:
 *                 type: number
 *               soDanhGia:
 *                 type: number
 *               diemTrungBinh:
 *                 type: number
 *               bdsDangThueHienTai:
 *                 type: string
 *               ngayKetThucHopDong:
 *                 type: string
 *                 format: date
 *               lanHoatDongGanNhat:
 *                 type: string
 *                 format: date
 *               ghiChu:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update customer successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer:
 *                   $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Customer not found or Nguoi dung not found
 *       500:
 *         description: Update customer failed
 *   delete:
 *     summary: Delete customer
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Delete customer successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer:
 *                   $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Customer not found or invalid ID
 *       500:
 *         description: Delete customer failed
 */
