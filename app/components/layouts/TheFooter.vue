<script setup lang="ts">
import { computed } from "vue";

import { usePlayer } from "@/composables/usePlayer";

const instagramUrl = "https://www.instagram.com/YOUR_PROFILE";
const email = "contact@centralmusic.com";

const { currentTrack } = usePlayer();

const footerClass = computed(() =>
  currentTrack.value
    ? "pb-40 transition-all duration-300"
    : "pb-0 transition-all duration-300"
);
</script>

<template>
  <footer
    class="border-t border-white/5 bg-neutral-950"
    :class="footerClass"
  >
    <div
      class="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center"
    >
      <img
        src="/images/logo/central.webp"
        alt="Central Musician"
        class="h-14 w-auto select-none"
        draggable="false"
      />

      <h2 class="mt-6 text-3xl font-bold text-white">Central Musician</h2>

      <p class="mt-4 max-w-xl text-sm leading-7 text-neutral-400">
        Незалежна музична платформа для AI-артистів. Відкривайте нових
        виконавців, публікуйте власні релізи та створюйте майбутнє музики разом
        із Central Musician.
      </p>

      <a
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-10 transition duration-300 hover:scale-105"
      >
        <img
          src="/images/qr/instagram.webp"
          alt="Instagram QR"
          class="w-44 rounded-2xl border border-white/10 bg-neutral-900 p-3 shadow-xl shadow-black/50"
        />
      </a>

      <section
        class="mt-10 w-full max-w-3xl rounded-3xl border border-white/10 bg-neutral-900/60 p-8 backdrop-blur"
      >
        <h3 class="text-2xl font-bold text-white">
          Хочеш опублікувати свою AI-музику?
        </h3>

        <p class="mt-4 leading-7 text-neutral-400">
          Якщо ти створюєш AI-музику, сингли, EP або альбоми та хочеш поділитися
          ними з аудиторією — зв'яжися з нами. У майбутньому Central Musician
          стане відкритою платформою для незалежних AI-артистів.
        </p>

        <a
          :href="`mailto:${email}?subject=Публікація музики на Central Musician`"
          class="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-neutral-200"
        >
          Зв'язатися з нами
        </a>
      </section>

      <a
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-8 text-lg font-semibold text-white transition hover:text-neutral-300"
      >
        Instagram
      </a>

      <div class="mt-12 h-px w-full max-w-5xl bg-white/10" />

      <div
        class="mt-8 flex flex-col items-center gap-4 text-sm text-neutral-400 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8"
      >
        <NuxtLink
          to="/rules"
          class="transition hover:text-white"
        >
          Правила платформи
        </NuxtLink>

        <NuxtLink
          to="/privacy"
          class="transition hover:text-white"
        >
          Політика конфіденційності
        </NuxtLink>

        <NuxtLink
          to="/copyright-policy"
          class="transition hover:text-white"
        >
          Авторські права
        </NuxtLink>
      </div>

      <p class="mt-8 max-w-2xl text-center text-xs leading-6 text-neutral-500">
        Усі права на музичні твори належать їхнім відповідним авторам та
        правовласникам. Central Musician є платформою для публікації музики та
        не претендує на право власності щодо матеріалів, завантажених
        користувачами.
      </p>

      <p class="mt-8 text-sm text-neutral-500">
        © {{ new Date().getFullYear() }} Central Musician
      </p>
    </div>
  </footer>
</template>
