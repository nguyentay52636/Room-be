# Giới thiệu

Room-BE là backend API cho hệ thống quản lý phòng trọ, hỗ trợ các chức năng quản lý người dùng, vai trò, khách thuê, chủ nhà, nhân viên và các nghiệp vụ liên quan đến vận hành nhà trọ. Dự án sử dụng Node.js, Express và MongoDB.

## Tính năng chính

- Đăng ký, đăng nhập, xác thực người dùng
- Quản lý thông tin người dùng (CRUD)
- Phân quyền theo vai trò: admin, nhân viên, người thuê, chủ trọ
- Tự động tạo bản ghi liên quan (Khách Hàng, Chủ Nhà, Nhân Viên) khi tạo user mới theo vai trò
- Mã hóa mật khẩu bằng bcrypt
- Kiểm tra trùng email, tên đăng nhập khi đăng ký
- Quản lý trạng thái hoạt động của người dùng

## Cấu trúc thư mục MVC

- `controllers/`: Chứa các controller xử lý logic nghiệp vụ (ví dụ: userController.js)
- `models/`: Định nghĩa các schema cho MongoDB (User, VaiTro, KhachHang, ChuTNha, NhanVien, ...)
- `middleware/`: Các middleware xác thực, kiểm tra dữ liệu
- `routes/`: Định nghĩa các route API

## Công nghệ sử dụng

- Node.js
- Express.js
- MongoDB (Mongoose)
- Bcrypt (mã hóa mật khẩu)
- JWT (nếu có xác thực token)
- Các thư viện hỗ trợ khác

## Hướng dẫn cài đặt

1. Clone dự án:
   ```bash
   git clone <repo-url>
   cd Room-BE/Room/server
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Tạo file `.env` và cấu hình các biến môi trường (ví dụ: MONGODB_URI, JWT_SECRET, ...)

4. Khởi động server:
   ```bash
   npm start
   ```

## Đóng góp

Mọi đóng góp, báo lỗi hoặc đề xuất tính năng mới đều được hoan nghênh! 
