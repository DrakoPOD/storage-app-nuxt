<template>
  <div class="sideBar" :style="style">
    <nav>
      <NuxtLink to="/" class="linkItem">
        Home
      </NuxtLink>
      <NuxtLink to="/itemList" class="linkItem">
        Inventario
      </NuxtLink>
      <NuxtLink to="addItemView" class="linkItem">
        Añadir
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const openSide = useState('sideMenu', () => false);

const style = computed(() => {
  return {
    width: openSide.value ? '150px' : '0px',
  }
})
</script>

<style scoped>
.sideBar {
  flex-shrink: 0;
  width: 0px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: .5s;
  overflow: hidden;
}

ul {
  width: 150px;
}

nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  justify-content: space-around;
}

.linkItem {
  text-decoration: none;
  color: black;
  padding: 5px;
  transition: .2s;
}
</style>