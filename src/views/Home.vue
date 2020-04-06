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
            class="font-weight-regular"
            color="success"
            :disabled="button"
            @click="sendTerm"
            >Let's Go!</v-btn
          >
        </router-link>
        <div class="pt-6 text-md-center font-weight-regular">
        <a class="a" href="http://localhost:8081/#/progress"><span>View Degree Progress</span></a>
      </div>
      </div>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
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
    button: true
  }),
  methods: {
    changeButton() {
      if (this.button == true) {
        this.button = !this.button;
      }
    },
    sendTerm() {
      this.$store.commit("SET_Term", this.termSelected);
      this.$store.dispatch("getAvailableCourses");
    }
  }
};
</script>
<style>
.routerLink {
  text-decoration: none;
}
a, a:hover, a:focus, a:active {
     text-decoration: none;
     color: inherit;
}
</style>
