<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.value" @click="sortColumn(header.value as THeader)">
          <div class="flex">
            <p>{{ header.text }}</p>
            <v-icon icon="mdi-menu-down" class="icon"
              :class="{ 'iconSort': (header.sorted && header.sort === Sort.ASC) }" />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in listItems" :key="data._id?.toString()">
        <td>{{ data.name }}</td>
        <td>{{ data.quantity }}</td>
        <td>{{ data.laboratory }}</td>
        <td>{{ data.topics }}</td>
        <td>
          <template v-if="data.functional">
            <v-icon color="success" icon="mdi-check"></v-icon>
          </template>
          <template v-else>
            <v-icon color="error" icon="mdi-close"></v-icon>
          </template>
        </td>
        <td>{{ data.brand }}</td>
      </tr>

      <tr v-if="listItems?.length == 0 || !listItems">
        <td colspan="6" class="no-data">
          <template v-if="loadingData">
            Loading data...
          </template>
          <template v-else>
            There is no data here... :(
          </template>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import MenuDownIcon from 'vue-material-design-icons/MenuDown.vue'
import MenuUpIcon from 'vue-material-design-icons/MenuUp.vue'

import type { PhysicsItem } from '@/types/item'

type THeader = 'name' | 'quantity' | 'laboratory' | 'topics' | 'functional' | 'brand';

const listItems = ref<PhysicsItem[] | null>(null)

const filters = ref<object>({})
const loadingData = ref(true)

enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

onMounted(async () => {
  getItems()
})

const headers = ref([
  { text: 'Nombre', value: 'name', sorted: true, sort: Sort.ASC },
  { text: 'Cantidad', value: 'quantity', sorted: false, sort: Sort.ASC },
  { text: 'Laboratorio', value: 'laboratory', sorted: false, sort: Sort.ASC },
  { text: 'Tema', value: 'topic', sorted: false, sort: Sort.ASC },
  { text: 'Funcional', value: 'functional', sorted: false, sort: Sort.ASC },
  { text: 'Marca', value: 'brand', sorted: false, sort: Sort.ASC },
])

const sortColumn = (val: THeader) => {
  if (!listItems.value) return

  const header = headers.value.find((header) => header.sorted)
  if (header) {
    header.sorted = false
  }
  const headerSelected = headers.value.find((header) => header.value === val)!
  if (headerSelected) {
    headerSelected.sorted = true
    headerSelected.sort = headerSelected.sort === Sort.ASC ? Sort.DESC : Sort.ASC
  }

  listItems.value = listItems.value.sort((a: PhysicsItem, b: PhysicsItem) => {
    if (headerSelected.sort === Sort.ASC) {
      return a[val]! > b[val]! ? 1 : -1
    } else {
      return a[val]! < b[val]! ? 1 : -1
    }
  })
}

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
  data.value?.sort((a, b) => a.name > b.name ? 1 : -1)
  loadingData.value = false
  listItems.value = data.value
}
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}



th {
  cursor: pointer;
}

.icon {
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