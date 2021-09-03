<template>
  <v-container>
    <DataTable />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import DataTable from "@/components/DataTable.vue";
@Component({
  components: { DataTable },
})
export default class DevTest extends Vue {
  planes: Array<Plane> = [];

  initialize(): void {
    console.log("Initialize");
    let p = Plane.createEmptyPlane()
      .withName("Polycarpov")
      .withType("TD")
      .withBauweise("ETD")
      .withGewicht(945)
      .withSpannweite(98)
      .withFaktor(34);
    this.planes.push(p);
  }

  created(): void {
    this.initialize();
  }
}
</script>

<style scoped></style>
