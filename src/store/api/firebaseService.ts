import firebaseApp, { fireStore } from "@/plugins/firesbaseConfig";
import Plane from "@/types/Plane";
import store from "@/store";
import firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentData = firebase.firestore.DocumentData;

interface ImageItem {
  name: string;
  url: string;
}
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

  static setPlaneSchrott(p: Plane): Promise<void | Plane> {
    return fireStore
      .collection("planes")
      .doc(p.id)
      .update({
        crash: true,
      })
      .then(() => {
        return p;
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
            .withId(data.id)
            .withCrash(data.crash);
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
  static saveNewPlane(
    imageName: string,
    image: Blob,
    plane: Plane
  ): Promise<void | DocumentReference<DocumentData>> {
    return firebaseApp
      .storage()
      .ref("planes/" + imageName)
      .put(image)
      .then(() => {
        return firebaseApp
          .storage()
          .ref("planes/" + imageName)
          .getDownloadURL();
      })
      .then((URL) => {
        plane.image = URL;
      })
      .then(() => {
        fireStore
          .collection("planes")
          .add(Object.assign({}, plane))
          .then((res) => {
            return res;
          });
      });
  }

  static getImages(): Promise<ImageItem[] | void> {
    return firebaseApp
      .storage()
      .ref("planes/")
      .listAll()
      .then((list) => {
        const itemList: ImageItem[] = [];
        list.items.forEach((i) => {
          const name = i.name;
          i.getDownloadURL().then((u) => {
            const url = u;
            itemList.push({ name: name, url: url });
          });
        });
        return itemList;
      })
      .catch((error) => {
        console.log(error);
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
    if (!plane.beschreibung) {
      console.log("keine Beschreibung");
      plane.beschreibung = "";
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
