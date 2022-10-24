<template>
  <v-card elevation="5" tile class="my-5" color="info">
    <v-toolbar flat>
      <v-app-bar-nav-icon />
      <v-toolbar-title>{{ plane.name }}</v-toolbar-title>
      <v-subheader>{{ plane.id }} crash: {{ plane.crash }}</v-subheader>
      <v-spacer></v-spacer>
      <v-menu min-width="200px" offset-x left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list dense>
            <v-list-item-group>
              <v-list-item dense>
                <v-list-item-avatar>
                  <v-icon color="success">mdi-pencil</v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="action('edit')">
                  Bearbeiten
                </v-list-item-content>
              </v-list-item>
              <v-list-item dense>
                <v-list-item-avatar>
                  <v-icon color="error">mdi-delete-empty</v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="action('schrott')">
                  Schrott
                </v-list-item-content>
              </v-list-item>
              <v-list-item dense>
                <v-list-item-avatar>
                  <v-icon>mdi-clipboard-list</v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="action('fliegen')">
                  Fliegen
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
      <plane-dialog
        ref="planedialog"
        v-model="dialog"
        :plane="p"
        @update="update"
        @cancel="cancelEdit"
      ></plane-dialog>
    </v-toolbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import firebaseService from "@/store/api/firebaseService";
import Plane from "@/types/Plane";
import PlaneDialog from "@/components/PlaneDialog.vue";

@Component({ components: { PlaneDialog } })
export default class AdminActionBar extends Vue {
  @Prop()
  plane: Plane;

  dialog = false;

  get p(): Plane {
    return this.plane;
  }

  set p(value: Plane) {
    this.$emit("input", value);
  }

  action(value: string): void {
    switch (value) {
      case "edit":
        this.startEdit();
        return;
      case "schrott":
        this.updateSchrott(this.plane.id);
        return;
      case "fliegen":
        this.$toast("Funktion wird noch eingebaut");
    }
  }

  update(p: Plane): void {
    firebaseService.updatePlane(p.id, p).then((res) => {
      this.dialog = false;
    });
  }

  cancelEdit(): void {
    console.info("cancel Edit");
  }

  startEdit(): void {
    const planeDialog = this.$refs.planedialog as PlaneDialog;
    planeDialog.open();
  }

  updateBeschreibung(id: string, text: string): void {
    firebaseService.updatePlaneDescription(id, text);
  }
  updateSchrott(planeId: string): void {
    firebaseService.setPlaneSchrott(planeId).then(() => {
      this.$emit("update");
    });
  }
}
</script>

<style scoped></style>
