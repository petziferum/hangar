<template>
  <LandingPage />
</template>

<script lang="ts">
import Vue from "vue";
import LandingPage from "@/views/LandingPage.vue";

export default Vue.extend({
  name: "HomeView",

  components: {
    LandingPage,
  },
});
</script>
<style scoped></style>
