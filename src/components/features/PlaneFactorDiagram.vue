<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        Min: {{ min }}<br />
        Max: {{ max }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div style="width: 100%; height: 100px; border: 1px solid">
          <div
            v-for="g in grid"
            :key="`${g}+'plane'`"
            class="grid"
            :style="{ left: distance(g) + '%' }"
          >
            {{ g }}
          </div>
          <div class="markerContainer">
            <div
              v-for="(plane, i) in factors"
              :key="i"
              class="marker"
              :style="{
                left: distance(plane.faktor) + '%',
              }"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <div
                    v-on="on"
                    style="position: absolute; width: 100%; height: 100%"
                  ></div>
                </template>
                <span>{{ plane.name }}: {{ plane.faktor }}</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <v-simple-table>
          <thead>
            <tr>
              <th>Flieger {{ counter }}</th>
              <th>Faktor</th>
              <th>
                <v-btn @click="fetchAllPlanes">fetch Planes</v-btn>
              </th>
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
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebaseService from "@/store/api/firebaseService";
import Plane from "@/types/Plane";

class planeFactor {
  constructor(public id: string, public name: string, public faktor: number) {
    this.id = id;
    this.name = name;
    this.faktor = faktor;
  }
}

@Component
export default class PlaneFactorDiagram extends Vue {
  planesList: Plane[] = [];
  grid = [5, 10, 15, 20, 25, 30];
  counter = this.planesList.length;
  factors: planeFactor[] = [];
  min = 9999;
  max = 0;

  distance(i: number): number {
    const n = (i / 30) * 100;
    console.log(n);
    return n;
  }

  fetchAllPlanes(): void {
    firebaseService.getAllPlanes("faktor").then((res) => {
      console.log(res);
      if (res) {
        this.planesList = res;
        res.forEach((f) => {
          const pf = new planeFactor(f.id, f.name, f.faktor);
          this.factors.push(pf);
        });
        this.findMinMax();
      }
    });
  }

  findMinMax(): void {
    for (let i = 0; i < this.factors.length; i++) {
      if (this.factors[i].faktor > this.max) {
        this.max = this.factors[i].faktor;
      }
      if (this.factors[i].faktor < this.min) {
        this.min = this.factors[i].faktor;
      }
    }
  }
}
</script>

<style scoped>
.markerContainer {
  position: relative;
  height: 100%;
  width: 100%;
}
.marker {
  position: absolute;
  cursor: pointer;
  z-index: 10;
  top: 25%;
  width: 8px;
  height: 50px;
  border-radius: 5px;
  background-color: rgba(10, 10, 100, 0.5);
}
.grid {
  position: absolute;
  z-index: 0;
  width: 100px;
  height: 99px;
  display: flex;
  align-items: flex-end;
  border-left: 2px solid grey;
}
</style>
