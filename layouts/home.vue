<template>
<!-- App.vue -->

<v-app>
  <v-navigation-drawer app>
    <!-- -->
    <slot name="drawer"></slot>
  </v-navigation-drawer>

  <v-app-bar app>
    <!-- -->
    <slot name="appbar"></slot>

  </v-app-bar>

  <!-- 根据应用组件来调整你的内容 -->
  <v-main>

    <!-- 给应用提供合适的间距 -->
    <v-container fluid>

      <!-- 如果使用 vue-router -->
      <slot/>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>