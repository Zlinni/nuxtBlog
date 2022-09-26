<template>
    <vuetifyTable ref="vTable" :title="title" :showContents="showContents" :m-title="mTitle" :uni-key="uniKey"
        :CRUDApi="api">
        <template v-slot:modifyContent="{ editedItems: edItems, dialogTitle: title }">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ title }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form class="d-flex justify-space-between myForm" ref="form" v-model="valid" lazy-validation>
                        <div class="d-flex flex-column align-center formLeft">
                            <v-text-field class="w-100" v-model="edItems.name" variant="outlined" label="标签名称"
                                hide-details :readonly="isReadonly(title)">
                            </v-text-field>
                            <v-text-field class="w-100" v-model="edItems.color" variant="outlined" label="标签颜色"
                                hide-details @click="showColorPicker = true"></v-text-field>
                        </div>
                        <div>
                            <v-color-picker v-model="edItems.color" :modes="['rgba', 'hexa']"></v-color-picker>
                        </div>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="vTable.setClose">
                        取消
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="CRUDMethod(edItems, title)">
                        保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
        <template v-slot:deleteContent="{ editedItems: edItems }">
            <v-card>
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
                    <v-btn color="blue darken-1" text @click="CRUDMethod(edItems[uniKey])">
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </vuetifyTable>
</template>

<script setup lang="ts">
import { CRUDApi } from '~~/types/vuetifyTable';
// definePageMeta({
//   keepalive: true,
// });
const blogApi = useBlogApi().value;
// 引入组件ref
const vTable = ref(null);
const title = ref<string>("目录管理");
const mTitle = ref<string>("操作");
const showContents = new Map([
    ['name', '标签名称'],
    ['color', '颜色'],
    ['count', '文章数'],
    ['createTime', '创建时间'],
])
const uniKey = '_id';
const valid = ref<boolean>(false);
let showColorPicker = ref<boolean>(false)
const api = ref<CRUDApi>({
    addApi: {
        url: blogApi.addCategory.url,
        method: blogApi.addCategory.method
    },
    modifyApi: {
        url: blogApi.modifyCategory.url,
        method: blogApi.modifyCategory.method
    },
    deleteApi: {
        url: blogApi.deleteCategory.url,
        method: blogApi.deleteCategory.method
    },
    getApi: {
        url: blogApi.getCategories.url,
        data: {
            content: 'data',
            totalPage: 'totalPage'
        },
        method: blogApi.getCategories.method
    },
})
const isReadonly = (title: string): boolean => {
    return title.slice(0, 2) === '新增' ? false : true
}
// TODO addone
const CRUDMethod = (data: Category.Category, title?: string) => {
    title = title?.slice(0, 2);
    let params = null;
    let api = null;
    data = toRaw(data);
    if (title === '修改') {
        api = "modifyApi"
        params = {
            _id: data._id,
            color: data.color
        }
    } else if (title === '新增') {
        api = "addApi"
        params = data;
    } else {
        api = "deleteApi"
        params = {
            _id: data
        };
    }
    vTable.value.setCRUD(params, api);
}
</script>
<style lang="scss">
.myForm {
    width: 500px;
    height: 100%;

    .formLeft {
        width: 180px;
    }
}
</style>