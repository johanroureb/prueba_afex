<script setup>
import { onMounted, ref, provide } from "vue";
import YoutubeProvider from "./providers/YoutubeProvider";
import FirebaseProvider from "./providers/FirebaseProvider";
import ActionBarComponent from "./components/ActionBarComponent.vue";
import VideoModalComponent from "./components/VideoModalComponent/VideoModalComponent.vue";
import ConfirmModalComponent from "./components/ConfirmModalComponent.vue";
import YoutubeVideoListComponent from "./components/YoutubeVideoListComponent/YoutubeVideoListComponent.vue";
import AlertComponent from "./components/AlertComponent.vue";

const errorDictionary = {
  invalid: "Enlace de video invalido.",
  repeated: "El video ya se encuentra en la base de datos.",
};

/**
 * Variables reactivas
 */
const videoList = ref([]);
const currentVideo = ref(null);
const showVideoModal = ref(false);
const showDeleteModal = ref(false);
const error = ref(null);
/**
 * declarar listado de videos como dependencia injectable
 */
provide("videoList", videoList);

/**
 * Establece el video presionado y abre modal
 * @param {YoutubeVideoItem} data
 */
let showVideo = (data) => {
  currentVideo.value = data;
  showVideoModal.value = true;
};
/**
 * Cerrar modal de video
 */
let closeModal = () => {
  showVideoModal.value = false;
  showDeleteModal.value = false;
};
/**
 * lanzar modal de eliminacion video de base de datos
 * @param {YoutubeVideoItem} data
 */
let initDeleteVideo = (data) => {
  currentVideo.value = data;
  showDeleteModal.value = true;
};
/**
 * eliminar video tras la confirmacion de usuario
 */
let deleteVideo = () => {
  showDeleteModal.value = false;
  FirebaseProvider.deleteVideo(currentVideo.value.id).then(() => {
    loadVideos();
  });
};
/**
 * Añadir video luego de validaciones
 * @param {String} videoId 
 */
let addVideo = (videoId) => {
  YoutubeProvider.getVideo(videoId).then((rawData) => {
    FirebaseProvider.addVideo(videoId, rawData.data).then(() => {
      loadVideos();
    });
  });
};
/**
 * Mostrar errores de validacion
 * @param {String} err 
 */
let errorHandler = (err) => {
  error.value = err;
  setTimeout(() => {
    error.value = null;
  }, 2000);
};
/**
 * Cargar videos desde firebase
 */
let loadVideos = () => {
  FirebaseProvider.getVideos().then(
    (data) => {
      videoList.value = data.docs.map((x) => x.data());
    },
    (err) => {
      console.log(err);
    }
  );
};
/**
 * Cargar videos al inicio
 */
onMounted(() => {
  loadVideos();
});
</script>

<template>
  <div id="app">
    <div class="container-fluid">
      <div id="bar-container">
        <h3>Añadir nuevo video</h3>
        <ActionBarComponent
          @addVideo="addVideo"
          @error="errorHandler"
        ></ActionBarComponent>
        <AlertComponent v-if="error" class="alert" type="error">{{
          errorDictionary[error]
        }}</AlertComponent>
      </div>
    </div>
    <div class="container-fluid">
      <div id="list-container">
        <YoutubeVideoListComponent
          @videoClick="showVideo"
          @videoDelete="initDeleteVideo"
        ></YoutubeVideoListComponent>
      </div>
    </div>
    <VideoModalComponent
      v-if="showVideoModal"
      @close="closeModal"
      :videoData="currentVideo"
    ></VideoModalComponent>
    <ConfirmModalComponent
      v-if="showDeleteModal"
      @close="closeModal"
      @confirm="deleteVideo"
    ></ConfirmModalComponent>
  </div>
</template>

<style lang="stylus">
@import "styles/base.styl"
div#list-container
  width 100%
div#bar-container
  width 100%
.alert
  margin-top 20px
</style>
