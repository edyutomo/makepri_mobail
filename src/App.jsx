import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect } from 'react';

import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dompet from './pages/Dompet'
import Transaksi from './pages/Transaksi'
import Profile from './pages/Profile'
import Editprofile from './pages/Editprofile'

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

import { App as CapacitorApp } from '@capacitor/app'; // gunakan ini untuk exitApp

setupIonicReact();

const App = () => {
  useEffect(() => {
    document.addEventListener('ionBackButton', () => {
      event.detail.register(10, () => {
        CapacitorApp.exitApp(); // exit app dengan benar
      });
    });
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
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/Editprofile" component={Editprofile} />
          <Redirect to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
