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
      <v-list-item nuxt to="/adminPanel" v-if="userSession.role == 0">
        <template v-slot:prepend>
          <v-icon icon="mdi-shield-account"></v-icon>
        </template>
        Admin
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'


const userSession = useUserSession();

const { mobile } = useDisplay();
const openSide = useState('sideMenu', () => !mobile.value);

</script>

<style scoped></style>
