<template>
  <v-row>
    <v-col md="2" ms="4">
      <v-autocomplete v-model="selectedCountry" :custom-filter="customFilter" :items="listCountries" item-value="code"
        item-title="number">
        <template v-slot:selection="{ item, index }">
          <span :class="item.raw?.flag"></span>
          <p>+{{ item.raw?.number }}</p>
        </template>
        <template #item="{ props, item, index }">
          <v-list-item density="compact" v-bind="props">
            <template v-slot:prepend>
              <span :class="item.raw?.flag"></span>
            </template>
            <template #title>
              <span>+{{ item.raw?.number }} - {{ item.raw?.name }} ({{
                item.raw?.native
              }})</span>
            </template>
          </v-list-item>
        </template>
      </v-autocomplete>
    </v-col>

    <v-col>
      <v-text-field :model-value="typedNumber" @update:model-value="(val) => (typedNumber = val)"></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import '/node_modules/flag-icons/css/flag-icons.min.css';

import { countries } from 'countries-list';

import {
  AsYouType,
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from 'libphonenumber-js/max';
import { emit } from 'process';

defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const number = ref({
  template: '',
  number: '',
  country: 'DO',
  national: '',
  international: '',
  URI: '',
  type: '',
  valid: false,
  possible: false,
});

const currentCountry = ref<keyof typeof countries>('DO');
const selectedCountry = ref<CountryCode>('DO');

await fetch('https://ipapi.co/json')
  .then((res) => res.json())
  .then((data) => (currentCountry.value = data.country_code))
  .catch((err) => console.log(err));

const country = ref<CountryCode>('DO');

const listCountries = ref([
  ...getCountries()
    .map((c: string) => {
      if (!countries[c as keyof typeof countries]) return undefined;

      let { name, native, languages } = countries[c as keyof typeof countries];

      const intlName = new Intl.DisplayNames(
        [countries[currentCountry.value].languages[0]],
        { type: 'region' }
      );

      const number = getCountryCallingCode(c as CountryCode);

      name = intlName.of(c)!;
      return {
        code: c,
        flag: `fi fi-${c.toLowerCase()}`,
        name,
        native,
        number,
      };
    })
    .filter((c: any) => c !== undefined)
    .sort((a: any, b: any) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }),
]);


const typedNumber = computed({
  get: () => {
    return number.value.national;
  },
  set: (e: string) => {
    const asYouType = new AsYouType(selectedCountry.value || 'DO');
    // const input = e.target as HTMLInputElement;
    const formatted = asYouType.input(e);

    const num = asYouType.getNumber();
    emits('update:modelValue', num?.number || '');

    if (!num) return;

    selectedCountry.value =
      (num.country as CountryCode) || currentCountry.value;

    number.value = {
      template: asYouType.getTemplate(),
      number: num.number || '-',
      country: num.country || '-',
      national: num.formatNational(),
      international: num.formatInternational(),
      URI: num.getURI(),
      type: num.getType()!,
      valid: num.isValid(),
      possible: num.isPossible(),
    };
  },
});

const customFilter = (itemTitle: string, queryText: string, item: any) => {
  const textOne = item.raw?.name.toLowerCase();
  const textTwo = item.raw?.native.toLowerCase();
  const textThree = item.raw?.number.toLowerCase();
  const textFour = item.raw?.code.toLowerCase();

  const searchText = queryText.toLowerCase();

  return (
    textOne.includes(searchText) ||
    textTwo.includes(searchText) ||
    textThree.includes(searchText) ||
    textFour.includes(searchText)
  );
};
onMounted(() => { });
</script>

<style scoped>
.fi {
  margin-right: 10px;
  min-width: 20px;
}
</style>
