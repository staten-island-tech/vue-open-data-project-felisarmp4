<template>
  <div class="card">
    <h2>{{ business.name_of_business }}</h2>
    <a :href="business.business_website_or_other_url" target="_blank">vist business website</a>
    <h3>{{ id }}</h3>
  </div>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Single+Day&display=swap" rel="stylesheet">
</template>

<script setup>

const props = defineProps({
  business: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})

</script>

<style scoped>
.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
  width: 300px;
  padding: 10px;
  margin: 20px;
  text-align: center;
  box-shadow: 4px 4px 10px #00000073;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 4px solid #268b83;
  border-radius: 5px;
  background-color: #ffffff;
}

.card:hover{
  transform: scale(1.05);
  box-shadow: 6px 6px 15px #00000073;
}

.card {
  font-family: "Single Day", cursive;
  font-weight: 400;
  font-style: normal;
}
</style>