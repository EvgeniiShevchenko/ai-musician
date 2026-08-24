<script setup lang="ts">
const route = useRoute();

const isHome = computed(() => route.path === "/");
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl"
  >
    <div
      class="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-4"
    >
      <NuxtLink
        to="/"
        class="group flex items-center gap-3"
      >
        <img
          src="/images/logo/central.webp"
          alt="Central AI Music"
          class="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          draggable="false"
        />

        <div class="hidden sm:block">
          <h1 class="text-lg font-bold text-white">Central Musician</h1>

          <p class="text-xs text-neutral-400">AI Music Platform</p>
        </div>
      </NuxtLink>

      <nav
        v-if="!isHome"
        class="flex items-center gap-4"
      >
        <NuxtLink
          to="/"
          class="rounded-lg px-3 py-2 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
        >
          Усі релізи
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
