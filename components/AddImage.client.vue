<template>
  <v-card>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6">
          <v-file-input prepend-icon="mdi-camera" v-model="file" accept="image/*" :label="label"></v-file-input>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img height="250" class="bg-grey-lighten-2" aspect-ratio="4/3" :src="myImg">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <p>No Image</p>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: FileList
  },
  label: {
    type: String,
    default: 'Imagen'
  }
})

const emits = defineEmits(['update:modelValue'])

const file = ref<File[] | undefined>();
const myImg = ref<string | undefined>('/images/No-image-available.png');

watch(file, (newVal) => {
  emits('update:modelValue', newVal)

  if (!newVal || newVal.length < 1) {
    myImg.value = '/images/No-image-available.png'
    return
  }
  const fr = new FileReader()

  fr.onload = function (event) {
    myImg.value = event.target?.result as string
  };
  fr.readAsDataURL(newVal[0])
})
</script>