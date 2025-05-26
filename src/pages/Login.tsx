import {IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonInput,IonButton,IonItem,IonLabel} from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Tambahkan ini
import '../css/login.css';

const Login: React.FC = () => {
  const history = useHistory(); // Inisialisasi history

  const handleLogin = () => {
    history.push('/home'); // Arahkan ke halaman home
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" />
        </IonItem>
        <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
