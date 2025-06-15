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
  IonButtons,
  useIonToast,
} from "@ionic/react";
import {
  homeOutline,
  walletOutline,
  personOutline,
  listOutline,
  addOutline,
  arrowBackOutline,
} from "ionicons/icons";
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
  const [present] = useIonToast();

  useEffect(() => {
    fetchDompet();
  }, []);

  const fetchDompet = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      present({
        message: "Sesi telah berakhir, silakan login kembali",
        duration: 2000,
        color: "danger",
      });
      history.push("/login");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setDompetList(response.data.data || []);
    } catch (error: any) {
      console.error("Gagal mengambil data dompet:", error);
      present({
        message: "Gagal mengambil data dompet",
        duration: 2000,
        color: "danger",
      });
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        history.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTambahDompet = async () => {
    if (!newDompet.nama) {
      present({
        message: "Nama dompet wajib diisi",
        duration: 2000,
        color: "warning",
      });
      return;
    }

    if (!newDompet.saldo || isNaN(Number(newDompet.saldo))) {
      present({
        message: "Saldo awal harus berupa angka",
        duration: 2000,
        color: "warning",
      });
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        API_URL,
        { nama: newDompet.nama, saldo: newDompet.saldo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      present({
        message: "Dompet berhasil ditambahkan!",
        duration: 2000,
        color: "success",
      });

      setDompetList([...dompetList, response.data.data]);
      setShowModal(false);
      setNewDompet({ nama: "", saldo: "" });
    } catch (error) {
      console.error("Gagal menambah dompet:", error);
      present({
        message: "Gagal menambah dompet",
        duration: 2000,
        color: "danger",
      });
    }
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
        <div className="dompet-container">
          {loading ? (
            <div className="loading-container">
              <IonSpinner name="crescent" className="spinner" />
              <p>Memuat data dompet...</p>
            </div>
          ) : (
            <>
              <div className="dompet-header">
                <h2 className="dompet-title">Daftar Dompet</h2>
                <IonButton
                  className="add-button hover-scale"
                  onClick={() => setShowModal(true)}
                >
                  <IonIcon icon={addOutline} slot="start" />
                  Tambah Dompet
                </IonButton>
              </div>

              <div className="dompet-list">
                {dompetList.length === 0 ? (
                  <div className="empty-state">
                    <IonIcon icon={walletOutline} className="empty-icon" />
                    <p>Belum ada dompet terdaftar</p>
                  </div>
                ) : (
                  dompetList.map((dompet) => (
                    <div className="dompet-card slide-up" key={dompet.id}>
                      <div className="dompet-info">
                        <h3 className="dompet-name">{dompet.nama}</h3>
                        <p className="dompet-balance">
                          Rp {Number(dompet.saldo).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          className="dompet-modal"
        >
          <div className="modal-content">
            <h2 className="modal-title">Tambah Dompet Baru</h2>

            <IonItem className="form-item">
              <IonInput
                placeholder="Nama Dompet"
                value={newDompet.nama}
                onIonChange={(e) =>
                  setNewDompet({ ...newDompet, nama: e.detail.value! })
                }
                className="form-input"
              />
            </IonItem>

            <IonItem className="form-item">
              <IonInput
                type="number"
                placeholder="Saldo Awal"
                value={newDompet.saldo}
                onIonChange={(e) =>
                  setNewDompet({ ...newDompet, saldo: e.detail.value! })
                }
                className="form-input"
              />
            </IonItem>

            <div className="modal-actions">
              <IonButton
                expand="block"
                className="save-button hover-scale"
                onClick={handleTambahDompet}
              >
                Simpan Dompet
              </IonButton>
              <IonButton
                expand="block"
                fill="outline"
                className="cancel-button hover-scale"
                onClick={() => setShowModal(false)}
              >
                Batal
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>

      <IonFooter>
        <IonTabBar className="blue-tabbar">
          <IonTabButton tab="home" onClick={() => history.push("/home")}>
            <IonIcon icon={homeOutline} />
            <IonLabel>Beranda</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="transaksi"
            onClick={() => history.push("/transaksi")}
          >
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
