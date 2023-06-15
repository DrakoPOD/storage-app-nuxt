<template>
  <header>
    <div class="iconWrapper">
      <menu-icon class="icon" :size="40" @click="toggleSide"></menu-icon>
    </div>
    Hello
  </header>
</template>

<script setup lang="ts">
import MenuIcon from 'vue-material-design-icons/Menu.vue';

const openSide = useState('sideMenu', () => false);

const toggleSide = () => {
  openSide.value = !openSide.value;
}
</script>

<style scoped>
header {
  width: 100%;
  height: 50px;
  background-color: aquamarine;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}



.linkItem:hover {
  color: white;
  background-color: black;
}

.iconWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  cursor: pointer;
  width: 40px;
  height: 40px;
  transition: .2s;
  border-radius: 50%;
  margin: auto;
}

.icon:hover {
  background-color: black;
  color: white;
}
</style>