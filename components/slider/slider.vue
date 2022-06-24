<template>
  <div>
    <v-list>
      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
        title="John Leider"
        subtitle="john@vuetifyjs.com"
      >
        <template v-slot:append>
          <v-list-item-avatar end>
            <v-btn size="small" variant="text" icon="mdi-menu-down"></v-btn>
          </v-list-item-avatar>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-subheader>菜单</v-list-subheader>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        active-color="primary"
        :to="item.to"
      >
        <v-list-item-avatar>
          <v-icon :icon="item.icon"></v-icon>
        </v-list-item-avatar>

        <v-list-item-title
          style="margin-left: 20px"
          v-text="item.text"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
const items = ref([
  { text: "首页", icon: "mdi-folder", to: "/" },
  { text: "博客", icon: "mdi-account-multiple", to: "/blogs" },
  { text: "友链", icon: "mdi-star", to: "/links" },
  { text: "日志", icon: "mdi-history", to: "/logs" },
]);
const selectedItem = ref<number>(0);
</script>
