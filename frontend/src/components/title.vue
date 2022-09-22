<template>
  <div class="main-title">
    <span>Smart City</span>
    <!-- <img src="/assets/suwon.png" alt="" /> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Title extends Vue {}
</script>

<style lang="scss" scoped>
.main-title {
  width: 100%;
  font-size: 3rem;
  margin: 0 0 30px 0;
  color: map-get($colors, primary);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  img {
    position: absolute;
    right: 0;
    top: -38px;
    width: 240px;
    height: 140px;
  }
}
</style>
