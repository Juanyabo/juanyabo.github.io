const projects = [
  {
    image: "images/lady-umbrella-key-art.webp",
    title: "Lady Umbrella",
    description: "A visually rich adventure game about courage and light in a dark, rainy world.",
    video: "https://www.youtube.com/embed/X_DgUlOjEhE?enablejsapi=1",
    steam: "https://store.steampowered.com/app/3956890/Lady_Umbrella/"
  },
  {
    image: "images/another-project.webp",
    title: "Echo Runner",
    description: "A fast-paced sci-fi platformer focused on speed and precision movement."
  },
  {
    image: "images/third-project.webp",
    title: "Mystic Fields",
    description: "An exploration puzzle game set in a magical countryside filled with secrets."
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

function updateProject(index) {
  pauseVideo();
  const project = projects[index];
  showingVideo = false;

  imageEl.src = project.image;
  imageEl.alt = project.title + " preview";
  titleEl.textContent = project.title;
  descEl.textContent = project.description;

  if (!project.video) {
    videoEl.style.display = "none";
    imageEl.style.display = "block";
    document.querySelector(".media-controls").style.display = "none";
  } else {
    videoEl.src = project.video;
    document.querySelector(".media-controls").style.display = "flex";
    showImage();
  }

  const steamLink = document.getElementById("project-steam");

  if (project.steam) {
    steamLink.href = project.steam;
    steamLink.style.display = "inline-block";
  } else {
    steamLink.style.display = "none";
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