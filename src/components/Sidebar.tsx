import { IonContent, IonList, IonItem, IonLabel, IonMenu, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { Link } from "react-router-dom";
import "../css/sidebar.css"; // Pastikan ada file CSS untuk styling

const Sidebar: React.FC = () => {
  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <Link to="/dashboard"><IonLabel>Dashboard</IonLabel></Link>
          </IonItem>
          <IonItem>
            <Link to="/laporan-keuangan"><IonLabel>Laporan Keuangan</IonLabel></Link>
          </IonItem>
          <IonItem>
            <Link to="/dompet"><IonLabel>Dompet</IonLabel></Link>
          </IonItem>
          <IonItem>
            <Link to="/transaksi"><IonLabel>Transaksi</IonLabel></Link>
          </IonItem>
          <IonItem>
            <Link to="/profile"><IonLabel>Profile</IonLabel></Link>
          </IonItem>
          <IonItem>
            <Link to="/logout"><IonLabel>Logout</IonLabel></Link>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Sidebar;
