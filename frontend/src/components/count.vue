<template>
  <div class="count">
    <div class="data-wrapper" ref="data"></div>
    <div v-if="unit !== ''" class="unit">{{ unit }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { CountUp } from "countup.js";

@Component({
  props: {
    value: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: "",
    },
  },
})
export default class Count extends Vue {
  @Watch("$props.value")
  onChangeValue(val: number, oldVal: number) {
    this.countup.update(val);
  }

  countup: any;

  mounted() {
    const el: HTMLElement = this.$refs["data"] as HTMLElement;
    const value: number = this.$props.value;
    this.countup = new CountUp(el, value, { duration: 2 });
    this.countup.start();
  }
}
</script>
