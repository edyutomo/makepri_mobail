import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton } from '@ionic/react';
import { homeOutline, walletOutline, personOutline, listOutline, addOutline } from 'ionicons/icons';
import '../css/transaksi.css';
import logo from '../fto/makepri.png';

const Transaksi = () => {
  const [isIncome, setIsIncome] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('Januari');
  const [transactions, setTransactions] = useState([
    { date: '20/01/2025', time: '12:30 WIB', category: 'Makanan', description: 'Makan Siang', amount: 'Rp 25.500' }
  ]);

  const toggleIncomeExpense = () => {
    setIsIncome(!isIncome);
  };

  const addTransaction = () => {
    console.log('Tambah Transaksi');
  };
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
           <div className="toolbar-content">
          {/* <IonTitle className="toolbar-title">Home</IonTitle> */}
          <img src={logo} alt="Logo" className="toolbar-logo" />
        </div>
          {/* <IonTitle>Dompet Saya</IonTitle> */}
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
            <button onClick={toggleIncomeExpense} className={isIncome ? 'active' : ''}>Pendapatan</button>
            <button onClick={toggleIncomeExpense} className={!isIncome ? 'active' : ''}>Pengeluaran</button>
          </div>

          <div className="transaction-list">
            {isIncome ? (
              <div className="income-list">
                {/* Render pendapatan */}
              </div>
            ) : (
              <div className="expense-list">
                {transactions.map((transaction, index) => (
                  <div key={index} className="transaction-item">
                    <div className="transaction-date">{transaction.date}</div>
                    <div className="transaction-time">{transaction.time}</div>
                    <div className="transaction-category">{transaction.category}</div>
                    <div className="transaction-description">{transaction.description}</div>
                    <div className="transaction-amount">{transaction.amount}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton onClick={addTransaction}>
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
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

export default Transaksi;
