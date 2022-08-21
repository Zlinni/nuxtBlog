<template>
  <div class="h-100">
    <v-card>
      <v-carousel cycle height="380" hide-delimiters :continuous="false">
        <v-carousel-item v-for="(slide, i) in imgSlide" :key="i" :show-arrows="false">
          <v-sheet height="100%">
            <div class="d-flex fill-height align-center imgBox">
              <div class="imgLeft" :style="posLeftOrRight(i)">
                <h1>Vue3+Nuxt3+Nest+Vuetify UI实现博客前后台管理</h1>
                <p>权限管理</p>
                <p>用户管理</p>
                <p>文章管理</p>
                <p>标签管理</p>
                <p>目录管理</p>
                <p class="text-white">如果你对这个项目感兴趣，欢迎下载源码以及给个star</p>
                <div class="btnGroup">
                  <v-btn color="primary" variant="outlined" width="100px">
                    GitHub
                  </v-btn>
                  <v-btn color="primary" variant="outlined" width="100px">
                    Bilibili
                  </v-btn>
                </div>
              </div>
              <img :src="slide" alt="" class="fill-height imgShow" />
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>
    <div class="index_footer">
      <div class="index_footer_left h-100">
        <div class="text-h4">模块数据</div>
        <div>
          <div class="text-purple-darken-2 font-weight-black text-md-h5 text-lg-h3">11291</div>
          <div class="text-md-h6 text-lg-h5">总访问量</div>
        </div>
        <div>
          <div class="text-purple-darken-2 font-weight-black text-md-h5 text-lg-h3">25</div>
          <div class="text-md-h6 text-lg-h5">今日访问量</div>
        </div>
      </div>
      <div class="index_footer_right d-flex flex-column h-100" v-show="!categoryLoading">
        <div class="d-flex justify-space-between h-100">
          <index-box v-for="(item, index) in categoryData.data" :key="index" :title="item.name" :count="item.count" class="h-100">
          </index-box>
        </div>
        <div class="footer_slider">
          <div class="s_slider" @click="moveTab(index)" v-for="(n, index) in 3" :key="index"></div>
          <div class="tab" :style="{ left: moveLR * 35 + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  keepalive: true,
});
const blogApi = useBlogApi().value;
const imgSlide = ref([
  "../../img/浏览器系列/浏览器.jpg",
  "../../img/css系列/css.jpg",
  "../../img/webpack系列/webpack.png",
  "../../img/面试系列/面试.jpg",
  "../../img/网络系列/网络.jpg",
]);
const getCategoryParams = reactive<Common.UsualPaginParams>({
  page: 1,
  pageSize: 4
})
let { url, method } = blogApi.getCategories
const { data: categoryData, pending: categoryLoading, refresh: getCategory } = useCustomFetch(url, {
  method,
  params: getCategoryParams,
  default: () => {
    return ref<Category.GetCategoriesRes>({
      totalPage: 3,
      data: []
    })
  },
  transform(input: any): Category.GetCategoriesRes {
    return {
      ...input.data
    };
  },
})
let moveLR = ref<number>(0);
const moveTab = (idx: number): void => {
  moveLR.value = idx;
  getCategoryParams.page = idx + 1;
  getCategory();
}
const posLeftOrRight = (idx: number): string => {
  return idx % 2 === 0 ? '' : `order:1`
}
onMounted(() => {
  getCategory();
})
</script>

<style lang="scss">
.imgBox {
  gap: 10px;

  .imgLeft {
    flex: 1;
    padding-left: 20px;
    display: flex;
    gap: 8px;
    flex-direction: column;
    flex-wrap: wrap;

    p {
      padding-left: 45px;
      color: #6200ee;
      cursor: pointer;

      &:nth-child(7) {
        margin-top: 10px;
        padding-left: unset;
        color: black;
        cursor: default;
      }
    }

    .btnGroup {
      display: flex;
      gap: 20px;
    }
  }

  .imgShow {
    width: 48%;
  }
}

.index_footer {
  width: 100%;
  display: flex;
  height:calc(100% - 380px);

  .index_footer_left {
    flex: 0 0 25%;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    h4 {
      font-size: 30px;
    }
  }

  .index_footer_right {
    padding-top: 10px;
    flex: 1;

    .footer_slider {
      position: relative;
      width: 275px;
      height: 8px;
      margin-left: auto;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .s_slider {
        width: 30%;
        height: 100%;
        background-color: #9d64ed;
      }

      .tab {
        position: absolute;
        width: 30%;
        height: 100%;
        background-color: #6200ee;
        transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }
  }
}
</style>
