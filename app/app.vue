<script setup lang="ts">
import Player from "@/components/player/Player.vue";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />

    <Player />
  </NuxtLayout>
</template>

<style>
html {
  overscroll-behavior-x: none;
}

body {
  margin: 0;
}
</style>
