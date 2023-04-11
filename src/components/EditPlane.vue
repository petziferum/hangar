<template>
  <v-card>
    <v-toolbar elevation="1">
      <v-toolbar-title>Edit - Mode</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      Daten: {{ p.name }} {{ p.id }}
      <v-row v-if="p">
        <v-col cols="12">
          <v-form>
            <v-text-field label="Flugzeug Name" v-model="p.name"></v-text-field>
            <v-text-field label="Typ" v-model="p.type"></v-text-field>
            <v-text-field label="Bauweise" v-model="p.bauweise"></v-text-field>
            <v-text-field label="Gewicht" v-model="p.gewicht"></v-text-field>
            <v-text-field
              label="Spannweite"
              v-model="p.spannweite"
            ></v-text-field>
            <v-select
              :items="sender"
              label="Sender"
              item-value="sender"
              v-model="p.sender"
            ></v-select>
            <v-textarea
              :rules="[this.error]"
              v-model="p.beschreibung"
              label="Beschreibung"
            ></v-textarea>

            <v-btn @click="update">Speichern</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Plane from "@/types/Plane";
import { SenderAsRecord } from "@/types/Sender";

@Component
export default class EditPlane extends Vue {
  @Prop()
  plane!: Plane;

  userInfo = "info";
  sender = SenderAsRecord;
  error: string | boolean = true;

  get p(): Plane {
    if (this.plane.beschreibung === undefined) {
      this.error = "Achtung noch keine Beschreibung vorhanden";
    } else this.error = true;
    return this.plane;
  }
  set p(value: Plane) {
    this.$emit("input", value);
  }

  update(): void {
    console.info("update\n");
    for (const [key, value] of Object.entries(this.p)) {
      if (value === undefined) {
        this.$toast(key + " ist noch nicht ausgefüllt!");
        console.info("update: ", key, "ist noch undefined");
      } else {
        this.$emit("update", this.p);
      }
    }
  }

  getUserInfo(): void {
    this.userInfo = this.$store.getters["userStore/getUserInfo"];
  }
}
</script>

<style scoped></style>
