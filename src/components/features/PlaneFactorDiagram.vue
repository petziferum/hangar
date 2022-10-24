<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        {{ factors }}<br />
        Min: {{ min }}<br />
        Max: {{ max }}</v-col
      >
      <v-col cols="9">
        <v-simple-table>
          <thead>
            <tr>
              <th>Flieger {{ counter }}</th>
              <th>Faktor</th>
              <th><v-btn @click="fetchAllPlanes">fetch Planes</v-btn></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in planesList" :key="p.id">
              <td>{{ p.name }}</td>
              <td>{{ p.faktor }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebaseService from "@/store/api/firebaseService";
import Plane from "@/types/Plane";

@Component
export default class PlaneFactorDiagram extends Vue {
  planesList: Plane[] = [];
  counter = this.planesList.length;
  factors: number[] = [];
  min = 9999;
  max = 0;

  fetchAllPlanes(): void {
    firebaseService.getAllPlanes("faktor").then((res) => {
      console.log(res);
      if (res) {
        this.planesList = res;
        res.forEach((f) => this.factors.push(f.faktor));
        this.findMinMax();
      }
    });
  }

  findMinMax(): void {
    for (let i = 0; i < this.factors.length; i++) {
      if (this.factors[i] > this.max) {
        this.max = this.factors[i];
      }
      if (this.factors[i] < this.min) {
        this.min = this.factors[i];
      }
    }
  }
}
</script>

<style scoped></style>
