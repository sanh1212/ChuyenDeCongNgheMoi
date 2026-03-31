import React from 'react';
import About from './components/About';
import HealthCheck from './components/HealthCheck';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="badge-devops">🚀 DevOps Mini Project</div>
        <h1>Hệ Thống Quản Lý Sinh Viên</h1>
        <p>Quản lý danh sách sinh viên với kiến trúc fullstack hiện đại</p>
      </header>

      {/* ── Health Status ── */}
      <div style={{ marginBottom: '1.5rem' }}>
        <HealthCheck />
      </div>

      {/* ── Main Grid ── */}
      <div className="main-grid">
        <About />
        <StudentList />
      </div>

      {/* ── Footer ── */}
      <footer className="footer-tag">
        <span>⚡ Built with React · Node.js · MySQL · Docker</span>
      </footer>
    </div>
  );
}

export default App;
