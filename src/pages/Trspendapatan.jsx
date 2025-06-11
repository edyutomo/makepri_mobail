import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonDatetime,
} from "@ionic/react";
import axios from "axios";
import "../css/trspendapatan.css";

const TrsPendapatan = () => {
  const [transactionType, setTransactionType] = useState("pendapatan");
  const [date, setDate] = useState(new Date().toISOString());
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !amount || !description) {
      alert("Semua kolom wajib diisi terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);

      const data = {
        jenis_transaksi: transactionType,
        tanggal: date.split("T")[0], // hasil format YYYY-MM-DD
        kategori: category,
        jumlah: parseInt(amount),
        keterangan: description,
      };

      const response = await axios.post("https://apitugas3.xyz/api/transaksi", data);

      if (response.status === 200 || response.status === 201) {
        alert(`Transaksi ${transactionType} sebesar Rp${amount} berhasil disimpan.`);
        history.push("/transaksi");
      } else {
        alert("Gagal menyimpan transaksi. Coba lagi.");
      }
    } catch (error) {
      console.error("Error saat menyimpan transaksi:", error.response?.data || error.message);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
    
  };

  const handleCancel = () => {
    history.push("/transaksi");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/transaksi" />
          </IonButtons>
          <IonTitle>Tambah Transaksi</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit} className="trs-form">
          <IonItem>
            <IonLabel position="stacked">Jenis Transaksi</IonLabel>
            <IonSelect
              value={transactionType}
              onIonChange={(e) => setTransactionType(e.detail.value)}
              interface="action-sheet"
            >
              <IonSelectOption value="pendapatan">Pendapatan</IonSelectOption>
              <IonSelectOption value="pengeluaran">Pengeluaran</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Tanggal</IonLabel>
            <IonDatetime
              displayFormat="DD/MM/YYYY"
              value={date}
              onIonChange={(e) => setDate(e.detail.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Kategori</IonLabel>
            <IonInput
              type="text"
              placeholder="Masukkan kategori"
              value={category}
              onIonChange={(e) => setCategory(e.detail.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Jumlah (Rp)</IonLabel>
            <IonInput
              type="number"
              placeholder="0"
              value={amount}
              onIonChange={(e) => setAmount(e.detail.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Keterangan</IonLabel>
            <IonTextarea
              placeholder="Tambahkan keterangan"
              value={description}
              onIonChange={(e) => setDescription(e.detail.value)}
              rows={4}
            />
          </IonItem>

          <div className="ion-padding">
            <IonButton
              expand="block"
              type="submit"
              className="btn-simpan"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Transaksi"}
            </IonButton>
            <IonButton expand="block" color="medium" onClick={handleCancel}>
              Kembali
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default TrsPendapatan;
