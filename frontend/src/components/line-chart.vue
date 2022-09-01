<template>
  <div class="line-chart-wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as d3 from "d3";
import moment from "moment";
import _api from "./../services/api.service";

@Component({})
export default class LineChart extends Vue {
  async mounted() {
    try {
      const el: HTMLElement = this.$refs["wrapper"] as HTMLElement;
      const width: number = el.clientWidth - 90;
      const height: number = el.clientHeight - 30;
      const margin: any = { top: 10, right: 40, bottom: 20, left: 50 };
      const svg = d3
        .select(el)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "line-chart")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const data = await d3.csv("/assets/main_daily.csv");
      const realVisitor = await d3.csv("/assets/main_real.csv");
      const returnVisitorData = await d3.csv(`/assets/main_return.csv`);
      console.log("data", data);
      console.log("realVisitor", realVisitor);
      const visitor = await _api.getVisitorDatas();
      let dailyVisitor = visitor.filter((item) => item.mixture_id === 7)[0]
        .data;
      data.forEach((item) => {
        if (item.x === moment().format("YYYY-MM-DD")) {
          item.y = `${dailyVisitor}`;
        }
      });

      const formatTime: any = d3.timeFormat("%m-%d");
      const x = d3
        .scaleTime()
        .domain([new Date("2021-05-28"), new Date("2021-06-03")])
        .range([0, width]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(formatTime));

      const y = d3.scaleLinear().domain([50000, 300000]).range([height, 0]);

      const yRight = d3.scaleLinear().domain([0, 20000]).range([height, 0]);

      const yLeftG = svg.append("g").call(d3.axisLeft(y));

      const yRightG = svg
        .append("g")
        .attr("transform", `translate(${width}, 0)`)
        .call(d3.axisRight(yRight));

      const dailyPath = svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#ee9ca7")
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
          dailyPath.transition().attr("stroke-width", 9);
          yLeftG.attr("class", "daily");
        })
        .on("mouseout", () => {
          dailyPath.transition().attr("stroke-width", 5);
          yLeftG.attr("class", "");
        });

      const realPath = svg
        .append("path")
        .datum(realVisitor)
        .attr("fill", "none")
        .attr("stroke", "#ACB6E5")
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
          realPath.transition().attr("stroke-width", 9);
          yLeftG.attr("class", "real");
        })
        .on("mouseout", () => {
          realPath.transition().attr("stroke-width", 5);
          yLeftG.attr("class", "");
        });

      const returnVisitorRath = svg
        .append("path")
        .datum(returnVisitorData)
        .attr("fill", "none")
        .attr("stroke", "#00b09b")
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
          returnVisitorRath.transition().attr("stroke-width", 9);
          yRightG.attr("class", "return");
        })
        .on("mouseout", () => {
          returnVisitorRath.transition().attr("stroke-width", 5);
          yRightG.attr("class", "");
        });
    } catch (e) {
      console.log("error", e);
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart-wrapper {
  width: 100%;
  height: 210px;
}
</style>
