<template>
  <v-dialog v-model="isOpen" fullscreen transition="dialog-bottom-transition">
    <template v-if="!p">
      <v-skeleton-loader type="card"></v-skeleton-loader>
    </template>
    <template v-else>
      <v-toolbar color="primary">
        <v-btn x-small class="ml-0 mr-1" @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="text-caption text-sm-h6 text-md-h4">
          Bearbeiten
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn @click="cancel" class="mx-2">Abbrechen</v-btn>
          <v-btn @click="update" color="success">Speichern</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card tile>
        <v-card-title>Flugzeug: {{ p.name }}</v-card-title>
        <v-form ref="editPlane">
          <v-row class="mx-3 ">
            <v-col cols="12">
              <v-text-field
                filled
                label="Name"
                v-model="p.name"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                label="Typ"
                v-model="p.type"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                label="Bauweise"
                v-model="p.bauweise"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                label="Spannweite"
                v-model="p.spannweite"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                label="Faktor"
                v-model="p.faktor"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-3">
            <v-col cols="12" sm="6" md="4" lg="2">
              <v-select
                :items="sender"
                label="Sender"
                item-value="sender"
                v-model="p.sender"
              ></v-select>
            </v-col>
          </v-row>
          <v-card-actions class="pa-3 ma-3">
            <v-textarea
              outlined
              label="Beschreibung"
              v-model="p.beschreibung"
            ></v-textarea>
          </v-card-actions>
          <v-img width="100%" :src="p.image" contain></v-img>
          <v-card-actions class="justify-end">
            <v-btn block color="error">IST KAPUTT!</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Plane from "@/types/Plane";
import { SenderAsRecord } from "@/types/Sender";

@Component
export default class PlaneDialog extends Vue {
  @Prop()
  value!: boolean;

  @Prop()
  plane!: Plane;

  sender = SenderAsRecord;

  get p(): Plane {
    return this.plane;
  }

  set p(value: Plane) {
    this.$emit("saveplane", this.p);
  }

  get isOpen(): boolean {
    return this.value;
  }

  set isOpen(value: boolean) {
    this.$emit("input", value);
  }
  cancel(): void {
    this.isOpen = !this.isOpen;
    this.$emit("cancel");
  }
  open(): void {
    console.log("öffne plane-dialog");
    this.isOpen = true;
  }

  update(): void {
    this.$emit("update", this.p);
  }
}
</script>

<style scoped></style>
