<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const locale = computed(() => zhCn);
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped lang="scss">
</style>
