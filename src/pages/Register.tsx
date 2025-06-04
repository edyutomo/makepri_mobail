import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('Password minimal 6 karakter');
      return;
    }

    setLoading(true);
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
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          // error validation dari Laravel biasanya ada di errors object
          const messages = Object.values(error.response.data.errors).flat().join('\n');
          alert('Gagal: ' + messages);
        } else if (error.response.data.message) {
          alert('Gagal: ' + error.response.data.message);
        } else {
          alert('Terjadi kesalahan saat mendaftar.');
        }
      } else {
        alert('Terjadi kesalahan saat mendaftar.');
      }
    } finally {
      setLoading(false);
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
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Daftar'}
          </button>
          
          <button className="back-button" type="button" onClick={() => history.push('/login')}>
            Kembali
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
