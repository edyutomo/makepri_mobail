import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://apitugas3.xyz/api/register', {
        name,
        email,
        password
      });

      if (response.data.success) {
        alert('Pendaftaran berhasil!');
        history.push('/login');
      } else {
        alert('Pendaftaran gagal: ' + response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        alert('Gagal: ' + error.response.data.message);
      } else {
        alert('Terjadi kesalahan saat mendaftar.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Daftar</button>
          
          <button className="back-button" type="button" onClick={() => history.push('/login')}>Kembali</button>

        </form>
      </div>
    </div>
  );
};

export default Register;
