<template>
  <v-row justify="center">
    <v-col cols="12" md="6" v-if="!currentUser">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-form ref="loginForm" @submit.prevent="logIn">
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
            <v-card-text style="color: #ff0000" v-if="errorMessage.state">{{
              errorMessage.text
            }}</v-card-text
            ><br />
            <v-card-actions>
              <v-btn type="submit">Login</v-btn>
            </v-card-actions>
            <v-card-text> current User: {{ currentUser }} </v-card-text>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-else>
      <v-card>
        <v-btn @click="logout">Logout</v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebaseService from "@/store/api/firebaseService";
import firebase from "firebase";

@Component
export default class LoginDialog extends Vue {
  password = "";
  email = "admin@hangar.de";
  errorMessage = "";

  logIn(): void {
    firebaseService
      .firebaseLogin(this.password)
      .then(() => this.$router.push("/admin"));
  }
  logout(): void {
    firebaseService.firebaseLogout();
  }
  get currentUser(): firebase.User | null {
    return firebase.auth().currentUser;
  }
}
</script>

<style scoped></style>
