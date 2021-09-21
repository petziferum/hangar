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
                        <v-text-field
                          v-model="p.name"
                          label="name"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="p.type"
                          label="type"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="p.bauweise"
                          label="Bauweise"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="p.gewicht"
                          label="Gewicht"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="p.spannweite"
                          label="Spannweite"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="p.faktor"
                          label="Faktor"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="p.sender"
                          label="sender"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn disabled>Speichern</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import { default as planes } from "../types/p2.json";
import Sender from "@/types/Sender";

@Component({
  components: {},
})
export default class DevTest extends Vue {
  planes: Array<Plane> = [];
  img = [{ plane: "", img: require("@/assets/logo.png") }];

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
      if (p.sender) {
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
