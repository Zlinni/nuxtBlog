<template>
  <div>
    <div>
      <v-carousel cycle height="400" hide-delimiters show-arrows="hover">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <div class="d-flex fill-height justify-center align-center">
              <div class="text-h2">{{ slide }} Slide</div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="index_footer">
      <div class="index_footer_left">
        <h4>模块数据</h4>
        <div>
          <h4>11291</h4>
          <p>总访问量</p>
        </div>
        <div>
          <h4>25</h4>
          <p>今日访问量</p>
        </div>
      </div>
      <div class="index_footer_right">
        <index-box></index-box>
        <index-box></index-box>
        <index-box></index-box>
        <index-box></index-box>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colors = ref([
  "indigo",
  "warning",
  "pink darken-2",
  "red lighten-1",
  "deep-purple accent-4",
]);
const slides = ref(["First", "Second", "Third", "Fourth", "Fifth"]);
</script>

<style lang="scss">
.index_footer{
    width: 100%;
    display: flex;
    .index_footer_left{
        flex: 0 0 25%;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        h4{
            font-size: 30px;
        }
    }
    .index_footer_right{
        padding-top: 10px;
        flex:1;
        display: flex;
        justify-content:space-between;
    }
}
</style>