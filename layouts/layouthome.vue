<template>
  <v-app class="vapp">
    <msgErrorVue />
    <v-navigation-drawer app :rail="useSlider().value" permanent @click="useSlider().value = false">
      <!-- -->
      <slot name="drawer"></slot>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
      <slot name="appbar"></slot>

    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main class="mainContainer">

      <!-- 给应用提供合适的间距 -->
      <v-container fluid class="pb-0">

        <!-- 如果使用 vue-router -->
        <slot />

      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import msgErrorVue from '~~/components/errorMsg/msgError.vue';
</script>

<style scoped lang="scss">
.vapp {
  height: 100vh;
}
.mainContainer{
  overflow-y: auto;
}

</style>