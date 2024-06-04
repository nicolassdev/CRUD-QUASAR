<script setup>
import { ref } from "vue";
import { MyTasks, FinishedTasks, DeletedTasks } from "../composables/Tasks";

//INITIALIZATION IN PROCESS OF DATA
let text = ref(null);
let form = ref(null);
let toMarkAsDone = ref(null);
let toDelete = ref(null);

//AADD TO DO FUNCTION USING QUASAR/VUEJS
const addTodo = () => {
  if (validateTodo(text.value)) {
    let id = MyTasks.value.length;
    MyTasks.value.push({
      id: ++id,
      todo: text.value,
    });
  }
  text.value = null;
  form.value.reset();
};

//SELECTING TO DO FUNCTION
let selectedTodo = ref(null);
const selectTodo = (row) => {
  selectedTodo.value = row;
  text.value = row.todo;
};

//UPDATING TO DO FUNCTION
const updateTodo = () => {
  if (validateTodo(text.value)) {
    let index = MyTasks.value.findIndex((t) => t.id === selectedTodo.value.id);
    index !== -1 && (MyTasks.value[index].todo = text.value);

    text.value = selectedTodo.value = null;
    form.value.reset();
  }
};

//SHOWING THE DIALOG IN TO DO IF MARK AS DONE OR NOT
let showDialog = ref(false);
const toggleDialog = (row, status) => {
  showDialog.value = true;
  toMarkAsDone.value = toDelete.value = null;
  status !== "delete" ? (toMarkAsDone.value = row) : (toDelete.value = row);
};

//MARK AS DONE FUNCTION
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

//VALIDATION IF USER HAVE THE SAME TO DO
const validateTodo = (new_todo) => {
  let index = MyTasks.value.findIndex((t) => t.todo === new_todo);
  if (index !== -1) {
    alert("Todo already exist!");
    return false;
  } else {
    return true;
  }
};
</script>

<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">My Tasks</h6>
      <q-form ref="form" @submit="!selectedTodo ? addTodo() : updateTodo()">
        <div class="row gap">
          <!-- INPUT TO DO -->
          <q-input
            v-model="text"
            dense
            outlined
            label="What's your todo?"
            class="q-pa-none col-10"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
          <div class="col-2 q-pl-sm">
            <q-btn
              :class="`bg-${!selectedTodo ? 'primary' : 'secondary'} fit`"
              color="white"
              glossy
              dense
              flat
              type="submit"
              :icon="!selectedTodo ? 'add' : 'edit'"
            />
          </div>
        </div>
      </q-form>
      <div class="q-mt-xl">
        <!-- RENDERING V-FOR  -->
        <q-card
          @click="selectTodo(row)"
          class="q-mt-sm"
          v-for="row in MyTasks"
          :key="row.id"
        >
          <q-card-section
            :class="`bg-${
              selectedTodo && selectedTodo.id === row.id
                ? 'secondary'
                : 'primary'
            } text-white q-pa-none flex justify-between items-center`"
          >
            <div class="text-bold q-pl-lg">{{ row.todo }}</div>
            <div class="bg-white q-pa-sm">
              <q-btn
                @click.stop="toggleDialog(row, 'mark-done')"
                flat
                icon="check_circle_outline"
                color="green"
              />
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
                  <div v-if="toMarkAsDone" class="q-ml-sm">
                    Are you sure you want to mark
                    <span class="text-green">"{{ toMarkAsDone.todo }}"</span> as
                    done?
                  </div>
                  <div v-else class="q-ml-sm">
                    Are you sure you want to delete
                    <span class="text-red">"{{ toDelete.todo }}"</span>?
                  </div>
                </q-card-section>
                <!-- POOP UP AND SELECTING MARK AS DONE YES OR NO -->
                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn
                    @click="toMarkAsDone ? markAsDone() : removeTodo()"
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
