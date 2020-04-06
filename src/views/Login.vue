<template>
  <v-card height="100%">
    <v-card-text>
      <p class="pt-12 text-md-center display-4 font-weight-thin">VIPRR</p>
    </v-card-text>
    <v-layout justify-center>
      <div class=" pt-2 text-md-center">
        <v-text-field
          v-model="CWID"
          type="text"
          label="CWID"
          @input="changeButton"
        />
        <router-link class="routerLink" to="/home" exact>
          <v-btn color="success" :disabled="button" @click="sendData"
            >Submit</v-btn
          >
        </router-link>
      </div>
    </v-layout>
  </v-card>
</template>
<script>
//import axios from 'axios';
export default {
  name: "Login",

  data: () => ({
    CWID: "",
    termSelected: "Spring 20",
    button: true
  }),
  methods: {
    sendData() {
      this.$store.commit("SET_CWID", this.CWID);
      this.$store.commit("SET_Term", this.termSelected);
      this.$store.dispatch("getTranscript");
      this.$store.dispatch("getProfile");
    },
    changeButton() {
      if (this.button == true) {
        this.button = !this.button;
      }
    }
  }
};
</script>
<style>
.routerLink {
  text-decoration: none;
}
</style>
