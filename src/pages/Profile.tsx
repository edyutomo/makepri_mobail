import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonTabBar, IonTabButton, IonIcon, IonLabel
} from '@ionic/react';
import { homeOutline, walletOutline, personOutline, listOutline } from 'ionicons/icons';
import '../css/profile.css';
import EditProfile from './Editprofile';
import logo from '../fto/makepri.png';
import axios from 'axios';


const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const history = useHistory();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      history.push('/login');
      return;
    }

    axios.get('https://apitugas3.xyz/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
        } else {
          console.error('Respon gagal:', res.data);
          history.push('/login');
        }
      })
      .catch((err) => {
        console.error('Gagal mengambil data user:', err);
        history.push('/login');
      });
  }, [history, token]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = (updatedUser: any) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <div className="toolbar-content">
          {/* <IonTitle className="toolbar-title">Home</IonTitle> */}
          <img src={logo} alt="Logo" className="toolbar-logo" />
        </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="profile-container">
          {isEditing ? (
            <EditProfile user={user} onSave={handleSave} onCancel={handleCancel} />
          ) : (
            <div className="profile-box">
              <h2>PROFIL</h2>
              <img src={user?.foto_profile ?? logo} alt="Foto Profil" className="profile-img" />
              <h3>{user?.name ?? 'Administrator'}</h3>
              <p>Email: {user?.email ?? '-'}</p>
              <button className="edit-btn" onClick={handleEdit}>
                Edit Profil
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </IonContent>

      <IonFooter>
        <IonTabBar>
          <IonTabButton tab="home" onClick={() => history.push('/home')}>
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="transaksi" onClick={() => history.push('/transaksi')}>
            <IonIcon icon={listOutline} />
            <IonLabel>Transaksi</IonLabel>
          </IonTabButton>
          <IonTabButton tab="dompet" onClick={() => history.push('/dompet')}>
            <IonIcon icon={walletOutline} />
            <IonLabel>Dompet</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" onClick={() => history.push('/profile')}>
            <IonIcon icon={personOutline} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default Profile;
