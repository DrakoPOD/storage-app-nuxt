<template>
  <div class="sideBar" :style="style">
    <ul>
      <li>list 1</li>
      <li>list 2</li>
      <li>list 3</li>
      <li>list 4</li>
      <li>list 5</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const openSide = useState('sideMenu', () => false);

const style = computed(() => {
  console.log('toggle')
  return {
    width: openSide.value ? '150px' : '0px',
  }
})
</script>

<style>
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
</style>