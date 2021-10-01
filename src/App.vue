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
          <v-tab to="devtest">devTest</v-tab>
          <v-tab to="hangar">Hangar</v-tab>
        </v-tabs>
      </template>

      <v-spacer></v-spacer>

      <v-btn @click="login" text>
        <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <div v-if="user">
       {{user.email}}
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { auth } from "@/plugins/firesbaseConfig";

export default Vue.extend({
  name: "App",

  data: () => ({}),
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword("admin@hangar.de", "asdfasdf")
        .then((user) => {
          const u = user.user;
          this.$store.dispatch("FETCH_USER", u);
          console.log("eingelogged:", u?.email);
        });
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
});
</script>
<style>
.border {
  border: 1px solid;
}
</style>
