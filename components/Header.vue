<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleSide"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      {{ appTitle }}
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <ThemeMode />
    <template #append>

      <UserMenu />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">


const openSide = useState('sideMenu', () => false);
const appTitle = useTitle()

const toggleSide = () => {
  openSide.value = !openSide.value;
}


</script>

<style scoped></style>