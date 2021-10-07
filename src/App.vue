<template>
  <v-app>
    <app-bar />
    <v-main class="appolive">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "@/components/commons/AppBar.vue";

export default Vue.extend({
  name: "App",
  components: { AppBar },
  data: () => ({}),
  methods: {},
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
.appolive {
  background-color: #5a664b;
}
</style>
