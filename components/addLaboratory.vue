<template>
  <v-btn @click="emits('update:dialog', true)" variant="outlined">
    <template #prepend>
      <v-icon size="25">mdi-flask-plus</v-icon>
    </template>
    Nuevo Laboratorio
    <v-dialog persistent v-model="props.dialog">
      <v-card :disabled="submitting">
        <v-card-title>
          {{ editing ? 'Editar laboratorio' : 'Nuevo laboratorio' }}
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
          <v-btn @click="pushLab">Guardar</v-btn>
          <v-btn @click="close()">cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { ILaboratory, INewLaboratory } from '@/types/laboratory';
import { VForm } from 'vuetify/components'

const props = defineProps({
  lab: {
    type: Object,
    default: null
  },
  dialog: {
    type: Boolean,
    default: false
  },
  index: {
    type: null,
    default: null
  }
})

const emits = defineEmits(['update:dialog', 'update:lab', 'edited', 'newLab'])

const editing = ref(false);

const myForm = ref(VForm);

const teachers = ref<any>([])

const submitting = ref(false)

const lab = ref<ILaboratory | INewLaboratory>({
  name: '',
  code: '',
  teacher: undefined,
  area: undefined,
  building: undefined,
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

watch(() => props.dialog, (value) => {
  if (value) {
    if (props.lab) {
      lab.value = {
        _id: props.lab._id,
        name: props.lab.name,
        code: props.lab.code,
        teacher: props.lab.teacher,
        area: props.lab.area,
        building: props.lab.building,
      }
      editing.value = true
    }
  }
  else {
    lab.value = {
      name: '',
      code: '',
      teacher: undefined,
      area: undefined,
      building: undefined,
    }
  }
})

onBeforeMount(async () => {

})


async function close() {
  editing.value = false
  emits('update:lab', null)
  emits('update:dialog', false)
}

async function pushLab() {
  if (submitting.value) return

  submitting.value = true

  if (!(await myForm.value.validate())) {
    console.log('invalid')
    return
  }


  const { data, error } = await useFetch(editing.value ? '/api/laboratory/update-laboratory' : '/api/laboratory/add-laboratory', {
    method: editing.value ? 'PUT' : 'POST',
    body: lab,
    watch: false
  })
  if (error.value) {
    console.log(error.value)
    submitting.value = false
  } else {
    if (editing.value) {
      emits('edited', { lab: lab.value, index: props.index })
    } else (
      emits('newLab')
    )
    console.log(data.value)
    submitting.value = false
    close()
  }
}
</script>