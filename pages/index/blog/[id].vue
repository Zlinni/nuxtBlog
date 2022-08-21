<template>
  <cate-tag v-if="!blogsLoading">
    <template #title>
      <h1 class="mb-2">{{ blogs.data?.title||'暂无' }}</h1>
      <div class="d-flex flex-column mb-2">
        <div class="d-flex">
          <v-icon>mdi-calendar-range</v-icon>
          <p>发表于{{ blogs.data?.date||'暂无' }}|</p>
          <v-icon>mdi-update</v-icon>
          <p>更新于{{ blogs.data?.updateTime||'暂无' }}|</p>
          <v-icon>mdi-clipboard-list-outline</v-icon>
          <p>{{ blogs.data?.categories[0]?.name||'暂无' }}</p>
        </div>
        <div class="d-flex justify-center">
          <v-icon>mdi-file-word-outline</v-icon>
          <p>字数总计:{{ blogs.data?.wordCount }}|</p>
          <v-icon>mdi-clock-outline</v-icon>
          <p>阅读时长:1分钟|</p>
          <v-icon>mdi-eye</v-icon>
          <p>阅读量:1</p>
        </div>
      </div>
    </template>
    <template #content>
      <v-card class="px-5">
        <div class="md-preview vuepress-theme" id="md-preview" v-html="blogs.postMd" ref="vHtml"></div>
      </v-card>
    </template>
    <template #bar>
      <v-card class="d-flex flex-column justify-start w-100 pa-10">
        <div class="d-flex align-center w-100">
          <v-icon size="large">mdi-format-list-bulleted-square</v-icon>
          <p class="text-h5 mb-2">目录</p>
          <div class="toc ml-auto text-h4"></div>
        </div>
        <div class="list d-flex flex-column w-100">
          <tree :root="item.root" :children="item.children" v-for="(item, index) in blogs.toc" :key="index" :depth="0"
            @click="scrollToToc(tocList[item.id])">
          </tree>
        </div>
      </v-card>
    </template>
  </cate-tag>
</template>
<script lang="ts" setup>
const blogApi = useBlogApi().value
const instance = getCurrentInstance();
const tocList = useTocList();
const scrollToToc = useScrollToToc();
const route = useRoute();

const { data: blogs, pending: blogsLoading } = await useNotLazyCustomFetch(
  blogApi.readPost.url,
  {
    method: blogApi.readPost.method,
    params: {
      abbrlink: route.params.id
    },
    transform(input: any): Post.ReadPostRes {
      return {
        ...input.data,
        toc: JSON.parse(input.data?.data?.toc)
      }
    },
    initialCache:false
  }
);

// const formatTime = (time: string): string => {
//   return time.split(" ")[0];
// }
const getElementTop = (element: any): number => {
  let actualTop: number = element.offsetTop;
  let current: any = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}
onMounted(() => {
  if (!blogsLoading.value) {
    
    let vnodeList = (instance.refs.vHtml as any).children
    for (const item of vnodeList) {
      const reg = /^H/;
      if (reg.test(item.tagName)) {
        tocList.value.push(getElementTop(item))
      }
    }
  }
});
</script>
<style lang="scss">
.textIndent {
  text-indent: 14px;
}

ul {
  list-style: none;
}

.toc {
  &::before {
    color: #a9a9a9;
    content: "32";
    font-size: 1.7rem;
    font-style: italic;
    position: absolute;
    right: 2.5rem;
    top: 2.3rem;
  }
}

.list {
  height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
