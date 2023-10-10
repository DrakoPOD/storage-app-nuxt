<template>
  <add-image />
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field :rules="[minChars]" v-model="item.name" placeholder="Ej. Sensor de temperatura" label="Nombre" />

        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="item.description" placeholder="Ej. Sensor que mide temperatura del agua"
            label="Descripción" />
        </v-col>
      </v-row>
      <v-row>

        <v-col cols="12" sm="6">
          <v-text-field type="number" v-model="item.quantity" placeholder="Ej. 42" label="Cantidad" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field type="number" v-model="item.cost" placeholder="Ej. 1500" label="Costo" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field type="date" v-model="item.addedDate" placeholder="20/2/2020" label="Fecha de adquisición" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field type="text" v-model="item.brand" placeholder="Ej. Vernier" label="Marca" />

        </v-col>
        <v-col cols="12" sm="6">
          <v-select name="manufacturer" v-model="item.manufacturer" @update:model-value="val => selectedOption(val)"
            label="Fabricante" :items="manufacturerList" item-title="name" item-value="_id">
          </v-select>

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="item.category" placeholder="Ej. Sensor" label="Categoría" />

        </v-col>
        <v-col cols="12" sm="6">
          <v-select v-model="item.laboratory" :items="labList" item-title="name" item-value="value" label="Laboratorio">
          </v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field v-model="item.topics" placeholder="Ej. Cinemática" label="Tema" />

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">

          <v-sheet v-for="experiment, i in item.experiments" class="ma-1">
            <v-container>
              <v-row>

                <v-col cols="11">
                  <v-text-field v-model="item.experiments[i].title" placeholder="Ej. Pista inclinada"
                    label="Experimentos" />
                </v-col>
                <v-col cols="1" class="d-flex justify-center align-center">
                  <v-btn icon="mdi-delete" color="error" @click="item.experiments.splice(i, 1)">

                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="item.experiments[i].description" label="Descripción"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <v-btn @click="item.experiments.push({ title: '', description: '' })">
            Agregar experimento
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="item.storageConditions" placeholder="Ej. Seco, oscuro, ventilado"
            label="Condiciones de almacenamiento" />

        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox v-model="item.functional" label="Funcional" />
          <v-checkbox v-model="item.broken" label="Roto" />

        </v-col>
      </v-row>
      <v-row>

      </v-row>
      <template v-if="item.broken">

        <v-row>
          <v-col cols="12">
            <v-text-field v-model="item.brokenDescription" placeholder="Ej. Se rompió una pieza al caer"
              label="Descripción de rotura" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field type="datetime" label="Fecha de rotura" />

          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="item.brokenBy" placeholder="Ej. Marco Antonio" label="Roto por" />
          </v-col>
        </v-row>
      </template>
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
import { Manufacturer, PhysicsItem } from '@/types/item';

const manufacturerList = ref<Manufacturer[]>([])
const openModal = ref(false)

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

const item = ref<PhysicsItem>({
  name: '',
  description: '',
  quantity: 0,
  cost: 0,
  addedDate: (new Date()).getTime(),
  lastUpdated: (new Date()).getTime(),
  brand: null,
  manufacturer: null,
  category: '',
  laboratory: '',
  topics: [],
  experiments: [],
  storageConditions: null,
  tags: [],

  functional: true,
  broken: false,
  brokenDescription: '',
  brokenDate: null,
  brokenBy: '',

  image: null,
  serialNumber: '',
  code: '',
})

const file = ref<File[] | undefined>();
const myImg = ref<string | undefined>('https://cdn.vuetifyjs.com/images/parallax/material.jpg');
const { minChars } = useInputVuetify;

const submit = async () => {
  const { valid, errors } = useValidateItem(item.value)
  if (!valid) {
    console.log(errors)
    console.log('invalid')
    return
  }
  const res = await usePost('api/item/addItem', { db: { type: 'item' }, data: item.value })

  console.log(res)
}

const getManufacturers = async () => {
  const { data, error } = await useFetch<Manufacturer[]>('api/allManufacturer',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      server: false
    }

  )

  if (error.value) {
    console.log(error)
    return
  }
  console.log(data.value)
  manufacturerList.value = [{ name: 'Añadir fabricante', _id: '0' } as Manufacturer, ...data.value || []]
}

function selectedOption(val: string) {
  if (val === '0') {
    openModal.value = true
    item.value.manufacturer = null
  }
}

async function onFileChange(event: any) {
  if (!file.value || file.value.length > 0) {
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

const addDate = (event: Event, varDate: Date) => {
  varDate = (event.target as HTMLInputElement).valueAsDate!
}

onMounted(() => {
  getManufacturers()
})
</script>

<style scoped></style>
