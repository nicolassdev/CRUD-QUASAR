<script setup>
import { ref } from "vue";
import {
  FinishedTasks,
  DeletedTasks,
  PermanentDelTasks,
} from "../composables/Tasks";

//INITIALIZATION IN PROCESS OF DATA
let text = ref(null);
let form = ref(null);
let toMarkAsDone = ref(null);
let toDelete = ref(null);

// SELECTING TO DO FUNCTION
let selectedTodo = ref(null);
const selectTodo = (row) => {
  selectedTodo.value = row;
  text.value = row.todo;
};

let showDialog = ref(false);
const toggleDialog = (row, status) => {
  showDialog.value = true;
  toMarkAsDone.value = toDelete.value = null;
  status !== "delete" ? (toMarkAsDone.value = row) : (toDelete.value = row);
};

const markAsDone = () => {
  let index = MyTasks.value.findIndex((t) => t.id === toMarkAsDone.value.id);
  index !== -1 && MyTasks.value.splice(index, 1);
  FinishedTasks.value.push(toMarkAsDone.value);
  toMarkAsDone.value = null;
  showDialog.value = false;
};
//DELETING TO DO FUNCTION
const removeTodo = () => {
  let index = MyTasks.value.findIndex((t) => t.id === toDelete.value.id);
  index !== -1 && MyTasks.value.splice(index, 1);
  DeletedTasks.value.push(toDelete.value);
  toDelete.value = null;
  showDialog.value = false;
};
</script>

<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">Finished Tasks</h6>
      <div class="q-mt-xl">
        <q-card
          @click="selectTodo(row)"
          v-for="row in FinishedTasks"
          :key="row.id"
          class="q-mt-sm"
        >
          <q-card-section class="bg-primary text-white q-pa-none">
            <div class="text-bold q-pa-md">{{ row.todo }}</div>
            <div class="bg-white q-pa-sm">
              <q-btn
                @click.stop="toggleDialog(row, 'delete')"
                flat
                icon="delete_outline"
                color="red"
              />
            </div>

            <!-- SHOWING THE DIALOG IN USER -->

            <q-dialog v-model="showDialog" persistent>
              <q-card>
                <!--SELECTING MARK AS DONE OR DELETE BTN-->
                <q-card-section class="row items-center">
                  <div class="q-ml-sm">
                    Are you sure you want to delete
                    <span class="text-red">"{{ toDelete.todo }}"</span>?
                  </div>
                </q-card-section>
                <!-- POOP UP AND SELECTING MARK AS DONE YES OR NO -->
                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn
                    @click="removeTodo()"
                    flat
                    label="Yes"
                    color="primary"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
