<template>
  <v-switch hide-details inset v-model="boolTheme" @change="toggleTheme" true-icon="mdi-weather-night"
    false-icon="mdi-weather-sunny">
  </v-switch>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useStorage } from '@vueuse/core'

const storeTheme = useStorage('theme', { theme: 'light' })
const theme = useTheme();



const boolTheme = computed(() =>
  theme.global.name.value == 'light' ? false : true
);

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark
    ? 'light'
    : 'dark';
  storeTheme.value.theme = theme.global.name.value;
}

</script>

<style scoped></style>