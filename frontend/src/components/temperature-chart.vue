<template>
  <div class="temperature-chart-wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as d3 from "d3";
import moment from "moment";

@Component({})
export default class TemperatureChart extends Vue {
  async mounted() {
    try {
      const el: HTMLElement = this.$refs["wrapper"] as HTMLElement;
      const width: number = 475 - 90;
      const height: number = 200 - 30;
      const margin: any = { top: 10, right: 40, bottom: 20, left: 50 };
      const svg = d3
        .select(el)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "line-chart")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const temperatureData = await d3.csv("/assets/temperature.csv");
      const humidityData = await d3.csv("/assets/humidity.csv");

      const formatTime: any = d3.timeFormat("%m-%d");
      const x = d3
        .scaleTime()
        .domain([new Date("2021-05-28"), new Date("2021-06-03")])
        .range([0, width]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(formatTime));

      const y = d3.scaleLinear().domain([0, 40]).range([height, 0]);

      const yRight = d3.scaleLinear().domain([0, 100]).range([height, 0]);

      const yLeftG = svg.append("g").call(d3.axisLeft(y));

      const yRightG = svg
        .append("g")
        .attr("transform", `translate(${width}, 0)`)
        .call(d3.axisRight(yRight));

      const temperaturePath = svg
        .append("path")
        .datum(temperatureData)
        .attr("fill", "none")
        .attr("stroke", "#EF5350")
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
          temperaturePath.transition().attr("stroke-width", 9);
          yLeftG.attr("class", "temperature");
        })
        .on("mouseout", () => {
          temperaturePath.transition().attr("stroke-width", 5);
          yLeftG.attr("class", "");
        });

      const humidityRath = svg
        .append("path")
        .datum(humidityData)
        .attr("fill", "none")
        .attr("stroke", "#42A5F5")
        .attr("stroke-width", 5)
        .attr("cursor", "pointer")
        .attr("d", (d: any) => {
          const result: any = d3
            .line()
            .x((d: any) => {
              return x(new Date(d.x));
            })
            .y((d: any) => yRight(d.y))(d);
          return result;
        })
        .on("mouseover", () => {
          humidityRath.transition().attr("stroke-width", 9);
          yRightG.attr("class", "humidity");
        })
        .on("mouseout", () => {
          humidityRath.transition().attr("stroke-width", 5);
          yRightG.attr("class", "");
        });
    } catch (e) {
      console.log("error", e);
    }
  }
}
</script>

<style lang="scss" scoped>
.temperature-chart-wrapper {
  width: 100%;
  height: 200px;
}
</style>
