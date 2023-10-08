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
onMounted(async () => {
  if (process.client) {
    const theme = useTheme();
    const storeTheme = useStorage('theme', { theme: 'light' }, localStorage)
    theme.global.name.value = storeTheme.value.theme;
  }
});

</script>

<style></style>