
let currentSong = new Audio();
let songs
function secondsToMinuteSeconds(seconds){
  if (isNaN(seconds) || seconds < 0){
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`

}

async function getSongs() {
  let a = await fetch("http://127.0.0.1:3000/spotify-clone/Songs/");

  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith("m4a")) {
      songs.push(element.href.split("/Songs/")[1]);
    } else if (element.href.endsWith("mp3")) {
      songs.push(element.href.split("/Songs/")[1]);
    }
  }
  return songs;
}

const playMusic =(track, pause=false)=>{
    currentSong.src = "/Spotify-Clone/songs/" + track
    if(!pause){
      currentSong.play()
      play.src = "Assests/pause.svg"

    }
    document.querySelector(".song-info").innerHTML = decodeURI(track)
    document.querySelector(".song-time").innerHTML = "00:00/00:00"
}



async function main() {

    

  songs = await getSongs();

  playMusic(songs[0], true)

  let songul = document
    .querySelector(".song-list")
    .getElementsByTagName("ul")[0];

  for (const song of songs) {
    songul.innerHTML =
      songul.innerHTML +
      `
        <li class="flex cp"><img src="Assests/music.svg" alt="">
        <div class="info">
          <div> ${song.replaceAll("%20", " ")}</div>
          <div>vishal</div>
        </div>
        <img class="cp" src="Assests/play.svg" alt="">
        
        
        
       </li>`;
  }
  

  Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e=>{

    e.addEventListener("click", element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML)
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
  })
})

play.addEventListener("click", ()=>{
  if (currentSong.paused) {
    currentSong.play()
    play.src = "Assests/pause.svg"
  }
  else {
    currentSong.pause()
    play.src = "Assests/play.svg"
  }

})

currentSong.addEventListener("timeupdate", ()=>{
  
  document.querySelector(".song-time").innerHTML =`${secondsToMinuteSeconds(currentSong.currentTime)}/${secondsToMinuteSeconds(currentSong.duration)}`

  document.querySelector(".circlebar").style.left = (currentSong.currentTime/ currentSong.duration) * 100 +"%"

})

document.querySelector(".seekbar").addEventListener("click", e=>{
  let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100
 document.querySelector(".circlebar").style.left = percent + "%";
 currentSong.currentTime = ((currentSong.duration)* percent) / 100
})

document.querySelector(".menu").addEventListener("click", ()=>{
  document.querySelector(".mainbox1").style.left = "0"
})

document.querySelector(".close").addEventListener("click", ()=>{
  document.querySelector(".mainbox1").style.left = "-100%"
})

previous.addEventListener("click", ()=>{
  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
  if ((index-1) >= 0){
    playMusic(songs[index-1])
  }
})

next.addEventListener("click", ()=>{
  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
  if ((index+1) < songs.length){
    playMusic(songs[index+1])
  }
})

document.querySelector(".volrange").addEventListener("change", (e)=>{
 currentSong.volume = parseInt(e.target.value)/100
})




}

main();

function getrc() {
  let v1 = Math.ceil(0 + Math.random() * 255);
  let v2 = Math.ceil(0 + Math.random() * 255);
  let v3 = Math.ceil(0 + Math.random() * 255);

  return `rgb(${v1},${v2},${v3})`;
}
setInterval(() => {
  document.querySelector(".playbar").style.background = getrc();
}, 1000);
