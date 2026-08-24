<script setup lang="ts">
import { computed } from "vue";

import TrackList from "@/components/TrackList.vue";

import { usePlayer } from "@/composables/usePlayer";
import type { Release } from "@/composables/useMusic";

const props = defineProps<{
  release: Release;
}>();

const { currentTrack } = usePlayer();

const activeTrack = computed(() => {
  if (!currentTrack.value) {
    return null;
  }

  return props.release.tracks.find(
    (track) => track.id === currentTrack.value?.id
  );
});

const cover = computed(() => {
  return activeTrack.value?.cover || props.release.cover;
});
</script>

<template>
  <article
    class="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950"
  >
    <div class="flex flex-col p-4 sm:p-5 md:flex-row md:gap-6 md:p-6">
      <div class="flex justify-center md:block md:shrink-0">
        <img
          :src="cover"
          :alt="activeTrack?.title || release.title"
          class="aspect-square w-44 rounded-xl object-cover sm:w-52 md:w-56"
        />
      </div>

      <div class="mt-5 flex min-w-0 flex-1 flex-col md:mt-0">
        <span
          class="text-[10px] uppercase tracking-[0.2em] text-neutral-500 md:text-sm md:tracking-widest"
        >
          {{ release.type }}
        </span>

        <h3
          class="mt-1 text-2xl font-bold leading-tight text-white md:text-3xl"
        >
          {{ release.title }}
        </h3>

        <p
          class="mt-2 text-sm leading-relaxed text-neutral-400 md:mt-3 md:text-base"
        >
          {{ release.description }}
        </p>

        <div class="mt-2 text-xs text-neutral-500 md:text-sm">
          Mr Gazda · {{ release.releaseDate }}
        </div>

        <div class="mt-4 flex flex-wrap gap-2 md:mt-5">
          <span
            v-for="genre in release.genres"
            :key="genre"
            class="rounded-full bg-neutral-800 px-2.5 py-1 text-[10px] text-neutral-300 sm:text-xs md:px-3"
          >
            {{ genre }}
          </span>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10 p-3 sm:p-4 md:p-6">
      <TrackList :tracks="release.tracks" />
    </div>
  </article>
</template>
