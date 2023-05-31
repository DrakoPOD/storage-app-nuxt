<template>
  <div class="containerTable">

    <table>
      <thead>

        <tr>
          <th v-for="header in sampleHeaders" :key="header.text">
            <div class="flex">

              <p>{{ header.text }}</p>
              <menu-down-icon :size="28" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="data in sampleData" :key="data.id">
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import MenuDownIcon from 'vue-material-design-icons/MenuDown.vue'
import MenuUpIcon from 'vue-material-design-icons/MenuUp.vue'

const sampleData = ref([
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Doe', age: 25 },
])
const sampleHeaders = ref([
  { text: 'ID', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Age', value: 'age' },
])
</script>

<style>
.containerTable {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  align-items: flex-start;

}

table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 95%;
  flex-shrink: 0;
}

th {
  background-color: #4caf50;
  color: white;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tbody>tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>