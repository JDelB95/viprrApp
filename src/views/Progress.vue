<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
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
    this.merge();
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
        sortable: false,
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
