<script setup>
import { defineProps } from "vue";
const props = defineProps({ videoId: String, autoplay: Boolean });
</script>
<template>
  <iframe
    id="youtube-frame"
    :src="
      'https://www.youtube.com/embed/' +
      videoId +
      (autoplay ? '?autoplay=1' : '')
    "
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>
<style lang="stylus">
#youtube-frame
  flex 1
  width 100%
</style>
