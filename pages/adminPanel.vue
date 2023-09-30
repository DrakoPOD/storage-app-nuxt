<template>
  <v-card>
    <v-card-title>Users</v-card-title>
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Last session</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" key="email">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.permissions }}</td>
            <td>{{ user.lastSession }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

const users = ref([
  {
    name: 'John Doe',
    email: 'test@gmail.com',
    role: 'admin',
    permissions: ['create', 'read', 'update', 'delete'],
    lastSession: '2021-10-10 10:10:10'
  },
  {
    name: 'John Doe',
    email: 'data@test.com',
    role: 'user',
    permissions: ['read'],
    lastSession: '2021-10-10 10:10:10'
  },
  {
    name: 'John Doe',
    email: 'user@mail.com',
    role: 'user',
    permissions: ['read'],
    lastSession: '2021-10-10 10:10:10'
  }
]);
</script>