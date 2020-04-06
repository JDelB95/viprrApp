//This is the central store that holds our state.
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex, axios);

//Export to use outside of this js file.
export default new Vuex.Store({
  //Have to configure the store by passing in a js object.
  //Every Store has a "state." State is a reserved word in vue.
  //Have to import the Store in main.js
  state: {
    availableCourses: [],
    studentTranscript: [],
    studentProfile: [],
    curriculum: [],
    progress: [],
    coursesSelected: [],
    Maj_Code: "",
    CWID: "",
    term: ""
  },
  methods: {},
  mutations: {
    SET_AvailableCourses(state, availableCourses) {
      state.availableCourses = availableCourses;
    },
    SET_StudentTranscript(state, studentTranscript) {
      state.studentTranscript = studentTranscript;
    },
    SET_StudentProfile(state, studentProfile) {
      state.studentProfile = studentProfile;
    },
    SET_Curriculum(state, curriculum) {
      state.curriculum = curriculum;
    },
    SET_Progress(state, progress) {
      state.progress = progress;
    },
    SET_CWID(state, CWID) {
      state.CWID = CWID;
    },
    SET_Term(state, term) {
      state.term = term;
    },
    SET_CoursesSelected(state, coursesSelected) {
      state.coursesSelected = coursesSelected;
    },
    SET_Maj_Code(state, Maj_Code) {
      state.Maj_Code = Maj_Code;
    }
  },
  actions: {
    storeCourses(payload) {
      axios
        .post("http://127.0.0.1:8000/api/insert", {
          body: payload
        })
        .then(data => {
          console.log(data.data);
          console.log("success");
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAvailableCourses({ commit }) {
      axios
        .get("http://127.0.0.1:8000/api/availableCourses/" + this.state.term)
        .then(data => {
          console.log(data.data);
          console.log("success");
          let availableCourses = data.data;
          commit("SET_AvailableCourses", availableCourses);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTranscript({ commit }) {
      console.log(this.state.CWID);
      axios
        .get("http://127.0.0.1:8000/api/transcript/" + this.state.CWID)
        .then(data => {
          console.log(data.data);
          console.log("success");
          let studentTranscript = data.data;
          commit("SET_StudentTranscript", studentTranscript);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProfile({ commit }) {
      axios
        .get("http://127.0.0.1:8000/api/studentProfile/" + this.state.CWID)
        .then(data => {
          console.log(data.data);
          console.log("success");
          let studentProfile = data.data;
          commit("SET_StudentProfile", studentProfile);
          commit("SET_Maj_Code", this.state.studentProfile[0].Maj_Code);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCurriculum({ commit }) {
      console.log(this.state.studentProfile[0].Maj_Code);
      axios
        .get("http://127.0.0.1:8000/api/getCurriculum/" + this.state.Maj_Code)
        .then(data => {
          console.log(data.data);
          console.log("success");
          let curriculum = data.data;
          commit("SET_Curriculum", curriculum);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProgress({ commit }) {
      axios
        .get("http://127.0.0.1:8000/api/getProgress/" + this.state.CWID)
        .then(data => {
          console.log(data.data);
          console.log("success");
          let progress = data.data;
          commit("SET_Progress", progress);
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeCWID({ commit }, CWID) {
      commit("SET_CWID", CWID);
    },
    changeTerm({ commit }, term) {
      commit("SET_Term", term);
    }
  }
});
