<template>
  <v-data-table :loading="loadingData" :headers="(headers as any)" :items="listItems" item-value="_id">
    <template #item.functional="{ item }">
      <v-icon color="success" v-if="item.functional">mdi-check</v-icon>
      <v-icon color="error" v-else>mdi-close</v-icon>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable';

import type { PhysicsItem } from '@/types/item'

const listItems = ref<PhysicsItem[]>([])

const filters = ref<object>({})
const loadingData = ref(true)

const headers = ref([
  { title: 'Nombre', key: 'name', align: 'start' },
  { title: 'Cantidad', key: 'quantity', align: 'center' },
  { title: 'Laboratorio', key: 'laboratory', align: 'start' },
  { title: 'Tema', key: 'topic', align: 'start' },
  { title: 'Funcional', key: 'functional', align: 'center' },
  { title: 'Marca', key: 'brand', align: 'start' },
])

const getItems = async () => {
  const { data, error } = await useFetch<PhysicsItem[]>('api/item/getAllItem', {
    method: 'GET',
    query: filters.value
  })

  if (error.value) {
    console.log(error)
    loadingData.value = false
    return
  }
  if (data.value) {
    data.value?.sort((a, b) => a.name > b.name ? 1 : -1)
    loadingData.value = false
    listItems.value = data.value
  }
}

onMounted(async () => {
  getItems()
})
</script>

<style scoped></style>