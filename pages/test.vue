<template>
  <div>
    <input type="file" @change="fileChange" />
    <button @click="uploadFile">Upload</button>
  </div>
  <button @click="fetchData">Fetch</button>

  <div>
    <Barcode v-model="value" />
  </div>

  <div>
    <ClientOnly fallback-tag="span" fallback="Loading on server...">
      <MaskInput mask="XXXX-XXXX-99" v-model="value" />
    </ClientOnly>
  </div>

  <button @click="upload">upload test</button>

  <br>
  <ClientOnly>
    <ThemeMode />
  </ClientOnly>
</template>

<script setup lang="ts">

const file = ref<File>();

const value = ref<string>('jhds-hduw-88');

const fileChange = (e: any) => {
  file.value = e.target.files[0];
};

const uploadFile = async () => {
  if (!file.value) return;
  const response = await useUploadFile(file.value, '/api/upload');
  console.log(response);
};

const fetchData = async () => {
  const response = await useFetch('/api/item', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    query: {
      name: 'asdsd'
    }
  });
  console.log(response);
};

const upload = async () => {
  const file = new File(['hello'], 'hello.jpg', { type: 'image/jpeg' });
  const response = await useUploadFile(file, '/api/upload');
  console.log(response);
};
</script>