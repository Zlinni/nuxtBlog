<template>
  <div class="myblog">
    <div class="myblog_left">
      <v-card class="mx-auto mb-5" v-for="item in data.blogs" :key="item._id">
        <div class="d-flex flex-no-wrap">
          <v-avatar class="ma-3" size="125" rounded="0">
            <v-img :src="tranverseImg(item.cover)"></v-img>
          </v-avatar>
          <v-card-header>
            <div>
              <div class="text-overline mb-1">{{ item.title }}</div>
              <div class="text-h6 mb-1">this is a blog</div>
              <NuxtLink to="/blogs/1">/blog/1</NuxtLink>
              <div class="text-caption">hah</div>
            </div>
          </v-card-header>
        </div>
      </v-card>
    </div>
    <div class="myblog_right">
      <v-card width="400" class="mb-5">
        <template v-slot:title> 标签分类 </template>
        <template v-slot:text> This is content </template>
      </v-card>
      <v-card width="400">
        <template v-slot:title> 热门博客 </template>
        <template v-slot:text> This is content </template>
      </v-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface blogs {
  _id: string;
  title: string;
  tags: string[];
  categories: string[];
  cover: string;
  abbrlink: string;
  date: string;
  top?: string;
}
interface data {
  blogs: blogs;
}
const { data } = await useAsyncData("blogs", () =>
  $fetch("http://localhost:5000/blog/getList")
);
// const blog<blogs> = data.blogs;
const tranverseImg = (imgUrl) => {
  return "../." + imgUrl;
};
</script>

<style lang="scss">
.myblog {
  display: flex;
  justify-content: space-between;
  .myblog_left {
    flex: 0 0 65%;
  }
}
</style>
