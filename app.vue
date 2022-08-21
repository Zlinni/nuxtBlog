<template>
  <div class="myapp">
    <NuxtPage/>
  </div>
</template>

<style>
/* TODO 这里的css布局有问题 待修复 */
.v-layout{
  overflow: auto !important;
}
html{
  overflow-y: auto;
}
.myapp{
  width: 100%;
  height:100vh;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: #f1f1f1;
}

/* 滚动槽 */

::-webkit-scrollbar-track {

  -webkit-box-shadow: inset 0 0 6px #f1f1f1;

  border-radius: 10px;

  background: #f1f1f1;

}

/* 滚动条滑块 */

::-webkit-scrollbar-thumb {

  border-radius: 10px;

  background: #a8a8a8;

  -webkit-box-shadow: inset 0 0 6px #a8a8a8;

}

::-webkit-scrollbar-thumb:window-inactive {

  background: #a8a8a8;

}

/* 边角 即两个滚动条的交汇处 */

::-webkit-scrollbar-corner {

  background: #a8a8a8;

  border-radius: 10px;

}
</style>