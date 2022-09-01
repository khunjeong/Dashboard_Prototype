<template>
  <div class="map-com-wrapper">
    <div style="width: 100%; height: 100%" ref="map"></div>
    <div
      style="
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      "
      ref="place"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as d3 from "d3";
import * as topojson from "topojson";
import SummaryModal from "./../modal/summary.vue";

const [Lat, Lon] = [127.016463, 37.278781];

@Component({})
export default class Map extends Vue {
  public daumMapInit() {
    try {
      const element: HTMLElement = this.$refs["map"] as HTMLElement;
      const kakao: any = (window as any).kakao;
      new kakao.maps.Map(element, {
        center: new (window as any).kakao.maps.LatLng(Lon, Lat),
        level: 3,
      });
    } catch (e) {}
  }

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

  async placesInit() {
    try {
      const element: Element = this.$refs["place"] as Element;
      const width: number = element.clientWidth;
      const height: number = element.clientHeight;
      const svg = d3
        .select(element)
        .append("svg")
        .attr("class", "map-svg")
        .attr("width", width)
        .attr("height", height);
      const places = svg.append("g");
      const projection = d3
        .geoMercator()
        .center([Lat, Lon])
        .scale(4500000)
        .translate([width / 2, height / 2]);
      const data = await d3.csv("/assets/device.csv");
      const placeEls = places.selectAll("circle").data(data).enter();
      console.log("tttttt", placeEls);
      placeEls
        .append("text")
        .attr("class", "strong")
        .attr("dx", function (d: any) {
          return projection([d.lon, d.lat])[0] - 40;
        })
        .attr("dy", function (d: any) {
          return projection([d.lon, d.lat])[1] + 10;
        })
        .text(
          (d: any) => `${d.name.toUpperCase()} ${this.getZoneText(d.name)}`
        );
      const circles = placeEls
        .append("circle")
        .attr("class", function (d: any) {
          return d.name;
        })
        .attr("cx", function (d: any) {
          return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d: any) {
          return projection([d.lon, d.lat])[1];
        })
        .on("click", (e) => {
          (this as any).$modal.open(SummaryModal, { name: e.name }, "up-down");
          console.log("event", e);
          console.log("event", e.name);
        });
      const repeat = () => {
        circles
          .transition()
          .delay((d: any, i: number) => 300 * i)
          .duration(2000)
          .attr("r", function (d: any) {
            return d.size;
          })
          .transition()
          .duration(2000)
          .attr("r", function (d) {
            return `${parseInt(d.size) + 30}`;
          })
          .on("end", () => {
            repeat();
          });
      };
      repeat();
    } catch (e) {
      console.error(e);
    }
  }

  async mounted() {
    try {
      this.daumMapInit();
      this.placesInit();
    } catch (e) {
      console.error("e", e);
    }
  }
}
</script>

<style lang="scss" scoped>
.map-com-wrapper {
  width: 100%;
  height: 928px;
  position: relative;
}
</style>
