<template>
  <div>
    <v-container>
      <v-layout justify-md-center class="pa-10">
        <p class="headline font-weight-light">
          These are the classes you have selected for the
          {{ this.$store.state.term }} term.
        </p>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex
          xs12
          sm6
          md4
          lg3
          class="align-content-center"
          v-for="subject in coursesSelected"
          :key="subject.Course_Code"
        >
          <!--class="text-xs-center" centralizes any text-->
          <!--class="ma-3 creates a margin. m=margin a=all directions -3=how much space"-->
          <v-card class="text-md-center ma-3" raised>
            <v-card-text>
              <div class="subtitle-2">{{ subject.Course_Code }}</div>
              <div class="grey--text">CRN: {{ subject.CRN }}</div>
              <div class="grey--text">
                Class Days: {{ subject.Days_Of_The_Week }}
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex justify-md-center>
          <div class="text-md-center pt-12">
            <p class="pt-12 headline font-weight-light">
              Would you like to register for these classes?
            </p>
            <p class="headline font-weight-light">
              Choosing YES will make this your FINAL schedule.
            </p>
            <router-link class="routerLink" to="/complete" exact>
              <v-btn
                large
                class="ma-6 font-weight-regular"
                color="success"
                @click="final"
                >Yes</v-btn
              >
            </router-link>
            <router-link class="routerLink" to="/recommendation" exact>
              <v-btn
                large
                dark
                class="ma-6 font-weight-regular"
                color="rgb(242,43,12)"
                >No</v-btn
              >
            </router-link>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
//import to use functionality
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Finalize",
  computed: {
    ...mapState(["coursesSelected"]),
    ...mapState(["CWID"]),
    ...mapState(["finalSchedule"])
  },
  mounted() {
    this.$set(this, "setLater", this.coursesSelected);
    this.$store.dispatch("getSchedule");
  },
  data: () => ({
    date: "2020-05-01",
    i: 0,
    setLater: false,
    majCode: "748",
    currID: "CIS",
    courseComp: "R"
  }),
  methods: {
    final() {
      var k, j;
      for (this.i = 0; this.i < this.coursesSelected.length; this.i++) {
        this.coursesSelected[this.i].CWID = this.$store.state.CWID;
        this.coursesSelected[this.i].Date_Registered = this.date;
        this.coursesSelected[this.i].Maj_Code = this.majCode;
        this.coursesSelected[this.i].Curriculum_ID = this.currID;
        this.coursesSelected[this.i].Course_Comp = this.courseComp;
        this.setLater[this.i].CWID = this.$store.state.CWID;
        this.setLater[this.i].Date_Registered = this.date;
        this.setLater[this.i].Maj_Code = this.majCode;
        this.setLater[this.i].Curriculum_ID = this.currID;
        this.setLater[this.i].Course_Comp = this.courseComp;
      }
      for (k = 0; k < this.finalSchedule.length; k++) {
        for (j = 0; j < this.coursesSelected.length; j++) {
          if (this.finalSchedule[k].CRN == this.coursesSelected[j].CRN) {
            this.coursesSelected[j] = "";
          } //end if
        } //end j loop
      } //end i
      var finalChosen = this.coursesSelected.filter(function(x) {
        return x != "";
      });
      console.log(finalChosen);
      axios
        .post("http://127.0.0.1:8000/api/insertSchedule", {
          body: finalChosen
        })
        .then(data => {
          console.log(data.data);
          console.log("success");
        })
        .catch(error => {
          console.log(error);
        });
      axios
        .post("http://127.0.0.1:8000/api/insertTranscript", {
          body: finalChosen
        })
        .then(data => {
          console.log(data.data);
          console.log("success");
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>
<style>
.routerLink {
  text-decoration: none;
}
</style>
