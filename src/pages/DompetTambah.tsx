import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonContent, IonInput, IonButton, IonItem, IonLabel, IonToast
} from '@ionic/react';
import axios from 'axios';

const DompetTambah: React.FC = () => {
  const [nama, setNama] = useState('');
  const [saldo, setSaldo] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async () => {
    if (!nama || !saldo) {
      setToastMessage('Nama dan saldo wajib diisi');
      setShowToast(true);
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post('https://apitugas3.xyz/api/dompet', {
        nama,
        saldo,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

      setToastMessage('Dompet berhasil ditambahkan!');
      setShowToast(true);
      setNama('');
      setSaldo('');
    } catch (error: any) {
      setToastMessage(error.response?.data?.message || 'Gagal menambahkan dompet.');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dompet" />
          </IonButtons>
          <IonTitle>Tambah Dompet</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nama Dompet</IonLabel>
          <IonInput
            value={nama}
            placeholder="Contoh: Dompet Utama"
            onIonChange={(e) => setNama(e.detail.value!)}
            disabled={loading}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Saldo Awal</IonLabel>
          <IonInput
            type="number"
            value={saldo}
            placeholder="Contoh: 500000"
            onIonChange={(e) => setSaldo(e.detail.value!)}
            disabled={loading}
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan'}
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default DompetTambah;
