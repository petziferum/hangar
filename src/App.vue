<template>
  <v-app>
    <v-app-bar app color="#507144" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Hangar Logo"
            class="shrink mr-2"
            contain
            :src="require('@/assets/hangar-plane.png')"
            transition="scale-transition"
            width="40"
          />

          <v-img
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            :src="require('@/assets/hangar-name.png')"
            width="100"
          />
        </router-link>
      </div>
      <template v-slot:extension>
        <v-tabs>
          <!-- <v-tab to="devtest">devTest</v-tab> -->
          <v-tab to="hangar">Hangar</v-tab>
        </v-tabs>
      </template>

      <v-spacer></v-spacer>

      <v-btn @click="user ? logout() : login()" text>
        <span class="mr-2">{{ user ? "Logout" : "Login" }}</span>
        <v-icon>{{ user ? "mdi-logout" : "mdi-login" }}</v-icon>
      </v-btn><br>
      <div v-if="user">{{ user.email }}</div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import firebaseService from "@/store/api/firebaseService";
import firebaseApp from "@/plugins/firesbaseConfig";

export default Vue.extend({
  name: "App",

  data: () => ({}),
  methods: {

    login() {
      firebaseService.firebaseLogin()


    },

    logout() {
      firebaseService.firebaseLogout();
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
});
</script>
<style>
.border {
  border: 1px solid;
}
</style>
