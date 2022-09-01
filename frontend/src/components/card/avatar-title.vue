<template>
  <div v-bind:class="`card-avatar-title-${type}-${location}`">
    <div class="avatar">
      <i v-bind:class="`fas fa-${icon}`"></i>
    </div>
    <div class="avatar-content">
      <div class="title">
        {{ mainTitle }}
      </div>
      <div v-if="subTitle !== ''" class="sub-title">
        {{ subTitle }}
      </div>
    </div>
    <div class="avatar-right">
      <i class="fas fa-ellipsis-v"></i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    type: {
      type: String,
      default: "first",
    },
    mainTitle: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "users",
    },
    location: {
      type: String,
      default: "center",
    },
  },
})
export default class CardAvatarTitle extends Vue {}
</script>
