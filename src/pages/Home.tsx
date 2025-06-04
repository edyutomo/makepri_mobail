import React, { useState, useEffect } from 'react'; // Tambahkan useEffect
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, walletOutline, personOutline, listOutline, eye, eyeOff } from 'ionicons/icons';
import axios from 'axios'; // Import axios untuk fetch data
// import Dompet from './Dompet'; // Tidak perlu diimpor jika tidak digunakan langsung di sini
import '../css/home.css';
import logo from '../fto/makepri.png';

const Home: React.FC = () => {
  const history = useHistory();
  const [showBalance, setShowBalance] = useState(false);
  const [userData, setUserData] = useState<any>(null); // State untuk menyimpan data user
  const [totalPemasukan, setTotalPemasukan] = useState(0); // State untuk total pemasukan
  const [totalPengeluaran, setTotalPengeluaran] = useState(0); // State untuk total pengeluaran
  const [totalAset, setTotalAset] = useState(0); // State untuk total aset

  // Fetch data user, pemasukan, dan pengeluaran saat komponen dimuat
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          history.push('/login'); // Redirect ke login jika tidak ada token
          return;
        }

        // Contoh: Fetch data user
        const userResponse = await axios.get('https://apitugas3.xyz/api/user-profile', { // Sesuaikan endpoint API Anda
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(userResponse.data.user); // Asumsi API mengembalikan { user: {...} }
        setTotalAset(userResponse.data.user.total_balance || 0); // Asumsi user memiliki total_balance

        // Contoh: Fetch data transaksi atau ringkasan pemasukan/pengeluaran
        // Anda perlu membuat endpoint API terpisah untuk ini jika belum ada
        const transaksiResponse = await axios.get('https://apitugas3.xyz/api/transaction-summary', { // Ganti dengan endpoint yang sesuai
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setTotalPemasukan(transaksiResponse.data.total_income || 0);
        setTotalPengeluaran(transaksiResponse.data.total_expense || 0);

      } catch (error) {
        console.error('Gagal fetch data Home:', error);
        // Handle error, misalnya token kadaluarsa
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            alert('Sesi Anda telah berakhir. Silakan login kembali.');
            localStorage.removeItem('token');
            history.push('/login');
        } else {
            alert('Gagal memuat data. Silakan coba lagi.');
        }
      }
    };

    fetchHomeData();
  }, [history]); // useEffect akan berjalan sekali saat komponen dimuat

  // Hitung persentase untuk grafik (jika menggunakan conic-gradient CSS)
  const pemasukanPercentage = totalAset > 0 ? (totalPemasukan / totalAset) * 100 : 0;
  const pengeluaranPercentage = totalAset > 0 ? (totalPengeluaran / totalAset) * 100 : 0;
  // Anda mungkin ingin menghitung persentase pengeluaran terhadap total pengeluaran, bukan total aset.
  // Sesuaikan logika persentase sesuai kebutuhan grafik Anda.

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
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <div className="dashboard">
          <p className="viewnama">Halo {userData?.name || 'Pengguna'}, jangan lupa hura-hura hari ini.</p> {/* Tampilkan nama user */}
          <header className="dashboard-header">
            <div className="aset-saya">
              <span>Aset Saya: </span>
              <span className="balance-display">
                {showBalance ? `Rp${totalAset.toLocaleString('id-ID')}` : 'Rp*******'}
              </span>
              <IonIcon
                icon={showBalance ? eyeOff : eye}
                onClick={() => setShowBalance(!showBalance)}
                className="eye-icon"
              />
            </div>
          </header>

          <section className="grafik">
            <div className="grafik-card">
              <h3>Pemasukan</h3>
              <div
                className="pie-chart"
                style={{
                  background: `conic-gradient(
                    #28a745 0% ${pemasukanPercentage}%, /* Hijau untuk pemasukan */
                    #6c757d ${pemasukanPercentage}% 100% /* Abu-abu untuk sisa */
                  )`
                }}
              >
                 {pemasukanPercentage.toFixed(0)}% {/* Tampilkan persentase */}
              </div>
              <p>Total: Rp{totalPemasukan.toLocaleString('id-ID')}</p> {/* Tampilkan total pemasukan */}
            </div>
            <div className="grafik-card">
              <h3>Pengeluaran</h3>
              <div
                className="pie-chart"
                style={{
                  background: `conic-gradient(
                    #dc3545 0% ${pengeluaranPercentage}%, /* Merah untuk pengeluaran */
                    #6c757d ${pengeluaranPercentage}% 100% /* Abu-abu untuk sisa */
                  )`
                }}
              >
                {pengeluaranPercentage.toFixed(0)}% {/* Tampilkan persentase */}
              </div>
              <p>Total: Rp{totalPengeluaran.toLocaleString('id-ID')}</p> {/* Tampilkan total pengeluaran */}
            </div>
          </section>

          <section className="transaksi-summary">
            <div className="pemasukan">+ Rp{totalPemasukan.toLocaleString('id-ID')}</div> {/* Data dinamis */}
            <div className="pengeluaran">- Rp{totalPengeluaran.toLocaleString('id-ID')}</div> {/* Data dinamis */}
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