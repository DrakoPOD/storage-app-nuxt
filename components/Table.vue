<template>
  <div class="containerTable">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.value" @click="sortColumn(header.value as THeader)">
            <div class="flex">
              <p>{{ header.text }}</p>
              <menu-down-icon :size="28"
                :class="'icon ' + (header.sort === Sort.ASC && header.sorted ? 'iconSort' : '')" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in listItems" :key="data._id?.toString()">
          <td>{{ data.name }}</td>
          <td>{{ data.quantity }}</td>
          <td>{{ data.laboratory }}</td>
          <td>{{ data.topic }}</td>
          <td>{{ data.functional }}</td>
          <td>{{ data.brand }}</td>
          <td v-if="listItems?.length == 0" colspan="0" class="no-data">There is no data here... :(</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import MenuDownIcon from 'vue-material-design-icons/MenuDown.vue'
import MenuUpIcon from 'vue-material-design-icons/MenuUp.vue'

import type { PhysicsItem } from '@/types/item'

type THeader = 'name' | 'quantity' | 'laboratory' | 'topic' | 'functional' | 'brand';

const listItems = ref<PhysicsItem[] | null>(null)

const filters = ref<object>({})

enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

onMounted(async () => {
  getItems()
})

const headers = ref([
  { text: 'Nombre', value: 'name', sorted: false, sort: Sort.ASC },
  { text: 'Cantidad', value: 'quantity', sorted: false, sort: Sort.ASC },
  { text: 'Laboratorio', value: 'laboratory', sorted: false, sort: Sort.ASC },
  { text: 'Tema', value: 'topic', sorted: false, sort: Sort.ASC },
  { text: 'Funcional', value: 'functional', sorted: false, sort: Sort.ASC },
  { text: 'Marca', value: 'brand', sorted: false, sort: Sort.ASC },
])

const sortColumn = (value: THeader) => {
  if (!listItems.value) return

  const header = headers.value.find((header) => header.sorted)
  if (header) {
    header.sorted = false
  }
  const headerSelected = headers.value.find((header) => header.value === value)!
  if (headerSelected) {
    headerSelected.sorted = true
    headerSelected.sort = headerSelected.sort === Sort.ASC ? Sort.DESC : Sort.ASC
  }

  listItems.value = listItems.value.sort((a, b) => {
    if (headerSelected.sort === Sort.ASC) {
      return a[value] > b[value] ? 1 : -1
    } else {
      return a[value] < b[value] ? 1 : -1
    }
  })
}

const getItems = async () => {
  const { data, error } = await useFetch<PhysicsItem[]>('api/allItem', {
    method: 'GET',
    query: filters.value
  })

  if (error.value) {
    console.log(error)
    return
  }

  console.log(data.value)
  listItems.value = data.value
}
</script>

<style scoped>
.containerTable {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  align-items: flex-start;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 95%;
  flex-shrink: 0;
}

th {
  background-color: #4caf50;
  color: white;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tbody>tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  cursor: pointer;
}

.icon {
  height: 30px !important;
  width: 30px !important;
  transition: 0.3s;
}

.no-data {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.iconSort {
  transform: scaleY(-1);
}
</style>