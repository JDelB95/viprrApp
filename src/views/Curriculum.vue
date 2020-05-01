<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="this.$store.state.curriculum"
            sort-by="Course Code"
            :items-per-page="15"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Curriculum Editor</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="rgb(242,43,12)" dark class="mb-2" v-on="on">
                      <v-icon>mdi-pencil-plus</v-icon>Create New Course
                    </v-btn>
                  </template>
                  <v-card>
                    <v-form v-model="valid">
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.Course_Desc"
                                color="black"
                                label="Course Title"
                                :rules="[
                                  required('Course Title'),
                                  minLength('Course Title', 3),
                                  maxLength('Course Title', 50)
                                ]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.Course_Code"
                                color="black"
                                label="Course Code"
                                :rules="[
                                  required('Course Code'),
                                  setLength('Course Code', 6)
                                ]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.Maj_Code"
                                color="black"
                                label="Major Code"
                                :rules="[
                                  required('Course Code'),
                                  minLength('Course Title', 2),
                                  maxLength('Course Code', 3)
                                ]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.Course_Seq"
                                color="black"
                                label="Sequence"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.Prereq_ID"
                                color="black"
                                label="Prerequisite"
                                :rules="[
                                  required('Prerequisite'),
                                  noneOr('Prerequisite'),
                                  maxLength('Prerequisite', 6),
                                  cantBe('Prerequisite')
                                ]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <!-- <v-switch v-model="editedItem.Enable" :label="`This course is ${editedItem.Enable}`"></v-switch> -->
                              <v-radio-group
                                v-model="editedItem.Enable"
                                :mandatory="true"
                                v-if="editedItem.Enable == 'Enabled'"
                              >
                                <v-radio
                                  label="Enabled"
                                  color="success"
                                  :value="editedItem.Enable"
                                ></v-radio>
                                <v-radio
                                  label="Disabled"
                                  color="success"
                                  :value="Disabled"
                                ></v-radio>
                              </v-radio-group>
                              <v-radio-group
                                v-model="editedItem.Enable"
                                :mandatory="true"
                                v-else
                              >
                                <v-radio
                                  label="Enabled"
                                  color="success"
                                  :value="Enabled"
                                ></v-radio>
                                <v-radio
                                  label="Disabled"
                                  color="success"
                                  :value="editedItem.Enable"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="rgb(242,43,12)" text @click="close"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="success"
                          text
                          :disabled="!valid"
                          @click="save"
                          >Save</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon class="mr-2" color="orange" @click="editItem(item)">
                mdi-lead-pencil
              </v-icon>
              <label>Edit</label>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
//import to use functionality
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Curriculum",
  mounted() {
    this.$store.dispatch("getCurriculum");
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Course" : "Edit Course";
    },
    ...mapState(["curriculum"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  data: () => ({
    dialog: false,
    Enabled: "Enabled",
    Disabled: "Disabled",
    text: "",
    show: false,
    valid: false,
    headers: [
      {
        text: "Course Title",
        align: "start",
        sortable: false,
        value: "Course_Desc"
      },
      {
        text: "Course Code",
        value: "Course_Code"
      },
      {
        text: "Major Code",
        value: "Maj_Code"
      },
      {
        text: "Sequence",
        value: "Course_Seq"
      },
      {
        text: "Prerequisite",
        value: "Prereq_ID"
      },
      {
        text: "Enable/Disable",
        value: "Enable"
      },
      {
        text: "",
        value: "action",
        sortable: false
      }
    ],
    editedIndex: -1,
    editedItem: {
      Curriculum_ID: "7489",
      Course_Desc: "",
      Course_Code: "",
      Maj_Code: "",
      Course_Seq: 0,
      Prereq_ID: ""
    },
    defaultItem: {
      Curriculum_ID: "7489",
      Course_Desc: "",
      Course_Code: "CIS",
      Maj_Code: "CIS",
      Course_Seq: 0,
      Prereq_ID: ""
    }
  }),
  created() {
    this.initialize();
  },

  methods: {
    initialize() {},
    //validation rules
    required(propertyType) {
      return v => (v && v.length > 0) || `You must input a ${propertyType}`;
    },
    noneOr(propertyType) {
      return v =>
        v.length >= 4 || `${propertyType} must be "none" or 6 characters long`;
    },
    cantBe(propertyType) {
      return v =>
        v.length != 5 || `${propertyType} must be "none" or 6 characters long`;
    },
    setLength(propertyType, setLength) {
      return v =>
        (v && v.length == setLength) ||
        `${propertyType}must be ${setLength} characters long`;
    },
    minLength(propertyType, minLength) {
      return v =>
        (v && v.length >= minLength) ||
        `${propertyType} must be at least ${minLength} characters long`;
    },
    maxLength(propertyType, maxLength) {
      return v =>
        (v && v.length <= maxLength) ||
        `${propertyType} can only be a max of ${maxLength} characters long`;
    },
    switchValue(item) {
      if (item.Enable == 0) {
        item.Enable++;
      } else {
        --item.Enable;
      }
    },
    editItem(item) {
      this.editedIndex = this.$store.state.curriculum.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.$store.state.curriculum[this.editedIndex],
          this.editedItem,
          console.log(this.editedItem)
        );
        axios
          .put(
            "http://127.0.0.1:8000/api/updateCurriculum/" +
              this.editedItem.Program_ID,
            this.editedItem
          )
          .then(res => {
            console.log(res.response);
            this.text = "Record Updated!";
          })
          .catch(err => {
            console.log(err.response);
            this.text = "Error Updating Record";
          });
      } else {
        this.$store.state.curriculum.push(this.editedItem);
        console.log(this.editedItem);
        axios
          .post("http://127.0.0.1:8000/api/addCurriculum/", this.editedItem)
          .then(res => {
            console.log(res.response);
            this.text = "Record Added!";
          })
          .catch(err => {
            console.log(err.response);
            this.text = "Error Adding Record";
          });
      }
      this.close();
    }
  }
};
</script>
