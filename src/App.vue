<template>
  <v-app>
    <app-bar />
    <v-main class="appolive">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "@/components/commons/AppBar.vue";
import Footer from "@/components/Footer.vue";
import { Component } from "vue-property-decorator";
import firebase from "firebase";
import User = firebase.User;

@Component({
  components: {
    AppBar,
    Footer,
  },
})
export default class App extends Vue {
  get user(): User {
    return this.$store.getters.getUser;
  }
}
</script>
<style>
.border {
  border: 1px solid;
}
.appolive {
  background-color: #5a664b;
}
</style>
