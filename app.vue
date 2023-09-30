<template>
  <v-app>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useStorage } from '@vueuse/core'

const theme = useTheme();

onMounted(() => {
  setTimeout(() => {
    const storeTheme = useStorage('theme', { theme: 'light' }, localStorage)
    theme.global.name.value = storeTheme.value.theme;
  }, 200);
})
</script>

<style></style>