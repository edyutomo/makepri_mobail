import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonTabBar, IonTabButton, IonIcon, IonLabel, IonButtons, IonButton
} from '@ionic/react';
import { homeOutline, walletOutline, personOutline, listOutline, pencilOutline, logOutOutline, arrowBackOutline } from 'ionicons/icons';
import '../css/profile.css';
import EditProfile from './Editprofile';
import logo from '../fto/makepri.png';
import axios from 'axios';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      history.push('/login');
      return;
    }

    setIsLoading(true);
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
      })
      .finally(() => setIsLoading(false));
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
        <IonToolbar className="blue-toolbar">
          <IonButtons slot="start">
            {/* <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} className="header-icon" />
            </IonButton> */}
          </IonButtons>
          <IonTitle className="header-title">Profil Saya</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="blue-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Memuat data profil...</p>
          </div>
        ) : isEditing ? (
          <EditProfile user={user} onSave={handleSave} onCancel={handleCancel} />
        ) : (
          <div className="profile-container fade-in">
            <div className="profile-card slide-up">
              <div className="profile-header">
                <h2 className="profile-title">Profil Saya</h2>
                <div className="profile-img-container pulse">
                  <img 
                    src={user?.foto_profile ?? logo} 
                    alt="Foto Profil" 
                    className="profile-img hover-grow" 
                  />
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Nama:</span>
                  <span className="detail-value">{user?.name ?? 'Administrator'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{user?.email ?? '-'}</span>
                </div>
              </div>

              <div className="profile-actions">
                <button className="edit-btn hover-scale" onClick={handleEdit}>
                  <IonIcon icon={pencilOutline} className="btn-icon" />
                  Edit Profil
                </button>
                <button className="logout-btn hover-scale" onClick={handleLogout}>
                  <IonIcon icon={logOutOutline} className="btn-icon" />
                  Keluar
                </button>
              </div>
            </div>
          </div>
        )}
      </IonContent>

      <IonFooter>
        <IonTabBar className="blue-tabbar">
          <IonTabButton tab="home" onClick={() => history.push('/home')} className="tab-button">
            <IonIcon icon={homeOutline} className="tab-icon" />
            <IonLabel>Beranda</IonLabel>
          </IonTabButton>
          <IonTabButton tab="transaksi" onClick={() => history.push('/transaksi')} className="tab-button">
            <IonIcon icon={listOutline} className="tab-icon" />
            <IonLabel>Transaksi</IonLabel>
          </IonTabButton>
          <IonTabButton tab="dompet" onClick={() => history.push('/dompet')} className="tab-button">
            <IonIcon icon={walletOutline} className="tab-icon" />
            <IonLabel>Dompet</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" onClick={() => history.push('/profile')} className="tab-button">
            <IonIcon icon={personOutline} className="tab-icon" />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default Profile;