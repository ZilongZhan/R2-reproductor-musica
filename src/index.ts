import { Song, existingSongs, songs } from "./songsData.js";
import {
  addSong,
  areSameSong,
  getErrorMessage,
  getNextSongPosition,
  getSongsCount,
  isCurrentSong,
  isPlaylistFull,
  removeSongByPosition,
  setCurrentSong,
} from "./songs.js";

const newSongForm = document.querySelector(".form");
const newSongTitle = document.querySelector(
  ".form__control#title"
) as HTMLSelectElement;
const songsList = document.querySelector(".songs");
const errorBox = document.querySelector(".error");
const totalBox = document.querySelector(".total");
const player = document.querySelector(".player") as HTMLAudioElement;
const currentSongTitle = document.querySelector(".song-title");
const currentSongDuration = document.querySelector(".song-duration");
const currentSongCredits = document.querySelector(".song-credits");

const urlBase = "https://refactorproject.s3.eu-north-1.amazonaws.com/mp3/";

if (
  !currentSongTitle ||
  !currentSongDuration ||
  !currentSongCredits ||
  !newSongForm ||
  !newSongTitle ||
  !songsList ||
  !errorBox ||
  !totalBox ||
  !player
) {
  throw new Error("Missing elements");
}

existingSongs.forEach(({ title }) => {
  newSongTitle.innerHTML += `<option value="${title}">${title}</option>`;
});

player.addEventListener("ended", () => {
  let currentSongPosition = songs.findIndex((song) => song.isCurrent);

  const nextSongPosition = getNextSongPosition(songs, currentSongPosition);

  const song = songs[nextSongPosition];
  setPlayingSongCurrent(song, songs);
  playSong(song);
});

newSongForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const songTitle = newSongTitle.value;

  const song = existingSongs.find((song) => areSameSong(song, songTitle))!;

  if (songs.some((song) => areSameSong(song, songTitle))) {
    showError(getErrorMessage("exists"));
    return;
  }

  if (isPlaylistFull(songs)) {
    showError(getErrorMessage("limit"));
    return;
  }

  addSong(song, songs);
  newSongTitle.value = "";

  updatePlaylist();
});

const updateSongs = (): void => {
  songsList.innerHTML = songs
    .map(
      ({ title }) =>
        `<li class="song">
          <button class="button play">▶️</button>
          <span class="song__title">${title}</span>
          <button class="button remove">quitar</button>
         </li>`
    )
    .join("");
};

const hydrateButtons = (): void => {
  const removeButtons = document.querySelectorAll(".song .remove");

  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (isCurrentSong(songs[index])) {
        stopSong();
      }

      removeSongByPosition(songs, index);

      updatePlaylist();
    });
  });

  const playButtons = document.querySelectorAll(".song .play");

  playButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const song = songs[index];
      setPlayingSongCurrent(song, songs);
      playSong(song);
    });
  });
};

const playSong = ({ title, durationInSeconds, credits }: Song): void => {
  player.src = `${urlBase}${title}`;
  player.play();
  currentSongTitle.textContent = title;
  currentSongDuration.textContent = `Duración: ${durationInSeconds.toString()}s`;
  currentSongCredits.textContent = "Enlace a los créditos";
  currentSongCredits.setAttribute("href", credits);
};

const stopSong = (): void => {
  player.pause();
  player.src = "";
  currentSongTitle.textContent = "";
  currentSongDuration.textContent = "";
  currentSongCredits.textContent = "";
};

const showError = (message: string): void => {
  errorBox.textContent = message;

  setTimeout(() => {
    errorBox.textContent = "";
  }, 2000);
};

const unsetAllCurrentSongs = (songs: Song[]): void => {
  songs.forEach((song) => (song.isCurrent = false));
};

const setPlayingSongCurrent = (song: Song, songs: Song[]): void => {
  unsetAllCurrentSongs(songs);
  setCurrentSong(song);
};

const updateTotal = (): void => {
  totalBox.textContent = `${getSongsCount(songs)}`;
};

const updatePlaylist = (): void => {
  updateSongs();
  updateTotal();
  hydrateButtons();
};
