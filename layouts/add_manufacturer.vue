<template>
  <div class="container">
    <div>
      <input type="file" @change="onFileChange" />
    </div>
    <div class="formModal">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" v-model="manufacturer.name" placeholder="Nombre" name="name" />
      </div>
      <div class="form-group">
        <label for="description">Descripción</label>
        <input type="text" v-model="manufacturer.description" placeholder="Descripción" name="description" />
      </div>
      <div class="form-group">
        <label for="country">País</label>
        <input type="text" v-model="manufacturer.country" placeholder="País" name="country" />
      </div>
      <div class="form-group">
        <label for="city">Ciudad</label>
        <input type="text" v-model="manufacturer.city" placeholder="Ciudad" name="city" />
      </div>
      <div class="form-group">
        <label for="address">Dirección</label>
        <input type="text" v-model="manufacturer.address" placeholder="Dirección" name="address" />
      </div>
      <div class="form-group">
        <label for="phone">Teléfono</label>
        <input type="text" v-model="manufacturer.phone" placeholder="Teléfono" name="phone" />
      </div>
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input type="text" v-model="manufacturer.email" placeholder="Correo electrónico" name="email" />
      </div>
      <div class="form-group">
        <label for="website">Sitio web</label>
        <input type="text" v-model="manufacturer.website" placeholder="Sitio web" name="website" />
      </div>
      <div>
        <button @click="submit">Agregar</button>
        <button @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Manufacturer } from '@/types/item';

const file = ref<File | null>(null)

const uploading = ref(false)
const uploadProgress = ref(0)

const manufacturer = ref<Manufacturer>({
  name: '',
  description: '',
  country: '',
  city: '',
  address: '',
  phone: '',
  email: '',
  website: ''
})


const submit = async () => {
  const { data, error } = await useFetch('/api/manufacturer',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(manufacturer.value)
    }
  )

  if (error.value) {
    console.log(error)
    return
  }

  console.log(data.value)
}

const onFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  file.value = target.files?.[0] || null

  if (file.value) {
    uploading.value = true
    const result = await useUploadFile(file.value, '/api/uploadFile', uploadProgress)

    if (result) {
      // manufacturer.value.image = result
    }
  }
}

const close = () => {
  const openModal = useState('open-modal')
  openModal.value = false
}
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.container {
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 500px;
  max-height: 80%;
  margin: 0 auto;
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  overflow: auto;
}
</style>