<template>
  <div>
    <v-container>
      <v-layout justify-center class="pa-3">
        <p class="headline font-weight-light">
          VIPRR Recommends these courses:
        </p>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex
          xs12
          sm6
          md4
          lg3
          v-for="subject in this.finalRecommended"
          :key="subject.Course_Code"
        >
          <!--class="text-xs-center" centralizes any text-->
          <!--class="ma-3 creates a margin. m=margin a=all directions -3=how much space"-->
          <v-card class="text-xs-center ma-3" raised>
            <v-card-text>
              <div class="subtitle-2">Course: {{ subject }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <p>
        Step 1: Select the courses you would like to register for by clicking
        the checkbox next to the course(s).
      </p>
      <p>
        Step 2: View the courses you have selected by clicking the red "View
        Courses You Have Selected" button.
      </p>
      <p>
        Step 3: If you wish wish to continue registration for the courses you
        have selected, click the "Continue" button.
      </p>
    </v-container>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-title>
              <template>
                <div class="text-center">
                  <v-bottom-sheet v-model="sheet" inset>
                    <template v-slot:activator="{ on }">
                      <v-badge
                        :value="selectedCourses.length"
                        :content="selectedCourses.length"
                        :input="changeButton"
                        color="black"
                        overlap
                      >
                        <v-btn color="rgb(242,43,12)" dark v-on="on"
                          >View Courses You Have Selected</v-btn
                        >
                      </v-badge>
                    </template>
                    <v-sheet class="text-center" height="300px">
                      <v-btn
                        class="mt-6"
                        text
                        color="rgb(242,43,12)"
                        @click="sheet = !sheet"
                        >Cancel
                        <v-icon right>mdi-backspace-outline</v-icon></v-btn
                      >
                      <h3
                        class="my-3 mb-3"
                        v-for="(item, index) in selectedCourses"
                        :key="index"
                      >
                        {{ item.Course_Code }}
                      </h3>
                      <router-link class="routerLink" to="/finalize" exact>
                        <v-btn color="success" @click="sendCourses"
                          >Continue to Registration Page
                          <v-icon right>mdi-arrow-right</v-icon>
                        </v-btn>
                      </router-link>
                    </v-sheet>
                  </v-bottom-sheet>
                </div>
              </template>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-model="selectedCourses"
              :headers="headers"
              :items="this.$store.state.availableCourses"
              :search="search"
              show-select
              item-key="CRN"
            >
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Recommendation",
  //computed makes a copy of values in state to use in this file.
  computed: {
    ...mapState(["availableCourses"]),
    ...mapState(["finalRecommended"])
  },
  methods: {
    sendCourses() {
      this.$store.commit("SET_CoursesSelected", this.selectedCourses);
    },
    changeButton() {
      if (this.button == true) {
        this.button = !this.button;
      }
    }
  },
  data() {
    return {
      button: true,
      addedClasses: 0,
      search: "",
      sheet: false,
      show: false,
      checked: false,
      selectedCourses: [],
      course: [
        {
          courseNumber: "354",
          title: "Systems Project Management"
        },
        {
          courseNumber: "321",
          title: "Database Management & Design"
        },
        {
          courseNumber: "330",
          title: "Web Programming I"
        }
      ],
      headers: [
        {
          align: "left",
          sortable: false
        },
        {
          text: "Course Number",
          value: "Course_Code"
        },
        {
          text: "CRN",
          value: "CRN"
        },
        {
          text: "Term",
          value: "Course_Term"
        },
        {
          text: "Start Date",
          value: "Start_Date"
        },
        {
          text: "End Date",
          value: "End_Date"
        },
        {
          text: "Meeting Times",
          value: "Course_Time"
        },
        {
          text: "Days",
          value: "Days_Of_The_Week"
        }
      ]
    };
  }
};
</script>
<style>
.routerLink {
  text-decoration: none;
}
</style>
