


async function getSongs(){

    let a = await fetch("http://127.0.0.1:3000/spotify%20clone/Songs/")
    
    let response = await a.text();

     let div = document.createElement("div")
     div.innerHTML = response;
     console.log(response)
     let as = div.getElementsByTagName("a")
     let songs =[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith("m4a" || "mp3")) {
            songs.push(element.href.split("/Songs/")[1])
        }

    }
    return songs

}
async function main(){
    let songs = await getSongs()
    console.log(songs)

    let songul = document.querySelector(".song-list").getElementsByTagName("ul")[0]

    for (const song  of songs) {
        songul.innerHTML = songul.innerHTML + `<li> ${song.replaceAll("%20", " ")}</li>`;
    }
     var audio = new Audio(songs[0]);
     audio.play();

    audio.addEventListener("loadeddata", () =>{
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    })


}


main()
