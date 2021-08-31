<template>
  <v-data-table
    :headers="headers"
    :items="planes"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar

      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.type"
                      label="Typ"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.bauweise"
                      label="bauweise"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.gewicht"
                      label="Gewicht (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
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
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import Plane from "@/types/Plane";

@Component
export default class DataTable extends Vue {

  headers = [
    {text: "Flugzeug", value: "name"},
    {text: "Typ", value: "type"},
    {text: "Bauweise", value:"bauweise"},
    {text: "Gewicht", value:"gewicht"},
    {text: "Spannweite", value:"spannweite"},
    {text: "Faktor", value:"faktor"}
  ]
  editedIndex = -1;
  dialog = false;
  dialogDelete = false;
  planes: Array<Plane>;
  editedItem: {
    name: '',
    type: '',
    bauweise: '',
    gewicht: 0,
    spannweite: 0,
    faktor: 0,
  }
  defaultItem: {
    name: '',
    type: '',
    bauweise: '',
    gewicht: 0,
    spannweite: 0,
    faktor: 0,
  }
  get formTitle () {
    return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
  }

  initialize() {
    const p = Plane.createEmptyPlane()
      .withName("Polycarpov")
    .withType("TD")
    .withBauweise("EZF")
    .withGewicht(298)
    .withSpannweite(66)
    .withFaktor(4)

    this.planes.push(p)
  }


  editItem (item) {
    this.editedIndex = this.planes.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  }

  deleteItem (item) {
    this.editedIndex = this.planes.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialogDelete = true
  }

  deleteItemConfirm () {
    this.planes.splice(this.editedIndex, 1)
    this.closeDelete()
  }

  close () {
    this.dialog = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  }

  closeDelete () {
    this.dialogDelete = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  }

  save () {
    if (this.editedIndex > -1) {
      Object.assign(this.planes[this.editedIndex], this.editedItem)
    } else {
      this.planes.push(this.editedItem)
    }
    this.close()
  }
  created() {
    this.initialize()
  }
};
</script>

<style scoped>

</style>