<script setup lang="ts">
import ArtistCard from "@/components/ArtistCard.vue";

import type { Artist } from "@/composables/useMusic";

defineProps<{
  artists: Artist[];
}>();
</script>

<template>
  <div class="space-y-10">
    <ArtistCard
      v-for="artist in artists"
      :key="artist.id"
      :artist="artist"
    />
  </div>
</template>
