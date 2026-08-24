import { readonly, ref } from "vue";

import type { Track } from "@/composables/useMusic";

let audio: HTMLAudioElement | null = null;

const currentTrack = ref<Track | null>(null);

const queue = ref<Track[]>([]);

const currentIndex = ref(-1);

const isPlaying = ref(false);

const currentTime = ref(0);

const duration = ref(0);

const volume = ref(1);

function getAudio() {
  if (!import.meta.client) {
    return null;
  }

  if (audio) {
    return audio;
  }

  audio = new Audio();

  audio.preload = "metadata";
  audio.volume = volume.value;

  audio.addEventListener("loadedmetadata", () => {
    if (!audio) {
      return;
    }

    duration.value = audio.duration || 0;
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio) {
      return;
    }

    currentTime.value = audio.currentTime;
  });

  audio.addEventListener("play", () => {
    isPlaying.value = true;
  });

  audio.addEventListener("pause", () => {
    isPlaying.value = false;
  });

  audio.addEventListener("ended", () => {
    void next();
  });

  return audio;
}

async function play() {
  const player = getAudio();

  if (!player || !currentTrack.value) {
    return;
  }

  await player.play();
}

function pause() {
  const player = getAudio();

  if (!player) {
    return;
  }

  player.pause();
}

function toggle() {
  const player = getAudio();

  if (!player) {
    return;
  }

  if (player.paused) {
    void play();
  } else {
    pause();
  }
}

async function playTrack(track: Track) {
  const player = getAudio();

  if (!player) {
    return;
  }

  currentTrack.value = track;

  player.src = track.audio;

  await player.play();
}

async function playPlaylist(tracks: Track[], startIndex = 0) {
  if (!tracks.length) {
    return;
  }

  queue.value = [...tracks];

  currentIndex.value = startIndex;

  const track = queue.value[currentIndex.value];

  if (!track) {
    return;
  }

  await playTrack(track);
}

async function next() {
  if (!queue.value.length) {
    return;
  }

  if (currentIndex.value >= queue.value.length - 1) {
    pause();

    return;
  }

  currentIndex.value++;

  const track = queue.value[currentIndex.value];

  if (!track) {
    return;
  }

  await playTrack(track);
}

async function prev() {
  const player = getAudio();

  if (!player || !queue.value.length) {
    return;
  }

  if (player.currentTime > 3) {
    seek(0);

    return;
  }

  if (currentIndex.value <= 0) {
    seek(0);

    return;
  }

  currentIndex.value--;

  const track = queue.value[currentIndex.value];

  if (!track) {
    return;
  }

  await playTrack(track);
}

function seek(time: number) {
  const player = getAudio();

  if (!player) {
    return;
  }

  player.currentTime = time;
}

function setVolume(value: number) {
  const player = getAudio();

  volume.value = value;

  if (!player) {
    return;
  }

  player.volume = value;
}

function close() {
  if (audio) {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
  }

  currentTrack.value = null;
  queue.value = [];
  currentIndex.value = -1;
  isPlaying.value = false;
  currentTime.value = 0;
  duration.value = 0;
}

export function usePlayer() {
  return {
    currentTrack: readonly(currentTrack),

    queue: readonly(queue),

    currentIndex: readonly(currentIndex),

    isPlaying: readonly(isPlaying),

    currentTime: readonly(currentTime),

    duration: readonly(duration),

    volume: readonly(volume),

    play,
    pause,
    toggle,

    next,
    prev,

    seek,
    setVolume,

    playTrack,
    playPlaylist,

    close,
  };
}
