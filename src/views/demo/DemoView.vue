<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(0);
const y = ref(0);

function update(event) {
  x.value = event.pageX;
  y.value = event.pageY;
}

onMounted(() => {
  window.addEventListener('mousemove', update);

  window.addEventListener('resize', function () {
    if (window.outerWidth === screen.width || window.outerHeight === screen.height) {
      console.log('Entered full screen');
    } else {
      console.log('Exited full screen');
    }
  });
});
onUnmounted(() => window.removeEventListener('mousemove', update));
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>

<style scoped lang="scss"></style>
