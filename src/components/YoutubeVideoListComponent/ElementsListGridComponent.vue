<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  items: Array,
  uniqueField: String,
  itemComponent: Object,
  itemProps: Object,
  containerStyling: Array,
  itemStyling: Array,
  deleteStyling: Array,
  deleteable: Boolean,
  deleteComponent: Object,
  noItemsComponent: Object,
});
const emit = defineEmits(["click", "delete"]);

function handleEvent(event, data) {
  emit(event, data);
}
</script>
<template>
  <div>
    <div class="no-items" v-if="!items.length">
      <component :is="noItemsComponent"></component>
    </div>
    <div class="list-container" v-if="items.length">
      <div v-for="item in items" :key="item.id" :class="containerStyling">
        <div>
          <component
            :is="itemComponent"
            v-bind="itemProps"
            :data="item"
            :class="itemStyling"
            @click="
              () => {
                handleEvent('click', item);
              }
            "
          ></component>
        </div>
        <div
          class="delete-handler"
          v-if="deleteable"
          @click="
            () => {
              handleEvent('delete', item);
            }
          "
        >
          <component :is="deleteComponent" :class="deleteStyling"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.list-container
    width 100%
    margin 0 auto
    display flex
    flex-wrap wrap
</style>
