import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

const handleLogin = async () => {
  try {
    const response = await axios.post('https://apitugas3.xyz/api/login', {
      email,
      password,
    });

    if (response.data.status) {
      localStorage.setItem('token', response.data.token);
      alert('Login berhasil!');
      history.push('/home');
    } else {
      alert('Login gagal: ' + response.data.message);
    }
  } catch (error: any) {
    console.error('Error response:', error.response);
    if (error.response && error.response.data && error.response.data.message) {
      alert('Gagal login: ' + error.response.data.message);
    } else if (error.message) {
      alert('Error: ' + error.message);
    } else {
      alert('Terjadi kesalahan saat login.');
    }
  }
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem className="input-container">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem className="input-container">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleLogin}
        >
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
