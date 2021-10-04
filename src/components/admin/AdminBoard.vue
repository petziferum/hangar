<template>
  <v-container fluid class="pa-0">
    <v-toolbar color="secondary" dark width="100%">
      <v-toolbar-title>Admin Board</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-row>
      <v-col>
        <v-autocomplete
          class="mx-2"
          validate-on-blur
          :items="planes"
          item-text="name"
          return-object
          v-model="editPlane"
          @click="loadPlanes"
          @click:clear="clearEdit"
          @focus="clearEdit"
          label="Flugzeug bearbeiten"
          clearable
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-alert class="red--text">{{ message }}</v-alert>
    <v-row>
      <v-col cols="2" class="text-center">
        <v-btn fab @click="addNewPlane"><v-icon>mdi-plus</v-icon></v-btn>
        <v-card-text color="primary">Flugzeug Hinzufügen</v-card-text>
      </v-col>
      <v-col>
        <template v-if="newModel">
          <v-card>
            <v-card-title>Modell Hinzufügen</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="newPlane.name"
                  label="Name"
                ></v-text-field>
                <v-text-field
                  v-model="newPlane.type"
                  label="Typ"
                ></v-text-field>
                <v-text-field
                  v-model="newPlane.bauweise"
                  label="Bauweise"
                ></v-text-field>
                <v-text-field
                  v-model="newPlane.gewicht"
                  label="Gewicht"
                ></v-text-field>
                <v-text-field
                  v-model="newPlane.spannweite"
                  label="Spannweite"
                ></v-text-field>
                <v-textarea
                  v-model="newPlane.beschreibung"
                  label="Beschreibung"
                ></v-textarea>
                <v-select
                  :items="sender"
                  label="Sender"
                  item-value="sender"
                  v-model="newPlane.sender"
                ></v-select>
                <input
                  type="file"
                  ref="fileInput"
                  class="ma-2"
                  @change="picImageFile"
                />
                <v-btn @click="saveNewPlane">Speichern</v-btn>
              </v-form>
            </v-card-text>
            <v-card class="mx-auto" color="primary" width="50%" v-if="newPlane">
              <v-card-title
                >{{ newPlane.name }}
                <v-img
                  :src="require('@/assets/undefined.jpg')"
                  style="right: 0"
                  contain
                  height="50px"
                ></v-img>
              </v-card-title>
              <v-card-subtitle>{{ newPlane.type }}</v-card-subtitle>
              <v-card-text>
                <ul>
                  <li>Bauweise: {{ newPlane.bauweise }}</li>
                </ul>
              </v-card-text>
              <v-card-text>{{ newPlane }}</v-card-text>
            </v-card>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <edit-plane
          v-if="editPlane"
          @update="update"
          :plane="editPlane"
        ></edit-plane>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebaseService from "@/store/api/firebaseService";
import Plane from "@/types/Plane";
import EditPlane from "@/components/EditPlane.vue";
import { SenderAsRecord } from "@/types/Sender";
@Component({
  components: { EditPlane },
})
export default class AdminBoard extends Vue {
  planes: void | Plane[] = [];
  editPlane: Plane | null = null;
  message: null | Plane = null;
  newModel = false;
  newPlane: null | Plane = null;
  sender = SenderAsRecord;
  imageSrc: string | ArrayBuffer | null = null;
  imageName: string | undefined;
  image: Blob | null = null;
  imageLoading = false;
  googleImg = "";

  loadPlanes(): void {
    firebaseService.getAllPlanes().then((p) => {
      this.planes = p;
    });
  }
  addNewPlane() {
    this.newModel = true;
    this.newPlane = Plane.createEmptyPlane();
  }
  saveNewPlane() {
    const f = this.newPlane.spannweite / this.newPlane.gewicht;
    this.newPlane.faktor = f;
    this.newPlane.image = "";

    firebaseService
      .saveNewPlane(this.imageName, this.image, this.newPlane)
      .then((res) => {
        console.log(res);
      });
  }
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
  setEditPlane(value: Plane) {
    this.editPlane = value;
  }
  clearEdit(): void {
    this.message = null;
  }
  update(p: Plane): void {
    firebaseService.updatePlane(p.id, p).then((res) => {
      this.message = res;
      this.editPlane = null;
    });
  }
  logout(): void {
    firebaseService.firebaseLogout().then(() => {
      this.$router.push("/");
    });
  }
}
</script>

<style scoped></style>
