import { ref } from "vue";

let MyTasks = ref([]);
let FinishedTasks = ref([]);
let DeletedTasks = ref([]);
let PermanentDelTasks = ref([]);

export { MyTasks, FinishedTasks, DeletedTasks, PermanentDelTasks };
