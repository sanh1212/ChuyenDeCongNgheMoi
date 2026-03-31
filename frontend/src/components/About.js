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

  const fields = info ? [
    { label: 'Họ và tên',    value: info.ten,            highlight: true },
    { label: 'MSSV',         value: info.maSoSinhVien                     },
    { label: 'Lớp',          value: info.lop                              },
    { label: 'Trường',       value: info.truong                           },
    { label: 'Chuyên ngành', value: info.chuyenNganh                     },
  ] : [];

  return (
    <div className="g-card">
      <div className="card-header-bar">
        <div className="icon" style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}>
          👤
        </div>
        <h5>Thông Tin Sinh Viên</h5>
      </div>
      <div className="card-body-pad">
        {error && <div className="alert-err">{error}</div>}

        {!info && !error && (
          <div className="spinner-wrap"><div className="spinner" /></div>
        )}

        {info && (
          <>
            <div className="about-avatar">🎓</div>
            {fields.map(({ label, value, highlight }) => (
              <div className="info-row" key={label}>
                <span className="info-label">{label}</span>
                <span className={`info-value${highlight ? ' highlight' : ''}`}>
                  {value || '—'}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default About;
