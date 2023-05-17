import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SoundService {
    constructor() { }
    playAudio(audioPath) {
        let audio = new Audio();
        audio.src = audioPath;
        audio.load();
        audio.play();
    }
    playOrder() {
        this.playAudio("/assets/audios/order-n.mp3")
    }
    playWin() {
        this.playAudio("/assets/audios/win-n.mp3")
    }
    playLose() {
        this.playAudio("/assets/audios/lose-n.mp3")
    }
}
