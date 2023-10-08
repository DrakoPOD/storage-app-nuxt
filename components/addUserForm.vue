<template>
  <v-dialog v-model="dialog" persistent min-width="70vw">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        add user
      </v-btn>
    </template>
    <v-card height="100%" width="100%">
      <v-card-title>
        Add New User
      </v-card-title>
      <v-card-text>
        <v-form :disabled="isSubmitting" ref="myForm">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field :rules="rules.name" v-model="userData.name" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field :rules="rules.lastName" v-model="userData.lastName" label="Last Name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field :rules="rules.email" v-model="userData.email" label="Email"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select :rules="rules.role" v-model="userData.role" :items="roles" item-title="text" item-value="value"
                  label="Role"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :rules="rules.permissions" v-model="userData.permissions" chips multiple :items="permissions"
                  item-title="text" item-value="value" label="Permisos"></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="addUser" :loading="isSubmitting">Add user</v-btn>
        <v-btn color="primary" variant="text" @click="dialog = false" :loading="isSubmitting">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { VForm } from 'vuetify/components';
import { Permission, Role, INewUser } from '@/types/user.d';

const myForm = ref(VForm)
const isSubmitting = ref(false)

const dialog = ref(false);

const userData = ref<INewUser>({
  name: '',
  lastName: '',
  profilePicture: null,
  email: '',
  role: 1,
  permissions: [],
})

const roles = ref([
  {
    text: 'Administrador',
    value: Role.ADMIN
  },
  {
    text: 'Usuario',
    value: Role.USER
  }
])

const permissions = ref([
  {
    text: 'Leer',
    value: Permission.READ
  },
  {
    text: 'Escribir',
    value: Permission.WRITE
  },
  {
    text: 'Eliminar',
    value: Permission.DELETE
  }
])

const rules = {
  email: [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    async (v: string) => {
      const { data, error } = await useFetch('/api/users/getUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }, query: {
          email: v,
          checkUserName: true,
        },
        watch: false
      })
      if (error.value) {
        if (error.value.statusCode === 409) {
          return 'Email already in use';
        }
        return true
      }
      return true
    },
    (v: string) => (v && v.length <= 255) || 'E-mail must be less than 255 characters'
  ],
  name: [
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 255) || 'Name must be less than 255 characters'
  ],
  lastName: [
    (v: string) => !!v || 'Last name is required',
    (v: string) => (v && v.length <= 255) || 'Last name must be less than 255 characters'
  ],
  role: [
    (v: string) => Number.isInteger(v) || 'Role is required',
  ],
  permissions: [
    (v: string) => !!v || 'Permissions are required',
    (v: array) => (v.length > 0) || 'At least one permission is required',
  ]
}

async function addUser() {
  isSubmitting.value = true;
  const { valid } = await myForm.value.validate();
  if (!valid) return isSubmitting.value = false;

  const { data, error } = await useFetch('/api/users/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, body: userData.value,
    watch: false

  });
  isSubmitting.value = false;
  if (error.value) {
    console.log(error.value)
  }
  if (data.value) {
    console.log(data.value)
    dialog.value = false;
  }
}
</script>