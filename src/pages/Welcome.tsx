import React from 'react';
import { Link } from 'react-router-dom';
import '../css/welcome.css';
import logo from '../fto/makepri.png';

const Welcome: React.FC = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <img src={logo} alt="Logo" className="welcome-image" />
        <h1>SELAMAT DATANG DI<span className="highlight"> MANAGEMENT KEUANGAN PRIBADI</span></h1>
        <p>Kelola keuangan pribadimu dengan lebih mudah dan efisien.</p>
        <div className="btn-container">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
