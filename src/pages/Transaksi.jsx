import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Ganti di sini
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonFooter, IonTabBar,
  IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton
} from '@ionic/react';
import {
  homeOutline, walletOutline, personOutline, listOutline, addOutline
} from 'ionicons/icons';
import axios from 'axios';
import '../css/transaksi.css';
import logo from '../fto/makepri.png';

const Transaksi = () => {
  const [isIncome, setIsIncome] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [dompet, setDompet] = useState([]);
  const [form, setForm] = useState({
    tanggal: "",
    kategori_id: "",
    dompet_id: "",
    jumlah: "",
    keterangan: "",
    tipe: "pemasukan"
  });

  const history = useHistory(); // Ganti dari useNavigate
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
  fetchTransactions();
  fetchKategoriDompet();
}, []);

const fetchTransactions = async () => {
  try {
    const res = await axios.get("https://apitugas3.xyz/api/transaksi", { headers });
    console.log("DATA TRANSAKSI:", res.data); // Tambahkan ini
    setTransactions(res.data.data || []);
  } catch (error) {
    console.error("Gagal ambil data transaksi:", error);
  }
};

  const fetchKategoriDompet = () => {
    axios.get("https://apitugas3.xyz/api/kategori", { headers })
      .then(res => setKategori(res.data.data))
      .catch(err => console.error("Gagal ambil kategori:", err));

    axios.get("https://apitugas3.xyz/api/dompet", { headers })
      .then(res => setDompet(res.data.data))
      .catch(err => console.error("Gagal ambil dompet:", err));
  };



  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const simpanTransaksi = async () => {
    try {
      const data = { ...form, tipe: isIncome ? "pendapatan" : "pengeluaran" };
      await axios.post("https://apitugas3.xyz/api/transaksi", data, { headers });
      alert("Transaksi berhasil disimpan");
      fetchTransactions();
      setForm({ tanggal: "", kategori_id: "", dompet_id: "", jumlah: "", keterangan: "", tipe: "pendapatan" });
    } catch (err) {
      console.error("Gagal simpan transaksi:", err.response?.data);
      alert("Gagal simpan transaksi");
    }
  };

const filteredTransactions = transactions.filter(trx => {
  const tipeKategori = trx.kategori?.tipe?.toLowerCase();
  console.log('Tipe kategori:', tipeKategori); // 👈 tambahkan ini
  return isIncome ? tipeKategori === 'pemasukan' : tipeKategori === 'pengeluaran';
});



  const formatTanggal = (tgl) => {
    if (!tgl) return "-";
    const dateObj = new Date(tgl);
    return `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1)
      .toString().padStart(2, '0')}-${dateObj.getFullYear()}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="toolbar-content">
            <img src={logo} alt="Logo" className="toolbar-logo" />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="transaksi-container">
          <header>
            <h1>Transaksi</h1>
          </header>

          <div className="income-expense-toggle">
            <button onClick={() => setIsIncome(true)} className={isIncome ? 'active' : ''}>Pendapatan</button>
            <button onClick={() => setIsIncome(false)} className={!isIncome ? 'active' : ''}>Pengeluaran</button>
          </div>

          
          <div className="transaction-list">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <div key={index} className="transaction-item">
                  <div className="transaction-date">{formatTanggal(transaction.tanggal)}</div>
                  <div className="transaction-category">{transaction.kategori?.nama || '-'}</div>
                  <div className="transaction-description">{transaction.keterangan || '-'}</div>
                  <div className="transaction-amount">Rp {parseInt(transaction.jumlah).toLocaleString()}</div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', marginTop: '2rem' }}>Tidak ada transaksi.</p>
            )}
          </div>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/tambahtransaksi')}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
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

export default Transaksi;
