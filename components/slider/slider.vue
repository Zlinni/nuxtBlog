<template>
  <div>
    <v-list class="overflow-hidden">
      <v-list-item :prepend-avatar="avatarImg" :title="userName" subtitle="john@vuetifyjs.com">
        <template v-slot:append>
          <v-btn size="small" variant="text" icon="mdi-chevron-left" @click.stop="toggleRail"></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav class="overflow-hidden">
      <v-list-subheader>菜单</v-list-subheader>
      <v-list-item v-for="(item, i) in menus" :key="i" :value="item" active-color="primary" :to="item.path">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title style="margin-left: 20px" v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
    <div class="switch d-flex w-100">
      <div class="mx-auto">
        <v-switch v-model="themeSwitch" hide-details></v-switch>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
onMounted(() => {
  avatarImg.value = useTransImg(useCookie('avatar').value ?? '../../img/head/waku.png')
  userName.value = useCookie('userName').value ?? 'Guest'
  // 默认进入第一个
  const route = useRoute();
  const router = useRouter();
  if (route.path === '/') {
    router.push('/home');
  }
})
const theme = useTheme()
let themeSwitch = ref<boolean>(false);
watch(themeSwitch, () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
})
// 切换左侧drawer
const toggleRail = (): void => {
  useSlider().value = !useSlider().value
}
const dynamicMenus = useMenus().value;
const menus = ref([
  { title: "首页", icon: "mdi-folder", path: "/home" },
  { title: "博客", icon: "mdi-account-multiple", path: "/blogs" },
  { title: "友链", icon: "mdi-star", path: "/links" },
  { title: "日志", icon: "mdi-history", path: "/logs" },
  // { text: "文章管理", icon: "mdi-book-cog-outline", to: "/cms-article" },
  // { text: "标签管理", icon: "mdi-tag-plus-outline", to: "/cms-tag" },
  // { text: "目录管理", icon: "mdi-playlist-plus", to: "/cms-category" },
  // { text: "用户管理", icon: "mdi-account-tie", to: "/user" },
]);
if (dynamicMenus.length > 0) {
  menus.value.push(...dynamicMenus)
}
let avatarImg = ref<string>('');
let userName = ref<string>('');


</script>

<style scoped>
.switch{
  position: absolute;
  bottom: 0;
}
</style>