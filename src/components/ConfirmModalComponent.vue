<script setup>
import { defineEmits } from "vue";
import ModalComponent from "./ModalComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";

const emit = defineEmits(["confirm", "close"]);
function closeModal() {
  emit("close");
}
</script>
<template>
  <ModalComponent @close="closeModal" class="mini-modal">
    <template v-slot:content>
      <span>¿Seguro que quieres eliminar este video?</span>
    </template>
    <template v-slot:footer>
      <div class="action-container">
        <ButtonComponent type="secondary" class="action-btn" @click="closeModal"
          >Cancelar</ButtonComponent
        >
        <ButtonComponent
          type="primary"
          class="action-btn"
          @click="
            () => {
              emit('confirm');
            }
          "
          >Eliminar</ButtonComponent
        >
      </div>
    </template>
  </ModalComponent>
</template>
<style lang="stylus" scoped>
#description
  height 100%
  max-height 30vh
  display block
  overflow auto
.action-container
  flex 1
  display flex
  justify-content flex-end
.action-btn
  display flex
  padding 10px
  max-width 30%
  flex 1
  margin 10px
</style>
<style lang="stylus">
.mini-modal > .modal-wrapper > .modal-container
  max-width 500px !important
</style>
