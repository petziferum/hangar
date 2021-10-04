<template>
  <v-data-table
    :headers="headers"
    :items="planes"
    sort-by="calories"
    class="elevation-1"
    :options="tableOptions"
  >
    <template v-slot:top>
      <v-toolbar elevation="2">
        <v-toolbar-title>Flugzeuge</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Neues Flugzeug
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      v-model="editedItem.sender"
                      :items="senderItems"
                      label="Sender"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.type"
                      label="Typ"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.bauweise"
                      label="bauweise"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.gewicht"
                      label="Gewicht (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.spannweite"
                      label="Spannweite"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.name="props">
      <v-edit-dialog :return-value.sync="props.item.name" @close="close">
        {{ props.item.name }}
        <template v-slot:input>
          img: {{ props.item.image }}
          <v-img :src="planeImage(props.item.image)" contain></v-img>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.sender="props">
      <v-edit-dialog :return-value.sync="props.item" @close="close">
        {{ props.item.sender }}
        <template v-slot:input>
          <v-autocomplete
            v-model="props.item.sender"
            :items="senderItems"
            label="Sender"
          ></v-autocomplete>
        </template>
      </v-edit-dialog>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import { default as planes } from "../types/p2.json";
import Sender, { SenderAsRecord } from "@/types/Sender";

@Component
export default class DataTable extends Vue {
  headers = [
    { text: "Flugzeug", value: "name" },
    { text: "Sender", value: "sender" },
    { text: "Typ", value: "type" },
    { text: "Bauweise", value: "bauweise" },
    { text: "Gewicht", value: "gewicht" },
    { text: "Spannweite", value: "spannweite" },
    { text: "Faktor", value: "faktor" },
    { text: "Aktions", value: "actions", sortable: false },
  ];
  editedIndex = -1;
  senderItems = SenderAsRecord;
  dialog = false;
  dialogDelete = false;
  planes: Array<Plane> = [];
  editedItem: Plane = Plane.createEmptyPlane();
  defaultItem: Plane = Plane.createEmptyPlane();
  jPlanes: Plane[] = [];
  tableOptions = {
    itemsPerPage: -1,
  };
  img = [{ plane: "", img: require("@/assets/logo.png") }];

  get formTitle(): number | string {
    return this.editedIndex === -1 ? "Neues Flugzeug" : "Flugzeug bearbeiten";
  }

  planeImage(name: string): unknown {
    const image = this.img.find(
      (el) => el.plane.toLowerCase() === name.toLowerCase()
    );
    if (image) {
      return image.img;
    } else return this.img[0].img;
  }

  importPlanes(): void {
    const liste = planes;
    for (let p of liste) {
      const plane = Plane.createEmptyPlane()
        .withName(p.name)
        .withType(p.type)
        .withBauweise(p.bauweise)
        .withGewicht(p.gewicht)
        .withSpannweite(p.spannweite)
        .withImage(p.image);

      if (typeof p.faktor === "string") {
        const newfaktor = p.faktor.replace(",", ".");
        plane.withFaktor(parseFloat(newfaktor));
      } else {
        plane.withFaktor(p.faktor);
      }
      if (p.sender) {
        switch (p.sender) {
          case "Turnigy":
            plane.withSender(Sender.TURNIGY);
            break;
          case "Spektrum":
            plane.withSender(Sender.SPEKTRUM);
            break;
          default:
            plane.withSender(Sender.UNKNOWN);
        }
      }

      const image = {
        plane: p.image,
        img: require("@/assets/" + p.image + "_00000.jpg"),
      };
      this.img.push(image);
      this.planes.push(plane);
    }
  }

  initialize(): void {
    const p = Plane.createEmptyPlane()
      .withName("Polycarpov")
      .withType("TD")
      .withBauweise("EZF")
      .withGewicht(298)
      .withSpannweite(66)
      .withFaktor(4);
    const p1 = Plane.createEmptyPlane()
      .withName("Spitfire")
      .withType("DD")
      .withBauweise("LK")
      .withGewicht(300)
      .withSpannweite(70)
      .withFaktor(5);
    this.planes.push(p);
    this.planes.push(p1);
  }

  getFaktor(gewicht: number, spannweite: number): number | string {
    if (gewicht && spannweite) {
      return gewicht * spannweite;
    } else return "";
  }

  editItem(item: Plane): void {
    this.editedIndex = this.planes.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }

  deleteItem(item: Plane): void {
    this.editedIndex = this.planes.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
  }

  deleteItemConfirm(): void {
    this.planes.splice(this.editedIndex, 1);
    this.closeDelete();
  }

  close(): void {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  closeDelete(): void {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  save(): void {
    if (this.editedIndex > -1) {
      Object.assign(this.planes[this.editedIndex], this.editedItem);
    } else {
      this.planes.push(this.editedItem);
    }
    this.close();
  }
  editSender(item: Plane): void {
    console.log("edit item", item, this.planes.indexOf(item));
    this.editedIndex = this.planes.indexOf(item);
    this.editedItem = Object.assign({}, item);
  }
  saveSender(): void {
    console.log("item:", this.editedItem.sender, this.editedIndex);
    Object.assign(this.planes[this.editedIndex], this.editedItem);
  }

  created(): void {
    this.importPlanes();
  }
}
</script>

<style scoped></style>
