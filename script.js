console.log("Welcome to PlaySongz")

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.Faded.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs =[
    {songName: "Faded", filePath:"songs/1.Faded.mp3", coverPath: "covers/1.jpg"},
    {songName: "Alone", filePath:"songs/2.Alone.mp3", coverPath: "covers/2.png"},
    {songName: "On My Way", filePath:"songs/3.On My Way.mp3", coverPath: "covers/3.jfif"},
    {songName: "Darkside", filePath:"songs/4.Darkside.mp3", coverPath: "covers/4.jfif"},
    {songName: "The Spectre", filePath:"songs/5.The Spectre.mp3", coverPath: "covers/5.jpg"},
    {songName: "Ignite", filePath:"songs/6.Ignite.mp3", coverPath: "covers/6.jfif"},
    {songName: "Sing Me To Sleep", filePath:"songs/7.Sing Me To Sleep.mp3", coverPath: "covers/7.png"},
    {songName: "All Falls Down", filePath:"songs/8.All Falls Down.mp3", coverPath: "covers/8.png"},
    {songName: "XYZ", filePath:"songs/8.mp3", coverPath: "covers/4.jfif"},
    {songName: "ANXSAND", filePath:"songs/8.mp3", coverPath: "covers/6.jfif"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath; 
    //element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        //audioElement.src = songs[songIndex].filePath;
        audioElement.src = `songs/${songIndex+1}.${songs[songIndex].songName}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
       
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    //audioElement.src = songs[songIndex+1].filePath;
    audioElement.src = `songs/${songIndex+1}.${songs[songIndex].songName}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    //audioElement.src = songs[songIndex+1].filePath;
    audioElement.src = `songs/${songIndex+1}.${songs[songIndex].songName}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');  
})