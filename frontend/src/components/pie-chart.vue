<template>
  <div class="pie-chart" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as d3 from "d3";

@Component({})
export default class PieChart extends Vue {
  public getZoneText(zone: string) {
    if (zone === "a") {
      return "수원시장";
    } else if (zone === "b") {
      return "통닭거리 남";
    } else if (zone === "c") {
      return "통닭거리 북";
    } else if (zone === "d") {
      return "공방거리";
    } else if (zone === "e") {
      return "화성행궁광장";
    } else {
      return "";
    }
  }

  mounted() {
    const el: HTMLElement = this.$refs["wrapper"] as HTMLElement;
    const width: number = el.clientWidth;
    const height: number = el.clientHeight;
    const margin: number = 45;

    const radius = Math.min(width, height) / 2 - margin;

    const svg: any = d3
      .select(el)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const data = { a: 15, b: 25, c: 27, d: 10, e: 23 };

    const color = d3
      .scaleOrdinal()
      .domain(["a", "b", "c", "d"])
      .range(["#13e6af", "#2baadf", "#907cb9", "#ebc20e", "#FF7043"]);

    const pie = d3
      .pie()
      .sort(null)
      .value((d: any) => d.value);

    const data_ready = pie(d3.entries(data) as any);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const pieEl = svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => color(d.data.key))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("cursor", "pointer")
      .style("opacity", 0.7)
      .on("mouseover", () => {
        pieEl.style("opacity", 1);
        LineEls.attr("stroke-width", 3);
      })
      .on("mouseout", () => {
        pieEl.style("opacity", 0.7);
        LineEls.attr("stroke-width", 1);
      });

    const LineEls = svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", (d: any) => {
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });

    const labelEls = svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .attr("fill", "#ced4da")
      .text((d: any) => `${d.data.key.toUpperCase()} Zone`)
      .attr("transform", (d: any) => {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", (d: any) => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });

    const labelDetailEls = svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .attr("fill", "#ced4da")
      .text((d: any) => `${this.getZoneText(d.data.key)}`)
      .attr("transform", (d: any) => {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        pos[1] = pos[1] + 20;
        return `translate(${pos})`;
      })
      .style("text-anchor", (d: any) => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  }
}
</script>

<style lang="scss" scoped>
.pie-chart {
  width: 100%;
  height: 300px;
}
</style>
