import {
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonPage
} from '@ionic/react';
import { useRef } from 'react';

const RefresherWrapper = ({ children, onRefresh }) => {
  const contentRef = useRef(null);

  const handleRefresh = (event) => {
    if (typeof onRefresh === 'function') {
      onRefresh(event);
    } else {
      setTimeout(() => {
        event.detail.complete();
      }, 1000); // simulasi delay 1 detik
    }
  };

  return (
    <IonPage>
      <IonContent ref={contentRef} fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent pullingText="Tarik untuk refresh" />
        </IonRefresher>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default RefresherWrapper;
