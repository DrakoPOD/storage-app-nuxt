<template>
  <v-menu v-model="menu">
    <template #activator="{ props }">
      <v-avatar size="36px" v-bind="props">
        <v-img v-if="userSession.profilePicture != null || userSession.profilePicture != undefined" alt="Avatar"
          :src="`assets/profile-pics/` + userSession.profilePicture + '.jpg'"></v-img>
        <v-icon v-else size="large" icon="mdi-account-circle"></v-icon>

      </v-avatar>
    </template>
    <v-card>
      <v-list>

        <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" :title="userSession.name"
          subtitle="Teacher"></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <template #prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template #prepend>
            <v-icon>mdi-cog</v-icon>
          </template>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <template #prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const menu = ref(false)

const userSession = useUserSession()

async function logout() {
  console.log('logout')
  try {
    const { data, error, status } = await useFetch('/api/auth/logout', { method: 'POST', watch: false })

    if (status.value === "success") {
      console.log('logout success')
      navigateTo('/auth/login')
    } else {
      console.log('logout failed')
      console.log(error.value)
    }
  } catch (err) {
    console.error(err);
  }
  // localStorage.removeItem('token');
  // navigateTo('/auth/login')
}
</script>