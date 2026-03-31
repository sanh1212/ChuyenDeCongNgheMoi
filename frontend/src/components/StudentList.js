import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', class: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudents = () => {
    setLoading(true);
    axios.get(`${API_URL}/api/students`)
      .then(res => setStudents(res.data))
      .catch(() => setError('Không thể tải danh sách sinh viên'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    axios.post(`${API_URL}/api/students`, form)
      .then(() => {
        setForm({ name: '', email: '', phone: '', class: '' });
        fetchStudents();
      })
      .catch(err => setError(err.response?.data?.error || 'Lỗi khi thêm sinh viên'));
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">Danh Sách Sinh Viên</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="mb-3">
          <div className="row g-2">
            <div className="col-md-6">
              <input className="form-control" placeholder="Họ tên *" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <input className="form-control" placeholder="Email *" type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <input className="form-control" placeholder="Số điện thoại" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="Lớp" value={form.class}
                onChange={e => setForm({ ...form, class: e.target.value })} />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">Thêm</button>
            </div>
          </div>
        </form>

        {loading ? (
          <div className="text-center"><div className="spinner-border text-success" /></div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr><th>#</th><th>Họ tên</th><th>Email</th><th>SĐT</th><th>Lớp</th></tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted">Chưa có sinh viên</td></tr>
                ) : students.map((s, i) => (
                  <tr key={s.id}>
                    <td>{i + 1}</td><td>{s.name}</td><td>{s.email}</td>
                    <td>{s.phone || '-'}</td><td>{s.class || '-'}</td>
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
