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
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });
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
        <IonToolbar className="header-toolbar">
          <IonTitle className="header-title">Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="login-container">
        <div className="form-wrapper">
          <div className="logo-container">
            <div className="logo-circle">
              <svg viewBox="0 0 24 24" className="logo-icon">
                <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
              </svg>
            </div>
          </div>
          
          <h2 className="login-title">Selamat Datang di Makepri</h2>
          <p className="login-subtitle">Kelola Keuanganmu Menjadi Lebih Mudah</p>

          <IonItem 
            className={`input-container ${isFocused.email ? 'focused' : ''}`}
            lines="none"
          >
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value ?? '')}
              placeholder="Alamat Email"
              onIonFocus={() => setIsFocused({...isFocused, email: true})}
              onIonBlur={() => setIsFocused({...isFocused, email: false})}
            />
          </IonItem>

          <IonItem 
            className={`input-container ${isFocused.password ? 'focused' : ''}`}
            lines="none"
          >
            <IonInput
              type={showPassword ? 'text' : 'password'}
              value={password}
              onIonChange={(e) => setPassword(e.detail.value ?? '')}
              placeholder="Kata Sandi"
              onIonFocus={() => setIsFocused({...isFocused, password: true})}
              onIonBlur={() => setIsFocused({...isFocused, password: false})}
            />
            <IonIcon
              slot="end"
              icon={showPassword ? eyeOff : eye}
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </IonItem>

          <div className="forgot-password">
            <span onClick={() => history.push('/forgot-password')}>Lupa Kata Sandi?</span>
          </div>

          <IonButton 
            expand="block" 
            className="login-button" 
            onClick={handleLogin} 
            disabled={loading}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              'Masuk'
            )}
          </IonButton>

          <p className="register-link">
            Belum punya akun?{' '}
            <span 
              onClick={() => history.push('/register')} 
              className="register-action"
            >
              Daftar Sekarang
            </span>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;