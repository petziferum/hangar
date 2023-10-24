<template>
  <v-dialog
    v-model="isOpen"
    fullscreen
    persistent
    transition="dialog-bottom-transition"
  >
    <template v-if="!p">
      <v-skeleton-loader type="card"></v-skeleton-loader>
    </template>
    <template v-else>
      <v-toolbar :color="p.crash ? 'error' : 'primary'">
        <v-toolbar-title class="text-h6 text-sm-h6 text-md-h4 white--text">
          Bearbeiten
        </v-toolbar-title>
        <template v-if="p.crash">
          <v-spacer></v-spacer>
          <v-alert
            rounded
            width="400"
            height="60"
            colored-border
            border="left"
            type="error"
            class="text-center align-center"
            elevation="2"
          >
            Modell ist Schrott
          </v-alert>
        </template>
        <v-spacer />
        <v-toolbar-items>
          <v-btn @click="cancel" class="mx-2">Abbrechen</v-btn>
          <v-btn @click="update" color="success">Speichern</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card tile>
        <v-card-title>Flugzeug: {{ p.name }} - {{ p.id }}</v-card-title>
        <v-card-subtitle>
          <span v-if="p.log.length > 0">
            Zuletzt bearbeitet:
            {{ p.log[p.log.length - 1].date.toLocaleString() }}
          </span>
          <v-dialog width="50%">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" x-small>log</v-btn>
            </template>
            <v-card>
              <v-card-title>Log</v-card-title>
              <v-list v-if="p.log.length > 0">
                <v-list-item
                  v-for="(entry, i) of p.log"
                  :key="`${entry.planeId}-${i}`"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{
                      entry.date.toLocaleString()
                    }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ entry.planeId }} {{ entry.text }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-dialog>
        </v-card-subtitle>
        <v-form ref="editPlane">
          <v-row class="mx-3">
            <v-col cols="8">
              <v-text-field
                filled
                label="Name"
                v-model="p.name"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
              <v-select
                :items="batteryItems"
                item-text="text"
                item-value="value"
                v-model="p.battery"
                label="Akku"
              ></v-select>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="2">
              <v-text-field
                outlined
                label="Typ"
                v-model="p.type"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" lg="2">
              <v-text-field
                outlined
                label="Mah"
                v-model="p.mah"
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
                :items="sender"
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
                outlined
                label="Faktor"
                :value="faktor"
                :rules="rules"
                readonly
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
                  Bild Online auswählen
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
            <div class="mx-2">Oder Hochloaden:</div>
            <input
              type="file"
              ref="fileInput"
              class="ma-2"
              @change="pickImage"
            />
            <v-btn
              :disabled="!imageFile && !imageName"
              :loading="uploading"
              @click.prevent="uploadImage"
              >Upload</v-btn
            >
            {{ uploadMessage }}
          </v-card-actions>
          <v-img width="100%" :src="p.image" contain></v-img>
          <v-card-actions class="justify-end">
            <v-btn
              block
              :color="p.crash ? 'success' : 'error'"
              @click="setCrash"
              >{{
                p.crash ? "Schrott-Status entfernen" : "Modell ist Schrott!"
              }}</v-btn
            >
          </v-card-actions>
        </v-form>
        <v-card-text>
          {{ plane }}
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Plane from "@/types/Plane";
import { SenderAsRecord } from "@/types/Sender";
import firebaseService from "@/store/api/firebaseService";
import { BatteryAsRecord } from "@/types/Battery";
import LogEntry from "@/types/LogEntry";

@Component
export default class PlaneDialog extends Vue {
  @Prop()
  value!: boolean;

  @Prop()
  plane!: Plane;

  sender = SenderAsRecord;
  imageName: string | null = null;
  imageSrc: ArrayBuffer | string;
  imageFile: Blob | null = null;
  uploading = false;
  uploadMessage: void | string = null;
  batteryItems: Record<string, string>[] = BatteryAsRecord;
  rules = [
    (v: string | number): boolean | string =>
      !!v || "Feld muss ausgefüllt sein!",
  ];

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

  get imageList(): any[] {
    return this.$store.getters.GET_IMAGELIST;
  }

  get faktor(): number {
    if (this.plane.spannweite && this.p.gewicht) {
      const f = this.p.gewicht / this.p.spannweite;
      this.plane.faktor = f;
      return f;
    } else return 0;
  }

  set faktor(value: number) {
    this.$emit("faktor", value);
  }

  convertTimestamp(seconds: number): string {
    return new Date(seconds * 1000).toLocaleString();
  }

  setCrash(): void {
    this.p.crash = !this.p.crash;
    this.$emit("update", this.p);
  }

  selectImage(picUrl: string): void {
    this.p.image = picUrl;
  }
  pickImage(e: any): void {
    const file = e.target.files[0];
    this.imageName = file.name;
    console.log("bild", file);
    const fr = new FileReader();
    fr.addEventListener("load", () => {
      this.imageSrc = fr.result;
    });
    fr.readAsDataURL(file);
    this.imageFile = file;
    console.log("fileReader", fr);
  }

  uploadImage(): void {
    this.uploading = true;
    firebaseService
      .uploadImage(this.imageName, this.imageFile, this.plane.id)
      .then((res) => {
        if (res) {
          this.plane.image = res;
        }
      })
      .then(() => {
        firebaseService.getAllPlanes("name");
        this.imageName = null;
        this.imageFile = null;
        this.imageSrc = null;
      })
      .then(() => {
        this.uploading = false;
      });
  }
  cancel(): void {
    this.isOpen = !this.isOpen;
    this.$emit("cancel");
  }
  open(): void {
    this.isOpen = true;
  }

  async update(): Promise<void> {
    const valid = (
      this.$refs.editPlane as Vue & { validate: () => boolean }
    ).validate();
    console.info("valid?", valid);
    if (!valid) {
      await this.ergaenzen();
      for (const [key, value] of Object.entries(this.p)) {
        if (value === undefined) {
          if (key === "log") {
            this.p[key] = [LogEntry.createEmtptyLogEntry()];
          } else if (key === "crash") {
            this.p[key] = false;
          } else if (key === "beschreibung") {
            this.p[key] = null;
          }
          this.$toast(key + " ist noch nicht ausgefüllt!");
          console.info("update: ", key, "ist noch ", value);
        }
      }
    } else {
      // Wenn valid true ist kann es sein das log, crash und beschreibung noch leer sind.
      try {
        console.info("fehlende Werte ergänzen, start...");
        await this.ergaenzen();
        this.p.addLogEntry(
          LogEntry.createEmtptyLogEntry()
            .withDate(new Date(Date.now()))
            .withPlaneId(this.p.id)
            .withText("Bearbeitet/Update")
        );
        console.info("fertig mit ergänzen");
      } catch {
        console.log("catch");
      } finally {
        this.$emit("update", this.p); // löst updatePlane in firebaseService aus
      }
    }
  }

  async ergaenzen(): Promise<void> {
    for (const [key, value] of Object.entries(this.p)) {
      console.info("valid. Betrachte", key, value);
      if (value === undefined) {
        if (key === "log") {
          this.p.log = [];
          this.p.log.push(
            LogEntry.createEmtptyLogEntry()
              .withDate(new Date(Date.now()))
              .withPlaneId(this.p.id)
              .withText("Bearbeitet/Update")
          );
          console.info(
            "Log geändert auf:",
            this.p.log[0].text,
            "um ",
            this.p.log[0].date,
            "\n, war: ",
            value
          );
          this.$toast.info(
            "Log update: " +
              this.p.log[0].text +
              " am " +
              this.p.log[0].date +
              "\nwar: " +
              value
          );
        } else if (key === "crash") {
          this.p[key] = false;
          this.$toast.info(
            "Crash geändert auf: " + this.p.crash + ", war: " + value
          );
        } else if (key === "beschreibung") {
          this.p[key] = null;
          console.info("beschreibung ergänzt", this.p[key], value);
          this.$toast.info(
            "Beschreibung geändert auf: " +
              this.p.beschreibung +
              ", war: " +
              value
          );
        } else {
          this.p[key] = "";
          console.log("key", key, value);
        }
      }
    }
  }
}
</script>

<style scoped></style>
