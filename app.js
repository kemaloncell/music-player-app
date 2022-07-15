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
const volume = document.querySelector('#volume');
const volumeBar = document.querySelector('#volume-bar');
const ul = document.querySelector('ul');

const player = new MusicPlayer(musicList);

window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
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
    playMusic()
    isPlayingNow();
}

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic()
    isPlayingNow();
}

const pauseMusic = () => {
    container.classList.remove('playing');
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

const playMusic = () => {
    container.classList.add('playing');
    play.querySelector("i").classList = "fa-solid fa-pause"
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

volumeBar.addEventListener('input', (e) => {
    const value = e.target.value;
    audio.volume = value / 100; // audio property has between 0 - 1 value
    if(value == 0){
        audio.muted = true;
        volumeStatus = "silent";
        volume.classList = "fa-solid fa-volume-mute";
        volumeBar.value = 0;
    }else{
        audio.muted = false;
        volumeStatus = "audible";
        volume.classList = "fa-solid fa-volume-up";
    }
})

let volumeStatus = "audible";
volume.addEventListener('click', () => {
    if(volumeStatus === "audible"){
        audio.muted = true;
        volumeStatus = "silent";
        volume.classList = "fa-solid fa-volume-mute";
        volumeBar.value = 0;
    }else{
        audio.muted = false;
        volumeStatus = "audible";
        volume.classList = "fa-solid fa-volume-up";
        volumeBar.value = 100;
    }
})

const displayMusicList = (list) => {
    for(let i = 0; i< list.length; i++){
        let liTag = `
         <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
             <span>${list[i].getName()}</span>
             <span id="music-${i}" class="badge bg-primary rounded-pill">3:40</span>
             <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
         </li>`;
        ul.insertAdjacentHTML('beforeend', liTag);

        let liAudioDuration = document.querySelector(`#music-${i}`);
        let liAudioTag = document.querySelector(`.music-${i}`);

        //after the file is connected
        liAudioTag.addEventListener('loadedmetadata', () => {
            liAudioDuration.textContent = calculateTime(liAudioTag.duration);
        })
    }
}

const selectedMusic = (li) => {
    player.index = li.getAttribute('li-index');
    displayMusic( player.getMusic());
    playMusic();
    isPlayingNow();
}

const isPlayingNow = () => {
    for(let li of ul.querySelectorAll('li')){
      if(li.classList.contains('playing')){
          li.classList.remove('playing');
      }
      // if music is playing
      if(li.getAttribute('li-index') == player.index){
          li.classList.add('playing');
      }
    }
}

audio.addEventListener('ended', () => {
    nextMusic();
})