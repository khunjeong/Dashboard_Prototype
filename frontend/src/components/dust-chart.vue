<template>
  <div class="dust-chart-wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as d3 from "d3";

@Component({})
export default class DustChart extends Vue {
  async mounted() {
    try {
      const el: HTMLElement = this.$refs["wrapper"] as HTMLElement;
      const width: number = 475 - 70;
      const height: number = 200 - 30;
      const margin: any = { top: 10, right: 20, bottom: 20, left: 50 };
      const svg = d3
        .select(el)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "line-chart")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const fineDustData = await d3.csv("/assets/fine_dust.csv");
      const ultraFineDustData = await d3.csv("/assets/ultrafine_dust.csv");

      const formatTime: any = d3.timeFormat("%m-%d");
      const x = d3
        .scaleTime()
        .domain([new Date("2021-05-28"), new Date("2021-06-03")])
        .range([0, width]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(formatTime));

      const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

      const yLeftG = svg.append("g").call(d3.axisLeft(y));

      const fineDustPath = svg
        .append("path")
        .datum(fineDustData)
        .attr("fill", "none")
        .attr("stroke", "#D4E157")
        .attr("stroke-width", 3)
        .attr("cursor", "pointer")
        .attr("d", (d: any) => {
          const result: any = d3
            .line()
            .x((d: any) => {
              return x(new Date(d.x));
            })
            .y((d: any) => y(d.y))(d);
          return result;
        })
        .on("mouseover", () => {
          fineDustPath.transition().attr("stroke-width", 9);
          yLeftG.attr("class", "fine-dust");
        })
        .on("mouseout", () => {
          fineDustPath.transition().attr("stroke-width", 5);
          yLeftG.attr("class", "");
        });

      const ultraFineDustPath = svg
        .append("path")
        .datum(ultraFineDustData)
        .attr("fill", "none")
        .attr("stroke", "#FFA726")
        .attr("stroke-width", 3)
        .attr("cursor", "pointer")
        .attr("d", (d: any) => {
          console.log("ddd", d);
          const result: any = d3
            .line()
            .x((d: any) => {
              return x(new Date(d.x));
            })
            .y((d: any) => y(d.y))(d);
          return result;
        })
        .on("mouseover", () => {
          ultraFineDustPath.transition().attr("stroke-width", 9);
          yLeftG.attr("class", "ultra-fine-dust");
        })
        .on("mouseout", () => {
          ultraFineDustPath.transition().attr("stroke-width", 5);
          yLeftG.attr("class", "");
        });
    } catch (e) {
      console.log("error", e);
    }
  }
}
</script>

<style lang="scss" scoped>
.dust-chart-wrapper {
  width: 100%;
  height: 200px;
}
</style>
