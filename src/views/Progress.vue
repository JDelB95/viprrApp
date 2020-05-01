<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <template>
            <v-toolbar flat color="white">
              <v-toolbar-title>Degree Progress</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-row></v-row>
              <v-row
                >A =
                <p class="ml-1">
                  <font color="orange">Attempting Class</font>
                </p></v-row
              >
              <v-row
                >C =
                <p class="ml-1">
                  <font color="green">Completed Class</font>
                </p></v-row
              >
              <v-row
                >R =
                <p class="ml-1"><font color="blue">Registered</font></p></v-row
              >
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <v-data-table
            :headers="headers"
            :items="this.progress"
            :items-per-page="15"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
//import axios from 'axios';
import { mapState } from "vuex";
export default {
  name: "Progress",
  mounted() {
    this.$store.dispatch("getProgress");
    this.$store.dispatch("getCurriculum");
    //this.merge();
  },
  computed: {
    ...mapState(["curriculum"]),
    ...mapState(["studentTranscript"]),
    ...mapState(["progress"])
  },
  data: () => ({
    headers: [
      {
        text: "Curriculum",
        align: "start",
        value: "Course_Code"
      },
      {
        text: "Progress",
        value: "Course_Comp"
      },
      {
        text: "Term Completed",
        value: "Term_Completed"
      },
      {
        text: "Grade",
        value: "Course_Grade"
      }
    ]
  }),
  methods: {},
  watch: {}
};
</script>
