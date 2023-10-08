<template>
  <v-data-table disable-pagination :headers="headers" :items="users" multi-sort :loading="loadingUsers"
    class="elevation-1 mb-2">
    <template v-slot:item.role="{ value }">
      {{ value == 0 ? 'Admin' : 'User' }}
    </template>
    <template v-slot:item.permissions="{ item }">
      <v-chip v-for="permission in item.permissions" :key="permission" color="primary" dark>
        {{ permits[permission] }}
      </v-chip>
    </template>
  </v-data-table>

  <add-user-form />
</template>

<script setup lang="ts">
import {
  VDataTable
} from "vuetify/labs/VDataTable";
import { userFetched } from '@/types/user';
import Modal from "../../layouts/modal.vue";

const users = ref<userFetched[]>([]);
const loadingUsers = ref(true);

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Permissions', key: 'permissions' },
  { title: 'Last session', key: 'lastSession' },
];

const permits = ['Leer', 'Escribir', 'Eliminar'];
async function getUsers() {
  loadingUsers.value = true;

  const { data, error } = await useFetch<{ users: userFetched[] }>('/api/users/getUser', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }, query: {
      all: true
    }
  });



  if (error.value) {
    loadingUsers.value = false;

    console.log("something went wrong");
    console.log(error.value);
    return;
  }
  if (!data.value) {
    loadingUsers.value = false;

    console.log("something went wrong fetching data");
    return;
  }

  users.value = data.value.users;
  loadingUsers.value = false;
  console.log(data.value.users)
}


onMounted(async () => {
  getUsers();
});
</script>