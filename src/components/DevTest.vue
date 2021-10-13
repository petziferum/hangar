<template>
  <v-container>
    DEVTEST
    <v-row justify="center">
      <v-col>
        <v-btn @click="editPlane(planes[0])">{{ planes[0].name }}</v-btn>
        <template v-if="active">
          <edit-plane :plane="planeEdit"></edit-plane>
        </template>
        {{ planeEdit }}
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

@Component({
  components: {
    EditPlane,
    TestExpansion,
    PlaneExpansionPanelView,
    PlaneDialog,
  },
})
export default class DevTest extends Vue {
  planes: void | Plane[] = [];
  img = [{ plane: "", img: require("@/assets/logo.png") }];
  dialog = false;
  active = false;
  planeEdit: Plane | null = null;

  loadPlanes() {
    firebaseService.getAllPlanes(undefined).then((res) => {
      this.planes = res;
    });
  }

  editPlane(plane: Plane) {
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
