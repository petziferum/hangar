<template>
  <v-container>
    DEVTEST
    <v-row>
      <v-col>
        <plane-expansion-panel-view
          :planes="planes"
        ></plane-expansion-panel-view>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-toolbar elevation="3" style="z-index: 100; margin-top:20px"> Flugtag Liste </v-toolbar>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text v-for="(model, i) in flightList" :key="model.name">
            {{ i+1 }}. Flugzeug: {{ model.name }} Sender: {{ model.sender }}
          </v-card-text>
        </v-card>
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

  get flightList() {
    return this.$store.getters.getFlightList;
  }

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
