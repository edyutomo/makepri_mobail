import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton,
  useIonRouter,
} from "@ionic/react";
import { homeOutline, walletOutline, personOutline, listOutline, addOutline } from "ionicons/icons";
import axios from "axios";
import "../css/transaksi.css";
import logo from "../fto/makepri.png";

const Transaksi = () => {
  const [isIncome, setIsIncome] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [dompet, setDompet] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, "0"));

  const router = useIonRouter();
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchTransactions();
    fetchKategoriDompet();
  }, [selectedYear, selectedMonth]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`https://apitugas3.xyz/api/transaksi?tahun=${selectedYear}&bulan=${selectedMonth}`, { headers });
      setTransactions(res.data.data || []);
    } catch (error) {
      console.error("Gagal ambil data transaksi:", error);
    }
  };

  const fetchKategoriDompet = () => {
    axios.get("https://apitugas3.xyz/api/kategori", { headers })
      .then((res) => setKategori(res.data.data))
      .catch((err) => console.error("Gagal ambil kategori:", err));

    axios.get("https://apitugas3.xyz/api/dompet", { headers })
      .then((res) => setDompet(res.data.data))
      .catch((err) => console.error("Gagal ambil dompet:", err));
  };

  const filteredTransactions = transactions.filter((trx) => {
    const tipeKategori = trx.kategori?.tipe?.toLowerCase();
    return isIncome ? tipeKategori === "pemasukan" : tipeKategori === "pengeluaran";
  });

  const formatTanggal = (tgl) => {
    if (!tgl) return "-";
    const dateObj = new Date(tgl);
    return `${dateObj.getDate().toString().padStart(2, "0")}-${(dateObj.getMonth() + 1)
      .toString().padStart(2, "0")}-${dateObj.getFullYear()}`;
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
          <h1>Transaksi</h1>

          <div className="filter-container">
            <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              {Array.from({ length: 12 }, (_, i) => {
                const month = (i + 1).toString().padStart(2, "0");
                return <option key={month} value={month}>{month}</option>;
              })}
            </select>
          </div>

          <div className="income-expense-toggle">
            <button onClick={() => setIsIncome(true)} className={isIncome ? "active" : ""}>Pendapatan</button>
            <button onClick={() => setIsIncome(false)} className={!isIncome ? "active" : ""}>Pengeluaran</button>
          </div>

          <div className="transaction-list">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <div key={index} className="transaction-item">
                  <div className="transaction-date">{formatTanggal(transaction.tanggal)}</div>
                  <div className="transaction-category">{transaction.kategori?.nama || "-"}</div>
                  <div className="transaction-description">{transaction.keterangan || "-"}</div>
                  <div className="transaction-amount">Rp {parseInt(transaction.jumlah).toLocaleString()}</div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", marginTop: "2rem" }}>Tidak ada transaksi.</p>
            )}
          </div>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => router.push("/tambahtransaksi", "forward")}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>

      <IonFooter>
        <IonTabBar>
          <IonTabButton tab="home" onClick={() => router.push("/home", "root")}>
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="transaksi" onClick={() => router.push("/transaksi", "root")}>
            <IonIcon icon={listOutline} />
            <IonLabel>Transaksi</IonLabel>
          </IonTabButton>
          <IonTabButton tab="dompet" onClick={() => router.push("/dompet", "root")}>
            <IonIcon icon={walletOutline} />
            <IonLabel>Dompet</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" onClick={() => router.push("/profile", "root")}>
            <IonIcon icon={personOutline} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default Transaksi;
