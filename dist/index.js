class MusicPlayer {
    constructor() {
        this.audioElement = document.getElementById('audio');
        this.titleElement = document.getElementById('title');
        this.artistElement = document.getElementById('artist');
        this.albumElement = document.getElementById('album');
        this.currentIndex = 0;
        this.playlist = [];
        this.updateSongInfo();
        this.addEventListeners();
    }
    updateSongInfo() {
        if (this.playlist.length === 0) {
            this.titleElement.textContent = "empty";
            this.artistElement.textContent = "";
            this.albumElement.textContent = "";
            this.audioElement.src = "";
        }
        else {
            const currentSong = this.playlist[this.currentIndex];
            this.titleElement.textContent = currentSong.title;
            this.artistElement.textContent = currentSong.artist;
            this.albumElement.textContent = currentSong.album;
            this.audioElement.src = currentSong.url;
        }
    }
    addEventListeners() {
        var _a, _b, _c, _d, _e, _f;
        (_a = document.getElementById('play')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.audioElement.play());
        (_b = document.getElementById('pause')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.audioElement.pause());
        (_c = document.getElementById('stop')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        });
        (_d = document.getElementById('prev')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => this.prevSong());
        (_e = document.getElementById('next')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => this.nextSong());
        (_f = document.getElementById('submit-file')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => this.addSong());
    }
    prevSong() {
        if (this.playlist.length > 0) {
            this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
            this.updateSongInfo();
            this.audioElement.play();
        }
    }
    nextSong() {
        if (this.playlist.length > 0) {
            this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
            this.updateSongInfo();
            this.audioElement.play();
        }
    }
    addSong() {
        const fileInput = document.getElementById('song-file');
        const files = fileInput.files;
        if (files && files.length > 0) {
            const file = files[0];
            const url = URL.createObjectURL(file);
            const newSong = { title: file.name, artist: 'Unknown Artist', album: 'Unknown Album', url: url };
            this.playlist.push(newSong);
            fileInput.value = '';
            this.updateSongInfo();
            alert('Song added to playlist!');
        }
        else {
            alert('Please choose a valid audio file.');
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});
export {};
//# sourceMappingURL=index.js.map