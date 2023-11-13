<template>
  <v-data-table :headers="headers" :items="Array.isArray(labs) ? labs : []" :loading="loading">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-icon>mdi-flask</v-icon>
          Laboratorios
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon="mdi-update" @click="getLaboratories">

        </v-btn>
        <add-laboratory v-model:dialog="dialog" v-model:lab="currentLab" @newLab="getLaboratories" :index="labIdx"
          @edited="changeLab" />
      </v-toolbar>
    </template>
    <template #item.code="{ item }">
      <pre>{{ item.code }}</pre>
    </template>
    <template #item.actions="{ item, index }">

      <v-row>
        <v-col cols="6">
          <v-btn color="success" @click="editLab(item, item._id, index)">
            <template #default>
              <v-icon>mdi-pencil</v-icon>
            </template>
          </v-btn>

        </v-col>
        <v-col cols="6">
          <v-btn color="error" @click="confirmDialog = true; labIdx = index">
            <template #default>
              <v-icon>mdi-delete</v-icon>
            </template>
          </v-btn>

        </v-col>
      </v-row>

    </template>
    <template #bottom></template>
  </v-data-table>
  <v-dialog v-model="confirmDialog" max-width="400" width="90%" :persistent="deleting">
    <v-card :loading="deleting" class="text-center">
      <template v-if="!errorDeleting && !successDelete">
        <v-card-text>
          <v-icon color="warning" size="100">mdi-alert</v-icon>
        </v-card-text>
        <v-card-text>
          ¿Está seguro que desea eliminar el laboratorio?
        </v-card-text>
      </template>
      <template v-if="errorDeleting">
        <v-card-text>
          <v-icon color="error" size="100">mdi-close-circle</v-icon>
        </v-card-text>
        <v-card-text>
          Ha ocurrido un error al eliminar el laboratorio
        </v-card-text>
      </template>
      <template v-if="successDelete">
        <v-card-text>
          <v-icon color="success" size="100">mdi-check-circle</v-icon>
        </v-card-text>
        <v-card-text>
          Laboratorio eliminado con éxito
        </v-card-text>
      </template>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="confirmDialog = false">Cancelar</v-btn>
        <v-btn color="error" @click="deleteLab" :disabled="errorDeleting || successDelete || deleting">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { VDataTable } from 'vuetify/components'

const headers = ref([
  { title: 'Código', key: 'code' },
  { title: 'Nombre', key: 'name' },
  { title: 'Profesor a cargo', key: 'teacher' },
  { title: 'Área', key: 'area' },
  { title: 'Cantidad de artículos', key: 'qtyItems' },
  { title: 'Edificio', key: 'building' },
  { title: 'Acciones', key: 'actions' }
])

const labs = ref<any>([])

const dialog = ref(false)
const confirmDialog = ref(false)

const loading = ref(true)
const deleting = ref(false)

const errorDeleting = ref(false)
const successDelete = ref(false)

const currentLab = ref<any>(null)
const labIdx = ref<number | null>(null);

(async () => {
  await getLaboratories()
})();

async function getLaboratories() {
  loading.value = true

  const { data, error, } = await useFetch('/api/laboratory/get-all-laboratories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    server: false,

    cache: 'no-cache',
    watch: false,
  })

  if (error.value) {
    console.log(error.value)
  } else if (data.value) {
    labs.value = data.value
  }
  loading.value = false

  return
}

async function editLab(lab: any, id: string, index: number) {
  labIdx.value = index
  currentLab.value = lab
  dialog.value = true
}

async function deleteLab() {
  deleting.value = true
  const { data, error } = await useFetch('/api/laboratory/delete-laboratory', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    query: { id: labs.value[labIdx.value!]._id },
  })
  deleting.value = false
  if (error.value) {
    errorDeleting.value = true
    console.log(error.value)
  } else {
    successDelete.value = true
    console.log(data.value)
    labs.value.splice(labIdx.value!, 1)
    setTimeout(() => {
      confirmDialog.value = false
    }, 3000)
  }
}

async function changeLab(item: { index: number; lab: any }) {
  labs.value[item.index] = { ...labs.value[item.index], ...item.lab }
}

watch(confirmDialog, (val) => {
  if (val) {
    errorDeleting.value = false
    successDelete.value = false
  } else {
    labIdx.value = null
  }
})
onMounted(async () => {
  await nextTick()
  await getLaboratories()
})
</script>

<style scoped lang="scss">
.v-btn {
  min-width: 0;
}

.v-col {
  padding: 5px;
}
</style>