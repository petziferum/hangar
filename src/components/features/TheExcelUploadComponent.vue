<template>
  <v-card>
    <div>Excel File Input</div>
    <v-file-input variant="outlined" v-model="excelFile" @input.capture="handleFileUpload" />
    <v-btn @click="handleFileUpload">Upload</v-btn>
    Flugzeuge:<br />
    <div v-for="item in liste" :key="item.id">Flugzeug: {{ item }}<br /></div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as XLSX from "xlsx";

class Flugzeug {
  constructor(
    public id: number,
    public name: string,
    public typ: string,
    public gewicht: number,
    public bauweise: string,
    public faktor: number
  ) {}
}
@Component
export default class TheExcelUploadComponent extends Vue {

  liste: Flugzeug[] = [new Flugzeug(1, "test", "test", 1, "test", 1)];
  excelFile = null;

  handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log("handleFileUpload", target.files);
    console.log("liste", this.liste);
    const list = [];
    if (!target.files) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      XLSX.utils.sheet_to_json(worksheet).forEach((row: any) => {
        console.log(row);
        console.log("data", this.liste);
        if(this.liste.length > 0) this.liste = [];
        list.push(
          new Flugzeug(
            row.id,
            row.Flugzeugname,
            row.Flugzeugtyp,
            row.Gewicht,
            row.Bauweise,
            row.Faktor
          )
        );
      });
      this.liste = list;
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
</script>

<style scoped></style>
