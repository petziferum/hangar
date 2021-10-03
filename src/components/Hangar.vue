<template>
  <v-container>
   <v-expansion-panels flat>
     <v-expansion-panel v-for="plane in planes" :key="plane.id">
       <v-expansion-panel-header>{{plane.name}}<v-spacer></v-spacer>{{ plane.id }}</v-expansion-panel-header>
       <v-expansion-panel-content>
         <v-img :src="plane.image" width="100%" height="100px"></v-img>
       </v-expansion-panel-content>
     </v-expansion-panel>
   </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";

@Component
export default class Hangar extends Vue {
  planes: Array<Plane> = [];
/*
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

 */
}
</script>

<style scoped></style>
