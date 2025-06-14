import React, { useEffect, useState } from "react";
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
  IonSpinner,
  IonButton,
  IonModal,
  IonInput,
  IonItem,
} from "@ionic/react";
import { homeOutline, walletOutline, personOutline, listOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../css/dompet.css";
import logo from "../fto/makepri.png";

const API_URL = "https://apitugas3.xyz/api/dompet";

const Dompet: React.FC = () => {
  const history = useHistory();
  const [dompetList, setDompetList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newDompet, setNewDompet] = useState({ nama: "", saldo: "" });

  useEffect(() => {
    fetchDompet();
  }, []);

  const fetchDompet = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      history.push("/login");
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      setDompetList(response.data.data || []);
    } catch (error: any) {
      console.error("Gagal mengambil data dompet:", error);
      alert("Gagal mengambil data dompet.");
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        history.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTambahDompet = async () => {
    if (!newDompet.nama || !newDompet.saldo) {
      alert("Nama dan saldo awal wajib diisi.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        API_URL,
        { nama: newDompet.nama, saldo: newDompet.saldo },
        { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
      );

      alert("Dompet berhasil ditambahkan!");
      setDompetList([...dompetList, response.data.data]); // Menambahkan dompet baru ke daftar
      setShowModal(false);
      setNewDompet({ nama: "", saldo: "" });
    } catch (error) {
      console.error("Gagal menambah dompet:", error);
      alert("Gagal menambah dompet.");
    }
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
        <div className="dompet">
          <h3>Dompet Saya</h3>

          {loading ? (
            <IonSpinner name="crescent" />
          ) : (
            <>
              <IonButton expand="block" onClick={() => setShowModal(true)} className="btn-add-dompet">
                Tambah Dompet
              </IonButton>

              <div className="dompet-list">
                {dompetList.length === 0 ? (
                  <p>Belum ada data dompet.</p>
                ) : (
                  dompetList.map((dompet, index) => (
                    <div className={`dompet-card ${index % 2 === 0 ? "biru" : "putih"}`} key={dompet.id}>
                      <p>{dompet.nama}</p>
                      <span>Rp {Number(dompet.saldo).toLocaleString("id-ID")}</span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </IonContent>

      {/* Modal Tambah Dompet */}
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <div className="modal-content">
          <h2>Tambah Dompet Baru</h2>
          <IonItem>
            <IonInput
              placeholder="Nama Dompet"
              value={newDompet.nama}
              onIonChange={(e) => setNewDompet({ ...newDompet, nama: e.detail.value! })}
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="number"
              placeholder="Saldo Awal"
              value={newDompet.saldo}
              onIonChange={(e) => setNewDompet({ ...newDompet, saldo: e.detail.value! })}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleTambahDompet}>
            Simpan Dompet
          </IonButton>
          <IonButton expand="block" color="danger" onClick={() => setShowModal(false)}>
            Batal
          </IonButton>
        </div>
      </IonModal>

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
