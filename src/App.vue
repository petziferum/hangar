<template>
  <v-app>
    <v-app-bar app color="#507144" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
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
        </v-tabs>
      </template>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
<style>
.border {
  border: 1px solid;
}
</style>
