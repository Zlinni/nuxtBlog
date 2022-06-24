<template>
  <NuxtLayout name="home">
    <template #drawer>
      <slider></slider>
    </template>
    <template #appbar>
      <appbar></appbar>
    </template>
    <NuxtChild></NuxtChild>
  </NuxtLayout>
</template>
<script>
export default {
  layout: "home",
};
</script>
