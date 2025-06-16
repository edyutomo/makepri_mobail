import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect } from 'react';

import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dompet from './pages/Dompet';
import Transaksi from './pages/Transaksi';
import Profile from './pages/Profile';
import Editprofile from './pages/Editprofile';
import TambahTransaksi from './pages/TambahTransaksi';
import TrsPengeluaran from './pages/trspengeluaran';
import DompetTambah from './pages/DompetTambah';
import Kategori from './pages/Kategori';

import './theme/variables.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import { App as CapacitorApp } from '@capacitor/app';
import RefresherWrapper from './components/RefresherWrapper'; // ← pastikan path-nya sesuai

setupIonicReact();

const App = () => {
  useEffect(() => {
    const handler = (event) => {
      event.detail.register(10, () => {
        if (window.confirm('Yakin mau keluar?')) {
          CapacitorApp.exitApp();
        }
      });
    };

    document.addEventListener('ionBackButton', handler);
    return () => document.removeEventListener('ionBackButton', handler);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

          <Route exact path="/" render={() => (
            <RefresherWrapper><Welcome /></RefresherWrapper>
          )} />
          <Route exact path="/login" render={() => (
            <RefresherWrapper><Login /></RefresherWrapper>
          )} />
          <Route exact path="/register" render={() => (
            <RefresherWrapper><Register /></RefresherWrapper>
          )} />
          <Route exact path="/home" render={() => (
            <RefresherWrapper><Home /></RefresherWrapper>
          )} />
          <Route exact path="/dompet" render={() => (
            <RefresherWrapper><Dompet /></RefresherWrapper>
          )} />
          <Route exact path="/transaksi" render={() => (
            <RefresherWrapper><Transaksi /></RefresherWrapper>
          )} />
          <Route exact path="/tambahtransaksi" render={() => (
            <RefresherWrapper><TambahTransaksi /></RefresherWrapper>
          )} />
          <Route exact path="/kategori" render={() => (
            <RefresherWrapper><Kategori /></RefresherWrapper>
          )} />
          <Route exact path="/pengeluaran" render={() => (
            <RefresherWrapper><TrsPengeluaran /></RefresherWrapper>
          )} />
          <Route exact path="/profile" render={() => (
            <RefresherWrapper><Profile /></RefresherWrapper>
          )} />
          <Route exact path="/editprofile" render={() => (
            <RefresherWrapper><Editprofile /></RefresherWrapper>
          )} />
          <Route exact path="/dompet-tambah" render={() => (
            <RefresherWrapper><DompetTambah /></RefresherWrapper>
          )} />

          <Redirect to="/home" />

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
