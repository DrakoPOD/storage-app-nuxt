<template>
  <add-image />
  <v-form @submit.prevent="submit" :disabled="submitting">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field density="compact" :rules="[minChars]" v-model="item.name" placeholder="Ej. Sensor de temperatura"
            label="Nombre" />

        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field density="compact" v-model="item.description"
            placeholder="Ej. Sensor que mide temperatura del agua" label="Descripción" />
        </v-col>
      </v-row>
      <v-row>

        <v-col cols="12" sm="6">
          <v-select density="compact" v-model="item.category" :items="itemsTypes" item-value="key"
            label="Tipo de artículo" @update:modelValue="() => item.unitType = unitsTypesSelect[0].key">
            <template #item="{ props, item }">
              <v-list-item v-bind="props" :subtitle="item.raw.subtitle">
              </v-list-item>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field density="compact" type="number" v-model.number="item.cost" placeholder="Ej. 1500" label="Costo" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-select density="compact" v-model="item.unitType" :items="unitsTypesSelect" item-value="key" title="title"
            label="Tipo de cuantificación" @update:modelValue="() => item.unit = unitsSelect[0]"></v-select>
        </v-col>
        <v-col cols="6" sm="4">
          <v-text-field density="compact" type="number" v-model.number="item.quantity" placeholder="Ej. 42"
            label="Cantidad" />
        </v-col>
        <v-col cols="6" sm="4">
          <v-select density="compact" v-model="item.unit" :items="unitsSelect" label="Unidad"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field density="compact" type="date" v-model="item.acquisitionDate" placeholder="20/2/2020"
            label="Fecha de adquisición" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field density="compact" type="text" v-model="item.brand" placeholder="Ej. Vernier" label="Marca" />

        </v-col>
        <v-col cols="12" sm="6">
          <v-select density="compact" name="manufacturer" v-model="item.manufacturer" label="Fabricante"
            :items="manufacturerList" item-title="name" item-value="_id">
            <template v-slot:prepend-item>
              <v-list-item density="compact" title="Añadir fabricante" ripple @click="openModal = true">

              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field density="compact" v-model="item.category" placeholder="Ej. Sensor" label="Categoría" />

        </v-col>
        <v-col cols="12" sm="6">
          <v-select density="compact" v-model="item.laboratory" :items="labList" item-title="name" item-value="value"
            label="Laboratorio">
          </v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-sheet v-if="item.topics.length < 1">
            <v-container class="d-flex justify-center align-center">
              <p>Sin temas</p>
            </v-container>
          </v-sheet>
          <v-sheet v-else v-for="topics, i in item.topics">
            <v-container>
              <v-row>
                <v-col cols="11">
                  <v-text-field density="compact" v-model="item.topics[i]" placeholder="Ej. Cinemática" label="Tema" />
                </v-col>
                <v-col cols="1" class="d-flex justify-center align-center">
                  <v-btn icon="mdi-delete" color="error" @click="item.topics.splice(i, 1)">

                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
        <v-col cols="12" class="d-flex justify-center align-center">
          <v-btn @click="item.topics.push('')">
            Agregar tema
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-sheet v-if="item.experiments.length < 1">
            <v-container>
              <v-row>
                <v-col class="d-flex justify-center align-center">
                  <p>Sin experimentos</p>
                </v-col>

              </v-row>
            </v-container>
          </v-sheet>
          <v-sheet v-for="experiment, i in item.experiments" class="ma-1">
            <v-container>
              <v-row>

                <v-col cols="11">
                  <v-text-field density="compact" v-model="item.experiments[i].title" placeholder="Ej. Pista inclinada"
                    label="Experimentos" />
                </v-col>
                <v-col cols="1" class="d-flex justify-center align-center">
                  <v-btn icon="mdi-delete" color="error" @click="item.experiments.splice(i, 1)">

                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-text-field density="compact" v-model="item.experiments[i].description"
                    label="Descripción"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
        <v-col cols="12" class="d-flex justify-center align-center">
          <v-btn @click="item.experiments.push({ title: '', description: '' })">
            Agregar experimento
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-checkbox hide-details density="compact" v-model="needStorage" label="Condiciones de almacenamiento"
                @update:model-value="(val) => val ? item.storageConditions = storageCondition : item.storageConditions = null">
              </v-checkbox>
            </v-card-text>
            <template v-if="needStorage">
              <v-card-text>
                Temperatura
              </v-card-text>
              <v-card-item>

                <v-row>
                  <v-col cols="5">
                    <v-text-field density="compact" type="number" v-model.number="storageCondition.temperature.min"
                      placeholder="Ej. 20" label="Mínima" />
                  </v-col>
                  <v-col cols="5">
                    <v-text-field density="compact" type="number" v-model.number="storageCondition.temperature.max"
                      placeholder="Ej. 30" label="Máxima" />
                  </v-col>
                  <v-col cols="2">
                    <v-select v-model="storageCondition.temperature.unit" density="compact" :items="Units.temperature"
                      label="Unidad">
                    </v-select>
                  </v-col>
                </v-row>
              </v-card-item>
              <v-card-item>
                <v-textarea label="Precauciones"></v-textarea>
              </v-card-item>
            </template>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn type="submit" block>Enviar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

  <add-manufacturer v-model="openModal" />
