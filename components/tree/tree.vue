<template>
    <div>
        <div :style="indent" @click="toggleChildren" class="treeRoot mb-1">{{ root }}</div>
        <div v-if="showChildren">
            <tree v-for="(item, index) of (props.children as any)" :key="index" :children="item.children"
                :root="item.root" :depth="depth + 1" @click.stop="scrollToToc(tocList[item.id])"></tree>
        </div>
    </div>
</template>

<script setup lang="ts">
name: "Tree";
const props = defineProps({
    root: String,
    children: Array,
    depth: Number,
    tocId: Number,
}
)
const tocList = useTocList();
const scrollToToc = useScrollToToc();
let showChildren = ref(false);
let indent = computed(() => {
    return { transform: `translate(${props.depth * 20}px)` };
})
const toggleChildren = () => {
    showChildren.value = !showChildren.value;
}
</script>

<style lang="scss">
.treeRoot {
    text-indent: 16px;
    cursor: pointer;

    &:hover {
        background-color: #dde0eb;
    }

    // &::before{
    //     content: "";
    // }
}
</style>
