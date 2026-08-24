import artists from "@/data/artists.json";

export interface Track {
  id: string;

  title: string;

  cover: string;

  audio: string;

  duration: number;

  description: string;
}

export interface Release {
  id: string;

  title: string;

  type: "single" | "ep" | "album";

  cover: string;

  releaseDate: string;

  genres: string[];

  description: string;

  tracks: Track[];
}

export interface Artist {
  id: string;

  name: string;

  avatar: string;

  cover: string;

  genres: string[];

  description: string;

  releases: Release[];
}

export function useMusic() {
  const getArtists = (): Artist[] => artists as Artist[];

  const getArtist = (id: string): Artist | undefined =>
    getArtists().find((artist) => artist.id === id);

  const getReleases = (): Release[] =>
    getArtists().flatMap((artist) => artist.releases);

  const getRelease = (id: string): Release | undefined =>
    getReleases().find((release) => release.id === id);

  const getTracks = (): Track[] =>
    getReleases().flatMap((release) => release.tracks);

  const getTrack = (id: string): Track | undefined =>
    getTracks().find((track) => track.id === id);

  return {
    getArtists,

    getArtist,

    getReleases,

    getRelease,

    getTracks,

    getTrack,
  };
}
