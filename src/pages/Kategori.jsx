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
  IonButton
} from "@ionic/react";
import { 
  homeOutline, 
  walletOutline, 
  personOutline, 
  listOutline, 
  addOutline,
  arrowBackOutline,
  trashOutline,
  createOutline
} from "ionicons/icons";
import axios from "axios";
import "../css/kategori.css";
import logo from "../fto/makepri.png";

const Kategori = () => {
  const [kategori, setKategori] = useState([]);
  const [filter, setFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useIonRouter();
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios.get("https://apitugas3.xyz/api/kategori", { headers })
      .then((res) => {
        setKategori(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil kategori:", err);
        setIsLoading(false);
      });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus kategori ini?");
    if (!confirm) return;

    try {
      await axios.delete(`https://apitugas3.xyz/api/kategori/${id}`, { headers });
      fetchData();
    } catch (err) {
      console.error("Gagal hapus kategori:", err);
      alert("Terjadi kesalahan saat menghapus.");
    }
  };

  const filteredKategori = filter 
    ? kategori.filter((k) => k.tipe === filter)
    : [];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="blue-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={() => router.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Manajemen Kategori</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => router.push("/tambahkategori")}>
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="blue-content">
        <div className="kategori-container">
          {/* Filter Kategori */}
          <div className="filter-buttons">
            <button 
              onClick={() => setFilter("pemasukan")}
              className={`filter-btn ${filter === "pemasukan" ? "active" : ""}`}
            >
              Pemasukan
            </button>
            <button 
              onClick={() => setFilter("pengeluaran")}
              className={`filter-btn ${filter === "pengeluaran" ? "active" : ""}`}
            >
              Pengeluaran
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Memuat data kategori...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !filter && (
            <div className="empty-state">
              <div className="empty-icon">
                <IonIcon icon={listOutline} />
              </div>
              <p>Silakan pilih jenis kategori untuk menampilkan data</p>
            </div>
          )}

          {/* Kategori List */}
          {!isLoading && filter && (
            <div className="kategori-list">
              {filteredKategori.length > 0 ? (
                filteredKategori.map((k, index) => (
                  <div 
                    key={k.id} 
                    className="kategori-item slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="kategori-info">
                      <span className="kategori-nama">{k.nama}</span>
                      <span className={`kategori-tipe ${k.tipe}`}>
                        {k.tipe}
                      </span>
                    </div>
                    <div className="action-buttons">
                      <button 
                        onClick={() => router.push(`/editkategori/${k.id}`)}
                        className="edit-btn"
                      >
                        <IonIcon icon={createOutline} />
                      </button>
                      <button 
                        onClick={() => handleDelete(k.id)}
                        className="delete-btn"
                      >
                        <IonIcon icon={trashOutline} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <IonIcon icon={listOutline} />
                  </div>
                  <p>Tidak ada kategori {filter}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </IonContent>

      <IonFooter>
        <IonTabBar className="blue-tabbar">
          <IonTabButton tab="home" onClick={() => router.push("/home")}>
            <IonIcon icon={homeOutline} />
            <IonLabel>Beranda</IonLabel>
          </IonTabButton>
          <IonTabButton tab="transaksi" onClick={() => router.push("/transaksi")}>
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

export default Kategori;