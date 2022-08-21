<template>
    <cate-tag>
        <template #title>
            <h1 class="mb-5 ">
                {{ route.query.tagName }}
            </h1>
        </template>
        <template #content>
            <div class="d-flex flex-column align-center">
                <v-timeline align="start">
                    <v-timeline-item v-for="item in tagList.data" :key="item._id" dot-color="#4147d5" size="small">
                        <template v-slot:opposite>
                            <div :class="`pt-1 headline font-weight-bold text-black`" v-text="item.title"></div>
                            <div :class="`pt-1 headline font-weight-bold text-black`" v-text="item.date"></div>
                        </template>
                        <div>
                            <v-card class="elevation-2" @click="$router.push('/blog/' + item.abbrlink)">
                                <v-img :src="useTransImg(item.cover)" width="360px">
                                    <template v-slot:placeholder>
                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                            <v-progress-circular indeterminate color="grey lighten-5">
                                            </v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                            </v-card>
                        </div>
                    </v-timeline-item>
                </v-timeline>
                <v-pagination v-if="tagList.totalPage > 0" v-model="tagListParams.page" class="my-4"
                    :length="tagList.totalPage" @update:modelValue="getTagList"></v-pagination>
            </div>
        </template>
    </cate-tag>
</template>

<script lang="ts" setup>
const blogApi  = useBlogApi().value;
const route = useRoute()
const { tagName } = route.query;
const tagListParams = reactive({
    tagName,
    page: 1,
    pageSize: 6
})
const { url, method } = blogApi.getTagList;
const { data: tagList, pending: tagListLoading, refresh: getTagList } = useLazyFetch(url, {
    method,
    params: tagListParams,
    default: () => {
        return ref<Tag.GetTagsListRes>({
            totalPage: 1,
            data: []
        })
    },
    transform(input: any): Tag.GetTagsListRes {
        return {
            ...input.data
        };
    },
})

</script>

<style lang="scss" scoped>
.v-responsive {
    flex: 0 0 auto !important;
}

.v-timeline-item__opposite {
    width: 383px;
}
</style>