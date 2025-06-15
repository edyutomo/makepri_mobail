import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonContent, IonInput, IonButton, IonItem, IonLabel, IonToast, IonSpinner,
  IonIcon
} from '@ionic/react';
import { arrowBackOutline, walletOutline } from 'ionicons/icons';
import axios from 'axios';
import '../css/DompetTambah.css';

const DompetTambah: React.FC = () => {
  const [nama, setNama] = useState('');
  const [saldo, setSaldo] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('success');

  const handleSubmit = async () => {
    if (!nama) {
      showToastMessage('Nama dompet wajib diisi', 'danger');
      return;
    }

    if (!saldo || isNaN(Number(saldo))) {
      showToastMessage('Saldo harus berupa angka', 'danger');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post('https://apitugas3.xyz/api/dompet', {
        nama,
        saldo: Number(saldo),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

      showToastMessage('Dompet berhasil ditambahkan!', 'success');
      setNama('');
      setSaldo('');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Gagal menambahkan dompet';
      showToastMessage(message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const showToastMessage = (message: string, color: string) => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="blue-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={() => window.history.back()}>
              <IonIcon icon={arrowBackOutline} className="header-icon" />
            </IonButton>
          </IonButtons>
          <IonTitle className="header-title">Tambah Dompet Baru</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="blue-content">
        <div className="form-container fade-in">
          <div className="form-header">
            <IonIcon icon={walletOutline} className="form-icon" />
            <h2 className="form-title">Data Dompet Baru</h2>
          </div>

          <div className="form-content slide-up">
            <IonItem className="form-item">
              <IonLabel position="floating" className="form-label">Nama Dompet</IonLabel>
              <IonInput
                value={nama}
                placeholder="Contoh: Dompet Utama"
                onIonChange={(e) => setNama(e.detail.value!)}
                disabled={loading}
                className="form-input"
              />
            </IonItem>

            <IonItem className="form-item">
              <IonLabel position="floating" className="form-label">Saldo Awal (Rp)</IonLabel>
              <IonInput
                type="number"
                value={saldo}
                placeholder="Contoh: 500000"
                onIonChange={(e) => setSaldo(e.detail.value!)}
                disabled={loading}
                className="form-input"
              />
            </IonItem>

            <IonButton
              expand="block"
              onClick={handleSubmit}
              disabled={loading}
              className="submit-button hover-scale"
            >
              {loading ? (
                <>
                  <IonSpinner name="crescent" className="spinner" />
                  <span style={{ marginLeft: '8px' }}>Menyimpan...</span>
                </>
              ) : 'Simpan Dompet'}
            </IonButton>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default DompetTambah;