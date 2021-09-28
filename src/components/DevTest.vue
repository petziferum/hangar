<template>
  <v-container>
    DEVTEST
    <v-row>
      <v-col>
        <TestExpansion />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import { default as planes } from "../types/p2.json";
import Sender from "@/types/Sender";
import PlaneDialog from "@/components/PlaneDialog.vue";
import PlaneExpansionPanelView from "@/components/PlaneExpansionPanelView.vue";
import TestExpansion from "@/components/TestExpansion.vue";

@Component({
  components: { TestExpansion, PlaneExpansionPanelView, PlaneDialog },
})
export default class DevTest extends Vue {
  planes: Array<Plane> = [];
  img = [{ plane: "", img: require("@/assets/logo.png") }];
  editPlane: Plane | null = null;
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
