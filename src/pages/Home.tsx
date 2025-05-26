import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, walletOutline, personOutline, listOutline } from 'ionicons/icons';
import Dompet from './Dompet';
import '../css/home.css';
import logo from '../fto/makepri.png';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><img src={logo} alt="Logo" className="home-image" /></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>
              
            </IonTitle>

          </IonToolbar>
        </IonHeader>

        <div className="dashboard">
          <header className="dashboard-header">
            <p>Halo Edy Utami, jangan lupa hura-hura hari ini.</p>
            <div className="aset-saya">
              <span>Aset Saya</span>
              <span className="hidden-balance">Rp*******</span>
            </div>
          </header>

          <section className="grafik">
            <div className="grafik-card">
              <h3>Pemasukan</h3>
              <div className="pie-chart">[Pie Chart Here]</div>
            </div>
            <div className="grafik-card">
              <h3>Pengeluaran</h3>
              <div className="pie-chart">[Pie Chart Here]</div>
            </div>
          </section>

          <section className="transaksi-summary">
            <div className="pemasukan">+ 1.000.000.00</div>
            <div className="pengeluaran">- 50.000.00</div>
          </section>

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

export default Home;
