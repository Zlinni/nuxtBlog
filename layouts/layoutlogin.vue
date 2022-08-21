<template>
  <v-app class="vapp">
    <msgErrorVue />
    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <!-- 给应用提供合适的间距 -->
      <v-container fluid>
        <!-- 如果使用 vue-router -->
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import msgErrorVue from '~~/components/errorMsg/msgError.vue';
</script>
<style scoped>
.vapp{
  position: relative;
  height:100vh;
}
</style>