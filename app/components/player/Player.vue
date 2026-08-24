<script setup lang="ts">
import PlayerDesktop from "./components/PlayerDesktop.vue";
import PlayerMobile from "./components/PlayerMobile.vue";

import { usePlayer } from "@/composables/usePlayer";

const { currentTrack } = usePlayer();
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="currentTrack"
      class="fixed bottom-3 left-1/2 z-50 w-[calc(100%-16px)] max-w-7xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
      style="padding-bottom: env(safe-area-inset-bottom)"
    >
      <PlayerMobile class="md:hidden" />

      <PlayerDesktop class="hidden md:block" />
    </div>
  </Transition>
</template>
