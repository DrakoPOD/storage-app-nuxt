<template>
  <button @click="toggleTheme">
    <white-balance-sunny-icon size="28" />
    <moon-waning-crescent-icon size="28" />
    {{ dark ? 'Dark' : 'Light' }}
  </button>
</template>

<script setup lang="ts">
import WhiteBalanceSunnyIcon from 'vue-material-design-icons/WhiteBalanceSunny.vue'
import MoonWaningCrescentIcon from 'vue-material-design-icons/MoonWaningCrescent.vue'

const dark = useState('dark-theme')
const toggleTheme = () => {
  document.body.classList.toggle('dark')
  dark.value = document.body.classList.contains('dark')
  console.log(document.body.classList)
}

</script>

<style scoped></style>