const container = document.querySelector('.container');
const image = document.querySelector('#music-image');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
const prev = document.querySelector('#controls #prev');
const play = document.querySelector('#controls #play');
const next = document.querySelector('#controls #next');
const currentTime = document.querySelector('#current-time');
const duration = document.querySelector('#duration');
const progressBar = document.querySelector('#progress-bar');

const player = new MusicPlayer(musicList);

window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music);
})

const displayMusic = (music) => {
    title.innerHTML = music.getName();
    singer.innerHTML = music.singer;
    image.src = `img/${music.img}`;
    audio.src = `mp3/${music.file}`;
}

play.addEventListener('click', () => {
    const isMusicPlay = container.classList.contains('playing');
    isMusicPlay ? pauseMusic() : playMusic();
})

prev.addEventListener('click', () => {prevMusic()})

next.addEventListener('click', () => {nextMusic()})


const prevMusic = () =>{
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    audio.play();
}

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    audio.play();
}

const pauseMusic = () => {
    container.classList.remove('playing');
    play.classList = "fa-solid fa-play";
    audio.pause();
}

const playMusic = () => {
    container.classList.add('playing');
    play.classList = "fa-solid fa-pause"
    audio.play();
}

calculateTime = (seconds) => {
    const munite = Math.floor(seconds / 60); // exp: 180 second / 60 second  = 3 munite
    const second = Math.floor(seconds % 60 ); // exp: 190 second / 60 second = 3 remainder = 10 => remainder of second
    const result = `${munite}:${second < 10 ? '0' : ''}${second}`;
    return result;

}

audio.addEventListener('loadedmetadata', () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
})

audio.addEventListener('timeupdate', () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(audio.currentTime);
})

progressBar.addEventListener('input', () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value

})
