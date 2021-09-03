<template>
  <DevTest />
</template>

<script lang="ts">
import Vue from "vue";
import DevTest from "@/components/DevTest.vue";

export default Vue.extend({
  name: "Home",

  components: {
    DevTest,
  },
});
</script>
