<template>
  <v-app-bar app color="primary" dark>
    <router-link to="/" class="routerlink">
      <v-img
        transition="slide-x-reverse-transition"
        alt="Hangar Logo"
        class="mx-auto logo"
        contain
        :src="require('@/assets/hangar-plane-text.png')"
        min-width="100"
        max-width="60%"
        height="80%"
      />
    </router-link>

    <template v-slot:extension>
      <v-tabs>
        <!-- <v-tab to="devtest">devTest</v-tab> -->
        <v-tab to="/hangar">Hangar</v-tab>
        <v-tab v-show="user" to="/admin">Admin</v-tab>
      </v-tabs>

      <v-spacer />
      <template v-if="user">
        {{ user.email }}
      </template>
      <template v-else>
        <v-btn text @click="login">Login</v-btn>
      </template>
    </template>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class AppBar extends Vue {
  get user(): firebase.User | null {
    return this.$store.getters.getUser;
  }
  login(): void {
    this.$router.push("/login");
  }
}
</script>

<style scoped>
.logo {
  position: relative;
  top: 40px;
}
.routerlink {
  position: relative;
  top: 10px;
  height: 200px;
  width: 100%;
}
</style>
