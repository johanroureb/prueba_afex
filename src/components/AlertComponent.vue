<script setup>
import { defineProps } from "vue";
const props = defineProps(["type"]);
</script>
<template>
  <div class="base-alert" :class="type">
    <slot></slot>
  </div>
</template>
<style lang="stylus" scoped>
.base-alert
  padding 15px
  font-size 12px

.info
  color white
  background #4091d7
.success
  color white
  background #2d884d
.error
  color white
  background #b34045
</style>
