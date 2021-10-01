<template>
  <v-container>
    Planes: <v-btn @click="getPlanes">fetch</v-btn>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="p in planes" :key="p.id">
        <v-card>
          <v-card-title>{{ p.name }}</v-card-title>
          <v-img :src="p.image"> </v-img>
          <v-card-text>
            {{ p }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import { store } from "@/plugins/firesbaseConfig";

@Component
export default class Hangar extends Vue {
  planes: Array<Plane> = [];

  getPlanes() {
    console.log("starte fetch");
    store
      .collection("planes")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          console.log("planes online", data);
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

          this.planes.push(plane);
        });
      })
      .catch(() => {
        console.log("nichts gefunden");
      })
      .finally(() => {
        console.info("fertig");
      });
  }

  created() {
    this.getPlanes();
  }
}
</script>

<style scoped></style>
