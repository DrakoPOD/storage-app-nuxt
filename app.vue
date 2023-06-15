<template>
  <NuxtLayout name="modal" v-if="openModal">
    <NuxtLayout :name="modalName" />
  </NuxtLayout>
  <div id="wrapper">
    <SideBar />
    <div id="container">
      <Header />
      <NuxtPage id="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const modalName = useState<string>('modal', () => 'add-manufacturer')
const openModal = useState<boolean>('open-modal', () => false)
</script>

<style>
#__nuxt {
  width: 100%;
  height: 100%;
}

#wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

#container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#content {
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: auto;
}
</style>