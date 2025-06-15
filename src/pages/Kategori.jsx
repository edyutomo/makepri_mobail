import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // GANTI useNavigate
import "../css/kategori.css";
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

function Kategori() {
  const [kategori, setKategori] = useState([]);
  const [filter, setFilter] = useState(null);
  const history = useHistory(); // GANTI dari useNavigate

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://apitugas3.xyz/api/kategori", { headers })
      .then((res) => setKategori(res.data.data))
      .catch((err) => console.error("Gagal ambil kategori:", err));
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus kategori ini?");
    if (!confirm) return;

    try {
      await axios.delete(`https://apitugas3.xyz/api/kategori/${id}`, {
        headers,
      });
      fetchData();
    } catch (err) {
      console.error("Gagal hapus kategori:", err);
      alert("Terjadi kesalahan saat menghapus.");
    }
  };

  const kategoriFiltered = filter
    ? kategori.filter((k) => k.tipe === filter)
    : [];

  return (
    <>
      <div className="kategori-container">
        <div className="kategori-header">
          <h2>Kategori</h2>
          <button
            onClick={() => history.push("/tambahkategori")}
            className="btn tambah-btn"
          >
            + Tambah Kategori
          </button>
        </div>

        <div className="kategori-filter">
          <button onClick={() => setFilter("pemasukan")}>
            Tampilkan Kategori Pemasukan
          </button>
          <button onClick={() => setFilter("pengeluaran")}>
            Tampilkan Kategori Pengeluaran
          </button>
        </div>

        {filter && (
          <table className="kategori-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Kategori</th>
                <th>Tipe</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kategoriFiltered.length > 0 ? (
                kategoriFiltered.map((k) => (
                  <tr key={k.id}>
                    <td>{k.id}</td>
                    <td>{k.nama}</td>
                    <td>{k.tipe}</td>
                    <td>
                      <button
                        className="btn edit-btn"
                        onClick={() => history.push(`/editkategori/${k.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn delete-btn"
                        onClick={() => handleDelete(k.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>Tidak ada kategori {filter}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {!filter && (
          <p>
            Pilih tombol pemasukan atau pengeluaran untuk menampilkan kategori
            terkait.
          </p>
        )}

        <div className="kembali-container">
          <button
            onClick={() => history.push("/transaksi")}
            className="btn kembali-btn"
          >
            ← Kembali
          </button>
        </div>
      </div>

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
    </>
  );
}

export default Kategori;
