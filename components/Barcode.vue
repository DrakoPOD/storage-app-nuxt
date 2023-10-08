<template>
  <select>
    <option v-for="types in barcodeTypes" :value="types">{{ types }}</option>
  </select>
  <svg ref="myCode"></svg>
</template>

<script setup lang="ts">
import JsBarcode from 'jsbarcode';

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
})

const myCode = ref<HTMLElement | null>(null);

type BarcodeType = "CODE128" | "CODE128A" | "CODE128B" | "CODE128C" | "EAN13" | "EAN8" | "UPC" | "CODE39" | "ITF14" | "ITF" | "MSI" | "MSI10" | "MSI11" | "MSI1010" | "MSI1110" | "pharmacode";


var barcodeTypes = [
  "CODE128",
  "CODE128A",
  "CODE128B",
  "CODE128C",
  "EAN13",
  "EAN8",
  "UPC",
  "CODE39",
  "ITF14",
  "ITF",
  "MSI",
  "MSI10",
  "MSI11",
  "MSI1010",
  "MSI1110",
  "pharmacode"
];

const options = {
  format: "CODE128",
  displayValue: true,
  fontSize: 18,
  width: 3,
  height: 100,
  textMargin: 0,
  margin: 0,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  background: "#ffffff",
  lineColor: "#000000",
  flat: true,
};

onMounted(() => {
  if (props.modelValue === "") {
    JsBarcode(myCode.value!, "0000000000000", { ...options, lineColor: "#ff0000" });
  } else {
    JsBarcode(myCode.value!, props.modelValue, options);
  }
});

watch(() => props.modelValue, (newVal) => {
  if (newVal === "") {
    JsBarcode(myCode.value!, "0000000000000", { ...options, lineColor: "#ff0000" });
    return;
  };
  JsBarcode(myCode.value!, props.modelValue, options);
});

</script>