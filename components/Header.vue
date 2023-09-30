<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleSide"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      My APP
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <ThemeMode />
  </v-app-bar>
</template>

<script setup lang="ts">
import MenuIcon from 'vue-material-design-icons/Menu.vue';

const openSide = useState('sideMenu', () => false);

const toggleSide = () => {
  openSide.value = !openSide.value;
}


</script>

<style scoped></style>