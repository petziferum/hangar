<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel v-for="plane in planes" :key="plane.id">
        <v-expansion-panel-header
          ripple
          :style="panelImage(plane.image)"
          ><v-spacer></v-spacer>{{ plane.name }} <v-spacer />{{ plane.sender }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-img
            :src="plane.image"
            class="contImg"
            width="100%"
            height="200px"
          ></v-img>
          <v-card tile elevation="4">
            <v-row v-if="screenMobile" no-gutters>
              <v-col cols="3">
                <v-card-text>Gewicht: {{ plane.gewicht }}</v-card-text>
              </v-col>
              <v-col cols="3">
                <v-card-text>Spannweite: {{ plane.spannweite }}</v-card-text>
              </v-col>
              <v-col cols="3">
                <v-card-text>Faktor: {{ plane.faktor }}</v-card-text>
              </v-col>
              <v-col cols="3">
                <v-card-text>Sender: {{ plane.sender }}</v-card-text>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <v-list dense>
                  <v-list-item-group>
                    <v-list-item dense>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Gewicht: {{ plane.gewicht }}g</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item dense>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Spannweite:
                          {{ plane.spannweite }}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item dense>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Faktor: {{ plane.faktor }}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item dense>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Sender: {{ plane.sender }}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
            <v-card-text
              class="descriptionBox elevation-4"
              v-html="plane.beschreibung"
            ></v-card-text>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import firebaseService from "@/store/api/firebaseService";
import AdminBoard from "@/components/admin/AdminBoard.vue";
import EditPlane from "@/components/EditPlane.vue";

@Component
export default class Hangar extends Vue {
  planes: Plane[] | void = [];

  get screenMobile(): boolean {
    return window.innerWidth > 500;
  }

  getPlanes(): void {
    console.log("starte fetch");
    firebaseService.getAllPlanes().then((planesList) => {
      this.planes = planesList;
    });
  }
  updateBeschreibung(id: string, text: string): void {
    firebaseService.updatePlaneDescription(id, text);
  }
  panelImage(image:string) {

    const style = "backgroundImage: url("+image+"); background-size: contain";
    return style;
  }

  created(): void {
    this.getPlanes();
  }
}
</script>
<style scoped>
.contImg {
  width: 100% !important;
  margin: 0 !important;
  left: 0px;
}
.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
.descriptionBox {
  position: relative;
  border: 0px solid grey;
  border-radius: 5px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}
</style>
