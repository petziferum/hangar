<template>
  <div>Excel File Input</div>
<v-file-input variant="outlined" @input="handleFileUpload" />
<div v-for="item in data" :key="item.id">
  {{ item }}<br>
</div>
</template>

<script lang=ts setup>
import * as XLSX from 'xlsx';
import {ref} from "vue";
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

const data = ref<any[]>([]);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    const binaryString = e.target.result;
    const workbook = XLSX.read(binaryString, { type: 'binary' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const list = XLSX.utils.sheet_to_json(worksheet).forEach((row: any) => {
      console.log(row)
      data.value.push(new Flugzeug(row.id, row.Flugzeugname, row.Flugzeugtyp, row.Gewicht, row.Bauweise, row.Faktor));
    });
  };
  reader.readAsBinaryString(target.files[0]);
};
</script>

<style scoped>

</style>
