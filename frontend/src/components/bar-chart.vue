<template>
  <div class="bar-chart-wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as d3 from "d3";

@Component({})
export default class BarChart extends Vue {
  async mounted() {
    const el: HTMLElement = this.$refs["wrapper"] as HTMLElement;
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = el.clientWidth - margin.left - margin.right;
    const height = el.clientHeight - margin.top - margin.bottom;

    const svg = d3
      .select(el)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const data = await d3.csv("/assets/bar_chart.csv");

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d: any) => d.Country))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .attr("font-size", "14px")
      .style("text-anchor", "end");

    const y = d3.scaleLinear().domain([0, 2000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    const bar = svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.Country) + 22)
      .attr("y", (d: any) => y(d.Value))
      .attr("width", 24)
      .attr("height", function (d: any) {
        return height - y(d.Value);
      })
      .attr("fill", "#81D4FA")
      .attr("cursor", "pointer")
      .attr("opacity", "0.6")
      .on("mouseover", () => {
        console.log("over!!!!");
        bar.attr("class", "bar-strong");
      })
      .on("mouseout", () => {
        bar.attr("class", "");
      });
  }
}
</script>

<style lang="scss" scoped>
.bar-chart-wrapper {
  width: 100%;
  height: 210px;
}
</style>
