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

  const isOk   = status === 'ok';
  const isWait = status === null;

  const dotClass    = isWait ? 'wait' : isOk ? 'ok' : 'err';
  const badgeClass  = isWait ? 'wait' : isOk ? 'ok' : 'err';
  const badgeLabel  = isWait ? 'Đang kiểm tra...' : isOk ? 'Hoạt động' : 'Lỗi kết nối';

  return (
    <div className="g-card">
      <div className="card-header-bar">
        <div className="icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
          🖥️
        </div>
        <h5>Trạng thái hệ thống</h5>
      </div>
      <div className="card-body-pad">
        <div className="health-row">
          <div className={`health-dot ${dotClass}`} />
          <span className="health-label">Backend API</span>
          <span className={`health-badge ${badgeClass}`}>{badgeLabel}</span>
          {status && (
            <code className="health-endpoint">
              GET /health → {`{ "status": "${status}" }`}
            </code>
          )}
        </div>
      </div>
    </div>
  );
}

export default HealthCheck;
