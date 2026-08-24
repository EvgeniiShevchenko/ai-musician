import { readonly, ref } from "vue";

import type { Track } from "@/composables/useMusic";

let audio: HTMLAudioElement | null = null;
let isSeeking = false;

const currentTrack = ref<Track | null>(null);
const queue = ref<Track[]>([]);
const currentIndex = ref(-1);

const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);

function getAudio() {
  if (typeof window === "undefined") {
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

    duration.value = Number.isFinite(audio.duration) ? audio.duration : 0;
  });

  audio.addEventListener("durationchange", () => {
    if (!audio || !Number.isFinite(audio.duration)) {
      return;
    }

    duration.value = audio.duration;
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio || isSeeking) {
      return;
    }

    currentTime.value = audio.currentTime;
  });

  audio.addEventListener("seeking", () => {
    isSeeking = true;
  });

  audio.addEventListener("seeked", () => {
    if (!audio) {
      return;
    }

    currentTime.value = audio.currentTime;
    isSeeking = false;
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

    return;
  }

  pause();
}

async function playTrack(track: Track) {
  const player = getAudio();

  if (!player) {
    return;
  }

  currentTrack.value = track;

  currentTime.value = 0;
  duration.value = 0;
  isSeeking = false;

  player.src = track.audio;
  player.load();

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

  const audioDuration = Number.isFinite(player.duration)
    ? player.duration
    : duration.value;

  if (!audioDuration) {
    return;
  }

  const nextTime = Math.max(0, Math.min(time, audioDuration));

  isSeeking = true;

  currentTime.value = nextTime;
  player.currentTime = nextTime;
}

function setVolume(value: number) {
  const player = getAudio();

  const nextVolume = Math.max(0, Math.min(value, 1));

  volume.value = nextVolume;

  if (!player) {
    return;
  }

  player.volume = nextVolume;
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

  isSeeking = false;
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
