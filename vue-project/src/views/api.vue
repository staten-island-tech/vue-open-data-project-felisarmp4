<template>
  <div class="container">
    <businesscard v-for="(mon, index) in business" :key="mon.name" :business="mon" :id="index + 1" />
  </div>
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
</style>