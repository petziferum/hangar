<template>
  <v-card elevation="5" tile class="my-5" color="info">
    <v-toolbar flat>
      <v-app-bar-nav-icon />
      <v-toolbar-title>{{ plane.name }}</v-toolbar-title>
      <v-subheader>{{plane}}</v-subheader>
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
              <v-list-item color="error" dense>
                <v-list-item-avatar>
                  <v-icon>mdi-delete-empty</v-icon>
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
    </v-toolbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import firebaseService from "@/store/api/firebaseService";
import Plane from "@/types/Plane";

@Component
export default class AdminActionBar extends Vue {

  @Prop()
  plane: Plane;
  action(value: string) {
    switch (value) {
      case "schrott":
        this.updateSchrott(this.plane.id);
        return;
      case "fliegen":
        console.log("funktion wird noch eingebaut")
    }
  }
  updateBeschreibung(id: string, text: string): void {
    firebaseService.updatePlaneDescription(id, text);
  }
  updateSchrott(planeId: string): void {
    console.info("update", planeId)
    firebaseService.setPlaneSchrott(planeId)
  }
}
</script>

<style scoped>

</style>
