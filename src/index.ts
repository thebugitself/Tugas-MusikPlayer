class MusicPlayer {
    private audioElement: HTMLAudioElement;
    private titleElement: HTMLElement;
    private artistElement: HTMLElement;
    private albumElement: HTMLElement;
    private currentIndex: number;
    private playlist: Array<{ title: string, artist: string, album: string, url: string }>;

    constructor() {
        this.audioElement = document.getElementById('audio') as HTMLAudioElement;
        this.titleElement = document.getElementById('title') as HTMLElement;
        this.artistElement = document.getElementById('artist') as HTMLElement;
        this.albumElement = document.getElementById('album') as HTMLElement;
        this.currentIndex = 0;

        this.playlist = [];

        this.updateSongInfo();
        this.addEventListeners();
    }

    private updateSongInfo() {
        if (this.playlist.length === 0) {
            this.titleElement.textContent = "empty";
            this.artistElement.textContent = "";
            this.albumElement.textContent = "";
            this.audioElement.src = "";
        } else {
            const currentSong = this.playlist[this.currentIndex];
            this.titleElement.textContent = currentSong.title;
            this.artistElement.textContent = currentSong.artist;
            this.albumElement.textContent = currentSong.album;
            this.audioElement.src = currentSong.url;
        }
    }

    private addEventListeners() {
        document.getElementById('play')?.addEventListener('click', () => this.audioElement.play());
        document.getElementById('pause')?.addEventListener('click', () => this.audioElement.pause());
        document.getElementById('stop')?.addEventListener('click', () => {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        });
        document.getElementById('prev')?.addEventListener('click', () => this.prevSong());
        document.getElementById('next')?.addEventListener('click', () => this.nextSong());

        document.getElementById('submit-file')?.addEventListener('click', () => this.addSong());
    }

    private prevSong() {
        if (this.playlist.length > 0) {
            this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
            this.updateSongInfo();
            this.audioElement.play();
        }
    }

    private nextSong() {
        if (this.playlist.length > 0) {
            this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
            this.updateSongInfo();
            this.audioElement.play();
        }
    }

    private addSong() {
        const fileInput = document.getElementById('song-file') as HTMLInputElement;
        const files = fileInput.files;
        if (files && files.length > 0) {
            const file = files[0];
            const url = URL.createObjectURL(file);
            const newSong = { title: file.name, artist: 'Unknown Artist', album: 'Unknown Album', url: url };
            this.playlist.push(newSong);
            fileInput.value = '';
            this.updateSongInfo();
            alert('Song added to playlist!');
        } else {
            alert('Please choose a valid audio file.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});
