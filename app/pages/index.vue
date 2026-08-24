<script setup lang="ts">
import TheHeader from "@/components/layouts/TheHeader.vue";
import TheFooter from "@/components/layouts/TheFooter.vue";
import ArtistList from "@/components/ArtistList.vue";

import { useMusic } from "@/composables/useMusic";

const { getArtists } = useMusic();

const artists = getArtists();
</script>

<template>
  <main class="min-h-screen bg-black px-4 text-white">
    <TheHeader />

    <section class="mx-auto max-w-6xl py-8">
      <h1 class="mb-2 text-3xl font-bold">Central AI Music</h1>

      <p class="mb-8 text-neutral-400">
        Незалежна платформа для AI-артистів. Відкривайте нових виконавців,
        слухайте їхні релізи та підтримуйте незалежну AI-музику.
      </p>

      <ArtistList :artists="artists" />
    </section>

    <TheFooter />
  </main>
</template>
