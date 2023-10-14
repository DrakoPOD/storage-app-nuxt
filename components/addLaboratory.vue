<template>
  <v-btn>
    Nuevo Laboratorio
    <v-dialog persistent v-model="dialog" activator="parent">
      <v-card :disabled="submitting">
        <v-card-title>
          Add new laboratory
        </v-card-title>
        <v-card-text>
          <v-form ref="myForm">
            <v-row>
              <v-col cols="12" sm="8">
                <v-text-field :rules="rules.name" v-model="lab.name" label="Nombre"
                  placeholder="Laboratorio de biología"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field :rules="rules.code" v-model="lab.code" label="Código" placeholder="LAB-000"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="lab.teacher" label="Profesor a cargo" placeholder="Juan Pérez"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="lab.area" label="Área" placeholder="Biología"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="lab.building" label="Edificio" placeholder="Edificio 1"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="addLab">Añadir</v-btn>
          <v-btn @click="dialog = false">cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { VForm } from 'vuetify/components'

const dialog = ref(false);

const myForm = ref(VForm);

const teachers = ref<any>([])

const submitting = ref(false)

const lab = ref({
  name: '',
  code: '',
  teacher: null,
  area: null,
  building: null,
})

const rules = {
  name: [
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length >= 6) || 'Name must be less than 6 characters',
  ],
  code: [
    (v: string) => !!v || 'Code is required',
    (v: string) => (v && /[A-Z]{3}-\d{3}/.test(v)) || 'Code must match ABC-000 pattern',
  ]
}

async function getTeachers() {
  const { data, error } = await useFetch('/api/user/getUsers', { method: 'GET', watch: false })

  if (error.value) {
    console.log(error.value)
  } else {
    teachers.value = data.value
  }
}

onBeforeMount(async () => {
  console.log('mounted')
})

async function addLab() {
  if (submitting.value) return

  submitting.value = true

  if (!(await myForm.value.validate())) {
    console.log('invalid')
    return
  }
  const { data, error } = await useFetch('/api/laboratory/add-laboratory', {
    method: 'POST',
    body: lab,
    watch: false
  })
  if (error.value) {
    console.log(error.value)
    submitting.value = false
  } else {
    lab.value = {
      name: '',
      code: '',
      teacher: null,
      area: null,
      building: null,
    }
    console.log(data.value)
    submitting.value = false
    dialog.value = false
  }
}
</script>