<template>
  <div>
    <v-container>
      <v-layout justify-center class="pa-3">
        <p class="headline font-weight-light">VIPRR Recommends</p>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex
          xs12
          sm6
          md4
          lg3
          v-for="subject in course"
          :key="subject.courseNumber"
        >
          <!--class="text-xs-center" centralizes any text-->
          <!--class="ma-3 creates a margin. m=margin a=all directions -3=how much space"-->
          <v-card class="text-xs-center ma-3" raised>
            <v-card-text>
              <div class="subtitle-2">CIS-{{ subject.courseNumber }}</div>
              <div class="grey--text">{{ subject.title }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
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
                        color="green"
                        overlap
                      >
                        <v-btn color="orange" dark v-on="on"
                          >View Courses You Selected</v-btn
                        >
                      </v-badge>
                    </template>
                    <v-sheet class="text-center" height="300px">
                      <v-btn
                        class="mt-6"
                        text
                        color="error"
                        @click="sheet = !sheet"
                        >Close</v-btn
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
                          >Continue</v-btn
                        >
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
  computed: {
    ...mapState(["availableCourses"])
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
