<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <v-select
          prefix="Sortieren nach:    "
          dark
          filled
          :items="orderList"
          v-model="orderBy"
          @input="getByOrder"
        ></v-select>
        <div class="white--text">Flugzeuge: {{ planes.length }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel v-for="plane in planes" :key="plane.id">
            <v-expansion-panel-header
              ripple
              :style="panelImage(plane.image)"
              v-slot="{ open }"
            >
              <v-row>
                <v-fade-transition leave-absolute>
                  <v-col
                    :cols="open ? 2 : 3"
                    class="red--text font-weight-bold"
                    style="transform: rotate(-25deg)"
                    ><span v-if="plane.crash">CRASHED</span></v-col
                  >
                </v-fade-transition>
              </v-row>
              <v-spacer />
              <v-row no-gutters>
                <v-col cols="3">
                  {{ plane.name }}
                </v-col>
                <v-col
                  v-if="$vuetify.breakpoint.mdAndUp"
                  cols="3"
                  class="grey--text caption"
                >
                  Gewicht: {{ plane.gewicht }}
                </v-col>
                <v-col
                  v-if="$vuetify.breakpoint.mdAndUp"
                  cols="3"
                  class="grey--text caption"
                >
                  Spannweite: {{ plane.spannweite }}
                </v-col>
                <v-col
                  v-if="$vuetify.breakpoint.mdAndUp"
                  cols="3"
                  class="grey--text caption"
                >
                  Faktor: {{ plane.faktor }}
                </v-col>
              </v-row>
              <v-spacer />{{ plane.sender }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <template v-if="adminUser">
                <AdminActionBar :plane="plane" @update="getPlanes" />
              </template>
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
                <v-row>
                  <v-col cols="12">
                    <v-simple-table dense>
                      <template v-slot:default>
                        <tbody>
                          <tr v-for="(value, key) in plane" :key="key">
                            <th>{{ key }}</th>
                            <td>{{ value }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-card-text
                      class="descriptionBox elevation-4"
                      v-text="plane.beschreibung"
                    ></v-card-text>
                  </v-col>
                </v-row>
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
import AdminActionBar from "@/components/features/AdminActionBar.vue";
@Component({
  components: { AdminActionBar },
})
export default class Hangar extends Vue {
  planes: Plane[] | void = [];

  imageLightBox = false;
  orderList = ["name", "id", "faktor", "gewicht", "spannweite"];
  orderBy = "name";

  get screenMobile(): boolean {
    console.log(window.innerWidth);
    return window.innerWidth > 500;
  }

  get adminUser(): boolean {
    const user = this.$store.getters.getUser;
    if (user) {
      return user.uid === "Pjkzvd5lIodGknPvC2agDSa3e8r1";
    } else return false;
  }

  getByOrder(): void {
    console.info("order by", this.orderBy);
    this.getPlanes();
  }

  getPlanes(): void {
    console.log("starte fetch");
    firebaseService.getAllPlanes(this.orderBy).then((planesList) => {
      this.planes = planesList;
    });
  }

  panelImage(image: string): string {
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
