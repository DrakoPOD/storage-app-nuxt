<template>
  <v-dialog v-model="dialog" width="80%" persistent>
    <v-form ref="myForm">

      <v-card :disabled="isSubmitting">
        <v-card-text>

          <add-image label="Logo"></add-image>
          <v-text-field required v-model="manufacturer.name" placeholder="Nombre" label="Nombre"></v-text-field>
          <v-text-field v-model="manufacturer.address" placeholder="Dirección" label="Dirección"></v-text-field>
          <tel-input v-model="manufacturer.phone"></tel-input>
          <!-- <v-text-field v-model="manufacturer.phone" placeholder="Teléfono" label="Teléfono"></v-text-field> -->
          <v-text-field :rules="[emailMatch]" v-model="manufacturer.email" placeholder="Correo electrónico"
            label="Correo electrónico"></v-text-field>
          <v-text-field v-model="manufacturer.website" placeholder="Sitio web" label="Sitio web"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="submit">Agregar</v-btn>
          <v-btn @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <v-dialog v-model="isSubmitting" persistent width="auto">
      <v-card color="indigo">
        <v-card-text>
          Añadiendo fabricante...
          <v-progress-linear indeterminate></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script setup lang="ts">
import { VForm } from 'vuetify/components'
import type { Manufacturer } from '@/types/item';

import { validateManufacturer } from '../server/utils/validateServerSchema'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val)
})

const myForm = ref(VForm)

const file = ref<File | null>(null)

const uploading = ref(false)
const uploadProgress = ref(0)
const isSubmitting = ref(false)

const manufacturer = ref<Manufacturer>({
  name: '',
  address: '',
  phone: '',
  email: '',
  website: ''
})

const { emailMatch } = useInputVuetify;

const submit = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true

  // await delay(3000);

  const valid = await myForm.value.validate()
  isSubmitting.value = false

  if (!valid.valid) {
    isSubmitting.value = false
    return
  }

  const { data, error } = await useFetch('/api/manufacturer/addManufacturer',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: manufacturer.value,
      watch: false

    }
  )
  if (error.value) {
    console.log(error.value)
    isSubmitting.value = false
    return
  }
  if (data.value) {
    console.log(data.value)
    dialog.value = false
    isSubmitting.value = false
    return
  }
}
</script>

<style scoped></style>