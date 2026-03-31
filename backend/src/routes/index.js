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

router.get('/about', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students ORDER BY id ASC LIMIT 1');
    if (rows.length > 0) {
      const student = rows[0];
      res.json({
        ten: student.name,
        maSoSinhVien: student.email.split('@')[0].replace('sanh', ''), // Attempt to extract MSSV from email if available
        lop: student.class,
        truong: 'Đại Học Kiến Trúc Đà Nẵng',
        chuyenNganh: 'Công Nghệ Thông Tin'
      });
    } else {
      res.json({
        ten: 'HUỲNH TRẦN SƠN SANH',
        maSoSinhVien: '2251220109',
        lop: 'K49',
        truong: 'Đại Học Kiến Trúc Đà Nẵng',
        chuyenNganh: 'Công Nghệ Thông Tin'
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

router.put('/api/students/:id', apiLimiter, async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, class: studentClass } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  try {
    const [result] = await pool.query(
      'UPDATE students SET name = ?, email = ?, phone = ?, class = ? WHERE id = ?',
      [name, email, phone || null, studentClass || null, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/api/students/:id', apiLimiter, async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
