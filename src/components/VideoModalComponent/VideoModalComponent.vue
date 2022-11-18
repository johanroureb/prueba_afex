<script setup>
import { defineEmits, defineProps } from "vue";
import ModalComponent from "../ModalComponent.vue";
import VideoThumbComponent from "./VideoThumbComponent.vue";

const emit = defineEmits(["close"]);
const props = defineProps(["videoData"]);
function closeModal() {
  emit("close");
}
</script>
<template>
  <ModalComponent @close="closeModal" class="video-modal">
    <template v-slot:content>
      <div class="container">
        <div class="thumb-zone col">
          <VideoThumbComponent :data="videoData"></VideoThumbComponent>
        </div>
        <div class="info-zone col">
          <h4>{{ videoData?.snippet?.title }}</h4>
          <span id="description">{{ videoData?.snippet?.description }}</span>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>
<style lang="stylus" scoped>
#description
  height 30vh
  display block
  overflow-x hidden
  overflow-y auto
  word-break break-word
</style>
<style lang="stylus">
.video-modal > .modal-wrapper > .modal-container
  max-width 1000px

@media only screen and (max-width 1100px)
  .video-modal > .modal-wrapper > .modal-container
    max-width 80vw !important
</style>
