<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/VIPRR_Logo_200x200_px.png')"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          :src="require('@/assets/viprrLogoSmall.png')"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn dark color="rgb(242,43,12)" @click="tutorial">
          Website Tutorial
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
//import to use functionality
import { mapState } from "vuex";
export default {
  name: "App",
  mounted() {},
  computed: {
    ...mapState(["availableCourses"])
  },
  methods: {
    tutorial() {
      window.open("https://www.nateteacher.com/", "_blank");
    }
  },
  components: {},

  data: () => ({})
};
</script>
