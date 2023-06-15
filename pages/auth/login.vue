<template>
  <div>
    <h1>You must login</h1>
    <form>
      <label for="name">Nombre</label>
      <input type="text" name="name" v-model="user.name" />
      <label for="email">e-mail</label>
      <input type="email" name="email" v-model="user.email" />
      <label for="password">Password</label>
      <input type="password" name="password" v-model="user.password" />
      <button @click="sendUser" :disabled="isSubmitting">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const user = ref({ name: "", email: "", password: "" });

const isSubmitting = ref(false);

async function sendUser() {
  console.log('sumiting')
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const { data, error } = await useFetch('/api/auth/register', { method: 'POST', watch: false, body: user.value })
    console.log(data.value, error.value);
  } catch (err) {
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

