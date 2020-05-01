<template>
  <v-card height="100%">
    <v-card-text>
      <!--<p class="pt-12 text-md-center display-4 font-weight-thin">VIPRR</p>-->
    </v-card-text>
    <v-layout justify-center>
      <div class=" pt-2 text-md-center">
        <v-img
          alt="VIPRR Logo"
          class="pt-12 text-md-center display-4"
          contain
          min-width="100"
          :src="require('@/assets/VIPRR_Logo_200x200_px_2.png')"
        />
        <v-form v-model="valid">
          <v-text-field
            v-model="CWID"
            color="black"
            type="text"
            label="CWID"
            :rules="[required('CWID')]"
            @input="changeButton"
          />
          <!--<router-link class="routerLink" to="/home" exact>-->
          <v-btn
            light
            color="rgb(242,43,12)"
            :disabled="!valid"
            @click="sendData"
            >Log In</v-btn
          >
        </v-form>
        <!--</router-link>-->
      </div>
    </v-layout>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data: () => ({
    CWID: "",
    termSelected: "Spring 20",
    valid: false
  }),
  methods: {
    required(propertyType) {
      return v =>
        (v && v.length == 9) || `You must input a ${propertyType} of length 9`;
    },
    //this.$store.dispatch is used when you want to call a function that is in store.JS
    sendData() {
      this.$store.commit("SET_CWID", this.CWID);
      if (this.CWID == "C75843921") {
        //this.$store.dispatch("getProfile");
        axios
          .get("http://127.0.0.1:8000/api/studentProfile/" + this.CWID)
          .then(data => {
            console.log(data.data);
            console.log("success");
            let studentProfile = data.data;
            this.$store.commit("SET_StudentProfile", studentProfile);
            this.$store.commit(
              "SET_Maj_Code",
              this.$store.state.studentProfile[0].Maj_Code
            );
            this.$store.dispatch("getCurriculum");
          })
          .catch(error => {
            console.log(error);
          });
        this.$router.push("Curriculum");
      } else {
        this.$store.commit("SET_Term", this.termSelected);
        this.$store.dispatch("getTranscript");
        this.$store.dispatch("getProfile");
        this.$store.dispatch("getStudentCurriculum");
        this.$router.push("Home");
      }
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
