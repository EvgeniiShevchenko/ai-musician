<script setup lang="ts">
import PlayerControls from "./PlayerControls.vue";
import PlayerProgress from "./PlayerProgress.vue";

import { usePlayer } from "@/composables/usePlayer";

const { currentTrack, close } = usePlayer();
</script>

<template>
  <div class="relative flex items-center gap-8 px-6 py-5">
    <button
      type="button"
      class="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-xl text-neutral-400 transition hover:bg-white/10 hover:text-white"
      aria-label="Close player"
      title="Close player"
      @click="close"
    >
      ✕
    </button>

    <!-- Track -->

    <div class="flex w-80 min-w-0 items-center gap-4">
      <img
        :src="currentTrack?.cover"
        :alt="currentTrack?.title"
        class="size-16 shrink-0 rounded-xl object-cover shadow-lg ring-1 ring-white/10"
      />

      <div class="min-w-0">
        <h3 class="truncate text-lg font-semibold text-white">
          {{ currentTrack?.title }}
        </h3>

        <p
          v-if="currentTrack?.description"
          class="mt-1 truncate text-sm text-neutral-400"
        >
          {{ currentTrack.description }}
        </p>
      </div>
    </div>

    <!-- Controls -->

    <div class="flex flex-1 flex-col items-center">
      <PlayerControls />

      <div class="mt-4 w-full max-w-2xl">
        <PlayerProgress />
      </div>
    </div>

    <!-- Right spacer -->

    <div class="w-32 shrink-0" />
  </div>
</template>
