<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["click"]);
const props = defineProps({
  circle: Boolean,
  type: String,
  noborder: Boolean,
  icon: Boolean,
});
function clickEvent() {
  emit("click");
}
</script>
<template>
  <div
    :class="[
      { circle: circle, noborder: noborder, icononly: icon },
      type ? type : '',
      'button-base',
    ]"
    @click="clickEvent"
  >
    <slot></slot>
  </div>
</template>
<style lang="stylus">
.button-base
  width auto
  height auto
  padding 10px
  display flex
  align-items center
  justify-content center
  cursor pointer

/* estilos segun flags */
.circle
  border-radius 100%
.noborder
  border none !important
.icononly .gg-icon
  transform: scale(2)

/* tipos de botones */
.primary
  background #136ae4
  border 1px solid #136ae4
  color white
.secondary
  background white
  border 1px solid #136ae4
  color #136ae4
</style>
