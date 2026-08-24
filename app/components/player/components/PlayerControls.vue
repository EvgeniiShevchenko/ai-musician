<script setup lang="ts">
import { usePlayer } from "@/composables/usePlayer";

const { isPlaying, toggle, next, prev } = usePlayer();
</script>

<template>
  <div class="flex items-center justify-center gap-6">
    <!-- Previous -->

    <button
      class="flex h-10 w-10 items-center justify-center rounded-full text-xl text-neutral-300 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-110 active:scale-95"
      aria-label="Previous track"
      @click="prev"
    >
      ⏮
    </button>

    <!-- Play / Pause -->

    <button
      class="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-black/40 transition-all duration-200 hover:scale-105 active:scale-95"
      :aria-label="isPlaying ? 'Pause' : 'Play'"
      @click="toggle"
    >
      <!-- Pause -->

      <template v-if="isPlaying">
        <div class="flex items-center justify-center gap-1">
          <span class="h-6 w-1 rounded-full bg-black" />

          <span class="h-6 w-1 rounded-full bg-black" />
        </div>
      </template>

      <!-- Play -->

      <template v-else>
        <span class="ml-1 text-[24px] leading-none"> ▶ </span>
      </template>
    </button>

    <!-- Next -->

    <button
      class="flex h-10 w-10 items-center justify-center rounded-full text-xl text-neutral-300 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-110 active:scale-95"
      aria-label="Next track"
      @click="next"
    >
      ⏭
    </button>
  </div>
</template>
