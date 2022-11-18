<script setup>
import { inject, defineEmits } from "vue";
import ElementsListGridComponent from "./ElementsListGridComponent.vue";
import VideoThumbComponent from "../VideoModalComponent/VideoThumbComponent.vue";
import DeleteButtonComponent from "./DeleteButtonComponent.vue";
import NoItemsComponent from "./NoItemsComponent.vue";
const videoList = inject("videoList");
const emit = defineEmits(["videoDelete", "videoClick"]);
function handleEvent(event, data) {
  emit(event, data);
}
</script>
<template>
  <ElementsListGridComponent
    :items="videoList"
    :item-component="VideoThumbComponent"
    :item-props="{ imageOnly: true, timestamp: true, deleteable: true }"
    :item-styling="['preview-thumb-item']"
    :container-styling="['col-3']"
    :delete-component="DeleteButtonComponent"
    :no-items-component="NoItemsComponent"
    deleteable
    @click="
      (d) => {
        handleEvent('videoClick', d);
      }
    "
    @delete="
      (d) => {
        handleEvent('videoDelete', d);
      }
    "
  >
  </ElementsListGridComponent>
</template>
<style lang="stylus">
.preview-thumb-item
    padding 20px
    background transparent
    flex-grow 1
    max-width 350px
</style>
