import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonIcon
} from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Harap isi Email dan Password terlebih dahulu!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://apitugas3.xyz/api/login', {
        email,
        password,
      });

      console.log('Login response:', response.data);

      if (response.data.status && response.data.token) {
        // Simpan token dalam localStorage, sesuai yang dibutuhkan oleh Dompet.tsx
        localStorage.setItem('token', response.data.token);

        alert('Login berhasil!');
        history.push('/home');
      } else {
        alert('Login gagal: Email atau Password salah.');
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        alert('Error: ' + error.response.data.message);
      } else {
        alert('Terjadi kesalahan saat login. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="login-container">
        <div className="form-wrapper">
          <h2 className="login-title">Masuk</h2>

          <p className="input-label">Email:</p>
          <IonItem className="input-container">
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value ?? '')}
              placeholder="Masukkan Email"
            />
          </IonItem>

          <p className="input-label">Password:</p>
          <IonItem className="input-container password-input">
            <IonInput
              type={showPassword ? 'text' : 'password'}
              value={password}
              onIonChange={(e) => setPassword(e.detail.value ?? '')}
              placeholder="Masukkan Password"
            />
            <IonIcon
              slot="end"
              icon={showPassword ? eyeOff : eye}
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </IonItem>

          <IonButton expand="block" className="login-button" onClick={handleLogin} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </IonButton>

          <p className="register-link">
            Belum punya akun?{' '}
            <span onClick={() => history.push('/register')} className="register-action">
              Daftar sekarang
            </span>
            <br />
            <a href="/" className="back-to-home-link">Kembali ke tampilan menu awal</a>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
