<template>
    <div>
        <v-progress-linear v-if="loading" class="position-absolute" style="z-index: 1" color="deep-purple" height="10"
            indeterminate></v-progress-linear>
        <v-card v-else>
            <div class="d-flex mt-2">
                <v-card-title>
                    {{ props.title }}
                </v-card-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn class="mr-2" color="deep-purple" size="large" v-if="props.needDeleteSome || props.needCRUD"
                    @click="addItem">
                    添加{{ sliceTitle }}</v-btn>
                <v-btn class="mr-2" color="deep-purple" size="large" v-if="props.needDeleteSome">批量删除</v-btn>
                <div>
                    <v-text-field v-if="props.needSearch || props.needCRUD" v-model="getListParams.searchText"
                        class="h-100" clearable density="compact" label="Search" append-inner-icon="mdi-magnify"
                        hide-details variant="outlined" bg-color="white" type="text" @click:append-inner="refreshData">
                    </v-text-field>
                </div>
            </div>
            <v-table>
                <thead>
                    <tr>
                        <th width="50px" v-if="props.needDeleteSome">
                            <v-checkbox v-model="isCheckAll" hide-details></v-checkbox>
                        </th>
                        <th v-for="(head, index) in myHeader" :key="index" :class="positionClass">
                            {{ head }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in myContent.content" :key="index" :class="positionClass">
                        <td v-if="props.needDeleteSome">
                            <v-checkbox v-model="selected.selected" :value="item?._id" hide-details></v-checkbox>
                        </td>
                        <td v-for="ckey in myContentKeys" :key="ckey">
                            <template v-if="isChips(item[ckey])">
                                <v-chip v-for="tag in item[ckey]" :key="tag" color="#3f51b5">
                                    {{ tag.name }}
                                </v-chip>
                            </template>
                            <template v-else-if="isColor(item[ckey])">
                                <v-chip :color="item[ckey]">
                                    {{ item[ckey] }}
                                </v-chip>
                            </template>
                            <template v-else>
                                {{ item[ckey] }}
                            </template>
                        </td>
                        <td v-if="props.needModify || props.needDelete || props.needCRUD">
                            <v-icon small class="mr-2" @click="editItem(item)"
                                v-if="props.needModify || props.needCRUD">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)" v-if="props.needDelete || props.needCRUD">
                                mdi-delete
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <v-pagination v-if="myContent.totalPage > 0" v-model="getListParams.page" class="my-4"
                :length="myContent.totalPage" @update:modelValue="refreshData"></v-pagination>
            <v-dialog v-model="isDialogModify" v-if="props.needModify || props.needCRUD">
                <slot name="modifyContent" :editedItems="editedItems" :dialogTitle="dialogTitle" />
            </v-dialog>
            <v-dialog v-model="isDialogDelete" v-if="props.needDelete || props.needDeleteSome || props.needCRUD">
                <slot name="deleteContent" :editedItems="editedItems" />
            </v-dialog>
        </v-card>
    </div>
</template>
<script setup lang="ts">
import { selecet } from '~~/types/vuetifyTable';
type Api = {
    url: string;
    data: Data;
    method: string;
};
type Data = {
    content: string;
    totalPage: string;
};
type ApiUsual = Omit<Api, "data">;
interface CRUDApiIF {
    addApi?: ApiUsual;
    modifyApi?: ApiUsual;
    deleteApi?: ApiUsual;
    getApi: Api;
}
interface vTableProps {
    showContents: Map<any, any>,
    needCRUD?: boolean,
    needDeleteSome?: boolean,
    needDelete?: boolean,
    needModify?: boolean,
    needSearch?: boolean,
    position?: string,
    title?: string | number,
    mTitle?: string | number,
    uniKey: string | number,
    CRUDApi: CRUDApiIF,
}
const props = withDefaults(defineProps<vTableProps>(), {
    // 需要展示的内容以及标题
    showContents: () => new Map(),
    needCRUD: true,
    // 需要批量删除
    needDeleteSome: false,
    needDelete: false,
    // 需要修改
    needModify: false,
    // 需要搜索
    needSearch: false,
    // 文本位置
    position: "left",
    // 标题
    title: "默认标题",
    // 操作栏标题
    mTitle: "modify",
    // 唯一键
    uniKey: "id",
    // CRUDApi
    // CRUDApi: {
    //     addApi?: {
    //         url: '',
    //         method: ''
    //     },
    //     modifyApi?: {
    //         url: '',
    //         method: ''
    //     },
    //     deleteApi?: {
    //         url: '',
    //         method: ''
    //     },
    //     getApi: {
    //         url: '',
    //         method: '',
    //         data: ''
    //     },
    // }
});
// 过滤数据
const needContentsMap = props.showContents;
// const getType = (obj: any) => {
//     const type = typeof obj;
//     if (type == "string" && new Date(obj).toString() !== "Invalid Date") {
//         return "Date";
//     }
//     // 可以通过Object.prototype.toString方法，判断某个对象之属于哪种内置类型。 "[object Null]"
//     return Object.prototype.toString
//         .call(obj)
//         .replace(/^\[object (\S+)\]$/, "$1");
// }

