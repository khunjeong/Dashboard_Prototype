<template>
  <div class="environment-item" @click="click">
    <div class="environment-icon">
      <i v-bind:class="`fas fa-${icon}`"></i>
    </div>
    <div class="title">
      {{ title }}
    </div>
    <div class="data" ref="data"></div>
    <div class="unit">
      {{ unit }}
    </div>
    <div class="status">
      <div class="circle-wrapper">
        <div v-bind:class="`inner-${status}`"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { CountUp } from "countup.js";

@Component({
  props: {
    icon: {
      type: String,
      default: "thermometer-half",
    },
    title: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "success",
    },
  },
})
export default class EnvironmentItem extends Vue {
  @Watch("$props.value")
  onChangeValue(val: number, oldVal: number) {
    this.countup.update(val);
  }

  countup: any;

  mounted() {
    const el: HTMLElement = this.$refs["data"] as HTMLElement;
    const value: number = this.$props.value;
    this.countup = new CountUp(el, value, {
      duration: 2,
      decimalPlaces: 1,
    });
    this.countup.start();
  }

  public click() {
    this.$emit("click");
  }
}
</script>
