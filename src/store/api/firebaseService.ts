import firebaseApp, { fireBucket, fireStore } from "@/plugins/firesbaseConfig";
import Plane, { planeConverter } from "@/types/Plane";
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
      .signInWithEmailAndPassword("daboarderpjb@gmail.com", password) //testtest
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

  static setPlaneSchrott(id: string): Promise<void | Plane> {
    return fireStore
      .collection("planes")
      .doc(id)
      .update({
        crash: true,
      })
      .then(() => {
        this.getAllPlanes("name");
      });
  }

  static getAllPlanes(orderby: string | undefined): Promise<Plane[]> {
    let count = 0;
    const planesList: Array<Plane> = [];
    return fireStore
      .collection("planes")
      .withConverter(planeConverter)
      .orderBy(orderby ? orderby : "name")
      .get()
      .then(async (res) => {
        await res.docs.forEach((doc) => {
          const plane: Plane = doc.data();
          plane.id = doc.id;
          for (const [key, value] of Object.entries(plane)) {
            if (value === undefined) {
              if (key === "crash") {
                console.log("crash auf false gesetzt", plane.name);
                plane.crash = false;
              }
            }
          }
          planesList.push(plane);
        });
        count = planesList.length;
        return planesList;
      })
      .catch((e) => {
        console.log("nichts gefunden", e);
        return [];
      })
      .finally(() => {
        count = planesList.length;
        console.info("Fertig. ", count, " Flugzeuge geladen");
      });
  }
  static saveNewPlane(
    plane: Plane
  ): Promise<void | DocumentReference<DocumentData>> {
    if (plane.image === undefined) {
      console.log("Dummy Image");
      plane.image =
        "https://firebasestorage.googleapis.com/v0/b/hangar-7334.appspot.com/o/planes%2Fhangar-plane-text.png?alt=media&token=eb990547-807f-4ea1-a6b5-89de4494defa";
    }
    return fireStore
      .collection("planes")
      .withConverter(planeConverter)
      .add(Object.assign({}, plane))
      .then((res) => {
        return res;
      });
  }
  static uploadImage(
    imageName: string,
    imageFile: Blob,
    id: string
  ): Promise<void | string> {
    return fireBucket
      .ref("planes/" + imageName)
      .put(imageFile)
      .then(() => {
        return firebaseApp
          .storage()
          .ref("planes/" + imageName)
          .getDownloadURL();
      })
      .then((URL) => {
        console.log("update ", id, " 516513265653321 ", URL);
        return fireStore
          .collection("planes")
          .doc(id)
          .update({ image: URL })
          .then(() => {
            return URL;
          });
      })
      .then((URL) => {
        console.log("neue URL:", URL);
        return URL;
      })
      .catch((err) => {
        console.error(err);
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
    if (plane.beschreibung === undefined) {
      console.log("keine Beschreibung, - ", plane.beschreibung);
      plane.beschreibung = "";
    }
    if (plane.crash === undefined) plane.crash = false;

    for (const [key, value] of Object.entries(plane)) {
      if (value === undefined) {
        console.info(key, "ist noch undefined");
      }
    }

    console.info("try to update", planeConverter.toFirestore(plane))
    return fireStore
      .collection("planes")
      .doc(id)
      .update(planeConverter.toFirestore(plane))
      .then(() => {
        const convertedObject = planeConverter.toFirestore(plane)
        console.log("udated: ", convertedObject);
        return Plane.createFirePlane(convertedObject as Plane);
      });
  }

  static async copyCollection(): Promise<void> {
    const documents = await fireStore.collection("planes").get();
    const planesCopy = fireStore.collection("planesCopy");
    documents.docs.forEach((doc) => {
      planesCopy.doc(doc.get("id")).set(doc.data());
    });
  }
}
