<template>
  <v-switch inset loading v-model="boolTheme" @change="toggleTheme">
    <template v-slot:loader>
      <v-icon size="small" color="black">
        {{ boolTheme ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
      </v-icon>
    </template>
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