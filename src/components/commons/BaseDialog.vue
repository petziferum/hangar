<template>
  <v-dialog v-model="open" fullscreen transition="dialog-bottom-transition">
    <v-toolbar color="primary">
      <v-toolbar-items>
        <v-btn icon @click="open = !open">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-sheet height="100%">
    <slot />
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BaseDialog extends Vue {
  @Prop()
  value!: boolean;

  get open(): boolean {
    return this.value;
  }
  set open(value: boolean) {
    this.$emit("input", value);
  }

  openDialog(): void {
    this.open = true;
  }
}
</script>

<style scoped></style>
