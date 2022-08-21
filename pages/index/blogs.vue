<template>
  <div class="myblog">
    <div class="myblog_left" v-show="!mdDataLoading">
      <v-card class="mb-5" v-for="item in mdData.data" :key="item._id" @click="$router.push('/blog/' + item.abbrlink)">
        <div class="d-flex flex-no-wrap pa-2">
          <v-img :src="useTransImg(item?.cover)" width="300" class="mr-2"></v-img>
          <div class="d-flex flex-column justify-start align-start">
            <div class="text-h5 mb-1">{{ item?.title||'标题开了小差~' }}</div>
            <div class="d-inline-flex align-center mb-5">
              <v-icon>mdi-calendar-range</v-icon>
              <p class="text-caption">发表于{{ item?.date||'暂无日期' }}|</p>
              <v-icon>mdi-update</v-icon>
              <p class="text-caption">更新于{{ item?.updateTime||'暂无时间' }}|</p>
              <v-icon>mdi-clipboard-list-outline</v-icon>
              <p class="text-caption">{{ item?.categories[0]?.name||'暂无目录' }}</p>
            </div>
            <p class="contentThree">{{ item?.intro }}</p>
          </div>
        </div>
      </v-card>
      <v-pagination v-if="mdData.totalPage > 0" v-model="getListParams.page" class="my-4" :length="mdData.totalPage"
        @update:modelValue="paginGetList"></v-pagination>
    </div>
    <div class="myblog_right">
      <v-card width="400" class="mb-5 pa-5" v-if="!tagLoading">
        <template v-slot:title>
          <v-icon class="mr-1">mdi-tag-outline</v-icon>标签分类
        </template>
        <v-btn variant="text" size="small" :color="item.color" v-for="(item, index) in tag.data" :key="index"
          @click="$router.push({ path: '/blog/tag', query: { tagName: item.name } })">{{ item.name }}
        </v-btn>
      </v-card>
      <v-card width="400" class="mb-5 pa-5" v-if="!lastestDataLoading">
        <template v-slot:title>
          <v-icon class="mr-1">mdi-update</v-icon>最近更新
        </template>
        <v-card class="mx-auto mb-5" v-for="item in lastestData.data" :key="item._id">
          <div class="d-flex align-center pl-1 pointer" style="height: 92px"
            @click="$router.push('/blog/' + item.abbrlink)">
            <v-img :src="useTransImg(item?.cover)" width="150" class="mr-2"></v-img>
            <div>
              <div class="text-overline mb-1 content">{{ item?.title }}</div>
              <div class="text-overline mb-1">{{ item?.updateTime }}</div>
            </div>
          </div>
        </v-card>
      </v-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
name: 'blogs'
definePageMeta({
  // layout: "layouthome",
  keepalive: true,
});
const blogApi = useBlogApi().value;
const getListParams = reactive<Common.UsualPaginParams>({
  page: 1,
  pageSize: 6
})
// 获取博客概要分页内容
const { data: mdData, pending: mdDataLoading, refresh: getList } = useLazyFetch(blogApi.getList.url, {
  method: blogApi.getList.method,
  params: getListParams,
  default: () => {
    return ref<Post.GetListRes>({
      totalPage: 0,
      count: 0,
      data: [],
    });
  },
  transform(input: any): Post.GetListRes {
    return {
      ...input.data
    };
  },
})
// 最近更新
const { data: lastestData, pending: lastestDataLoading } = useLazyFetch(
  blogApi.getLastestPost.url,
  {
    method: blogApi.getLastestPost.method,
    transform(input: any): Post.GetLastestPostRes {
      return {
        ...input.data
      }
    },
  }
);
// 获取标签
const { data: tag, pending: tagLoading, refresh: getTag } = useLazyFetch(blogApi.getTags.url, {
  method: blogApi.getTags.method,
  default: () => {
    return ref<Tag.GetTagsRes>({
      data: [],
      totalPage: 1
    });
  },
  transform(input: any): Tag.GetTagsRes {
    return {
      ...input.data
    };
  },
})
const paginGetList = (): void => {
  console.log(getListParams);
  getList();
}
onMounted(() => {
  getList();
  getTag();
})
</script>

<style lang="scss" scoped>
.v-responsive {
  flex: 0 0 auto !important;
}

.pointer {
  cursor: pointer;
}

.myblog {
  display: flex;
  justify-content: space-between;

  .myblog_left {
    width: calc(100% - 420px)
  }

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .contentOne {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .contentThree {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .myblog_right {
    width: 400px;
    .vImg {
      width: 150px;
    }
  }
}
</style>
