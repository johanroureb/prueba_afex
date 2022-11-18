<script setup>
import { ref, defineEmits, defineProps, computed } from "vue";
import moment from "moment";
import ButtonComponent from "../ButtonComponent.vue";
import VideoComponent from "./VideoComponent.vue";
const emit = defineEmits(["click", "playClick", "deleteClick"]);
const props = defineProps({
  imageOnly: Boolean,
  deleteable: Boolean,
  timestamp: Boolean,
  data: Object,
});
const displayVideo = ref(0);
const humanTimestamp = computed(() => {
  if (props.data.contentDetails?.duration) {
    let ms = moment
      .duration(props.data.contentDetails?.duration)
      .asMilliseconds();
    return moment.utc(ms).format("mm:ss");
  }
  return "";
});

function toggleVideo() {
  displayVideo.value = 1;
}
function deleteVideo() {
  console.log(2132132);
}
</script>
<template>
  <div class="thumb-wrapper">
    <div class="thumb-container" v-if="!displayVideo">
      <div class="thumb-image-container">
        <img
          class="thumb-image"
          :src="data.snippet?.thumbnails?.medium?.url"
          alt="Imagen"
          @click="
            () => {
              emit('click');
            }
          "
        />
        <ButtonComponent
          @click="toggleVideo"
          class="play-button"
          circle
          noborder
          icon
          v-if="!imageOnly"
        >
          <i class="gg-icon gg-play-button"></i>
        </ButtonComponent>
        <div v-if="timestamp" class="timestamp">{{ humanTimestamp }}</div>
      </div>
    </div>
    <div class="video-container" v-if="displayVideo">
      <VideoComponent :video-id="data.id" autoplay></VideoComponent>
    </div>
  </div>
</template>
<style lang="stylus">
@import url('https://css.gg/play-button.css')
.thumb-image-container
  position relative
  flex 1
  justify-content center
  align-items center

.thumb-image
  width 100%

.thumb-wrapper
  height 100%
  background black

.thumb-container
  height 100%
  display flex
  justify-content center
  align-items center
.play-button
  color #fff
  max-width 40px
  width 40px
  height 40px
  background #f00
  margin 20% auto
  position absolute
  left calc(50% - 30px)
  top 0
.video-container
  flex 1
  flex-grow 1
  height 100%
  display flex
.timestamp
  width auto
  background #000000c4
  color white
  display flex
  align-items center
  justify-content center
  position absolute
  right 10px
  bottom 10px
  font-size 12px
  padding 2px 5px 2px 5px
</style>
