// import React, { useEffect, useState } from 'react';
// import {
//   IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
//   IonTabBar, IonTabButton, IonIcon, IonLabel, IonSpinner
// } from '@ionic/react';
// import { homeOutline, walletOutline, personOutline, listOutline } from 'ionicons/icons';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import '../css/dompet.css';
// import logo from '../fto/makepri.png';

// const Dompet: React.FC = () => {
//   const [dompetList, setDompetList] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const history = useHistory();


// useEffect(() => {
//   const fetchDompet = async () => {
//     const token = localStorage.getItem('token');
//     console.log('Token yang dipakai:', token);

//     if (!token) {
//       alert('Token tidak ditemukan. Silakan login ulang.');
//       history.push('/login');
//       return;
//     }

//     try {
//       const response = await axios.get('https://apitugas3.xyz/api/dompet', {
//         headers: {
//           Authorization: `Bearer ${token}`, // Coba ini dulu
//           Accept: 'application/json',
//         },
//       });
//       console.log('Respons API:', response.data);
//       setDompetList(response.data.data || []);
//     } catch (error: any) {
//       console.error('Gagal mengambil data dompet:', error);
//       alert('Gagal mengambil data dompet. Silakan coba lagi.');
//       if (error.response && error.response.status === 401) {
//         localStorage.removeItem('token');
//         history.push('/login');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchDompet();
// }, []);

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//            <div className="toolbar-content">
//           {/* <IonTitle className="toolbar-title">Home</IonTitle> */}
//           <img src={logo} alt="Logo" className="toolbar-logo" />
//         </div>
//           {/* <IonTitle>Dompet Saya</IonTitle> */}
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen>
//         <div className="dompet">
//           <h3>Dompet Saya</h3>

//           {loading ? (
//             <IonSpinner name="crescent" />
//           ) : (
//             <div className="dompet-list">
//               {dompetList.length === 0 ? (
//                 <p>Belum ada data dompet.</p>
//               ) : (
//                 dompetList.map((dompet, index) => (
//                   <div className={`dompet-card ${index % 2 === 0 ? 'biru' : 'putih'}`} key={dompet.id}>
//                     <p>{dompet.nama}</p>
//                     <span>Rp {Number(dompet.saldo).toLocaleString('id-ID')}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </IonContent>

//       <IonFooter>
//         <IonTabBar>
//           <IonTabButton tab="home" onClick={() => history.push('/home')}>
//             <IonIcon icon={homeOutline} />
//             <IonLabel>Home</IonLabel>
//           </IonTabButton>

//           <IonTabButton tab="transaksi" onClick={() => history.push('/transaksi')}>
//             <IonIcon icon={listOutline} />
//             <IonLabel>Transaksi</IonLabel>
//           </IonTabButton>

//           <IonTabButton tab="dompet" onClick={() => history.push('/dompet')}>
//             <IonIcon icon={walletOutline} />
//             <IonLabel>Dompet</IonLabel>
//           </IonTabButton>

//           <IonTabButton tab="profile" onClick={() => history.push('/profile')}>
//             <IonIcon icon={personOutline} />
//             <IonLabel>Profil</IonLabel>
//           </IonTabButton>
//         </IonTabBar>
//       </IonFooter>
//     </IonPage>
//   );
// };

// export default Dompet;

import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { homeOutline, listOutline, walletOutline, personOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "../css/dompet.css";

const API_URL = "https://apitugas3.xyz/api/dompet";

const Dompet = () => {
  const history = useHistory();
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferTarget, setTransferTarget] = useState("");
  const [historyTransfer, setHistoryTransfer] = useState([]);

  useEffect(() => {
    fetchWallets();
    fetchTransferHistory();
  }, []);

  const fetchWallets = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWallets(data);
      setSelectedWallet(data.length > 0 ? data[0].id : "");
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const fetchTransferHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/history`);
      const data = await response.json();
      setHistoryTransfer(data);
    } catch (error) {
      console.error("Error fetching transfer history:", error);
    }
  };

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dompet & Transfer Dana</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Konten utama */}
      <div className="container">
        <div className="wallet-list">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="wallet">
              <h2>{wallet.name}</h2>
              <p>Saldo: Rp {wallet.balance.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <h2>Riwayat Transfer</h2>
        <table>
          <thead>
            <tr>
              <th>Dompet Asal</th>
              <th>Dompet Tujuan</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {historyTransfer.map((item, index) => (
              <tr key={index}>
                <td>{item.source}</td>
                <td>{item.target}</td>
                <td>Rp {parseInt(item.amount).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer dengan Tab Navigasi */}
      <IonFooter>
        <IonTabBar>
          <IonTabButton tab="home" onClick={() => history.push("/home")}>
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="transaksi" onClick={() => history.push("/transaksi")}>
            <IonIcon icon={listOutline} />
            <IonLabel>Transaksi</IonLabel>
          </IonTabButton>

          <IonTabButton tab="dompet" onClick={() => history.push("/dompet")}>
            <IonIcon icon={walletOutline} />
            <IonLabel>Dompet</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" onClick={() => history.push("/profile")}>
            <IonIcon icon={personOutline} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default Dompet;


