# DevOps Mini Project

Dự án DevOps mini với Backend (Node.js) + Frontend (React) + Database (MySQL) được triển khai bằng Docker Compose.

## Thông Tin Sinh Viên

| Trường | Giá trị |
|---|---|
| Họ tên | HUỲNH TRẦN SƠN SANH |
| MSSV | 2251220109 |
| Lớp | 22CT3 |
| Trường | Đại Học Kiến Trúc  |
| Chuyên ngành | Công Nghệ Thông Tin |

## Cấu Trúc Dự Án

```
.
├── backend/          # Node.js Express API
├── frontend/         # React application
├── database/         # MySQL init script
├── docker-compose.yml
└── .env.example
```

## Chạy Với Docker Compose

```bash
# Copy file .env
cp .env.example .env

# Khởi động toàn bộ hệ thống
docker-compose up --build

# Truy cập:
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
# Health:   http://localhost:5000/health
# About:    http://localhost:5000/about
```

## API Endpoints

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | /health | Health check |
| GET | /about | Thông tin sinh viên |
| GET | /api/students | Lấy danh sách sinh viên |
| POST | /api/students | Thêm sinh viên mới |

## Biến Môi Trường

Xem file `.env.example` để biết các biến môi trường cần thiết.
