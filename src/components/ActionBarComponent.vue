<script setup>
import { ref, defineEmits, inject } from "vue";
import ValidationProvider from "../providers/ValidationProvider";
import ButtonComponent from "./ButtonComponent.vue";
/**
 * eventos a emitir
 */
const emit = defineEmits(["addVideo"]);

/**
 * reactivas
 */
const youtubeLink = ref(null);
const videoList = inject("videoList");

function validateLink() {
  let videoId = ValidationProvider.parseYoutubeId(youtubeLink.value);
  if (videoId) {
    /**
     * revisar duplicado
     */
    let counter = videoList.value.filter((x) => {
      console.log(x.id, videoId);
      return x.id == videoId;
    }).length;
    if (!counter) {
      emit("addVideo", videoId);
      youtubeLink.value = "";
    } else {
      emit("error", "repeated");
    }
    return;
  }
  emit("error", "invalid");
}
</script>
<template>
  <div class="action-bar-container">
    <input type="text" placeholder="Enlace del video" v-model="youtubeLink" />
    <ButtonComponent type="primary" @click="validateLink"
      >Añadir</ButtonComponent
    >
  </div>
</template>
<style lang="stylus">
.action-bar-container
  display flex
  flex 1
.action-bar-container input
  width 70%
  flex 1
  border-radius 5px 0 0 5px
  border 1px solid #c9c7c7 !important
  outline none
  text-indent 10px
.action-bar-container .button-base
  width 100px
  border-radius 0 5px 5px 0
</style>
