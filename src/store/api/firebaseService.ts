import { fireStore } from "@/plugins/firesbaseConfig";
import Plane from "@/types/Plane";

export default class HangarService {

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
}
