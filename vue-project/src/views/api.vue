<template>
  <div class="header">
    <h1>love your local business list</h1>
    <h2>businesses nominated for the love your local program</h2>
    <h3>(last upadetd since 2020)</h3>
  </div>
  <div class="container">
    <businesscard v-for="(biz, index) in business" :key="biz.name_of_business" :business="biz" :id="index + 1" />
  </div>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Single+Day&display=swap" rel="stylesheet">

</template>

<script setup>
import { ref, onMounted } from 'vue'
import businesscard from '@/components/businesscard.vue'
const business = ref([])
async function getbusiness() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/5694-9szk.json')
    const data = await response.json()
    business.value = data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getbusiness()
})
</script>

<style scoped>

.container {
  width: 80vw;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 30px;

  font-family: "Single Day", cursive;
  font-weight: 400;
  font-style: normal;
}

.header h1,
.header h2,
.header h3 {
  margin-top: 5px;
  margin-bottom:5px;
}

</style>