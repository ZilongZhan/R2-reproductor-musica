import { Song } from "./songsData";

export const areSameSong = (song: Song, songTitle: string): boolean => {
  const areSame = song.title === songTitle;

  return areSame;
};

export const addSong = (song: Song, songs: Song[]): void => {
  songs.push(song);
};

export const isPlaylistFull = (songs: Song[]): boolean => {
  const maxPlaylistLength = 4;
  const isFull = songs.length >= maxPlaylistLength;

  return isFull;
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
  const songsCount = songs.length;

  return songsCount;
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
  const lastSongIndex = songs.length - 1;
  let nextSongPosition = currentSongPosition + 1;

  if (currentSongPosition === lastSongIndex) {
    nextSongPosition = 0;
  }

  return nextSongPosition;
};

export const isCurrentSong = (song: Song): boolean => {
  const isCurrent = song.isCurrent;

  return isCurrent;
};
