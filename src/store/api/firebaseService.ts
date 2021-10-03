import firebaseApp, { fireStore } from "@/plugins/firesbaseConfig";
import Plane from "@/types/Plane";
import store from "@/store"

export default class HangarService {

  static firebaseLogin() {
    console.log("login... off");
    firebaseApp.auth()
      .signInWithEmailAndPassword("admin@hangar.de", "asdfasdf")
      .then((user) => {
        const u = user.user;
        store.dispatch("FETCH_USER", u);
        console.log("eingelogged:", u?.email);
      });
  }

  static firebaseLogout() {
    console.info("melde ab...")
    firebaseApp.auth().signOut()
      .then(() => {
        store.commit("SET_USER", null)
      })
  }

  static getAllPlanes(): Promise<void | Plane[]> {
   return fireStore
      .collection("planes")
      .get()
      .then((res) => {
        const planesList: Array<Plane> = [];
        res.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          const plane = Plane.createEmptyPlane()
            .withImage(data.image)
            .withName(data.name)
            .withBeschreibung(data.beschreibung)
            .withFaktor(data.faktor)
            .withSender(data.sender)
            .withSpannweite(data.spannweite)
            .withGewicht(data.gewicht)
            .withBauweise(data.bauweise)
            .withType(data.type)
            .withId(data.id);
          planesList.push(plane)
        });
        return planesList;
      })
      .catch(() => {
        console.log("nichts gefunden");
      })
      .finally(() => {
        console.info("fertig");
      });
  }

  static updatePlane(id: string, beschreibung: string): void {
     fireStore.collection("planes")
      .doc(id)
      .update({
        beschreibung: beschreibung
      })
       .then(()=> {
         console.log("update erfolgreich")
       })
  }
}
