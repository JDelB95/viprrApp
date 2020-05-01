<template>
  <v-card height="100%">
    <v-card-text>
      <p class="pt-12 text-md-center display-4 font-weight-thin">VIPRR</p>
      <p class="text-md-center font-weight-light">
        (Vulcan Information Portal Registration Recommendation)
      </p>
      <p class="pt-6 text-md-center">
        Our VIPRR System will recommend you classes for registration based on
        your major's curriculum and your academic transcript.
      </p>
    </v-card-text>
    <v-layout justify-center>
      <div class=" pt-2 text-md-center">
        <v-select
          solo
          v-model="termSelected"
          @input="changeButton"
          :items="terms"
          label="Please Select a Term"
        >
        </v-select>
        <router-link class="routerLink" to="/recommendation" exact>
          <v-btn
            light
            color="rgb(242,43,12)"
            :disabled="button"
            @click="recommendation"
            >Let's Go!
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </router-link>
        <div class="pt-6 text-md-center font-weight-regular">
          <v-btn rounded dark color="rgb(242,43,12)" @click="progress"
            >View Degree Progress
            <v-icon right dark>mdi-school-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </v-layout>
  </v-card>
</template>
<script>
//import to use functionality
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Home",
  computed: {
    ...mapState(["studentTranscript"]),
    ...mapState(["studentCurriculum"])
  },
  data: () => ({
    eligible: [],
    recommended: [],
    termSelected: "",
    terms: [
      {
        text: "Fall 19",
        value: "Fall 19"
      },
      {
        text: "Spring 20",
        value: "Spring 20"
      }
    ],
    finalRecommended: [],
    button: true
  }),
  methods: {
    progress() {
      this.$router.push("Progress");
    },
    /*
    Takes the prereqs of classes the student needs to take to complete degree(studentCurriculum) and compares that with the
    courses in the student's transcript. This returns an array of the classes the student is eligible to take.
    */
    recommendation() {
      this.sendTerm();
      //console.log("In the fxn");
      var i, j, k, h;
      var ct = 0;
      var courseCode;
      var check = false;

      for (k = 0; k < this.studentCurriculum.length; k++) {
        //console.log('in k loop');
        this.eligible[k] = this.studentCurriculum[k];
      }
      console.log(this.eligible);

      for (i = 0; i < this.studentCurriculum.length; i++) {
        check = false;
        for (j = 0; j < this.studentTranscript.length; j++) {
          if (
            (this.studentTranscript[j].Course_Code ==
              this.studentCurriculum[i].Prereq_ID ||
              this.studentCurriculum[i].Prereq_ID == "none") &&
            this.studentCurriculum[i].Enable == "Enabled"
          ) {
            check = true;
          }
        } //end of j loop
        if (check == false) {
          for (h = 0; h < this.eligible.length; h++) {
            if (
              this.eligible[h].Course_Code ==
              this.studentCurriculum[i].Course_Code
            ) {
              this.eligible[h] = "";
              console.log(this.eligible[h].Course_Code);
            }
          }
        }
      } //end of i loop

      console.log(this.eligible);

      courseCode = this.eligible[0].Course_Code;
      this.recommended[0] = courseCode;
      ct = 1;
      for (h = 0; h < this.eligible.length; h++) {
        if (this.eligible[h].Course_Code != courseCode) {
          courseCode = this.eligible[h].Course_Code;
          this.recommended[ct] = this.eligible[h].Course_Code;
          ct += 1;
        } //end if
      }

      var finalRecommended = this.recommended.filter(function(x) {
        return x !== undefined;
      });
      this.$store.commit("SET_FinalRecommended", finalRecommended);
      console.log(finalRecommended);
      //POST returns only the classes that are in the available courses table that have a value that is in the finalRecommended array
      axios
        .post("http://127.0.0.1:8000/api/availableCourses2/", {
          term: this.termSelected,
          recommendation: finalRecommended
        })
        .then(data => {
          console.log(data.data);
          console.log("success");
          let availableCourses = data.data;
          this.$store.commit("SET_AvailableCourses", availableCourses);
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeButton() {
      if (this.button == true) {
        this.button = !this.button;
      }
    },
    sendTerm() {
      this.$store.commit("SET_Term", this.termSelected);
    }
  }
};
</script>
<style>
.routerLink {
  text-decoration: none;
}
a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
}
</style>
