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
          filled
          dark
          class="mx-2 mt-2"
          validate-on-blur
          :items="planes"
          item-text="name"
          return-object
          v-model="editPlane"
          @click="loadPlanes"
          @click:clear="clearEdit"
          @change="startEdit"
          @blur="clearEdit"
          label="Flugzeug bearbeiten"
          clearable
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-alert class="red--text" v-if="message">{{ message }}</v-alert>
    <v-row>
      <v-col class="text-center">
        <v-btn class="rounded-pill" @click="addNewPlaneDialog"
          ><v-icon>mdi-plus</v-icon>Neues Flugzeug</v-btn
        >
        <add-plane
          ref="addplanedialog"
          v-model="newPlane"
          @uploaded="resetPlane"
        />
      </v-col>
      <v-col>
        <v-btn class="rounded-pill" @click="uploadImageDialog"
          ><v-icon>mdi-upload</v-icon>Bild hochladen</v-btn
        >
        <upload-image-dialog ref="uploadimagedialog"></upload-image-dialog>
      </v-col>
      <v-col>
        <flugplan-dialog></flugplan-dialog>
      </v-col>
      <!-- Funktion um alle Flugzeuge in der Collection 'planesCopy' zu sichern
      <v-col cols="10">
        <v-btn @click="copyCollection">copy</v-btn>
      </v-col>
      -->
    </v-row>

    <v-row>
      <v-col cols="12">
        <div v-for="liste in flugzeugListen" :key="liste.id">
          id: {{ liste.id }}<br />
          name: {{ liste.name }}<br />
          date: {{ liste.date }}<br />
          flugzeuge {{ liste.flugzeuge }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <plane-dialog
          ref="planedialog"
          v-model="dialog"
          :plane="editPlane"
          @update="update"
          @cancel="cancelEdit"
        ></plane-dialog>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebaseService from "@/store/api/firebaseService";
import Plane from "@/types/Plane";
import EditPlane from "@/components/EditPlane.vue";
import { SenderAsRecord } from "@/types/Sender";
import PlaneDialog from "@/components/PlaneDialog.vue";
import AddPlane from "@/components/AddPlane.vue";
import UploadImageDialog from "@/components/features/UploadImageDialog.vue";
import Flugzeugliste from "@/types/Flugzeugliste";
import FlugplanDialog from "@/components/features/FlugplanDialog.vue";
@Component({
  components: {
    FlugplanDialog,
    EditPlane,
    PlaneDialog,
    AddPlane,
    UploadImageDialog,
  },
})
export default class AdminBoard extends Vue {
  planes: void | Plane[] = [];
  editPlane: Plane | null = null;
  message: null | Plane = null;
  newModel = false;
  newPlane: null | Plane = Plane.createEmptyPlane();
  sender = SenderAsRecord;
  imageSrc: string | ArrayBuffer | null = null;
  imageName: string | undefined;
  image: Blob | null = null;
  imageLoading = false;
  googleImg = "";
  dialog = false;
  basedialog = false;
  flugzeugListen: Flugzeugliste[] = [];

  get imageList(): any[] {
    return this.$store.getters.GET_IMAGELIST;
  }

  startEdit(): void {
    const planeDialog = this.$refs.planedialog as PlaneDialog;
    planeDialog.open();
  }
  cancelEdit(): void {
    this.editPlane = null;
  }

  resetPlane(): void {
    this.newPlane = null;
    this.newPlane = Plane.createEmptyPlane();
    console.log("reset?", this.newPlane);
  }

  loadPlanes(): void {
    firebaseService.getAllPlanes("name").then((p) => {
      this.planes = p;
    });
  }
  addNewPlane(): void {
    this.newModel = true;
    this.newPlane = Plane.createEmptyPlane();
  }
  copyCollection(): void {
    firebaseService.copyCollection();
  }
  addNewPlaneDialog(): void {
    const dialog = this.$refs.addplanedialog as AddPlane;
    Object.assign(dialog, this.newPlane);
    dialog.openDialog();
  }

  uploadImageDialog(): void {
    const dialog = this.$refs.uploadimagedialog as UploadImageDialog;
    dialog.openDialog();
  }

  setEditPlane(value: Plane): void {
    this.editPlane = value;
  }

  clearEdit(): void {
    this.message = null;
  }

  update(p: Plane): void {
    firebaseService.updatePlane(p.id, p).then((res) => {
      this.message = res;
      this.editPlane = null;
      this.dialog = false;
    });
  }
  logout(): void {
    firebaseService.firebaseLogout().then(() => {
      this.$router.push("/");
    });
  }

  created(): void {
    this.$store.dispatch("FETCH_IMAGES");
  }
}
</script>

<style scoped></style>
