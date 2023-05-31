<template>
  <header>
    <div class="iconWrapper">
      <menu-icon class="icon" :size="40" @click="toggleSide"></menu-icon>
    </div>
    <nav>

      <NuxtLink to="/" class="linkItem">
        Home
      </NuxtLink>

      <NuxtLink to="/itemList" class="linkItem">
        Inventario
      </NuxtLink>

      <NuxtLink to="/" class="linkItem">
        Home
      </NuxtLink>

    </nav>
    Hello
  </header>
</template>

<script setup lang="ts">
import MenuIcon from 'vue-material-design-icons/Menu.vue';

const openSide = useState('sideMenu', () => false);

const toggleSide = () => {
  openSide.value = !openSide.value;
  console.log(openSide.value);
}
</script>

<style>
header {
  width: 100%;
  height: 50px;
  background-color: aquamarine;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

nav {
  display: flex;
  justify-content: center;
  flex-direction: row;
  list-style: none;
  justify-content: space-around;
}

.linkItem {
  text-decoration: none;
  color: black;
  padding: 5px;
  transition: .2s;
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