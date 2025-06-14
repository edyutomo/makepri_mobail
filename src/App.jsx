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

import './theme/variables.css';

import { App as CapacitorApp } from '@capacitor/app'; // untuk exitApp

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

    return () => {
      document.removeEventListener('ionBackButton', handler);
    };
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dompet" component={Dompet} />
          <Route exact path="/transaksi" component={Transaksi} />
          <Route exact path="/tambahtransaksi" component={TambahTransaksi} />
          <Route exact path="/pengeluaran" component={TrsPengeluaran} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/Editprofile" component={Editprofile} />
          <Route path="/dompet-tambah" component={DompetTambah} exact />

          <Redirect to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
