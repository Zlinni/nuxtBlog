<template>
  <vuetifyTable ref="vTable" :title="title" :showContents="showContents" :m-title="mTitle" :uni-key="uniKey" :CRUDApi="api">
    <template v-slot:modifyContent="{ editedItems: edItems, dialogTitle: title }">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="edItems.title" variant="outlined" label="title" hide-details>
                </v-text-field>
              </v-col>
              <!-- <v-col cols="6">                                                                        
                <v-text-field v-model="edItems.tags" variant="outlined" label="tags" hide-details>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="edItems.categories" variant="outlined" label="categories" hide-details>
                </v-text-field>
              </v-col> -->
              <v-col cols="6">
                <v-text-field v-model="edItems.cover" variant="outlined" label="cover" readonly hide-details>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="edItems.abbrlink" variant="outlined" label="abbrlink" readonly
                  hide-details></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="edItems.wordCount" variant="outlined" label="wordCount" readonly
                  hide-details>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="edItems.date" variant="outlined" label="date" readonly hide-details>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="edItems.updateTime" variant="outlined" label="update" readonly hide-details>
                </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="vTable.setClose">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text>
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
    <template v-slot:deleteContent="{ editedItems: edItems }">
      <v-card >
        <v-card-title>
          <span class="text-h5">删除</span>
        </v-card-title>
        <v-card-text>
          确认删除？
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="vTable.setClose">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteOne(edItems[uniKey])">
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </vuetifyTable>
</template>

<script setup lang="ts">
import { CRUDApi } from '~~/types/vuetifyTable';
// name:'article'
// definePageMeta({
//   requireAuth: true
// })
// definePageMeta({
//   keepalive: true,
// });
const blogApi = useBlogApi().value;
// 引入组件ref
const vTable = ref(null);
const title = ref<string>("文章管理");
const mTitle = ref<string>("操作");
const showContents = new Map([
  ['title', '标题'],
  ['tags', '标签'],
  ['categories', '目录'],
  ['date', '创建日期'],
  ['updateTime', '最后更新日期'],
])
const uniKey = '_id';
const valid = ref<boolean>(false);
const api = ref<CRUDApi>({
  addApi: {
    url: blogApi.addTags.url,
    method: blogApi.addTags.method
  },
  modifyApi: {
    url: blogApi.modifyTags.url,
    method: blogApi.modifyTags.method
  },
  deleteApi: {
    url: blogApi.deleteTags.url,
    method: blogApi.deleteTags.method
  },
  getApi: {
    url: blogApi.getList.url,
    data: {
      content: 'data',
      totalPage: 'totalPage'
    },
    method: blogApi.getList.method
  },
})
const deleteOne = (id: string | number) => {

}
const saveData = () => {
  //请求完成关闭
  vTable.value.closeDialog()
}

</script>

<style scoped>
.diaContent{
  width:50%;
  margin: auto;
}
</style>