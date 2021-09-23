<template>
  <v-dialog v-model="isOpen">
    <template v-if="!p">
      <v-skeleton-loader type="card"></v-skeleton-loader>
    </template>
    <template v-else>
      <v-card>
        <v-card-title>Flugzeug: {{ p.name }}</v-card-title>
        <v-form ref="editPlane">
          <v-card-actions>
            <v-text-field outlined label="Name" v-model="p.name"></v-text-field>
            <v-text-field outlined label="Typ" v-model="p.type"></v-text-field>
            <v-text-field
              outlined
              label="Bauweise"
              v-model="p.bauweise"
            ></v-text-field>
            <v-text-field
              outlined
              label="Spannweite"
              v-model="p.spannweite"
            ></v-text-field>
            <v-text-field
              outlined
              label="Faktor"
              v-model="p.faktor"
            ></v-text-field>
            <v-text-field outlined label="Typ" v-model="p.type"></v-text-field>
          </v-card-actions>
          <v-card-actions class="pa-3 ma-3">
            <v-textarea
              outlined
              label="Beschreibung"
              v-model="p.beschreibung"
            ></v-textarea>
          </v-card-actions>
          <v-card-actions class="border justify-end">
            <v-btn @click="isOpen = !isOpen">Abbrechen</v-btn>
            <v-btn @click="savePlane" color="success">Speichern</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Plane from "@/types/Plane";

@Component
export default class PlaneDialog extends Vue {
  @Prop()
  value!: boolean;

  @Prop()
  plane!: Plane;

  get p(): Plane {
    return this.plane;
  }

  set p(value: Plane) {
    this.$emit("saveplane", this.p);
  }

  get isOpen(): boolean {
    return this.value;
  }

  set isOpen(value: boolean) {
    this.$emit("input", value);
  }

  savePlane(): void {
    this.$emit("saveplane", this.p);
    this.isOpen = false;
  }
}
</script>

<style scoped></style>
