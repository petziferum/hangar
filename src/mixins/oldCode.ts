/*
 uploadImage(plane: Plane) {
   if (!plane.sender) plane.sender = Sender.UNKNOWN;
   if (!plane.bauweise) plane.bauweise = "";

   let p = {
     name: plane.name,
     sender: plane.sender,
     type: plane.type,
     bauweise: plane.bauweise,
     gewicht: plane.gewicht,
     spannweite: plane.spannweite,
     faktor: plane.faktor,
     image: plane.image,
   };
   this.imageLoading = true;
   if (this.image != null) {
     const dateiname = this.imageName?.slice(this.imageName?.lastIndexOf("."));
     console.log("dateiname", this.imageName, dateiname);
     const storageRef = bucket.ref("planes/" + this.imageName);
     storageRef
       .put(this.image)
       .then((snap) => {
         console.log("snap", snap);
         return bucket.ref("planes/" + this.imageName).getDownloadURL();
       })
       .then((URL) => {
         console.log("url", URL);
         this.googleImg = URL;
         p.image = URL;
         console.log("plane", p);
       })
       .then(() => {
         store
           .collection("planes")
           .add(p)
           .then((res) => {
             const key = res.id;
             console.log("Flugzeug gespeichert: ", key, res);
           });
       })
       .finally(() => {
         this.saveDialog = false;
         this.imageLoading = false;
       });
   } else console.log("kein Bild");
 }



uploadPlane(plane: Plane): void {
  this.uploadready.push(plane);
}

import Plane from "@/types/Plane";
import Sender from "@/types/Sender";
import { default as planes } from "../types/p3.json";
import Sender from "@/types/Sender";

importPlanes(): void {
  const liste = planes;
  for (let p of liste) {
  const plane = Plane.createEmptyPlane()
    .withName(p.name)
    .withType(p.type)
    .withBauweise(p.bauweise)
    .withGewicht(p.gewicht)
    .withSpannweite(p.spannweite)
    .withImage(p.image);
  if (p.beschreibung) {
    plane.withBeschreibung(p.beschreibung);
  } else {
    plane.withBeschreibung("");
  }
  if (typeof p.faktor === "string") {
    const newfaktor = p.faktor.replace(",", ".");
    plane.withFaktor(parseFloat(newfaktor));
  } else {
    plane.withFaktor(p.faktor);
  }
  if (p.sender != undefined) {
    switch (p.sender) {
      case "Turnigy":
        plane.withSender(Sender.TURNIGY);
        break;
      case "Spektrum":
        plane.withSender(Sender.SPEKTRUM);
        break;
      default:
        plane.withSender(Sender.UNKNOWN);
    }
  }
  const image = {
    plane: p.image,
    img: require("@/assets/" + p.image + "_00000.jpg"),
  };
  this.img.push(image);
  this.planes.push(plane);
}
}

 */
