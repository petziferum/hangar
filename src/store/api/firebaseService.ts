import firebaseApp, { fireStore } from "@/plugins/firesbaseConfig";
import Plane from "@/types/Plane";
import store from "@/store";

export default class HangarService {
  static firebaseLogin(password: string): Promise<void> {
    console.log("login...");
    return firebaseApp
      .auth()
      .signInWithEmailAndPassword("admin@hangar.de", password)
      .then((user) => {
        const u = user.user;
        store.dispatch("FETCH_USER", u);
        console.log("eingelogged:", u?.email);
      });
  }

  static firebaseLogout(): Promise<void> {
    console.info("melde ab...");
    return firebaseApp
      .auth()
      .signOut()
      .then(() => {
        store.commit("SET_USER", null);
      });
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
          planesList.push(plane);
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

  static updatePlaneDescription(id: string, beschreibung: string): void {
    fireStore
      .collection("planes")
      .doc(id)
      .set({
        beschreibung: beschreibung,
      })
      .then(() => {
        console.log("update erfolgreich");
      });
  }
  static updatePlane(id: string, plane: Plane): Promise<Plane> {
    if(!plane.beschreibung) {
      console.log("keine Beschreibung")
      plane.beschreibung = ""
    }
    return fireStore
      .collection("planes")
      .doc(id)
      .update(Object.assign({}, plane))
      .then(() => {
        return plane;
      });
  }
}
