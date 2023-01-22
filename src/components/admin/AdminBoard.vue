<template>
  <v-container fluid class="pa-0">
    <v-toolbar color="secondary" dark width="100%">
      <v-toolbar-title>Admin Board</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn tile @click="loadPlanes">Laden</v-btn>
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
        <flugplan-dialog @save="addNewFlugplan"></flugplan-dialog>
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
      <v-col>
      {{ returnLatestUpdatedPlane() }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import firebaseService from "@/store/api/firebaseService";
import Plane, { planeConverter } from "@/types/Plane";
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
  planes: Plane[] = [];
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
  @Ref("planedialog")
  planeDialog: PlaneDialog;


  get imageList(): any[] {
    return this.$store.getters.GET_IMAGELIST;
  }

  returnLatestUpdatedPlane(): Plane {
    let latest = Plane.createEmptyPlane();

    return latest;
  }

  addNewFlugplan(value: Flugzeugliste): void {
    console.info("flugplan erstellt");
    this.flugzeugListen.push(value);
  }

  startEdit(): void {
    console.info("startEdit", this.editPlane)
    this.checkPlaneForUndefined();
    this.planeDialog.open();
  }

  checkPlaneForUndefined(): void {
    console.log("check for undefined: ", this.editPlane);
    if(this.editPlane) {
      for (const [key, value] of Object.entries(this.editPlane)) {
        if (value === undefined) {
          this.$toast.info(key + " ist noch undefined");
        }
      }
    }
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
      this.$toast.info(this.planes.length + " Flugzeuge geladen", { timeout: 1000});
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
    this.loadPlanes()
  }
}
</script>

<style scoped></style>
