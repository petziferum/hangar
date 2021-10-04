<template>
  <v-container fluid>
    <v-toolbar>
      <v-toolbar-title>Admin Board</v-toolbar-title>
      <v-toolbar-items>
        <v-btn text @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebaseService from "@/store/api/firebaseService";

@Component
export default class AdminBoard extends Vue {
  logout(): void {
    firebaseService.firebaseLogout().then(() => {
      this.$router.push("/");
    });
  }
}
</script>

<style scoped></style>
