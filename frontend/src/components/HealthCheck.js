import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function HealthCheck() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/health`)
      .then(res => setStatus(res.data.status))
      .catch(() => setStatus('error'));
  }, []);

  const isOk = status === 'ok';
  const badgeClass = status === null ? 'bg-secondary' : isOk ? 'bg-success' : 'bg-danger';
  const label = status === null ? 'Đang kiểm tra...' : isOk ? 'OK' : 'Lỗi';

  return (
    <div className="card shadow-sm">
      <div className="card-body d-flex align-items-center gap-3">
        <h6 className="mb-0">Trạng thái hệ thống:</h6>
        <span className={`badge ${badgeClass} fs-6`}>{label}</span>
        {status && <small className="text-muted">GET /health → {`{ "status": "${status}" }`}</small>}
      </div>
    </div>
  );
}

export default HealthCheck;
