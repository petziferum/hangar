<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Edit - Mode</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      User Info: {{ userInfo }}<br />
      <v-btn @click="getUserInfo">get userinfo</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditPlane extends Vue {
  userInfo = "info";

  getUserInfo() {
    this.userInfo = this.$store.getters["userStore/getUserInfo"];
  }
}
</script>

<style scoped></style>
