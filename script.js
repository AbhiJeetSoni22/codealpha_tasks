let currentSong= new Audio();
let songs;
let currFolder;
function formatTime(seconds) {
   if(isNaN(seconds)|| seconds<0) {
      return "00:00";
   }
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = Math.floor(seconds % 60);

   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
   const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

   return `${formattedMinutes}:${formattedSeconds}`;
}
async function getsongs(folder) {
   currFolder = folder;
   let a = await fetch(`http://127.0.0.1:3001/${folder}/`);
   let l = await a.text();
   let div = document.createElement("div");
   div.innerHTML = l;
   let as = div.getElementsByTagName("a");
   console.log(as);
   songs = [];
   for (let i = 0; i < as.length; i++) {
      
      const element = as[i];
      if (element.href.endsWith(".mp3")) {
         songs.push(element.href.split(`/${folder}/`)[1]);
      }
   }

   playMusic(songs[0],true)

   let songUl=document.querySelector(".songlist").getElementsByTagName("ul")[0];

   songUl.innerHTML = " "
   for (const song of songs) {
     songUl.innerHTML=songUl.innerHTML+`  <li>
                            <img class src="music.svg" alt="">
                        <div class="info">
                          <div class="songname">${song.replaceAll("%20"," ")}</div>
                            <div>song artist-Abhijeet</div>
                        </div>
                        <div class="playnow">
                            <span id="playnowspan">play now</span>
                            <img id="libraryplay" src="playmusic.svg" alt="">
                        </div>
                    </li>`;
                 
   }
   // Palying songs
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
  e.addEventListener("click",ele=>{
   
   playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

  })
})
return songs;
}
const playMusic= (track,pause=false)=>{
   
  currentSong.src=`/${currFolder}/` + track;
  if(!pause){
     currentSong.play();
     play.src="pause.svg";
  }
  
  document.querySelector(".songinfo").innerHTML= track.replaceAll(".mp3","").replaceAll("%20","").replaceAll("_"," ");
  document.querySelector(".songtime").innerHTML="00:00 / 00:00";
}

async function displayAlbums(){
   let a = await fetch(`http://127.0.0.1:3001/songs/`);
   let response = await a.text();
   let div = document.createElement("div");
   div.innerHTML = response;
   let anchors =div.getElementsByTagName("a");
   let cardCont= document.querySelector(".cardCont");
   console.log(anchors);
   let array =Array.from(anchors);
   for (let index = 0; index < array.length-1; index++) {
      const e = array[index];

      if(e.href.includes("/songs/")){
         let folder = e.href.split("/").slice(-1)[0];
         console.log(folder); 
         let a= await fetch(`http://127.0.0.1:3001/songs/${folder}/info.json`);
         let response = await a.json();
            cardCont.innerHTML = cardCont.innerHTML + ` <div data-folder="${folder}" class="card">
                        <div class="greensvg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"
                                color="#000000" fill="black">
                                <path
                                    d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.png" alt="">
                        <h3>${response.title}</h3>
                        <p>${response.discription}</p>
                    </div>`
      }
   }

   Array.from(document.getElementsByClassName("card")).forEach(e=>{
   console.log(e)
   e.addEventListener("click",async (item)=>{
      console.log(item.currentTarget.dataset)
      songs= await getsongs(`songs/${item.currentTarget.dataset.folder}`)
      playMusic(songs[0])
   })
})
}


async function main()  {
 await getsongs("songs/ncs");
//Display all the albums
displayAlbums();

play.addEventListener("click",()=>{

   if(currentSong.paused){
      currentSong.play();
   
      play.src="pause.svg"
      libraryplay.src = "pause.svg"
   }
   else{
       currentSong.pause();
       play.src="play.svg"  
      }
  
})


currentSong.addEventListener("timeupdate",()=>{
   
   document.querySelector(".songtime").innerHTML= `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
   document.querySelector(".circle").style.left=(currentSong.currentTime)/(currentSong.duration)*99+"%";
})

// add event to the seekbar
document.querySelector(".seekbar").addEventListener("click",e=>{
   let percent=( e.offsetX/e.target.getBoundingClientRect().width)*99.5;
   document.querySelector(".circle").style.left = percent +"%";
   currentSong.currentTime= ((currentSong.duration) * percent)/100;
})

// adding event to the hamburger menu
const menu = document.querySelector(".hamburgur");

menu.addEventListener("click",()=>{
   document.querySelector(".left").style.left = 0+"vw";
})

const back = document.querySelector(".back");

back.addEventListener("click",()=>{
   document.querySelector(".left").style.left = -90+"vw";
})
// adding event to the previous and next button

previous.addEventListener("click",()=>{
 
   //code to play previous song
   let index= songs.indexOf(currentSong.src.split("/").slice(-1)[0]);

   
   if((index-1) >=0){
      playMusic(songs[index-1]);
   }
})
next.addEventListener("click",()=>{
   
   
   let index= songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
   
   if((index+1)<songs.length) {
      playMusic(songs[index+1]);
   }
})
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{


  currentSong.volume= parseInt(e.target.value)/100;
})

//add event listener to the volume button
let volume = document.querySelector(".volume > img");
let range= document.querySelector(".range > input");
volume.addEventListener("click",()=>{
  if(range.value == 0){
    range.value = 50;
    currentSong.volume = range.value/100;
    volume.src = volume.src.replace("mute.svg","volume.svg");

  }
  else{
   range.value = 0;
   currentSong.volume = range.value/100;
   volume.src = volume.src.replace("volume.svg","mute.svg");
  }
})
}

main();
