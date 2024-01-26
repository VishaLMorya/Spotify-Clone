
let currentSong = new Audio();

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

const playMusic =(track)=>{
    currentSong.src = "/Spotify-Clone/songs/" + track
    currentSong.play()
    play.src = "Assests/pause.svg"
    document.querySelector(".song-info").innerHTML = "track"
    document.querySelector(".song-time").innerHTML = "00:00/00:00"
}



async function main() {

    

  let songs = await getSongs();

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
