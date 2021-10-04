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
@Component({
  components: { EditPlane },
})
export default class AdminBoard extends Vue {
  planes: void | Plane[] = [];
  editPlane: Plane | null = null;
  message: null | Plane = null;

  loadPlanes(): void {
    firebaseService.getAllPlanes().then((p) => {
      this.planes = p;
    });
  }
  clearEdit():void {
    this.message = null
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
