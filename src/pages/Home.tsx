import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, walletOutline, personOutline, listOutline, eye, eyeOff } from 'ionicons/icons';
import axios from 'axios';
import '../css/home.css';
import logo from '../fto/makepri.png';

const Home: React.FC = () => {
  const history = useHistory();
  const [showBalance, setShowBalance] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [totalAset, setTotalAset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          history.push('/login');
          return;
        }

        setIsLoading(true);
        
        // Mock data untuk demo
        setUserData({ name: "Nama Pengguna" });
        setTotalAset(12500000);
        setTotalPemasukan(8500000);
        setTotalPengeluaran(4000000);
        
        // Simulasi loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error('Gagal memuat data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, [history]);

  const pemasukanPercentage = totalAset > 0 ? (totalPemasukan / totalAset) * 100 : 0;
  const pengeluaranPercentage = totalAset > 0 ? (totalPengeluaran / totalAset) * 100 : 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="blue-toolbar">
          <div className="toolbar-content">
            <img src={logo} alt="Logo" className="toolbar-logo pulse" />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="blue-background">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Memuat data...</p>
          </div>
        ) : (
          <div className="dashboard">
            <p className="welcome-message slide-in">Halo {userData?.name || 'Pengguna'}, selamat datang kembali!</p>
            
            <div className="balance-card pop-in">
              <div className="aset-saya">
                <span>Total Aset: </span>
                <span className="balance-display">
                  {showBalance ? `Rp${totalAset.toLocaleString('id-ID')}` : 'Rp••••••••'}
                </span>
                <IonIcon
                  icon={showBalance ? eyeOff : eye}
                  onClick={() => setShowBalance(!showBalance)}
                  className="eye-icon hover-grow"
                />
              </div>
            </div>

            <section className="grafik-container">
              <div className="grafik-card slide-up">
                <h3>Pemasukan</h3>
                <div
                  className="pie-chart"
                  style={{
                    background: `conic-gradient(
                      #4CAF50 0% ${pemasukanPercentage}%,
                      #E0E0E0 ${pemasukanPercentage}% 100%
                    )`
                  }}
                >
                  {pemasukanPercentage.toFixed(0)}%
                </div>
                <p className="amount">Rp{totalPemasukan.toLocaleString('id-ID')}</p>
              </div>
              
              <div className="grafik-card slide-up delay-1">
                <h3>Pengeluaran</h3>
                <div
                  className="pie-chart"
                  style={{
                    background: `conic-gradient(
                      #F44336 0% ${pengeluaranPercentage}%,
                      #E0E0E0 ${pengeluaranPercentage}% 100%
                    )`
                  }}
                >
                  {pengeluaranPercentage.toFixed(0)}%
                </div>
                <p className="amount">Rp{totalPengeluaran.toLocaleString('id-ID')}</p>
              </div>
            </section>

            <section className="summary-container fade-in">
              <div className="summary-card income hover-scale">
                <IonIcon icon={walletOutline} className="summary-icon" />
                <div>
                  <p>Total Pemasukan</p>
                  <h4>+ Rp{totalPemasukan.toLocaleString('id-ID')}</h4>
                </div>
              </div>
              
              <div className="summary-card expense hover-scale">
                <IonIcon icon={listOutline} className="summary-icon" />
                <div>
                  <p>Total Pengeluaran</p>
                  <h4>- Rp{totalPengeluaran.toLocaleString('id-ID')}</h4>
                </div>
              </div>
            </section>
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

export default Home;