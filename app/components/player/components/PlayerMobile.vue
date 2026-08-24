<script setup lang="ts">
import { computed } from "vue";

import PlayerControls from "./PlayerControls.vue";
import PlayerProgress from "./PlayerProgress.vue";

import { usePlayer } from "@/composables/usePlayer";

const { currentTrack, close } = usePlayer();

const hasDescription = computed(() => !!currentTrack.value?.description);
</script>

<template>
  <div class="relative p-4">
    <button
      type="button"
      class="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-lg text-neutral-400 transition hover:bg-white/10 hover:text-white"
      aria-label="Close player"
      title="Close player"
      @click="close"
    >
      ✕
    </button>

    <div class="flex items-center gap-4 pr-10">
      <!-- Cover -->

      <img
        :src="currentTrack?.cover"
        :alt="currentTrack?.title"
        class="size-16 shrink-0 rounded-xl object-cover shadow-lg"
      />

      <!-- Track info -->

      <div class="min-w-0 flex-1">
        <h3 class="truncate text-base font-semibold text-white">
          {{ currentTrack?.title }}
        </h3>

        <p
          v-if="hasDescription"
          class="mt-1 truncate text-sm text-neutral-400"
        >
          {{ currentTrack?.description }}
        </p>
      </div>
    </div>

    <!-- Progress -->

    <div class="mt-5">
      <PlayerProgress />
    </div>

    <!-- Controls -->

    <div class="mt-5 flex justify-center">
      <PlayerControls />
    </div>
  </div>
</template>
