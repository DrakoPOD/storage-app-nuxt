<template>
  <v-dialog v-model="dialog" width="80%" persistent>
    <v-card>
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
  </v-dialog>
</template>

<script setup lang="ts">
import type { Manufacturer } from '@/types/item';

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

const file = ref<File | null>(null)

const uploading = ref(false)
const uploadProgress = ref(0)

const manufacturer = ref<Manufacturer>({
  name: '',
  address: '',
  phone: '',
  email: '',
  website: ''
})

const { emailMatch } = useInputVuetify;

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
}
</script>

<style scoped></style>