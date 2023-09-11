<script setup lang="ts">
import { defaultAddress, IAddress } from '@/types/section.d';
import { DARK_COLOR } from '@/utils/constants';

const props = withDefaults(defineProps<{ address: IAddress }>(), {
  address: defaultAddress
});

const { currentGrade, goHome, goCourse, goSection } = useStore('user');

function handleMouseover(e: MouseEvent) {
  if (e.target?.className === 'cp') {
    e.target.style.color = DARK_COLOR[currentGrade.value];
  }
}

function handleMouseout(e: MouseEvent) {
  if (e.target?.className === 'cp') {
    e.target.style.color = '#666';
  }
}
</script>

<template>
  <div class="address-bar" @mouseover="handleMouseover" @mouseout="handleMouseout">
    <div v-if="props.address.firSubName" class="cp" @click="goHome">
      {{ props.address.firSubName }}
    </div>
    <template v-if="props.address.secSubName">
      <el-icon><ArrowRight /></el-icon>
      <div class="cp" @click="goCourse(Number(props.address.firSubId))">
        {{ props.address.secSubName }}
      </div>
    </template>
    <template v-if="props.address.courseName">
      <el-icon><ArrowRight /></el-icon>
      <div class="cp" @click="goSection(Number(props.address.courseId))">
        {{ props.address.courseName }}
      </div>
    </template>
    <template v-if="props.address.slidesName">
      <el-icon><ArrowRight /></el-icon>
      <div class="cp">{{ props.address.slidesName }}</div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.address-bar {
  display: flex;
  align-items: center;
  margin-top: 64px;
  font-size: 22px;
  color: #666;

  div:last-child {
    font-weight: 600;
    color: #333;
  }
}
</style>
