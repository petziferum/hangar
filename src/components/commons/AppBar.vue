<template>
  <v-app-bar app color="#507144" dark>
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          alt="Hangar Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/hangar-plane.png')"
          min-width="100"
          width="100"
        />
      </router-link>
    </div>
    <template v-slot:extension>
      <v-tabs>
        <!-- <v-tab to="devtest">devTest</v-tab> -->
        <v-tab to="/">Hangar</v-tab>
        <v-tab v-show="user" to="/admin">Admin</v-tab>
      </v-tabs>

      <v-spacer />
      <template v-if="user">
        {{ user.email }}
      </template>
      <template v-else>
        <v-btn @click="login">Login</v-btn>
      </template>
    </template>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";
import firebaseService from "@/store/api/firebaseService";

@Component
export default class AppBar extends Vue {
  get user(): firebase.User | null {
    return this.$store.getters.getUser;
  }
  login(): void {
    firebaseService.firebaseLogin("asdfasdf");
  }
}
</script>

<style scoped></style>