</template>

<script setup lang="ts">
import moment from 'moment';
import { useStorage } from '@vueuse/core';

import type { Manufacturer, EnumItemType, INewItem, StorageConditions } from '@/types/item';

const manufacturerList = ref<Manufacturer[]>([])
const openModal = ref(false)

const needStorage = ref(false)

const submitting = ref(false)

const labList = ref([
  {
    name: 'Biología',
    value: '1'
  },
  {
    name: 'Química',
    value: '2'
  },
  {
    name: 'Física',
    value: '3'
  }
])

const cleanStorageCondition = (): StorageConditions => {
  return {
    temperature: {
      min: 0,
      max: 100,
      unit: 'degC'
    },
    humidity: {
      min: 0,
      max: 100,
    },
    light: 0,
    pressure: {
      min: 0,
      max: 100,
    },
    caution: '',
    protection: [],
  }
}

const cleanItem = (): INewItem => {
  return {
    name: '',
    description: '',
    category: 'SEN',
    quantity: 0,
    unit: 'unit',
    unitType: 'unit',
    cost: 0,
    acquisitionDate: moment().format('YYYY-MM-DD'),
    brand: null,
    manufacturer: null,
    laboratory: Laboratories.BIOLOGY,
    topics: [],
    experiments: [],
    storageConditions: null,
    tags: [],
    expiryDate: null,
  }
}

const storageCondition = useStorage('storage-condition', cleanStorageCondition())
const item = useStorage('form-item', cleanItem())

const unitsTypesSelect = computed(() => ItemQuantityTypes[item.value.category])

const unitsSelect = computed(() => Units[item.value.unitType])

const file = ref<File[] | undefined>();
const myImg = ref<string | undefined>('https://cdn.vuetifyjs.com/images/parallax/material.jpg');
const { minChars } = useInputVuetify;

const submit = async () => {
  if (submitting.value) return;
  submitting.value = true
  const { valid, errors } = useValidateItem(item.value)
  if (!valid) {
    console.log(errors)
    console.log('invalid')
    return
  }
  const { data, error } = await useFetch('api/item/addItem', { method: 'POST', body: item.value, watch: false })

  if (error.value) {
    console.log(error.value)
    return
  }
  if (data.value) {
    console.log(data.value)
  }
  submitting.value = false
}

const itemsTypes: Array<{ title: string, subtitle?: string, key: EnumItemType }> = [
  { title: 'Orgánico', subtitle: 'Materia orgánica', key: ItemTypes.BIOLOGICAL },
  { title: 'Químico', subtitle: 'Compuestos químicos (Cloro, Agua, ...)', key: ItemTypes.CHEMICAL },
  { title: 'Consumible', subtitle: 'Productos de usos limitados (Fósforos, Guantes desechables, ...)', key: ItemTypes.CONSUMABLE },
  { title: 'Sensor', subtitle: 'Sensor de Temperatura, Tester, ...', key: ItemTypes.SENSOR },
  { title: 'Protección', subtitle: 'Gafas, Guantes, Batas', key: ItemTypes.SAFETY },
  { title: 'Herramienta', subtitle: 'Taladro, Martillo, Destornillador...', key: ItemTypes.TOOL },
  { title: 'Electrónico', subtitle: 'Arduino, RaspBerry Pi, circuitos, ...', key: ItemTypes.ELECTRONICS },
  { title: 'Computadora', subtitle: 'Laptops, Desktops, calculadoras, ...', key: ItemTypes.COMPUTER },
  { title: 'Mueble', subtitle: 'Sillas, Mesas, Escritorio', key: ItemTypes.FURNITURE },
  { title: 'Limpieza', subtitle: 'Trapero, Escoba, Aspirador', key: ItemTypes.CLEANING },
  { title: 'Otro', subtitle: '', key: ItemTypes.OTHER },
  // { title: '', key:},
]

const getManufacturers = async () => {
  const { data, error } = await useFetch<Manufacturer[]>('/api/manufacturer/allManufacturer',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      server: false
    }

  )

  if (error.value) {
    console.log(error.value)
  }
  if (data.value) {
    console.log(data.value)
    manufacturerList.value = data.value
  }
}

async function onFileChange(event: any) {
  if (!file.value || file.value.length < 1) {
    console.log('not file')
    myImg.value = 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'
    return
  }
  console.log(file.value[0])
  const fr = new FileReader()

  fr.onload = function (event) {
    myImg.value = event.target?.result as string
  };
  fr.readAsDataURL(file.value[0])
}


onMounted(async () => {
  await nextTick();
  await getManufacturers()
})
</script>

<style scoped></style>
