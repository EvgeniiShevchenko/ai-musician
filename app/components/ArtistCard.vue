<script setup lang="ts">
import ReleaseCard from "@/components/ReleaseCard.vue";

import type { Artist } from "@/composables/useMusic";

defineProps<{
  artist: Artist;
}>();
</script>

<template>
  <article
    class="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 sm:rounded-3xl"
  >
    <!-- Cover -->
    <div class="relative">
      <img
        :src="artist.cover"
        :alt="artist.name"
        class="h-36 w-full object-cover sm:h-48 md:h-56"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent"
      />
    </div>

    <!-- Artist info -->
    <div class="relative px-4 pb-5 sm:px-6 sm:pb-6">
      <!-- Avatar -->
      <img
        :src="artist.avatar"
        :alt="artist.name"
        class="-mt-10 size-20 rounded-full border-4 border-neutral-900 bg-neutral-900 object-cover sm:-mt-12 sm:size-24 md:size-28"
      />

      <!-- Content -->
      <div class="mt-3">
        <h2 class="text-2xl font-bold leading-tight text-white sm:text-3xl">
          {{ artist.name }}
        </h2>

        <p
          class="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base"
        >
          {{ artist.description }}
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="genre in artist.genres"
            :key="genre"
            class="rounded-full bg-neutral-800 px-3 py-1 text-[11px] text-neutral-300 sm:text-xs"
          >
            {{ genre }}
          </span>
        </div>
      </div>
    </div>

    <!-- Releases -->
    <div class="space-y-5 border-t border-white/10 p-4 sm:p-6 md:space-y-8">
      <ReleaseCard
        v-for="release in artist.releases"
        :key="release.id"
        :release="release"
      />
    </div>
  </article>
</template>
