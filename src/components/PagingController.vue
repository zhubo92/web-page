<script setup lang="ts">
import { useStore } from '@/stores';
import { DARK_COLOR } from '@/utils/constants';
const pageSize = 10;

const { currentGrade } = useStore('user');

const props = withDefaults(defineProps<{ total: number; page: number }>(), {
  total: 0,
  page: 1
});

const emit = defineEmits<{
  (e: 'change', page: number): void;
}>();

const pages = computed(() => {
  return Math.ceil(props.total / pageSize);
});

const color = computed(() => {
  return DARK_COLOR[currentGrade.value];
});

function handleChange(page: number) {
  if (page > pages.value || page < 1) {
    return;
  }

  emit('change', page);
}
</script>

<template>
  <div class="paging-controller pc">
    <div class="pc-total">共{{ props.total }}条</div>
    <div
      class="pc-item cp"
      :style="{
        color: props.page === 1 ? '#D9D9D9' : color,
        borderColor: props.page === 1 ? '#D9D9D9' : color,
        cursor: props.page === 1 ? 'not-allowed' : 'pointer'
      }"
      @click="handleChange(props.page - 1)"
    >
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div
      v-for="item in pages"
      :key="item"
      class="pc-item cp"
      :style="{
        color: props.page === item ? '#fff' : color,
        backgroundColor: props.page === item ? color : '#fff',
        borderColor: color
      }"
      @click="handleChange(item)"
    >
      {{ item }}
    </div>
    <div
      class="pc-item cp"
      :style="{
        color: props.page === pages ? '#D9D9D9' : color,
        borderColor: props.page === pages ? '#D9D9D9' : color,
        cursor: props.page === pages ? 'not-allowed' : 'pointer'
      }"
      @click="handleChange(props.page + 1)"
    >
      <el-icon><ArrowRight /></el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.paging-controller,
.pc {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  div + div {
    margin-left: 8px;
  }

  &-total {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
  }

  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 32px;
    height: 32px;
    color: rgba(0, 0, 0, 0.65);
    text-align: center;
    vertical-align: middle;
    list-style: none;
    border-radius: 4px;
    font-size: 12px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    outline: none;
  }
}
</style>
