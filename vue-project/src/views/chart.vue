<template>
  <div class="chart-container">
    <h1 class="header">business types in nyc</h1>
    <div class="button-wrapper">
      <RouterLink to="/">
        <button class="chart-btn">go back to cards</button>
      </RouterLink>
    </div>
    <svg ref="svgRef"></svg>
  </div>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Single+Day&display=swap" rel="stylesheet">
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const svgRef = ref(null)

onMounted(async () => {
  const response = await fetch('https://data.cityofnewyork.us/resource/5694-9szk.json')
  const data = await response.json()

  const counts = d3.rollup(data, v => v.length, d => d.which_type_of_business_is_this.trim().toLowerCase().replace(/,/g, ''))
  const dataset = Array.from(counts, ([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)

  const width = 600
  const height = 400
  const margin = { top: 20, right: 20, bottom: 100, left: 50 }

  const svg = d3.select(svgRef.value)
    .attr('width', width)
    .attr('height', height)

  const x = d3.scaleBand()
    .domain(dataset.map(d => d.type))
    .range([margin.left, width - margin.right])
    .padding(0.2)

  const y = d3.scaleLinear()
    .domain([0, 500])
    .range([height - margin.bottom, margin.top])

  svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'rotate(-35)')
    .style('text-anchor', 'end')
    .style('font-family', '"Single Day", cursive')
    .style('font-size', '14px')

  svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(10))
    .selectAll('text')
    .style('font-family', '"Single Day", cursive')
    .style('font-size', '14px')

  svg.selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('x', d => x(d.type))
    .attr('y', d => y(d.count))
    .attr('width', x.bandwidth())
    .attr('height', d => height - margin.bottom - y(d.count))
    .attr('fill', 'teal')
})
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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

.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.chart-btn {
  background-color: #008080;
  color: #000000;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
  font-family: "Single Day", cursive;
  cursor: pointer;
  transition: opacity 0.2s;
}

.chart-btn:hover {
  opacity: 0.8;
}
</style>