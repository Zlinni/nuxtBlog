<template>
    <div class="d-flex flex-column align-center">
        <slot name="title"></slot>
        <!-- <v-row justify="space-between" class="w-100"> -->
        <!-- <v-col cols="8"> -->
        <div class="content">
            <div class="leftContent">
                <slot name="content" ></slot>
            </div>
            <div class="fix">
                <slot name="bar"></slot>
            </div>
        </div>
        <!-- </v-col> -->
        <!-- </v-row> -->
    </div>
</template>


<style lang="scss" scoped>
.v-responsive {
    flex: 0 0 auto !important;
}
.content{
    width:100%;
    .leftContent{
        width:calc(100% - 370px);
    }
}
.fix {
    position: fixed;
    top: 25.5%;
    right: 12px;
    width: 350px;
}

.w-100 {
    width: 100%;
}
</style>