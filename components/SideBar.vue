<template>
  <v-navigation-drawer expand-on-hover :rail="!mobile" v-model="openSide">
    <v-list nav>
      <v-list-item nuxt to="/" title="Home">
        <template v-slot:prepend>
          <v-icon icon="mdi-home"></v-icon>
        </template>

      </v-list-item>
      <v-list-item nuxt to="/itemList">
        <template v-slot:prepend>
          <v-icon icon="mdi-view-list"></v-icon>
        </template>
        Inventario
      </v-list-item>
      <v-list-item nuxt to="/addItemView">
        <template v-slot:prepend>
          <v-icon icon="mdi-package-variant-closed-plus"></v-icon>
        </template>
        Añadir
      </v-list-item>
      <v-list-item nuxt to="/laboratory">
        <template v-slot:prepend>
          <v-icon icon="mdi-flask"></v-icon>
        </template>
        Laboratorio
      </v-list-item>

      <v-list-item nuxt to="/test">
        <template v-slot:prepend>
          <v-icon icon="mdi-flask"></v-icon>
        </template>
        test
      </v-list-item>
      <v-list-item nuxt to="/adminPanel">
        <template v-slot:prepend>
          <v-icon icon="mdi-shield-account"></v-icon>
        </template>
        Admin
      </v-list-item>
    </v-list>
    <template v-slot:append>

      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-account"></v-icon>
          </template>
          Profile
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-cog"></v-icon>
          </template>
          Settings
        </v-list-item>
        <v-list-item @click="logout">
          <template v-slot:prepend>
            <v-icon icon="mdi-logout"></v-icon>
          </template>
          Logout
        </v-list-item>
      </v-list>

    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay();
const openSide = useState('sideMenu', () => !mobile.value);

async function logout() {
  console.log('logout')
  try {
    const { data, error } = await useFetch('/api/auth/logout', { method: 'POST', watch: false })
    navigateTo('/auth/login')
  } catch (err) {
    console.error(err);
  }
  // localStorage.removeItem('token');
  // navigateTo('/auth/login')
}
</script>

<style scoped></style>
