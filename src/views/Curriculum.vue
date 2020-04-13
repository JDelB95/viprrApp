<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="this.$store.state.curriculum"
            sort-by="calories"
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
                    <v-btn color="primary" dark class="mb-2" v-on="on"
                      >New Course</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.Course_Desc"
                              label="Course Title"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.Course_Code"
                              label="Course Code"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.Maj_Code"
                              label="Major Code"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.Course_Seq"
                              label="Sequence"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.Prereq_ID"
                              label="Prerequisite"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-lead-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import axios from 'axios';
export default {
  name: "Curriculum",
  mounted() {
    this.$store.dispatch("getCurriculum");
  },
  data: () => ({
    dialog: false,
    text: "",
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
        text: "",
        value: "action",
        sortable: false
      }
    ],
    editedIndex: -1,
    editedItem: {
      Course_Desc: "",
      Course_Code: "",
      Major_Code: "",
      Course_Seq: 0,
      Prereq_ID: 0
    },
    defaultItem: {
      Course_Desc: "",
      Course_Code: "CIS",
      Major_Code: "CIS",
      Course_Seq: 0,
      Prereq_ID: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState(["curriculum"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.$store.state.curriculum.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.$store.state.curriculum.indexOf(item);
      console.log(item.Program_ID);
      let descision = confirm("Are you sure you want to delete this item?")
        if(descision){
        axios.put("http://127.0.0.1:8000/api/destroy/"+item.Program_ID)
        .then(res =>{
          console.log(res.response)
          this.text = "Record Deleted!"
          this.$store.state.curriculum.splice(index, 1);
        })
        .catch(err =>{
          console.log(err.response)
          this.text = "Error Deleting Record"
        })
        }
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
        axios.put("http://127.0.0.1:8000/api/updateCurriculum/"+this.editedItem.Program_ID, this.editedItem)
        .then(res =>{
          console.log(res.response)
          this.text = "Record Updated!"
        })
        .catch(err =>{
          console.log(err.response)
          this.text = "Error Updating Record"
        })
      } else {
        this.$store.state.curriculum.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
