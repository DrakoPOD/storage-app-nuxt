<template>
  <v-data-table :loading="loadingData" :headers="(headers as any)" :items="listItems" item-value="_id"
    v-model:expanded="expandedRow" hover show-expand single-expand @click:row="itemClick">
    <template #item.code="{ item }">
      <pre>{{ item.code }}</pre>
    </template>
    <template #item.functional="{ item }">
      <v-icon color="success" v-if="item.functional">mdi-check</v-icon>
      <v-icon color="error" v-else>mdi-close</v-icon>
    </template>
    <template #item.quantity="{ item }: { item: PhysicsItem }">
      <p>{{ item.quantity }} </p>
    </template>
    <template #item.unit="{ item }: { item: PhysicsItem }">
      <p>{{ item.unit }} </p>
    </template>
    <template #item.laboratory="{ item }: { item: PhysicsItem }">
      <p>{{ LaboratoriesNames[item.laboratory] }}</p>
    </template>
    <template #item.actions="{ item }">
      <v-row>
        <v-col cols="6">
          <v-btn id="not-click" density="compact" variant="text" size="medium" icon="mdi-pencil"
            @click="editItem"></v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn id="not-click" density="compact" variant="text" size="medium" icon="mdi-delete"
            @click="deleteItem"></v-btn>
        </v-col>
      </v-row>
    </template>
    <template #expanded-row="{ columns, item }: { item: PhysicsItem, columns: Array<any> }">
      <tr>
        <td :colspan="columns.length">
          <v-row class="pa-2">
            <v-col cols="12" sm="4">
              <v-carousel>
                <v-carousel-item value="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-carousel-item>
                <v-carousel-item value="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
                  src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"></v-carousel-item>
                <v-carousel-item value="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-carousel-item>

                <template #item="{ item, props, }">
                  <v-card v-ripple class="carousel-item ma-2" width="50px" @click="props.onClick">
                    <v-img :src="(item.value as string)"></v-img>
                  </v-card>
                </template>
              </v-carousel>

            </v-col>
            <v-col cols="12" sm="8">
              <v-row>
                <v-col cols="12" class="d-flex align-content-center justify-center">
                  <Barcode v-model="item.code" />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="font-weight-black">Descripción:</div>
                  <div> {{ item.description }}</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="font-weight-black">Fecha de Vencimiento:</div>
                  <div> {{ item.expiryDate || '-' }}</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="font-weight-black">condiciones de Almacenamiento:</div>
                  <div>{{ item.storageConditions }}</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="font-weight-black">Fabricante:</div>
                  <div>{{ item.manufacturer }}</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="font-weight-black">Categoría:</div>
                  <div>{{ item.category }}</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="font-weight-black">Temas:</div>
                  <div v-if="item.topics.length < 1">-</div>
                  <div v-else v-for="topic in item.topics">{{ topic }}</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="font-weight-black">Experimentos:</div>
                  <div v-if="item.experiments.length < 1">-</div>
                  <div v-else v-for="experiment in item.experiments">{{ experiment }}</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <!-- 
                    <div class="font-weight-black"></div>
                    <div>{{ item }}</div>
                  -->
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="font-weight-black">Fecha de adquisición:</div>
                  <div>{{ item.acquisitionDate || '-' }}</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="font-weight-black">Fecha de registro:</div>
                  <div>{{ item.addedDate }}</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="font-weight-black">Fecha de modificación:</div>
                  <div>{{ item.lastUpdated }}</div>
                </v-col>
                <v-col cols="12" sm="6"></v-col>
              </v-row>
            </v-col>
          </v-row>
        </td>
      </tr>
    </template>
  </v-data-table>
  <v-btn @click="() => openDialog = true">Click me</v-btn>
  <v-dialog class="drawer" permanent location="right" v-model="openDialog">
    <v-card height="100%" class="ma-0">
      <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident asperiores repellat, unde quisquam
        nesciunt amet error vero soluta totam, reprehenderit iusto qui expedita porro magni beatae molestiae in omnis
        magnam.</v-card-text>
      <v-card-actions><v-btn @click="openDialog = false">Close</v-btn></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { VDataTable } from 'vuetify/components';

import type { PhysicsItem } from '@/types/item'

const listItems = ref<PhysicsItem[]>([])

const filters = ref<object>({})
const loadingData = ref(true)

const openDialog = ref(false)

const expandedRow = ref<string[]>([])

type Headers = InstanceType<typeof VDataTable>['headers']

// // get InternalDataTableHeader[] type for internalItem
// type InternalDataTableHeader = InstanceType<typeof VDataTable>
// const a: InternalDataTableHeader['$slots']

// type extendProps = InternalDataTableHeader['$slots']['expanded-row']

//   const b: extendProps

//     b('a')
const headers = ref<Headers>([
  { title: 'Código', key: 'code', align: 'center' },
  { title: 'Nombre', key: 'name', align: 'start' },
  { title: 'Cantidad', key: 'quantity', align: 'end' },
  { title: 'Unidad', key: 'unit', align: 'start' },
  { title: 'Laboratorio', key: 'laboratory', align: 'start' },
  { title: 'Tema', key: 'topic', align: 'start' },
  { title: 'Funcional', key: 'functional', align: 'center' },
  { title: 'Marca', key: 'brand', align: 'start' },
  { title: 'Acciones', key: 'actions', align: 'center' }
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
  await nextTick()
  await getItems()
})

function itemClick(e: Event, row: { item: PhysicsItem, internalItem: any }) {
  // console.log()
  // don't expand if click on action buttons with id "not-click"
  const target = e.target as HTMLElement;
  if (target.closest('#not-click') !== null) {
    return
  }

  const rowKey: string = row.internalItem.key

  if (expandedRow.value.includes(rowKey)) {
    expandedRow.value = []
    return
  }

  expandedRow.value = [rowKey]

  // if (expandedRow.value.length > 1) {
  //   expandedRow.value.shift()
  // }
}

function editItem() {
  console.log('edit')
}

function deleteItem() {
  console.log('delete')
}
</script>

<style scoped>
.carousel-item {
  opacity: .6;
  transition: .3s ease all;
}

.carousel-item:hover {
  opacity: 1;
  cursor: pointer;
}

.drawer {
  z-index: 99999 !important;
}
</style>