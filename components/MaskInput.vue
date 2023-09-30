<template>
  <div>

    <input ref="mask" v-model="value" :type="typeInput" :class="isValid ? 'valid' : 'invalid'"
      :required="required"><span></span>
  </div>
</template>

<script setup lang="ts">
// TODO: Remove this dependency
import Inputmask from "inputmask";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  rawValue: {
    type: String,
    default: null,
  },
  maskValue: {
    type: String,
    default: null,
  },
  mask: {
    type: String,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  getRaw: {
    type: Boolean,
    default: false,
  },
  typeInput: {
    type: String,
    default: "text",
    validator: (val: string) => {
      return ["text", "password", "email", "number", 'textArea'].includes(val);
    },
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:modelValue", "update:rawValue", "update:maskValue", "valid"]);

interface IMask extends HTMLInputElement { inputmask: Inputmask.Instance };

const mask = ref<IMask>();
const im = ref<Inputmask.Instance>();

onMounted(() => {
  im.value = new Inputmask({
    mask: props.mask,
    definitions: {
      W: {
        validator: "[A-Za-z]",
        casing: "upper",
      },
      w: {
        validator: "[A-Za-z]",
        casing: "lower",
      },
      X: {
        validator: "[A-Za-z0-9]",
        casing: "upper",
      },
      x: {
        validator: "[A-Za-z0-9]",
        casing: "lower",
      },
      C: {
        validator: "[A-Za-z0-9]",
      },
    },
    placeholder: props.placeholder,
    showMaskOnHover: false,
    showMaskOnFocus: false,
    greedy: false,
    oncomplete: () => {
      if (mask.value?.inputmask) {
        // console.log(mask.value?.inputmask.unmaskedvalue())
      }
    },
  });
  im.value.mask(mask.value!);
});

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:rawValue", mask.value?.inputmask.unmaskedvalue());
    emit("update:maskValue", val);

    if (props.getRaw) {
      emit("update:rawValue", mask.value?.inputmask.unmaskedvalue());
    } else {
      emit("update:modelValue", val);
    }
  },
});

const isValid = computed(() => {
  if (!inputValidations[props.typeInput](value.value)) return false;
  return mask.value?.inputmask.isValid()
})

watch(
  () => props.mask,
  (newVal) => {
    mask.value?.inputmask?.option({ mask: newVal });
  }
);

onBeforeUnmount(() => {
  im.value?.remove();
});

watch(
  () => value,
  () => {
    if (mask.value?.inputmask) {
      emit("valid", isValid.value);
    }
  }
)
</script>

<style scoped>
input {
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  width: 200px;
  box-sizing: border-box;
  outline: none;
  transition: .3s;
}

.invalid {
  border-color: red;
}

.invalid+span::before {
  content: "✖";
  color: red;
  font-size: 20px;
}

.valid {
  border-color: green;
}
</style>