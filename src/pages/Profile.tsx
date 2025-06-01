import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, walletOutline, personOutline, listOutline } from 'ionicons/icons';
import '../css/profile.css';
import EditProfile from './Editprofile';
import logo from '../fto/makepri.png';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    // Simpan perubahan profile di sini
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token
    history.push('/login'); // Arahkan ke login
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="profile-container">
          {isEditing ? (
            <EditProfile onSave={handleSave} onCancel={handleCancel} />
          ) : (
            <div className="profile-box">
              <h2>PROFIL</h2>
              <img src={logo} alt="Logo Profil" className="profile-img" />
              <h3>Administrator</h3>
              <p>Email: admin1@gmail.com</p>
              <p>Password: *********</p>
              <button className="edit-btn" onClick={handleEdit}>
                Edit Profil
              </button>

              {/* Tombol Logout */}
              <button className="logout-btn" onClick={handleLogout} style={{ marginTop: '1rem', backgroundColor: 'crimson', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none' }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </IonContent>

      {/* Menu Navigasi */}
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
