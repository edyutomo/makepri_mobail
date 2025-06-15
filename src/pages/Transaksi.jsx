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
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/react";
import {
  homeOutline,
  walletOutline,
  personOutline,
  listOutline,
  addOutline,
  arrowBackOutline,
} from "ionicons/icons";
import axios from "axios";
import "../css/transaksi.css";
import logo from "../fto/makepri.png";

const Transaksi = () => {
  const [isIncome, setIsIncome] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );

  const router = useIonRouter();
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchTransactions();
  }, [selectedYear, selectedMonth]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://apitugas3.xyz/api/transaksi?tahun=${selectedYear}&bulan=${selectedMonth}`,
        { headers }
      );
      setTransactions(res.data.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal ambil data transaksi:", error);
      setIsLoading(false);
    }
  };

  const filteredTransactions = transactions.filter((trx) => {
    const tipeKategori = trx.kategori?.tipe?.toLowerCase();
    return isIncome
      ? tipeKategori === "pemasukan"
      : tipeKategori === "pengeluaran";
  });

  const formatTanggal = (tgl) => {
    if (!tgl) return "-";
    const dateObj = new Date(tgl);
    return `${dateObj.getDate().toString().padStart(2, "0")}-${(
      dateObj.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateObj.getFullYear()}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="blue-toolbar">
          <div className="toolbar-content">
            <img src={logo} alt="Logo" className="toolbar-logo pulse" />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="blue-content">
        <div className="transaksi-container">
          <h1 className="page-title">Daftar Transaksi</h1>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-container">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="filter-select"
              >
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="filter-select"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, "0");
                  return (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="income-expense-toggle">
              <button
                onClick={() => setIsIncome(true)}
                className={`toggle-btn ${isIncome ? "active" : ""}`}
              >
                Pendapatan
              </button>
              <button
                onClick={() => setIsIncome(false)}
                className={`toggle-btn ${!isIncome ? "active" : ""}`}
              >
                Pengeluaran
              </button>
            </div>
          </div>

          {/* Transaction List */}
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Memuat data transaksi...</p>
            </div>
          ) : (
            <div className="transaction-list">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className={`transaction-item ${
                      isIncome ? "income" : "expense"
                    } slide-up`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="transaction-date">
                      {formatTanggal(transaction.tanggal)}
                    </div>
                    <div className="transaction-info">
                      <div className="transaction-category">
                        {transaction.kategori?.nama || "-"}
                      </div>
                      <div className="transaction-description">
                        {transaction.keterangan || "-"}
                      </div>
                    </div>
                    <div className="transaction-amount">
                      {isIncome ? "+" : "-"} Rp
                      {parseInt(transaction.jumlah).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <IonIcon icon={listOutline} />
                  </div>
                  <p>Tidak ada transaksi ditemukan</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => router.push("/tambahtransaksi", "forward")}
            className="fab-button"
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>

      <IonFooter>
        <IonTabBar className="blue-tabbar">
          <IonTabButton tab="home" onClick={() => router.push("/home")}>
            <IonIcon icon={homeOutline} />
            <IonLabel>Beranda</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="transaksi"
            onClick={() => router.push("/transaksi")}
          >
            <IonIcon icon={listOutline} />
            <IonLabel>Transaksi</IonLabel>
          </IonTabButton>
          <IonTabButton tab="dompet" onClick={() => router.push("/dompet")}>
            <IonIcon icon={walletOutline} />
            <IonLabel>Dompet</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" onClick={() => router.push("/profile")}>
            <IonIcon icon={personOutline} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default Transaksi;
