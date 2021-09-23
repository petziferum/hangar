<template>
  <v-container>
    DEVTEST
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Plane </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(p, i) in planes" :key="i">
                <v-list-item-avatar tile height="80" width="100">
                  <v-img
                    :alt="p.image"
                    contain
                    :src="require('@/assets/' + p.image + '_00000.jpg')"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-form>
                    <v-row>
                      <v-col>
                        <v-icon :color="checkIfNotEmpty(p.name).color">{{
                          checkIfNotEmpty(p.name).icon
                        }}</v-icon>
                        Name: {{ p.name }}
                      </v-col>
                      <v-col>
                        <v-icon :color="checkIfNotEmpty(p.type).color">{{
                          checkIfNotEmpty(p.type).icon
                        }}</v-icon>
                        Typ: {{ p.type }}
                      </v-col>
                      <v-col>
                        <v-icon :color="checkIfNotEmpty(p.bauweise).color">{{
                          checkIfNotEmpty(p.bauweise).icon
                        }}</v-icon>
                        Bauweise: {{ p.bauweise }}
                      </v-col>
                      <v-col>
                        <v-icon :color="checkIfNotEmpty(p.gewicht).color">{{
                          checkIfNotEmpty(p.gewicht).icon
                        }}</v-icon>
                        Gewicht: {{ p.gewicht }}
                      </v-col>
                      <v-col>
                        <v-icon :color="checkIfNotEmpty(p.spannweite).color">{{
                          checkIfNotEmpty(p.spannweite).icon
                        }}</v-icon>
                        Spannweite: {{ p.spannweite }}
                      </v-col>
                      <v-col>
                        <v-icon :color="checkIfNotEmpty(p.faktor).color">{{
                          checkIfNotEmpty(p.faktor).icon
                        }}</v-icon>
                        Faktor: {{ p.faktor }}
                      </v-col>
                      <v-col>
                        <v-icon :color="checkIfNotEmpty(p.sender).color">{{
                          checkIfNotEmpty(p.sender).icon
                        }}</v-icon>
                        Sender: {{ p.sender }}
                      </v-col>
                      <v-col>
                        <v-icon
                          :color="checkIfNotEmpty(p.beschreibung).color"
                          >{{ checkIfNotEmpty(p.beschreibung).icon }}</v-icon
                        >
                        Beschreibung: {{ p.beschreibung }}
                      </v-col>
                      <v-col>
                        <v-btn @click="dialogOpen(p)">Bearbeiten</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        Editieren: {{ editPlane }}
        <PlaneDialog v-model="dialog" :plane="editPlane" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import { default as planes } from "../types/p2.json";
import Sender from "@/types/Sender";
import PlaneDialog from "@/components/PlaneDialog.vue";

interface Check {
  color: string;
  icon: string;
}

@Component({
  components: { PlaneDialog },
})
export default class DevTest extends Vue {
  planes: Array<Plane> = [];
  img = [{ plane: "", img: require("@/assets/logo.png") }];
  editPlane: Plane | null = null;
  dialog = false;

  dialogOpen(p: Plane): void {
    this.editPlane = p;
    this.dialog = true;
  }

  checkIfNotEmpty(value: string): Check {
    if (value != null && value != undefined) {
      if (value.length > 0 || value.toString().length > 0) {
        return { color: "green", icon: "mdi-check" };
      } else {
        return { color: "red", icon: "mdi-close-box" };
      }
    } else {
      return { color: "red", icon: "mdi-close-box-outline" };
    }
  }

  importPlanes(): void {
    const liste = planes;
    for (let p of liste) {
      const plane = Plane.createEmptyPlane()
        .withName(p.name)
        .withType(p.type)
        .withBauweise(p.bauweise)
        .withGewicht(p.gewicht)
        .withSpannweite(p.spannweite)
        .withImage(p.image);

      if (typeof p.faktor === "string") {
        const newfaktor = p.faktor.replace(",", ".");
        plane.withFaktor(parseFloat(newfaktor));
      } else {
        plane.withFaktor(p.faktor);
      }
      if (p.sender != undefined) {
        switch (p.sender) {
          case "Turnigy":
            plane.withSender(Sender.TURNIGY);
            break;
          case "Spektrum":
            plane.withSender(Sender.SPEKTRUM);
            break;
          default:
            plane.withSender(Sender.UNKNOWN);
        }
      }

      const image = {
        plane: p.image,
        img: require("@/assets/" + p.image + "_00000.jpg"),
      };
      this.img.push(image);
      this.planes.push(plane);
    }
  }

  created(): void {
    this.importPlanes();
  }
}
</script>

<style scoped></style>
