console.log("welcome to spotify");

let songIndex = 0;
let songs = [
    { songname: "Tujhko", filePath: "audio.mp3", coverPath: "love.jpeg" },
    { songname: "Warriyo", filePath: "audio2.mp3", coverPath: "love.jpeg" },
    { songname: "Headlight", filePath: "audio3.mp3", coverPath: "love.jpeg" },
    { songname: "Barbad", filePath: "audio4.mp3", coverPath: "love.jpeg" },
    { songname: "Sariya Sarkava Raja Ji", filePath: "audio5.mp3", coverPath: "love.jpeg" },
    { songname: "Balamua", filePath: "balamua.mp3", coverPath: "love.jpeg" },
    { songname: "Balma", filePath: "balma.mp3", coverPath: "love.jpeg" },
    { songname: "Kamar Me Daagi", filePath: "kamar me daagi.mp3", coverPath: "love.jpeg" },
    { songname: "Jhumka Jhulaniya", filePath: "jhumka jhulaniya.mp3", coverPath: "love.jpeg" }
];

let audioElement = new Audio(songs[songIndex].filePath);
let masterPlay = document.getElementById("masterPlay");
let myprogressbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let currentSongName = document.getElementById("currentSongName");
let previousButton = document.getElementById("previous");
let nextButton = document.getElementById("next");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemPlays = Array.from(document.getElementsByClassName("songItemPlay"));

function makeAllPlays() {
    songItemPlays.forEach((icon) => {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    });
}

function updateSongInfo() {
    currentSongName.innerText = songs[songIndex].songname;
}

function showPlayingIcons() {
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    makeAllPlays();
    songItemPlays[songIndex].classList.remove("fa-play");
    songItemPlays[songIndex].classList.add("fa-pause");
    gif.style.opacity = 1;
}

function showPausedIcons() {
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    makeAllPlays();
    gif.style.opacity = 0;
}

function loadSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    myprogressbar.value = 0;
    updateSongInfo();
}

function playSong(index) {
    loadSong(index);
    audioElement.play();
    showPlayingIcons();
}

songItems.forEach((element, i) => {
    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songName").innerText = songs[i].songname;

    element.addEventListener("click", () => {
        playSong(i);
    });
});

masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        showPlayingIcons();
    } else {
        audioElement.pause();
        showPausedIcons();
    }
});

nextButton.addEventListener("click", () => {
    let nextIndex = songIndex + 1;
    if (nextIndex >= songs.length) {
        nextIndex = 0;
    }
    playSong(nextIndex);
});

previousButton.addEventListener("click", () => {
    let previousIndex = songIndex - 1;
    if (previousIndex < 0) {
        previousIndex = songs.length - 1;
    }
    playSong(previousIndex);
});

audioElement.addEventListener("timeupdate", () => {
    if (audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myprogressbar.value = progress;
    }
});

myprogressbar.addEventListener("change", () => {
    if (audioElement.duration) {
        audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
    }
});

audioElement.addEventListener("ended", () => {
    showPausedIcons();
    myprogressbar.value = 0;
});

updateSongInfo();
showPausedIcons();
let homeLink = document.getElementById("homeLink");
let aboutLink = document.getElementById("aboutLink");
let aboutSection = document.getElementById("about");

function setActiveNav(activeLink) {
    if (!homeLink || !aboutLink || !activeLink) {
        return;
    }

    homeLink.classList.remove("active");
    aboutLink.classList.remove("active");
    activeLink.classList.add("active");
}

if (homeLink && aboutLink && aboutSection) {
    homeLink.addEventListener("click", () => {
        setActiveNav(homeLink);
    });

    aboutLink.addEventListener("click", () => {
        setActiveNav(aboutLink);
    });

    window.addEventListener("scroll", () => {
        let aboutTop = aboutSection.getBoundingClientRect().top;
        if (aboutTop < window.innerHeight / 2) {
            setActiveNav(aboutLink);
        } else {
            setActiveNav(homeLink);
        }
    });
}
