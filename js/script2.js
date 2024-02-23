
let currentSong = new Audio();
let songs
let currfolder
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

async function getSongs(folder) {
  currfolder = folder;
  let a = await fetch(`http://127.0.0.1:3000/spotify-clone/${folder}/`);

  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
   songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith("m4a")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    } else if (element.href.endsWith("mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }



 // Show all the songs in the playlist
 let songul = document
 .querySelector(".song-list")
 .getElementsByTagName("ul")[0];
 songul.innerHTML = ""
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

// Attach an event listener to each song
Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e=>{

 e.addEventListener("click", element=>{

 playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
})
})
return songs;
}

const playMusic =(track, pause=false)=>{
    currentSong.src = `/Spotify-Clone/${currfolder}/` + track
    if(!pause){
      currentSong.play()
      play.src = "Assests/pause.svg"

    }
    document.querySelector(".song-info").innerHTML = decodeURI(track)
    document.querySelector(".song-time").innerHTML = "00:00/00:00"

    
}

async function displayAlbums(){
  
  let a = await fetch(`http://127.0.0.1:3000/spotify-clone/Songs/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
let anchors = div.getElementsByTagName("a")
let cardcontainer = document.querySelector(".card-container")


let array = Array.from(anchors)
 for (let index = 0; index < array.length; index++) {
  const e = array[index];
  
  if (e.href.includes("/Songs")) {
    let folder = e.href.split("/").slice(-2)[0]
   
    // Get the meta data of the folder
    let a = await fetch(`http://127.0.0.1:3000/spotify-clone/Songs/${folder}/info.json`);
    let response = await a.json();
    
    cardcontainer.innerHTML= cardcontainer.innerHTML + `
    <div data-folder="${folder}" class="card">
    
    <div>
    
    <div  class="circle-container flex justify-center items-center cp ">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="svg-content cp" xmlns:xlink="http://www.w3.org/1999/xlink" role="img">
    <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
    </div>
    <img class="cp" src="/Spotify-Clone/Songs/${folder}/thumbnail/cover.jpg" alt="" /></div>
    <div>
    <h2 class="wh cp">${response.title}</h2>
    <p class="gr cp">
    ${response.description}
    </p>
    </div></div>`
  }

  }
  
  
  // load the playlist whenevr cards is clicked
  Array.from(document.getElementsByClassName("card")).forEach(e=> {e.addEventListener("click", async item=>{
    songs = await getSongs(`Songs/${item.currentTarget.dataset.folder}`);
    playMusic(songs[0])
  })
  
});
}


async function main() {
  
  //Get the list of all the songs
  
  await getSongs(`Songs/cs`);

  playMusic(songs[0], true)
  
//Display  all the albums on the page
  displayAlbums()
//attach an event listener to play , next and previous
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
//add an event to volume
document.querySelector(".volrange").addEventListener("change", (e)=>{
 currentSong.volume = parseInt(e.target.value)/100
})

// Add event listener to mute the volume
document.querySelector(".vol>img").addEventListener("click", e=>{
  if (e.target.src.includes("Assests/volume.svg")) {
    e.target.src= e.target.src.replace("Assests/volume.svg","Assests/mute.svg")
    currentSong.volume = .0;
    document.querySelector(".volrange").value = 0

  }
  else {
    e.target.src=  e.target.src.replace("Assests/mute.svg","Assests/volume.svg")
    currentSong.volume= .10
    document.querySelector(".volrange").value = 10
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
