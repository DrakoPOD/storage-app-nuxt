<template>
  <div class="modal" @click="clickOutside">
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

const clickOutside = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    const openModal = useState('open-modal')
    openModal.value = false
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
