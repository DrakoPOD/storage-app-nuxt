<template>
  <v-sheet>
    <add-laboratory />
  </v-sheet>
  <v-data-table :headers="headers">

  </v-data-table>
</template>

<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

const headers = ref([
  { title: 'Código', key: 'code' },
  { title: 'Nombre', key: 'name' },
  { title: 'Profesor a cargo', key: 'teacher' },
  { title: 'Área', key: 'area' },
  { title: 'Cantidad de artículos', key: 'qtyItems' },
  { title: 'Edificio', key: 'building' },
])


</script>