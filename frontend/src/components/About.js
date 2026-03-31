import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function About() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/about`)
      .then(res => setInfo(res.data))
      .catch(() => setError('Không thể tải thông tin'));
  }, []);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Thông Tin Sinh Viên</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {info ? (
          <table className="table table-borderless mb-0">
            <tbody>
              <tr><th>Họ tên:</th><td>{info.ten}</td></tr>
              <tr><th>MSSV:</th><td>{info.maSoSinhVien}</td></tr>
              <tr><th>Lớp:</th><td>{info.lop}</td></tr>
              <tr><th>Trường:</th><td>{info.truong}</td></tr>
              <tr><th>Chuyên ngành:</th><td>{info.chuyenNganh}</td></tr>
            </tbody>
          </table>
        ) : !error && (
          <div className="text-center"><div className="spinner-border text-primary" /></div>
        )}
      </div>
    </div>
  );
}

export default About;
