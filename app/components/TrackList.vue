<script setup lang="ts">
import TrackCard from "@/components/TrackCard.vue";

import type { Track } from "@/composables/useMusic";

defineProps<{
  tracks: Track[];
}>();
</script>

<template>
  <div class="space-y-1">
    <TrackCard
      v-for="(track, index) in tracks"
      :key="track.id"
      :track="track"
      :tracks="tracks"
      :index="index"
    />
  </div>
</template>
