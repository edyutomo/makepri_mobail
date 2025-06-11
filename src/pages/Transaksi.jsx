import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar,
  IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton
} from '@ionic/react';
import {
  homeOutline, walletOutline, personOutline, listOutline, addOutline
} from 'ionicons/icons';
import axios from 'axios';
import '../css/transaksi.css';
import logo from '../fto/makepri.png';

const Transaksi = () => {
  const [isIncome, setIsIncome] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('Januari');
  const [transactions, setTransactions] = useState([]);

  const history = useHistory();

  const toggleIncomeExpense = () => {
    setIsIncome(!isIncome);
  };

  const navigateToTrspendapatan = () => {
    history.push('/trspendapatan');
  };

  // Ambil data transaksi dari API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://apitugas3.xyz/api/transaksi");
        setTransactions(response.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data transaksi:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Filter transaksi berdasarkan jenis
  const filteredTransactions = transactions.filter(trx =>
    isIncome ? trx.type === 'pendapatan' : trx.type === 'pengeluaran'
  );

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
            <div className="year-month-selector">
              <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((month, i) => (
                  <option key={i} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </header>

          <div className="income-expense-toggle">
            <button onClick={() => setIsIncome(true)} className={isIncome ? 'active' : ''}>Pendapatan</button>
            <button onClick={() => setIsIncome(false)} className={!isIncome ? 'active' : ''}>Pengeluaran</button>
          </div>

          <div className="transaction-list">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <div key={index} className="transaction-item">
                  <div className="transaction-date">{transaction.date}</div>
                  <div className="transaction-category">{transaction.category}</div>
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-amount">Rp {transaction.amount}</div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', marginTop: '2rem' }}>Tidak ada transaksi.</p>
            )}
          </div>
        </div>

        {/* Tombol Tambah */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={navigateToTrspendapatan}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
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

export default Transaksi;
