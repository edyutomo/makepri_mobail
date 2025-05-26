import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, walletOutline, personOutline, listOutline } from 'ionicons/icons';
import '../css/profile.css';
import EditProfile from './Editprofile';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    // Simpan perubahan profile di sini
    setIsEditing(false);
  };
  const history = useHistory();
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
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="profile-img"
              />
              <h3>Administrator</h3>
              <p>Email: admin1@gmail.com</p>
              <p>Password: *********</p>
              <button className="edit-btn" onClick={handleEdit}>
                Edit Profil
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
