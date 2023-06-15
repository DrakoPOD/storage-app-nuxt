<template>
  <div class="container">
    <div>
      <input type="file" @change="onFileChange" />
    </div>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" v-model="item.name" placeholder="Nombre" name="name" />
      </div>
      <div class="form-group">
        <label for="description">Descripción</label>
        <input type="text" v-model="item.description" placeholder="Descripción" name="description" />
      </div>
      <div class="form-group">
        <label for="quantity">Cantidad</label>
        <input type="number" v-model="item.quantity" placeholder="Cantidad" name="quantity" />
      </div>
      <div class="form-group">
        <label for="cost">Costo</label>
        <input type="number" v-model="item.cost" placeholder="Costo" name="cost" />
      </div>
      <div class="form-group">
        <label for="addedDate">Fecha de adquisición</label>
        <input type="date" placeholder="Fecha de adquisición" name="addedDate" @input="(event) => {
          addDate(event, item.addedDate)
        }" />
      </div>
      <div class="form-group">
        <label for="brand">Marca</label>
        <input type="text" v-model="item.brand" placeholder="Marca" name="brand" />
      </div>
      <div>
        <div class="form-group">
          <label for="manufacturer">Fabricante</label>
          <select name="manufacturer" v-model="item.manufacturer" placeholder="Fabricante" @change="selectedOption">
            <option v-for="manufacturer in manufacturerList" :key="manufacturer._id?.toString()">
              {{ manufacturer.name }}
            </option>
            <option value="addManufacturer">Añadir fabricante</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="category">Categoría</label>
        <input type="text" v-model="item.category" placeholder="Categoría" name="category" />
      </div>
      <div class="form-group">
        <label for="laboratory">Laboratorio</label>
        <select v-model="item.laboratory" name="laboratory" placeholder="laboratorio">
          <option value="biology">Biología</option>
          <option value="chemistry">Química</option>
          <option value="physics">Física</option>
        </select>
      </div>
      <div class="form-group">
        <label for="topic">Tema</label>
        <input type="text" v-model="item.topic" placeholder="Tema" name="topic" />
      </div>
      <div class="form-group">
        <label for="experiments">Experimentos</label>
        <input type="text" v-model="item.experiments" placeholder="Experimentos" name="experiments" />
      </div>
      <div class="form-group">
        <label for="storageCondition">Condición de almacenamiento</label>
        <input type="text" v-model="item.storageCondition" placeholder="Condición de almacenamiento"
          name="storageCondition" />
      </div>
      <div class="form-group">
        <label for="functional">Funcional</label>
        <input type="checkbox" v-model="item.functional" placeholder="Funcional" name="functional" />
      </div>
      <div class="form-group">
        <label for="broken">Roto</label>
        <input type="checkbox" v-model="item.broken" placeholder="Roto" name="broken" />
      </div>
      <template v-if="item.broken">
        <div class="form-group">
          <label for="brokenDescription">Descripción de rotura</label>
          <input type="text" v-model="item.brokenDescription" placeholder="Descripción de rotura"
            name="brokenDescription" />
        </div>
        <div class="form-group">
          <label for="brokenDate">Fecha de rotura</label>
          <input type="date" placeholder="Fecha de rotura" name="brokenDate" @input="(event) => {
            addDate(event, item.brokenDate!)
          }" />
        </div>
        <div class="form-group">
          <label for="brokenBy">Roto por</label>
          <input type="text" v-model="item.brokenBy" placeholder="Roto por" name="brokenBy" />
        </div>
      </template>
      <div class="form-group">
        <button type="submit">Enviar</button>
      </div>
    </form>

  </div>
</template>

<script setup lang="ts">
import { Manufacturer, PhysicsItem } from '@/types/item';

const manufacturerList = ref<Manufacturer[]>([])

const item = ref<PhysicsItem>({
  name: '',
  description: '',
  quantity: 0,
  cost: 0,
  addedDate: new Date(),
  brand: '',
  manufacturer: {},
  category: '',
  laboratory: '',
  topic: '',
  experiments: [],
  storageCondition: {},

  functional: true,
  broken: false,
  brokenDescription: '',
  brokenDate: new Date(),
  brokenBy: '',
})


const submit = async () => {
  const res = await usePost('api/item', { db: { type: 'item' }, data: item })

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
  manufacturerList.value = data.value!
}

async function selectedOption(e: Event) {
  const target = e.target as HTMLSelectElement

  if (target.value === 'addManufacturer') {
    const openModal = useState<boolean>('open-modal', () => false)
    const modalName = useState<string>('modal', () => 'modal')
    modalName.value = 'add-manufacturer'
    openModal.value = true
    item.value.manufacturer = null
  }
}

async function onFileChange() {

}

const addDate = (event: Event, varDate: Date) => {
  varDate = (event.target as HTMLInputElement).valueAsDate!
}

onMounted(() => {
  getManufacturers()
})
</script>

<style scoped>
form {
  width: 94%;
  margin: 0 auto;
  padding: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
</style>
