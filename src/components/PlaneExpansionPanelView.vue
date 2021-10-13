<template>
  <v-card>
    <v-card-title> Flugzeuge </v-card-title>

    <v-list>
      <v-list-group v-for="p in planes" :key="p.name" multiple>
        <template v-slot:activator>
          <v-list-item-avatar tile height="100%" width="10%">
            <v-img
              :alt="p.image"
              cover
              :src="require('@/assets/' + p.image + '_00000.jpg')"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ p.name }}</v-list-item-title>
            <v-list-item-subtitle v-if="screenWidth">
              <v-icon :color="checkIfNotEmpty(p.type).color">{{
                checkIfNotEmpty(p.type).icon
              }}</v-icon>
              Typ: {{ p.type }}

              <v-icon :color="checkIfNotEmpty(p.bauweise).color">{{
                checkIfNotEmpty(p.bauweise).icon
              }}</v-icon>
              Bauweise: {{ p.bauweise }}

              <v-icon :color="checkIfNotEmpty(p.gewicht).color">{{
                checkIfNotEmpty(p.gewicht).icon
              }}</v-icon>
              Gewicht: {{ p.gewicht }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="screenWidth">
              <v-icon :color="checkIfNotEmpty(p.spannweite).color">{{
                checkIfNotEmpty(p.spannweite).icon
              }}</v-icon>
              Spannweite: {{ p.spannweite }}

              <v-icon :color="checkIfNotEmpty(p.faktor).color">{{
                checkIfNotEmpty(p.faktor).icon
              }}</v-icon>
              Faktor: {{ p.faktor }}

              <v-icon :color="checkIfNotEmpty(p.sender).color">{{
                checkIfNotEmpty(p.sender).icon
              }}</v-icon>
              Sender: {{ p.sender }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-card flat color="#f9f9ff">
              <v-img
                :src="require('@/assets/' + p.image + '_00000.jpg')"
                width="100%"
                height="300px"
              ></v-img>
              <v-card-title>{{ p.name }}</v-card-title>
              <v-card-actions>
                <v-btn @click="dialogOpen(p)">Bearbeiten</v-btn>
                <v-btn
                  :color="isOnFlightList(p.name) ? '' : 'success'"
                  :disabled="isOnFlightList(p.name)"
                  @click="addFlightList(p)"
                  >Fliegen
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="2">
                    <v-chip>Typ: {{ p.type }}</v-chip>
                  </v-col>
                  <v-col cols="2">
                    <v-chip>Bauweise: {{ p.bauweise }}</v-chip>
                  </v-col>
                  <v-col cols="2">
                    <v-chip>Gewicht: {{ p.gewicht }}</v-chip>
                  </v-col>
                  <v-col cols="2">
                    <v-chip>Spannweite: {{ p.spannweite }}</v-chip>
                  </v-col>
                  <v-col cols="2">
                    <v-chip>Faktor: {{ p.faktor }}</v-chip>
                  </v-col>
                  <v-col cols="2">
                    <v-chip>Sender: {{ p.sender }}</v-chip>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text v-html="p.beschreibung"></v-card-text
            ></v-card>
          </v-list-item-content>
        </v-list-item>
        <v-card elevation="10">
          <v-card-title>
            Upload single Plane<v-spacer />
            <v-dialog width="30%" v-model="saveDialog">
              <v-card>
                <v-card-title>Upload</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="4">
                      <v-img
                        width="100px"
                        :src="require('@/assets/' + p.image + '_00000.jpg')"
                      ></v-img>
                    </v-col>
                    <v-col>
                      <input
                        ref="fileInput"
                        type="file"
                        @change="picImageFile"
                      />
                      <v-icon v-if="imageLoading">mdi-loading mdi-spin</v-icon>
                      <br />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <ul>
                        <li v-for="(value, key) in p" :key="key">
                          {{ key }}: {{ value }}
                        </li>
                      </ul>
                      URL: {{ googleImg }}
                    </v-col>
                    <v-col> </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-card-title>
        </v-card>
        <v-divider></v-divider>
      </v-list-group>
    </v-list>
    <PlaneDialog v-model="dialog" :plane="editPlane" />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import PlaneDialog from "@/components/PlaneDialog.vue";

interface Check {
  color: string;
  icon: string;
}
@Component({
  components: { PlaneDialog },
})
export default class PlaneExpansionPanelView extends Vue {
  @Prop()
  planes!: Array<Plane>;

  saveDialog = false;
  img = [{ plane: "", img: require("@/assets/logo.png") }];
  editPlane: Plane | null = null;
  uploadready: Array<Plane> = [];
  dialog = false;
  active = false;
  imageSrc: string | ArrayBuffer | null = null;
  imageName: string | undefined;
  image: Blob | null = null;
  imageLoading = false;
  googleImg = "";

  get screenWidth(): boolean {
    return window.innerWidth > 500;
  }

  // eslint-disable-next-line
  picImageFile(e: any): void {
    //let t = event.currentTarget as HTMLInputElement;

    const file = e.target.files[0];

    this.imageName = file.name;
    console.log("bild", file);
    const fr = new FileReader();
    fr.addEventListener("load", () => {
      this.imageSrc = fr.result;
    });
    fr.readAsDataURL(file);
    this.image = file;
    console.log("fileReader", fr);
  }

  setImageFile(img: string): void {
    const src = "@/assets/" + img + "_00000.jpg";
    const fr = new FileReader();
    fr.addEventListener("load", () => {
      this.imageSrc = fr.result;
    });
    console.log("imageSrc:", this.imageSrc, "src: ", src);
  }

  addFlightList(value: Plane): void {
    this.$store.dispatch("addToFlightlist", value);
  }
  isOnFlightList(value: string): Plane {
    return this.$store.getters.getFlightList.some(
      (el: { name: string }) => el.name === value
    );
  }
  dialogOpen(p: Plane): void {
    this.editPlane = p;
    this.dialog = true;
  }

  checkIfNotEmpty(value: string): Check {
    if (value != null) {
      if (value.length > 0 || value.toString().length > 0) {
        return { color: "green", icon: "mdi-check" };
      } else {
        return { color: "red", icon: "mdi-close-box" };
      }
    } else {
      return { color: "red", icon: "mdi-close-box-outline" };
    }
  }
}
</script>

<style scoped></style>
