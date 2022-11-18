<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);
function closeModal() {
  emit("close");
}
</script>
<template>
  <transition name="modal">
    <div class="modal-overlay">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <button class="default-close-btn" @click="closeModal">X</button>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="content"> </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="stylus">
.modal-overlay
  position fixed
  z-index 9998
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.5)
  display table
  transition opacity 0.2s ease

.modal-wrapper
  display table-cell
  vertical-align middle

.modal-container
  width auto
  max-width min(1000px,70vw)
  margin 0px auto
  padding 20px 30px
  background-color #fff
  border-radius 10px
  box-shadow 0 2px 8px rgba(0, 0, 0, 0.33)
  transition all 0.3s ease
  font-family Helvetica, Arial, sans-serif

.modal-body
  margin 20px 0

.default-close-btn
  float right
  background none
  border none
  outline none
  font-size: 18px
  font-weight bold

.modal-enter
  opacity 0

.modal-leave-active
  opacity 0

.modal-enter .modal-container,
.modal-leave-active .modal-container
  -webkit-transform scale(1.2)
  transform scale(1.2)
</style>
