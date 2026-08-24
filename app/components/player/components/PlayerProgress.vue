<script setup lang="ts">
import { computed, ref } from "vue";

import { usePlayer } from "@/composables/usePlayer";

const { currentTime, duration, seek } = usePlayer();

const isDragging = ref(false);
const dragProgress = ref(0);

const progress = computed(() => {
  if (isDragging.value) {
    return dragProgress.value;
  }

  if (!duration.value) {
    return 0;
  }

  return (currentTime.value / duration.value) * 100;
});

const displayedTime = computed(() => {
  if (!isDragging.value || !duration.value) {
    return currentTime.value;
  }

  return (dragProgress.value / 100) * duration.value;
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;

  isDragging.value = true;
  dragProgress.value = Number(target.value);
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = Number(target.value);

  dragProgress.value = value;

  if (duration.value) {
    seek((value / 100) * duration.value);
  }

  isDragging.value = false;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${minutes}:${sec.toString().padStart(2, "0")}`;
}
</script>

<template>
  <div class="w-full">
    <input
      :value="progress"
      type="range"
      min="0"
      max="100"
      step="0.1"
      class="player-progress"
      @input="handleInput"
      @change="handleChange"
    />

    <div
      class="mt-2 flex items-center justify-between text-xs text-neutral-400"
    >
      <span>
        {{ formatTime(displayedTime) }}
      </span>

      <span>
        {{ formatTime(duration) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.player-progress {
  width: 100%;
  height: 4px;

  cursor: pointer;

  appearance: none;

  border-radius: 9999px;

  background: rgb(64 64 64);

  transition: background 0.2s ease;
}

.player-progress:hover {
  background: rgb(82 82 82);
}

.player-progress::-webkit-slider-runnable-track {
  height: 4px;

  border-radius: 9999px;

  background: transparent;
}

.player-progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;

  width: 14px;
  height: 14px;

  margin-top: -5px;

  border-radius: 9999px;

  background: white;

  box-shadow: 0 2px 8px rgb(0 0 0 / 40%);

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.player-progress:hover::-webkit-slider-thumb {
  transform: scale(1.15);

  box-shadow: 0 4px 12px rgb(0 0 0 / 50%);
}

.player-progress::-moz-range-track {
  height: 4px;

  border-radius: 9999px;

  background: rgb(64 64 64);
}

.player-progress::-moz-range-thumb {
  width: 14px;
  height: 14px;

  border: none;

  border-radius: 9999px;

  background: white;

  cursor: pointer;

  transition: transform 0.2s ease;
}

.player-progress:hover::-moz-range-thumb {
  transform: scale(1.15);
}
</style>
