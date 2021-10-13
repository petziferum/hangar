<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <v-select
          prefix="Sortieren nach:    "
          dark
          filled
          :items="orderList" v-model="orderBy" @input="getByOrder"></v-select>
        <div class="white--text">Flugzeuge: {{ planes.length }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel v-for="plane in planes" :key="plane.id">
            <v-expansion-panel-header ripple :style="panelImage(plane.image)"
              ><v-spacer></v-spacer>{{ plane.name }} <v-spacer />{{
                plane.sender
              }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-dialog>
                <template v-slot:activator="{ on }">
                  <v-img
                    :src="plane.image"
                    class="contImg"
                    width="100%"
                    height="200px"
                    v-on="on"
                  >
                    <v-overlay
                      v-if="plane.crash"
                      color="red"
                      absolute
                      class="red--text text-h1"
                    >
                      Schrott
                    </v-overlay>
                  </v-img>
                </template>
                <v-img :src="plane.image" width="100%"></v-img>
              </v-dialog>
              <v-card tile elevation="4">
                <v-row v-if="screenMobile" no-gutters>
                  <v-col cols="3">
                    <v-card-text>Gewicht: {{ plane.gewicht }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text
                      >Spannweite: {{ plane.spannweite }}</v-card-text
                    >
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
                              >Crash: {{ plane.crash }}g</v-list-item-subtitle
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
                  v-text="plane.beschreibung"
                ></v-card-text>
                <template v-if="adminUser">
                  <v-card-actions>
                    <v-toolbar elevation="1" dense>
                      <v-toolbar-items>
                        <v-spacer />
                        <v-btn color="red" @click="updateSchrott(plane)"
                          >Schrott!</v-btn
                        >
                      </v-toolbar-items>
                    </v-toolbar>
                  </v-card-actions>
                </template>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import firebaseService from "@/store/api/firebaseService";

@Component
export default class Hangar extends Vue {
  planes: Plane[] | void = [];

  imageLightBox = false;
  orderList = ["name", "id", "faktor", "gewicht", "spannweite"];
  orderBy = "name";

  get screenMobile(): boolean {
    return window.innerWidth > 500;
  }

  get adminUser(): boolean {
    const user = this.$store.getters.getUser;
    if (user) {
      return user.uid === "C6SQTqeWWohygB48Qce0WZ5juxl1";
    } else return false;
  }

  getByOrder(): void {
    console.info("order by", this.orderBy)
    this.getPlanes();
  }

  getPlanes(): void {
    console.log("starte fetch");
    firebaseService.getAllPlanes(this.orderBy).then((planesList) => {
      this.planes = planesList;
    });
  }
  updateBeschreibung(id: string, text: string): void {
    firebaseService.updatePlaneDescription(id, text);
  }
  updateSchrott(p: Plane): void {
    firebaseService.setPlaneSchrott(p).then((res) => {
      console.info("Schrott", res);
      this.getPlanes();
    });
  }
  panelImage(image: string) {
    const style =
      "backgroundImage: url(" + image + "); background-size: contain";
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
  cursor: pointer;
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
