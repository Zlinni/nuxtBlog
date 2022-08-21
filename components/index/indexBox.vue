<template>
  <v-card class="indexBox pa-6 d-flex flex-column">
    <div class="indexBox_up">
      <img class="icon" src="../../img/icon/book.PNG" />
      <p class="count">
        {{props.count}}
      </p>
    </div>
    <div class="indexBox_down">
      <div class="title">
        {{props.title}}
      </div>
      <div class="content">
        这是一篇博客文章，这是一篇博客文章，这是一篇博客文章
      </div>
      <div class="arrow" @click="toTagList">—></div>
    </div>
  </v-card>
</template>
<script lang="ts" setup>
// TODO 分类intro
interface indexBoxProps {
  title:string | number,
  count:number,
  intro?:string
}
const props = withDefaults(defineProps<indexBoxProps>(), {
    // 标题
    title:"默认标题",
    // 文章数量
    count:1,
    // 分类简介
    intro:"这是一篇博客文章，这是一篇博客文章，这是一篇博客文章",
});
const router = useRouter(); 
const toTagList = ():void=>{
  router.push({path:'/blog/category',query:{categoryName:props.title}});
}
</script>

<style lang="scss">
.indexBox {
  gap: 20px;
  width: 24%;
  height: 230px;

  .indexBox_up {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 50px;
      height: 50px;
    }
    .count {
      color: #4147d5;
      font-size: 30px;
      font-weight: bold;
    }
  }
  .indexBox_down {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .content {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    .arrow {
      flex: 0 0 60%;
      margin-left: auto;
      height: 30px;
      text-align: center;
      color: white;
      background: #4147d5;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
