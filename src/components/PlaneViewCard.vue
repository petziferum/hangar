<template>
  <v-card flat color="#e0e0e0">
    <v-img
      :src="require('@/assets/' + plane.image + '_00000.jpg')"
      max-height="100px"
      width="100%"
      ><span class="caption white--text">bild:{{ plane.image }}</span></v-img
    >
    <v-card-title>{{ plane.name }}</v-card-title
    ><v-card-text>{{ plane.beschreibung }}</v-card-text>
    <v-card-actions>
      <v-btn @click="dialogOpen(p)">Bearbeiten</v-btn>
    </v-card-actions></v-card
  >
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";

@Component
export default class PlaneViewCard extends Vue {
  @Prop()
  plane!: Plane;
}
</script>

<style scoped></style>
