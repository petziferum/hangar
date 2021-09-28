<template>
  <v-card tile width="500px">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              {{ plane.name }}
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition>
                <span v-if="!open" key="0">
                  {{ plane.type }}
                </span>
                <span v-else key="1">
                  <v-btn
                    outlined
                    small
                    @click.stop="button ? addPlane() : removePlane()"
                    class="float-end mr-1"
                    >{{ button ? "fliegen" : "entfernen" }}</v-btn
                  >
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <PlaneViewCard :plane="plane"></PlaneViewCard>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider> </v-divider>
    <v-card-text>
      {{ flightList }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plane from "@/types/Plane";
import PlaneViewCard from "@/components/PlaneViewCard.vue";
@Component({
  components: { PlaneViewCard },
})
export default class TestExpansion extends Vue {
  plane = Plane.createEmptyPlane().withName("Testflugzeug").withType("TD");
  flightList: Array<Plane> = [];
  button = true;

  addPlane(): void {
    this.flightList.push(this.plane);
    this.button = false;
  }
  removePlane(): void {
    if (this.flightList.length > 0) {
      this.flightList.pop();
      this.button = true;
    }
  }
}
</script>

<style scoped></style>
