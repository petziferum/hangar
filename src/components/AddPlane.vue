<template>
  <base-dialog v-model="open">
    <template v-slot:toolbar>
      <v-btn color="success" elevation="0" @click="savePlane">Save</v-btn>
    </template>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card tile max-width="700" class="mt-3">
          <v-card-title>Neues Modell</v-card-title>
          <v-form ref="editPlane">
            <v-row class="mx-3">
              <v-col cols="8">
                <v-text-field
                  filled
                  label="Name"
                  v-model="p.name"
                  clearable
                  validate-on-blur
                  :rules="rules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  :items="batteryItems"
                  item-text="text"
                  item-value="value"
                  v-model="p.battery"
                  label="Akku"
                ></v-select>
                Akku: {{ p.battery }}
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="2">
                <v-text-field
                  outlined
                  label="Typ"
                  v-model="p.type"
                  :rules="rules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  outlined
                  label="Bauweise"
                  v-model="p.bauweise"
                  :rules="rules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  outlined
                  label="Spannweite"
                  v-model="p.spannweite"
                  :rules="rules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mx-3">
              <v-col cols="12" sm="6" md="4" lg="2">
                <v-select
                  :items="senderRecord"
                  label="Sender"
                  item-value="sender"
                  v-model="p.sender"
                  :rules="rules"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  outlined
                  label="Gewicht"
                  v-model="p.gewicht"
                  :rules="rules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  disabled
                  outlined
                  label="Faktor"
                  :value="faktor"
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
              <input
                type="file"
                ref="fileInput"
                class="ma-2"
                @change="picLocalImageFile"
              />
            </v-card-actions>
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
                        <v-card-text class="caption">{{
                          pic.name
                        }}</v-card-text>
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
import firebaseService from "@/store/api/firebaseService";
import { BatteryAsRecord } from "@/types/Battery";

@Component({
  components: { BaseDialog },
})
export default class AddPlane extends Vue {
  @Prop()
  value!: Plane;

  open = false;
  senderRecord = SenderAsRecord;
  imageName = "";
  imageSrc: string | ArrayBuffer;
  image: Blob;
  batteryItems: Record<string, string>[] = BatteryAsRecord;
  rules = [
    (v: string | number): boolean | string =>
      !!v || "Feld muss ausgefüllt sein!",
  ];

  get p(): Plane {
    return this.value;
  }

  set p(value: Plane) {
    this.$emit("faktor", value);
  }

  get imageList(): any[] {
    return this.$store.getters.GET_IMAGELIST;
  }

  get faktor(): number {
    if (this.p.spannweite && this.p.gewicht) {
      const f = this.p.gewicht / this.p.spannweite;
      this.p.faktor = f;
      return f;
    } else return 0;
  }

  set faktor(value: number) {
    this.$emit("faktor", value);
  }

  openDialog(): void {
    this.open = !this.open;
  }

  picLocalImageFile(e: any): void {
    let t = e.currentTarget as HTMLInputElement;

    const file = e.target.files[0];

    this.imageName = file.name;
    console.log("bild", file);
    const fr = new FileReader();
    fr.addEventListener("load", () => {
      this.imageSrc = fr.result;
    });
    fr.readAsDataURL(file);
    this.image = file;
    console.log("fileReader", fr);
  }

  selectImage(picUrl: string): void {
    this.p.image = picUrl;
    console.log("ausgewählt", picUrl);
  }

  savePlane(): void {
    this.p.faktor = this.faktor;
    this.p.crash = false;
    for (let key of Object.entries(this.p)) {
      key.forEach((el) => {
        if (el === undefined) {
          console.log(key, "ist undefiniert");
        }
      });
    }
    const valid = (
      this.$refs.editPlane as Vue & { validate: () => boolean }
    ).validate();
    if (valid) {
      firebaseService.saveNewPlane(this.p).then((res: any) => {
        console.log("Upload erfolgreich", res);
        this.$emit("uploaded");
        this.openDialog();
      });
    }
  }
}
</script>

<style scoped></style>
