import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/editkategori.css";
import EditKategori from "./pages/EditKategori";
//import TambahTransaksi from "./pages/TambahTransaksi";
import {
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import {
  homeOutline,
  listOutline,
  walletOutline,
  personOutline,
} from "ionicons/icons";

function EditKategori() {
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [tipe, setTipe] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`https://apitugas3.xyz/api/kategori/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setNama(result.data.nama);
          setTipe(result.data.tipe);
        } else {
          alert("Gagal memuat data kategori.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Terjadi kesalahan saat memuat data.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://apitugas3.xyz/api/kategori/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ nama, tipe }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          alert("Kategori berhasil diperbarui!");
          navigate("/kategori");
        } else {
          alert("Gagal memperbarui kategori.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Terjadi kesalahan saat mengedit.");
      });
  };

  return (
    <>
      <div className="editkategori-container">
        <div className="head-title-bar">
          <h1 className="head-title-text">Edit Kategori</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Kategori</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Tipe</label>
            <select
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
              required
            >
              <option value="">Pilih Tipe</option>
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Simpan Perubahan
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/kategori")}
            >
              Batal
            </button>
          </div>
        </form>
      </div>

      {/* Footer navigasi
      <IonFooter>
        <IonTabBar>
          <IonTabButton tab="home" onClick={() => navigate("/home")}>
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="transaksi" onClick={() => navigate("/transaksi")}>
            <IonIcon icon={listOutline} />
            <IonLabel>Transaksi</IonLabel>
          </IonTabButton>

          <IonTabButton tab="dompet" onClick={() => navigate("/dompet")}>
            <IonIcon icon={walletOutline} />
            <IonLabel>Dompet</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" onClick={() => navigate("/profile")}>
            <IonIcon icon={personOutline} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter> */}
    </>
  );
}

export default EditKategori;
