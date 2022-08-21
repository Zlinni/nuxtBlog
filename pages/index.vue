<template>
  <div>
    <NuxtLayout name="layouthome">
      <!-- <error-msg></error-msg> -->
      <template #drawer>
        <slider></slider>
      </template>
      <template #appbar>
        <appbar></appbar>
      </template>
      <NuxtChild />
    </NuxtLayout>
  </div>
</template>
<script>
definePageMeta({
  keepalive: true,
});
</script>