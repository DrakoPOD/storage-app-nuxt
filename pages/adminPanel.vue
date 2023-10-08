<template>
  <v-card class="mb-2">
    <v-card-actions>
      <v-btn nuxt exact to="/adminPanel">inicio</v-btn>
      <v-btn nuxt to="/adminPanel/users">Usuarios</v-btn>
    </v-card-actions>
  </v-card>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["user-admin"]
});

</script>

<style scoped></style>