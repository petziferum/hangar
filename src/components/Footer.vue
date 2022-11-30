<template>
  <v-footer dark color="secondary" padless absolute>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — daboarderpjb@gmail.com
      <div dark style="color: whitesmoke; text-decoration: none">
        <a href="mailto:daboarderpjb@gmail.com"
          ><v-icon small>mdi-email</v-icon>-Mail</a
        >
      </div>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style scoped>
a:link,
a:visited,
a:hover,
a:active {
  color: #ffffff;
  text-decoration: none;
}
</style>
