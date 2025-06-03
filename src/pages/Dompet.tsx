import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonSpinner,
} from '@ionic/react';
import {
  homeOutline,
  walletOutline,
  personOutline,
  listOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/dompet.css';

const Dompet: React.FC = () => {
  const [dompetList, setDompetList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

useEffect(() => {
  const fetchDompet = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Token tidak ditemukan. Silakan login ulang.');
      history.push('/login');
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/dompet', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      console.log('Respons API:', response.data); // ✅ debug
      setDompetList(response.data.data || []);
    } catch (error: any) {
      console.error('Gagal mengambil data dompet:', error);

      if (error.response) {
        console.error('Error Response:', error.response);
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }

      alert('Gagal mengambil data dompet. Silakan login ulang.');
      localStorage.removeItem('token');
      history.push('/login');
    } finally {
      setLoading(false);
    }
  };

  fetchDompet();
}, []);

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

          {loading ? (
            <IonSpinner name="crescent" />
          ) : (
            <div className="dompet-list">
              {dompetList.length === 0 ? (
                <p>Belum ada data dompet.</p>
              ) : (
                dompetList.map((dompet, index) => (
                  <div className={`dompet-card ${index % 2 === 0 ? 'biru' : 'putih'}`} key={dompet.id}>
                    <p>{dompet.nama}</p>
                    <span>Rp {Number(dompet.saldo).toLocaleString('id-ID')}</span>
                  </div>
                ))
              )}
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

export default Dompet;
