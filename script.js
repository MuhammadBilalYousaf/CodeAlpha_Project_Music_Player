const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const progressBar = document.getElementById('progress-bar');

let tracks = [];
let currentTrackIndex = 0;
let isFileInput = false;

function loadFiles(event) {
    const files = Array.from(event.target.files);
    tracks = files.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
    }));

    if (tracks.length > 0) {
        loadTrack(0); 
        audio.play();
        playPauseButton.textContent = 'Pause';
        isFileInput = true; 
    }
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
}

function prevTrack() {
    if (isFileInput && tracks.length > 0) {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        audio.play();
        playPauseButton.textContent = 'Pause';
    }
}

function nextTrack() {
    if (isFileInput && tracks.length > 0) {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        audio.play();
        playPauseButton.textContent = 'Pause';
    }
}

function setProgress(value) {
    audio.currentTime = (value / 100) * audio.duration;
}

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

function loadTrack(index) {
    audio.src = tracks[index].url;
    trackName.textContent = tracks[index].name;
    trackArtist.textContent = "Uploaded Track";
}

function increaseVolume() {
    if (audio.volume < 1) {
        audio.volume = Math.min(1, audio.volume + 0.1);
    }
}

function decreaseVolume() {
    if (audio.volume > 0) {
        audio.volume = Math.max(0, audio.volume - 0.1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (!isFileInput && tracks.length > 0) {
        loadTrack(currentTrackIndex);
    }
});
