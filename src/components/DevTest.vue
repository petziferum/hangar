<template>
  <v-container>
    DEVTEST
    <v-spacer></v-spacer>
    <v-btn @click="loadPlanes">laden</v-btn>
    <v-row>
      <v-col>
        <the-excel-upload-component />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-if="planes.length > 0">
        Mit klick wird Flugzeug bearbeitet
        <v-btn @click="editPlane(planes[0])">{{ planes[0].name }}</v-btn>
        <template v-if="active">
          <edit-plane :plane="planeEdit"></edit-plane>
        </template>
        {{ planeEdit }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <plane-factor-diagram />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <plane-dialog
          ref="planedialog"
          v-model="dialog"
          :plane="planeEdit"
          @cancel="cancelEdit"
        ></plane-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        test:
        {{ returnRandomNameAsString(24) }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import PlaneDialog from "@/components/PlaneDialog.vue";
import PlaneExpansionPanelView from "@/components/PlaneExpansionPanelView.vue";
import TestExpansion from "@/components/TestExpansion.vue";
import EditPlane from "@/components/EditPlane.vue";
import firebaseService from "@/store/api/firebaseService";
import PlaneFactorDiagram from "@/components/features/PlaneFactorDiagram.vue";
import TheExcelUploadComponent from "@/components/features/TheExcelUploadComponent.vue";

@Component({
  components: {
    TheExcelUploadComponent,
    PlaneFactorDiagram,
    EditPlane,
    TestExpansion,
    PlaneExpansionPanelView,
    PlaneDialog,
  },
})
export default class DevTest extends Vue {
  planes: Plane[] = [];
  img = [{ plane: "", img: require("@/assets/logo.png") }];
  dialog = false;
  active = false;
  planeEdit: Plane | null = null;

  returnRandomNameAsString(length: number) {
    const result = [];
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  }

  combinePlanes(): void {
    const p = Plane.createEmptyPlane();
    p.name = this.returnRandomNameAsString(24);
  }

  loadPlanes(): void {
    firebaseService.getAllPlanes("name").then((res) => {
      this.planes = res;
    });
  }

  editPlane(plane: Plane): void {
    this.planeEdit = plane;
    const planeDialog = this.$refs.planedialog as PlaneDialog;
    planeDialog.open();
  }
  cancelEdit(): void {
    this.planeEdit = null;
  }

  created(): void {
    this.loadPlanes();
  }
}
</script>

<style scoped></style>
