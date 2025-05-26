import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, walletOutline, personOutline, listOutline } from 'ionicons/icons';
import '../css/dompet.css';
import { useHistory } from 'react-router-dom';
const Dompet: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dompet Saya</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="dompet">
          <h3>Dompet Saya</h3>
          <div className="dompet-list">
            <div className="dompet-card biru">
              <p>Uang Tunai<br />Uang cash di dompet</p>
              <span>Rp*******</span>
            </div>
            <div className="dompet-card putih">
              <p>DANA</p>
              <span>Rp*******</span>
            </div>
            <div className="dompet-card putih">
              <p>SIMPANAN DARURAT</p>
              <span>Rp*******</span>
            </div>
            <div className="dompet-card kuning">
              <p>Deposito BNI<br />Dana Pensiun :D :P</p>
              <span>Rp*******</span>
            </div>
          </div>

          <h4>Pemasukan berdasarkan kategori</h4>
          <div className="pemasukan-kategori">
            <div className="kategori-item">
              <span>Deposit</span>
              <span>Rp****</span>
            </div>
            <div className="kategori-item">
              <span>Gaji</span>
              <span>Rp****</span>
            </div>
            <div className="kategori-item">
              <span>Tunjangan</span>
              <span>Rp****</span>
            </div>
          </div>
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

export default Dompet;
