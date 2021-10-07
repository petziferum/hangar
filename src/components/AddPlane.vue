<template>
  <base-dialog v-model="open">
    <v-row justify="center">
      <v-col cols="12" md="6">
        {{p}}
        <v-card tile max-width="700" class="mt-3">
          <v-card-title>Neues Modell</v-card-title>
          <v-form ref="editPlane">
            <v-row class="mx-3">
              <v-col cols="12">
                <v-text-field filled label="Name" v-model="p.name" clearable></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="2">
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
              <v-col>
                <v-text-field
                  outlined
                  label="Gewicht"
                  v-model="p.gewicht"
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
            <v-card-actions class="pa-3 ma-3">
              <v-textarea
                outlined
                label="Beschreibung"
                v-model="p.beschreibung"
              ></v-textarea>
            </v-card-actions>
            <v-card-title>Bild auswählen</v-card-title>
            <v-card-subtitle>aktuell: {{ p.image }}</v-card-subtitle>
            <v-card-actions>
              <v-menu
                :return-value="p.image"
                offset-y
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn color="secondary" v-on="on">
                    <v-icon>mdi-camera</v-icon>
                    Bild auswählen
                  </v-btn>
                </template>
                <v-card
                  dark
                  tile
                  max-width="600"
                  max-height="700"
                  style="overflow: scroll"
                >
                  <v-row>
                    <v-col cols="6" v-for="pic in imageList" :key="pic.name">
                      <v-card
                        light
                        elevation="1"
                        link
                        @click="selectImage(pic.url)"
                      >
                        <v-img :src="pic.url"></v-img>
                        <v-card-text class="caption">{{ pic.name }}</v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-menu>
            </v-card-actions>
            <v-img width="100%" :src="p.image" contain></v-img>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

  </base-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseDialog from "@/components/commons/BaseDialog.vue";
import Plane from "@/types/Plane";
import { SenderAsRecord } from "@/types/Sender";
@Component({
  components: { BaseDialog },
})
export default class AddPlane extends Vue {
  @Prop()
  value!: Plane;

  open = false;
  sender = SenderAsRecord;
  get p(): Plane {
    return this.value;
  }
  set p(value: Plane) {
    this.$emit("input", value);
  }
  get imageList(): any[] {
    return this.$store.getters.GET_IMAGELIST;
  }

  openDialog(): void {
    this.open = !this.open;
  }
  selectImage(picUrl: string) {
    this.p.image = picUrl;
  }
  savePlane(): void{
    this.$emit('save', this.p)
  }
}
</script>

<style scoped></style>
