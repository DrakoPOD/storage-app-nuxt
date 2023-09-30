<template>
  <v-text-field :label="label" :type="typeInput" :value="maskValue"
    @input="maskValue = $event.target.value"></v-text-field>
</template>

<script setup lang="ts">
import IMask from 'imask';

const props = defineProps({
  label: {
    type: String,
    default: 'My input',
  },
  typeInput: {
    type: String,
    default: "input",
    validator: (val: string) => {
      return ["input", "password", "email", "number"].includes(val);
    },
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:modelValue", "update:rawValue", "update:maskValue", "valid"]);

const value = ref<string>('');

let masked = IMask.createMask({
  mask: '0000-0000-00',
  lazy: true,
  placeholderChar: '_'
});

const maskValue = computed({
  get: () => {
    return value.value;
  },
  set: (val: string) => {
    value.value = masked.resolve(val);
    emit('update:modelValue', value.value);
    emit('update:maskValue', value.value);
    emit('update:rawValue', masked.unmaskedValue);
  }
});
</script>