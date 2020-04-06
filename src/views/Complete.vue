<template>
  <div>
    <v-container>
      <v-layout justify-center class="pt-10">
        <div class="text-md-center">
          <p class="headline font-weight-light">Classes Submitted!</p>
          <p class="headline font-weight-light">This is your final schedule:</p>
        </div>
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
  </div>
</template>

<script>
export default {
  name: "Complete",

  data: () => ({
    course: [
      {
        courseNumber: "322",
        title: "DB Application Development"
      },
      {
        courseNumber: "352",
        title: "Ethical Issues In Computing"
      },
      {
        courseNumber: "354",
        title: "Web Systems Project Management"
      }
    ]
  })
};
</script>
