<template>
  <base-dialog v-model="open">
  <v-card tile>
    <v-card-title>Neues Modell</v-card-title>
    {{plane}}
  </v-card>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseDialog from "@/components/commons/BaseDialog.vue";
import Plane from "@/types/Plane";
@Component({
  components: { BaseDialog },
})
export default class AddPlane extends Vue {
  @Prop()
  value!: Plane;

  open = false;

  get plane(): Plane {
    return this.value;
  }
  set plane(value: Plane) {
    this.$emit("input", value);
  }

  openDialog(): void {
    this.open = !this.open;
  }
}
</script>

<style scoped></style>
