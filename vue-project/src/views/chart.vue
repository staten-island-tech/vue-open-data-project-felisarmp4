<template>
  <div class="chart-container">
    <h1 class="header">business types in nyc</h1>
    <div class="button-wrapper">
      <RouterLink to="/">
        <button class="chart-btn">go back to cards</button>
      </RouterLink>
    </div>
    <svg ref="svgref"></svg>
    <h2 class="header">business type breakdown</h2>
    <svg ref="pieref"></svg>
    <div ref="tooltip" class="tooltip"></div>
  </div>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Single+Day&display=swap" rel="stylesheet">
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const svgref = ref(null)
const pieref = ref(null)
const tooltip = ref(null)

onMounted(async () => {
  const response = await fetch('https://data.cityofnewyork.us/resource/5694-9szk.json')
  const data = await response.json()

  const counts = d3.rollup(data, v => v.length, d => d.which_type_of_business_is_this.trim().toLowerCase().replace(/,/g, ''))
  const dataset = Array.from(counts, ([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)

  const width = 600
  const height = 400
  const margin = { top: 20, right: 20, bottom: 100, left: 50 }

  const svg = d3.select(svgref.value)
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

  // pie chart (only time ill use notes)

  const piewidth = 600
  const pieheight = 400
  const radius = Math.min(piewidth, pieheight) / 2 - 20

  const piesvg = d3.select(pieref.value)
    .attr('width', piewidth)
    .attr('height', pieheight)
    .append('g')
    .attr('transform', `translate(${piewidth / 2}, ${pieheight / 2})`)

  const colors = ['#008080', '#66b2b2', '#afdae0', '#006666']

  const color = d3.scaleOrdinal()
    .domain(dataset.map(d => d.type))
    .range(colors)

  const pie = d3.pie()
    .value(d => d.count)

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

  const labelarc = d3.arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius * 0.6)

  const tip = d3.select(tooltip.value)

  piesvg.selectAll('path')
    .data(pie(dataset))
    .join('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.type))
    .attr('stroke', 'white')
    .style('stroke-width', '2px')
    .style('cursor', 'pointer')
    .on('mouseover', (event, d) => {
      tip
        .style('opacity', 1)
        .html(`<strong>${d.data.type}</strong><br/>count: ${d.data.count}`)
    })
    .on('mousemove', (event) => {
      tip
        .style('left', (event.pageX + 12) + 'px')
        .style('top', (event.pageY - 28) + 'px')
    })
    .on('mouseout', () => {
      tip.style('opacity', 0)
    })

  piesvg.selectAll('text')
    .data(pie(dataset))
    .join('text')
    .attr('transform', d => `translate(${labelarc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('font-family', '"Single Day", cursive')
    .style('font-size', '11px')
    .style('fill', 'white')
    .text(d => d.data.count > 10 ? d.data.type : '')
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

.tooltip {
  position: fixed;
  background: #000000bf;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  font-family: "Single Day", cursive;
  font-size: 14px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
}
</style>