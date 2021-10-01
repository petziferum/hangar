<template>
  <v-container>
    DEVTEST
    <v-row justify="center">
      <v-col>
        <plane-expansion-panel-view :planes="planes"></plane-expansion-panel-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import { default as planes } from "../types/p3.json";
import Sender from "@/types/Sender";
import PlaneDialog from "@/components/PlaneDialog.vue";
import PlaneExpansionPanelView from "@/components/PlaneExpansionPanelView.vue";
import TestExpansion from "@/components/TestExpansion.vue";

@Component({
  components: { TestExpansion, PlaneExpansionPanelView, PlaneDialog },
})
export default class DevTest extends Vue {

  liste = [
    "Antonov",
    "Boomerang",
    "Corsair",
    "Eltra",
    "E-Zone",
    "Flame",
    "Fokker D9",
    "Hurricane",
    "Lighning +",
    "Lightning -",
    "Me 109",
    "Me 110",
    "Mig 3",
    "Moth",
    "Rata",
    "Red Bull",
    "Scirocco",
    "SE 10",
    "Spitfire",
    "Stuka",
    "Styro 66",
    "Texan",
    "Twin",
    "US Army"
  ]
  planes: Array<Plane> = []
  img = [{ plane: "", img: require("@/assets/logo.png") }];
  dialog = false;
  active = false;

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

  created(): void {
    this.importPlanes();
  }

}
</script>

<style scoped></style>
