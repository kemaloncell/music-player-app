const container = document.querySelector('.container');
const image = document.querySelector('#music-image');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
const prev = document.querySelector('#controls #prev');
const play = document.querySelector('#controls #play');
const next = document.querySelector('#controls #next');

const player = new MusicPlayer(musicList);

window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music);
})

function displayMusic(music){
    title.innerHTML = music.getName();
    singer.innerHTML = music.singer;
    image.src = `img/${music.img}`;
    audio.src = `mp3/${music.file}`;
}

play.addEventListener('click', () => {
    audio.play();
})


