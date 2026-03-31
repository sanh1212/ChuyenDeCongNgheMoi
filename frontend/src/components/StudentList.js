import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function StudentList() {
  const [students, setStudents]   = useState([]);
  const [form, setForm]           = useState({ name: '', email: '', phone: '', class: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchStudents = () => {
    setLoading(true);
    axios.get(`${API_URL}/api/students`)
      .then(res => setStudents(res.data))
      .catch(() => setError('Không thể tải danh sách sinh viên'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleChange = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (editingId) {
      // Update existing student
      axios.put(`${API_URL}/api/students/${editingId}`, form)
        .then(() => {
          setForm({ name: '', email: '', phone: '', class: '' });
          setEditingId(null);
          fetchStudents();
        })
        .catch(err => setError(err.response?.data?.error || 'Lỗi khi cập nhật sinh viên'))
        .finally(() => setSubmitting(false));
    } else {
      // Create new student
      axios.post(`${API_URL}/api/students`, form)
        .then(() => {
          setForm({ name: '', email: '', phone: '', class: '' });
          fetchStudents();
        })
        .catch(err => setError(err.response?.data?.error || 'Lỗi khi thêm sinh viên'))
        .finally(() => setSubmitting(false));
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      email: student.email,
      phone: student.phone || '',
      class: student.class || ''
    });
    // Scroll to top or just clear any errors
    setError(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
      setError(null);
      axios.delete(`${API_URL}/api/students/${id}`)
        .then(() => {
          fetchStudents();
          // If the user deletes the student they are currently editing, reset the form
          if (editingId === id) {
            setForm({ name: '', email: '', phone: '', class: '' });
            setEditingId(null);
          }
        })
        .catch(err => setError(err.response?.data?.error || 'Lỗi khi xóa sinh viên'));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', email: '', phone: '', class: '' });
    setError(null);
  };

  return (
    <div className="g-card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="card-header-bar">
        <div className="icon" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>
          📋
        </div>
        <h5>Danh Sách Sinh Viên</h5>
        <span style={{
          marginLeft: 'auto',
          background: 'rgba(6,182,212,0.12)',
          color: '#06b6d4',
          border: '1px solid rgba(6,182,212,0.25)',
          borderRadius: '999px',
          fontSize: '0.72rem',
          fontWeight: 600,
          padding: '0.22em 0.75em',
        }}>
          {students.length} sinh viên
        </span>
      </div>

      <div className="card-body-pad">
        {/* Error */}
        {error && <div className="alert-err">⚠️ {error}</div>}

        {/* Add/Edit Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '1.25rem' }}>
          <div className="form-grid">
            <input
              className="st-input"
              placeholder="Họ tên *"
              value={form.name}
              onChange={handleChange('name')}
              required
            />
            <input
              className="st-input"
              placeholder="Email *"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              required
            />
            <input
              className="st-input"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={handleChange('phone')}
            />
            <input
              className="st-input"
              placeholder="Lớp"
              value={form.class}
              onChange={handleChange('class')}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn-add" disabled={submitting} style={{ flex: 1 }}>
              {submitting ? '⏳ Đang lưu...' : (editingId ? '💾 Cập nhật sinh viên' : '➕ Thêm sinh viên')}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="btn-add" 
                onClick={cancelEdit} 
                disabled={submitting}
                style={{ flex: 0.3, background: 'rgba(255,255,255,0.1)', color: '#fff' }}
              >
                Hủy
              </button>
            )}
          </div>
        </form>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: '1rem' }} />

        {/* Table */}
        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : (
          <div className="st-table-wrap">
            <table className="st-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>SĐT</th>
                  <th>Lớp</th>
                  <th style={{ textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="td-empty">
                      📭 Chưa có sinh viên nào trong danh sách
                    </td>
                  </tr>
                ) : students.map((s, i) => (
                  <tr key={s.id}>
                    <td className="td-index">{i + 1}</td>
                    <td className="td-name">{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.phone || '—'}</td>
                    <td>{s.class || '—'}</td>
                    <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <button 
                        onClick={() => handleEdit(s)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', marginRight: '0.5rem', opacity: 0.8 }}
                        title="Sửa"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(s.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: 0.8 }}
                        title="Xóa"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;
