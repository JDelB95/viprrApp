<template>
  <div>
    <v-container>
      <v-layout justify-center class="pt-10">
        <div class="text-md-center">
          <p class="headline font-weight-light">Classes Submitted!</p>
          <v-layout class="pb-3" justify-center
            ><v-icon x-large color="success">mdi-check-circle</v-icon></v-layout
          >
          <p class="headline font-weight-light">This is your final schedule:</p>
        </div>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex
          xs12
          sm6
          md4
          lg3
          v-for="subject in this.coursesSelected"
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
      </v-layout>
      <div class="text-md-center pt-10">
        <p class="headline font-weight-light">
          Hope you have a great semester!
        </p>
        <v-btn dark color="rgb(242,43,12)" @click="progess"
          >View Degree Progress
          <v-icon right>mdi-school-outline</v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Complete",
  computed: {
    ...mapState(["coursesSelected"])
  },
  methods: {
    progess() {
      this.$router.push("Progress");
    }
  },
  data: () => ({})
};
</script>
