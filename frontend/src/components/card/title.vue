<template>
  <div class="card-title">
    <span>{{ title }}</span>
    <span class="more">
      <i class="fas fa-ellipsis-v"></i>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    title: {
      type: String,
      default: "",
    },
  },
})
export default class CardTitle extends Vue {}
</script>
