<script setup lang="ts">
import { computed } from "vue";

import { usePlayer } from "@/composables/usePlayer";
import type { Track } from "@/composables/useMusic";

const props = defineProps<{
  track: Track;
  tracks: Track[];
  index: number;
}>();

const { currentTrack, isPlaying, toggle, playPlaylist } = usePlayer();

const isCurrentTrack = computed(
  () => currentTrack.value?.id === props.track.id
);

async function handlePlay() {
  if (isCurrentTrack.value) {
    toggle();

    return;
  }

  await playPlaylist(props.tracks, props.index);
}

function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
</script>

<template>
  <button
    class="group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors hover:bg-neutral-800"
    @click="handlePlay"
  >
    <!-- Cover -->

    <div class="relative size-14 shrink-0 overflow-hidden rounded-lg">
      <img
        :src="track.cover"
        :alt="track.title"
        class="h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <span
          v-if="isCurrentTrack && isPlaying"
          class="text-xl text-white"
        >
          ⏸
        </span>

        <span
          v-else
          class="ml-1 text-xl text-white"
        >
          ▶
        </span>
      </div>
    </div>

    <!-- Info -->

    <div class="min-w-0 flex-1">
      <p
        class="truncate font-medium transition-colors"
        :class="{
          'text-white': !isCurrentTrack,
          'text-green-400': isCurrentTrack,
        }"
      >
        {{ track.title }}
      </p>

      <p class="truncate text-sm text-neutral-500">
        {{ track.description }}
      </p>
    </div>

    <!-- Duration -->

    <span class="shrink-0 text-sm text-neutral-500">
      {{ formatDuration(track.duration) }}
    </span>
  </button>
</template>
