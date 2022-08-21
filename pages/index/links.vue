<template>
  <div>
    <!-- <div class="d-flex">
      <div class="ma-auto d-flex flex-column align-center"> 
        <img src="../../img/indexBg/streamlinehq-welcome-5-interface-400.PNG">
        <p class="text-h4">等待加入...</p>
      </div>
    </div> -->
    <div class="d-flex flex-wrap justify-start align-center">
      <v-card class="mx-auto mb-3" min-width="300" v-for="n in 10" :key="n">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img>

        <v-card-title>
          友情链接一号
        </v-card-title>

        <v-card-subtitle>
          友情链接一号的签名
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange-lighten-2" variant="text">
            跳转
          </v-btn>

          <v-spacer></v-spacer>

          <!-- <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn> -->
        </v-card-actions>

        <!-- <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
  
          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you
            add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition> -->
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  // layout: "layouthome",
  keepalive: true,
});
let show = ref<boolean>(false);
</script>