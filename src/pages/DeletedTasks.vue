<script setup>
import { DeletedTasks } from "../composables/Tasks";
</script>

<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">Deleted Tasks</h6>
      <div class="q-mt-xl">
        <q-card v-for="row in DeletedTasks" :key="row.id" class="q-mt-sm">
          <q-card-section class="bg-primary text-white q-pa-none">
            <div class="text-bold q-pa-md">{{ row.todo }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