const myHeader = [...needContentsMap.values()] as Array<string | number>;
const myContentKeys = [...needContentsMap.keys()] as Array<string | number>;
if (props.needModify || props.needCRUD) {
    myHeader.push(props.mTitle);
}
const selected = reactive<selecet>({
    selected: [],
});
let isCheckAll = ref<boolean>(false);
const isDialogModify = ref<boolean>(false);
const isDialogDelete = ref<boolean>(false);
let editedItems = ref<any>({});
let positionClass = ref<string>("text-left");
const getListParams = reactive({
    page: 1,
    pageSize: 10,
    searchText: ""
})
let dialogTitle = ref<string>("默认标题");
// 确定文本位置
if (props.position === "left") {
    positionClass.value = "text-left";
} else if (props.position === "center") {
    positionClass.value = "text-center";
}
interface getData<T> {
    content: Array<T>,
    totalPage: number
}
let { url: getApiURL, method: getApiMethod } = props.CRUDApi.getApi;
const { data: myContent, pending: loading, refresh: getData } = useLazyFetch(getApiURL, {
    method: getApiMethod,
    default: () => {
        const data = ref<getData<null>>({
            content: [],
            totalPage: 0
        });
        return data
    },
    params: getListParams,
    transform(input: any): getData<string> {
        return {
            content: input.data[props.CRUDApi.getApi.data.content],
            totalPage: input.data.totalPage
        };
    },
    initialCache: false //重新获取避免出问题
})

const editItem = (item: any): void => {
    dialogTitle.value = '修改' + sliceTitle.value;
    isDialogModify.value = true;
    editedItems.value = Object.assign({}, item)
};
const deleteItem = (item: any) => {
    isDialogDelete.value = true;
    editedItems.value[props.uniKey] = item[props.uniKey];
};
// TODO addItem
const addItem = () => {
    dialogTitle.value = '新增' + sliceTitle.value;
    editedItems.value = {};
    isDialogModify.value = true;
}
let sliceTitle = computed(() => {
    let title = props.title as string;
    return title.slice(0, 2);
})
watch(isCheckAll, (newValue) => {
    if (newValue) {
        selected.selected.length = 0;
        for (const item of myContent.value.content as any) {
            for (const key in item as any) {
                if (key === "_id") {
                    selected.selected.push(item[key]);
                }
            }
        }
    } else {
        if (selected.selected.length === myContent.value.content.length) {
            selected.selected.length = 0;
        }
    }
});
watch(
    () => selected.selected,
    (newValue) => {
        if (newValue.length === myContent.value.content.length) {
            isCheckAll.value = true;
        } else {
            isCheckAll.value = false;
        }
    }
);
const refreshData = (): void => {
    getData()
}
const isChips = (item: any): boolean => {
    return !!(item instanceof Array);
};
const isColor = (item: any): boolean => {
    const reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    return reg.test(item);
}
const setClose = (): void => {
    if (isDialogModify.value) {
        isDialogModify.value = false;
    }
    if (isDialogDelete.value) {
        isDialogDelete.value = false;
    }
}
const setCRUD = (queryForm: any, api: string): void => {
    let { url, method } = props.CRUDApi[api]
    useCustomFetch(url, {
        method,
        params: method === 'get' ? queryForm : null,
        body: method === 'post' ? queryForm : null,
    }).then(() => {
        getData();
        setClose();
    }).catch((err) => {
        console.log(err);
    })
}
defineExpose({
    setCRUD,
    setClose,
    refreshData,
})
</script>

<style lang="scss" scoped>
:deep(.v-icon) {
    cursor: pointer;
}

:deep(.v-overlay__content) {
    // max-height: unset;
    // max-width: unset;
    width: 50%;
    margin:auto;
}

:deep(.v-text-field .v-field) {
    width: 280px;
    height: 44px;
}
</style>