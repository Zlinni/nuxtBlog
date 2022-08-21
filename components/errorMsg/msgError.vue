<template>
    <div class="msgErrorContainer">
        <transition class="moveAlert">
            <v-alert border="start" density="default" closable :type="msgType" v-show="isError" class="msgContent"
                @click="closeError">{{
                        errorMsg
                }}</v-alert>
        </transition>
    </div>
</template>

<script lang="ts" setup>
let msgType = ref<'error' | 'success'>('error');
let errorMsg = ref<string>('');
let isError = ref<boolean>(false);
let timeoutError = ref(null);
watch(useIsError(), (val) => {
    clearTimeout(timeoutError.value);
    if (val === true) {
        isError.value = val;
        if (useErrorMsg().value) {
            msgType.value = 'error';
            errorMsg.value = useErrorMsg().value;
        } else if (useSuccessMsg().value) {
            msgType.value = 'success';
            errorMsg.value = useSuccessMsg().value;
        }
        timeoutError.value = setTimeout(() => {
            closeError()
        }, 3000);
    }
})

const closeError = (): void => {
    isError.value = false;
    useIsError().value = false;
    useSuccessMsg().value = '';
    useErrorMsg().value = '';
    clearTimeout(timeoutError.value);
}

</script>

<style lang="scss" scoped>
@keyframes moveAlert {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translate(0);
    }
}

.msgErrorContainer {
    position: fixed;
    top: 5%;
    width: 400px;
    height: 60px;
    z-index: 9999;

    .moveAlert {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .msgContent {
        width: 100%;
        height: 100%;
    }
}

.v-enter-active {
    animation: moveAlert cubic-bezier(0.68, -0.55, 0.265, 1.55) 1.5s forwards;
}

/* 离开动画 */
.v-leave-active {
    animation: moveAlert cubic-bezier(0.68, -0.55, 0.265, 1.55) 1.5s reverse;
}
</style>