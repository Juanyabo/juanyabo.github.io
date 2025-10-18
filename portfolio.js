const projects = [
  {
    image: "images/lady-umbrella-key-art.webp",
    title: "Lady Umbrella",
    description: "Lady Umbrella is a game developed by the student-based studio Zulo Interactive. Set in an Italian town currently under expansion, you play as special agent Francesca De Angelis, who, after being betrayed by her own agency while infiltrating the last remaining mafia gang, must take down both sides. Armed with a technological shotgun umbrella equipped with a shield and integrated gadgets, she fights to uncover the truth. I helped in the development of the game by working on UI systems and gameplay. More details can be found on my GitHub project Lady-Umbrella, and the Steam link to try out the game is available below.",
    video: "https://www.youtube.com/embed/X_DgUlOjEhE?enablejsapi=1",
    steam: "https://store.steampowered.com/app/3956890/Lady_Umbrella/"
  },
  {
    image: "images/talent-tree.webp",
    title: "Classic WoW Talent Tree UI Recreation",
    description: "A project developed in Unreal Engine 5.4 where I challenged myself to recreate the classic World of Warcraft talent tree system. It implements the logic for tier unlocking and visually replicates the original interface using World of Warcraft assets found across various GitHub sources. More details can be found on my GitHub under the project TalentTree."
  },
  {
    gif: "images/unity-project.gif",
    title: "Geolocated AR Experience",
    description: "A project developed in Unity 6.1 using the Lightship SDK and 8th Wall. I was tasked with researching various frameworks and SDKs for a geolocated AR experience. The setup that worked best with the device provided to me was the Lightship SDK for Unity and 8th Wall for the web AR experience. Once the framework was selected, I evaluated how long it would take to scan a zone, generate its mesh, import it into a new scene, add physics or animations to objects, and deploy the project on iOS, Android, and web."
  }
];

let currentIndex = 0;
let showingVideo = false;

const imageEl = document.getElementById("project-image");
const videoEl = document.getElementById("project-video");
const titleEl = document.getElementById("project-title");
const descEl = document.getElementById("project-description");
const prevBtn = document.getElementById("prev-project");
const nextBtn = document.getElementById("next-project");
const imageCircle = document.getElementById("image-circle");
const videoCircle = document.getElementById("video-circle");
const gifEl = document.getElementById("project-gif");

function updateProject(index) {
  pauseVideo();

  if (typeof currentProjectIndex !== "undefined") {
    projects[currentProjectIndex].showingVideo = showingVideo;
  }

  currentProjectIndex = index;
  const project = projects[index];

  // Reset all media visibility first
  imageEl.style.display = "none";
  videoEl.style.display = "none";
  gifEl.style.display = "none";

  imageEl.src = project.image || "";
  imageEl.alt = project.title + " preview";
  titleEl.textContent = project.title;
  descEl.textContent = project.description;

  const steamLink = document.getElementById("project-steam");
  if (project.steam) {
    steamLink.href = project.steam;
    steamLink.style.display = "inline-block";
  } else {
    steamLink.style.display = "none";
  }

  if (project.video) {
    document.querySelector(".media-controls").style.display = "flex";
    if (project.showingVideo) {
      showVideo();
    } else {
      showImage();
    }
  } else if (project.gif) {
    gifEl.src = project.gif;
    gifEl.style.display = "block";
    document.querySelector(".media-controls").style.display = "none";
  } else if (project.image) {
    imageEl.style.display = "block";
    document.querySelector(".media-controls").style.display = "none";
  }
}


function showImage() {
  pauseVideo();
  imageEl.style.display = "block";
  videoEl.style.display = "none";
  imageCircle.className = "fa-solid fa-circle";
  videoCircle.className = "fa-regular fa-circle";
  showingVideo = false;
}

function showVideo() {
  imageEl.style.display = "none";
  videoEl.style.display = "block";
  imageCircle.className = "fa-regular fa-circle";
  videoCircle.className = "fa-solid fa-circle";
  showingVideo = true;
  playVideo();
}

function pauseVideo() {
  videoEl.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
}

function playVideo() {
  videoEl.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}

imageCircle.addEventListener("click", showImage);
videoCircle.addEventListener("click", showVideo);

let startX = 0;
imageEl.addEventListener("mousedown", e => (startX = e.clientX));
imageEl.addEventListener("mouseup", e => {
  const diff = e.clientX - startX;
  if (Math.abs(diff) > 50) {
    if (diff < 0) showVideo();
    else showImage();
  }
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  updateProject(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % projects.length;
  updateProject(currentIndex);
});

updateProject(currentIndex);