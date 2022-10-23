<template>
  <v-dialog width="50%" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" @click="createNewFlugplan" rounded
        >Flugplan erstellen</v-btn
      >
    </template>
    <v-card>
      <v-card-title>Neuer Flugplan für {{ date }}</v-card-title>
      <v-form ref="flugplanform" @submit.prevent="submitFlugplan">
      <v-card-text>
          <template v-if="flugplan">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Flugplan Name"
                  v-model="flugplan.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Datum"
                  type="date"
                  v-model="flugplan.date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Id"
                  readonly
                  v-model="flugplan.id"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template v-else> kein Flugplan vorhanden </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="dialog = false">Abbrechen</v-btn>
        <v-btn type="submit">Speichern</v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Flugzeugliste from "@/types/Flugzeugliste";

@Component
export default class FlugplanDialog extends Vue {
  dialog = false;
  date = new Date(Date.now());
  flugplan: Flugzeugliste = Flugzeugliste.createEmtptyFlugzeugliste();

  createNewFlugplan(): void {
    this.flugplan = Flugzeugliste.createEmtptyFlugzeugliste()
      .withDate(new Date(Date.now()))
      .withName("2022-10-22")
      .withId("öalksd89a8usdf8a9");
  }

  submitFlugplan(): void {
    this.$emit("save", this.flugplan);
    this.dialog = false;
  }
}
</script>

<style scoped></style>
