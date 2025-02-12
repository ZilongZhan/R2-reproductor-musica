import { Song } from "./songsData";

export const areSameSong = (song: Song, songTitle: string): boolean => {
  return song.title === songTitle;
};

export const addSong = (song: Song, songs: Song[]): void => {
  songs.push(song);
};

export const isPlaylistFull = (songs: Song[]): boolean => {
  const maxPlaylistLength = 4;

  return songs.length >= maxPlaylistLength;
};

export const getErrorMessage = (errorCode: string): string => {
  if (errorCode === "exists") {
    return "La canción ya existe";
  }

  if (errorCode === "limit") {
    return "La playlist está llena";
  }

  return "Ha habido un error! Inténtalo de nuevo";
};

export const getSongsCount = (songs: Song[]): number => {
  return songs.length;
};

export const removeSongByPosition = (songs: Song[], position: number): void => {
  songs.splice(position, 1);
};

export const setCurrentSong = (song: Song): void => {
  song.isCurrent = true;
};

export const getNextSongPosition = (
  songs: Song[],
  currentSongPosition: number
) => {
  const currentSongIndex = currentSongPosition + 1;

  if (currentSongIndex === songs.length) {
    return 0;
  }

  return currentSongPosition + 1;
};

export const isCurrentSong = (song: Song): boolean => {
  return song.isCurrent;
};
