<template>
<v-container>
  planes: {{ planes }}
</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";

@Component
export default class DevTest extends Vue {
planes: Array<Plane> = [];

  initialize() {
  console.log("Initialize")
    let p = Plane.createEmptyPlane()
      .withName("Polycarpov")
      .withType("TD")
    .withBauweise("ETD")
    .withGewicht(945)
    .withSpannweite(98)
    .withFaktor(34)
    console.log("p", p)
    this.planes.push(p)
  }

  created() {
  this.initialize()
  }


}
</script>

<style scoped>

</style>