const hero = document.querySelector(".hero"),
  header = document.querySelector("header"),
  menu = document.querySelector("#menu"),
  nav = document.querySelector("header nav ul"),
  up = document.querySelector(".up"),
  music = document.querySelector(".music"),
  themeButton = document.getElementById("theme-button"),
  dropdownContent = document.querySelector(".dropdown-content"),
  dropdown = document.getElementById("dropdown"),
  container = document.querySelector(".container"),
  img = document.getElementById("hero-img");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      up.classList.add("active");
    } else {
      up.classList.remove("active");
    }
  });
});

observer.observe(hero);

up.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", async () => {
  const DefaultTheme = localStorage.getItem("theme") || "system";
  applyTheme(DefaultTheme);

  const imagePath = "/images/profiles.png";

  const CV_PATH = "/CV/InggritSetyaBudi_CV.pdf";

  const responseCV = await fetch(CV_PATH);
  const blobCV = await responseCV.blob();
  const urlCV = URL.createObjectURL(blobCV);

  document.querySelector("a.btn").setAttribute("href", urlCV);

  const response = await fetch(imagePath);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  img.src = url;
});

document.addEventListener("click", (e) => {
  if (e.target !== themeButton && e.target !== dropdown) {
    dropdownContent.classList.remove("show");
    container.children[1].classList.remove("fa-angle-up");
  }
});

themeButton.addEventListener("click", () => {
  container.children[1].classList.toggle("fa-angle-up");
  dropdownContent.classList.toggle("show");
});

dropdownContent.addEventListener("click", (e) => {
  const selectedTheme = e.target.getAttribute("data-theme");
  localStorage.removeItem("theme");
  if (selectedTheme) {
    applyTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    dropdownContent.classList.remove("show");
    container.children[1].classList.remove("fa-angle-up");
  }
});

function applyTheme(theme) {
  if (theme === "system") {
    const media = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (media) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      themeButton.classList.remove("fa-solid", "fa-sun");
      themeButton.classList.add("fa-solid", "fa-moon");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      themeButton.classList.remove("fa-solid", "fa-moon");
      themeButton.classList.add("fa-solid", "fa-sun");
    }
  } else if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    themeButton.classList.remove("fa-solid", "fa-moon");
    themeButton.classList.add("fa-solid", "fa-sun");
  } else if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    themeButton.classList.remove("fa-solid", "fa-sun");
    themeButton.classList.add("fa-solid", "fa-moon");
  }
}

window.onscroll = () => {
  header.classList.toggle("glass", window.scrollY > 0);
};

const audio = new Audio("audio/On My Way.mp3");
const detailMusic = document.querySelector(".details-music");

music.addEventListener("click", () => {
  if (audio.paused && !music.ended) {
    audio.play();
    music.classList.add("playing");
    music.children[0].classList.replace("fa-music", "fa-pause");
    detailMusic.classList.add("shown");
    setTimeout(() => {
      detailMusic.classList.remove("shown");
    }, 5000);
  } else {
    audio.pause();
    music.classList.remove("playing");
    music.children[0].classList.replace("fa-pause", "fa-music");
  }
});

audio.onended = () => {
  music.classList.remove("playing");
  music.children[0].classList.replace("fa-pause", "fa-music");
  audio.currentTime = 0;
  audio.pause();
};

menu.addEventListener("click", () => {
  nav.classList.toggle("active");
  if (!header.classList.contains("glass")) {
    header.classList.toggle("glass");
  }
  if (nav.classList.contains("active")) {
    menu.classList.replace("fa-bars", "fa-times");
  } else {
    menu.classList.replace("fa-times", "fa-bars");
  }
});

window.addEventListener("click", function (event) {
  if (
    nav.classList.contains("active") &&
    event.target != nav &&
    event.target != menu
  ) {
    nav.classList.remove("active");
    header.classList.remove("glass");
    menu.classList.replace("fa-times", "fa-bars");
  }
});

document.querySelector("#search-icon").onclick = () => {
  document.querySelector("#search-form").classList.toggle("active");
};

document.querySelector("#close").onclick = () => {
  document.querySelector("#search-form").classList.remove("active");
};

const roles = [
  "Web Developer",
  "Software Engineer",
  "Backend Developer",
  "Frontend Developer",
  "Fullstack Developer",
  "React Developer",
];

let roleIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const delayAfterTyping = 4000;

function changeRole() {
  const roleElement = document.getElementById("role");
  const currentRole = roles[roleIndex];

  roleElement.textContent = "";
  roleElement.style.width = "0ch";
  charIndex = 0;

  function change() {
    if (charIndex < currentRole.length) {
      roleElement.textContent += currentRole.charAt(charIndex);

      roleElement.style.width = `${charIndex}ch`;

      charIndex++;

      setTimeout(change, typingSpeed);
    } else {
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        changeRole();
      }, delayAfterTyping);
    }
  }

  change();
}

changeRole();

document.querySelector(
  "footer .copyright"
).innerHTML = `&copy; ${new Date().getFullYear()} Made with <i class="fa-solid fa-heart" style="color: red;"></i> By <strong style="color: var(--senary-color);">Inggrit Setya Budi</strong>`;
