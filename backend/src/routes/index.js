const express = require('express');
const router = express.Router();
const { rateLimit } = require('express-rate-limit');
const pool = require('../config/database');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.get('/about', (req, res) => {
  res.json({
    ten: 'HUỲNH TRẦN SƠN SANH',
    maSoSinhVien: '2251220109',
    lop: 'K49',
    truong: 'Đại Học Đông Á',
    chuyenNganh: 'Công Nghệ Thông Tin'
  });
});

router.get('/api/students', apiLimiter, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/api/students', apiLimiter, async (req, res) => {
  const { name, email, phone, class: studentClass } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO students (name, email, phone, class) VALUES (?, ?, ?, ?)',
      [name, email, phone || null, studentClass || null]
    );
    res.status(201).json({ id: result.insertId, name, email, phone, class: studentClass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
