import React from 'react';
import About from './components/About';
import HealthCheck from './components/HealthCheck';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">DevOps Mini Project</h1>
      <div className="row g-4">
        <div className="col-12">
          <HealthCheck />
        </div>
        <div className="col-md-5">
          <About />
        </div>
        <div className="col-md-7">
          <StudentList />
        </div>
      </div>
    </div>
  );
}

export default App;
