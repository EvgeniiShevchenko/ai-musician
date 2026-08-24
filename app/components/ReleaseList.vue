<script setup lang="ts">
import ReleaseCard from "@/components/ReleaseCard.vue";

import type { Release } from "@/composables/useMusic";

defineProps<{
  releases: Release[];
}>();
</script>

<template>
  <div class="space-y-8">
    <ReleaseCard
      v-for="release in releases"
      :key="release.id"
      :release="release"
    />
  </div>
</template>
