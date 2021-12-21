<template>
  <base-dialog v-model="open">
    <v-row justify="center">
      <v-col cols="12" lg="6">
        <v-card class="mt-10" :loading="processing">
          <template v-slot:progress>
            <v-progress-linear
              color="green"
              height="15"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title>Bilder Upload</v-card-title>
          <v-card-text> Neues Flugzeugbild hochladen </v-card-text>
          <v-card-text>
            <div>
              <v-file-input
                v-model="imageFile"
                placeholder="Uplaod Image"
                @change="fileInput"
                accept="image/*"
              />
            </div>
          </v-card-text>
          <template v-if="imgString != null">
            <v-fab-transition>
              <v-img
                :src="imgString"
                max-width="300px"
                max-height="300px"
                contain
                style="background-color: black"
              ></v-img>
            </v-fab-transition>
            <v-card-actions>
              <v-btn @click="uploadImage">Hochladen</v-btn>
            </v-card-actions>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fireBucket } from "@/plugins/firesbaseConfig";
import BaseDialog from "@/components/commons/BaseDialog.vue";
@Component({
  components: { BaseDialog },
})
export default class UploadImageDialog extends Vue {
  open = false;
  uploadValue = 0;
  img: any = null;
  imageData: any = null;
  imageFile: any = null;
  imgString: string | ArrayBuffer = "";
  filePath = "";
  processing = false;

  openDialog(): void {
    this.open = !this.open;
  }

  async fileInput(file: any): Promise<void> {
    console.info("start");
    try {
      if (file && file.name) {
        this.processing = true;
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.imgString = fr.result;
        });
        this.filePath = `planes/${Date.now()}-${file.name}`;
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.processing = false;
    }
  }

  async uploadImage() {
    try {
      this.processing = true;
      const imgData = new FormData();
      imgData.append("image", this.imageFile);

      const metaData = { contentType: this.imageFile.type };
      console.info(
        "imgData:",
        imgData,
        "filePath",
        this.filePath,
        "metaData",
        metaData
      );
      //Firebase Upload
      await fireBucket.ref().child(this.filePath).put(this.imageFile, metaData);
      console.log("filePath", this.filePath);
    } catch (e) {
      console.error(e);
    } finally {
      this.processing = false;
    }
  }

  click1() {
    const input = this.$refs.input1 as HTMLInputElement;
    input.click();
  }

  previewImage(event: any) {
    this.uploadValue = 0;
    this.img = null;
    this.imageData = event.target.files[0];

    //this.onUpload()
  }
}
</script>

<style scoped></style>
