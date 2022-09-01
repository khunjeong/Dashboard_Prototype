<template>
  <div class="card" v-bind:style="[{ width: width }]">
    <slot name="title" />
    <slot name="body" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    width: {
      type: [String, Number],
      default: "100%",
    },
  },
})
export default class Card extends Vue {}
</script>
