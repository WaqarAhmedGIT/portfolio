const works = [
  {
    file: "work-01.jpg",
    title: "1 Billion Followers Summit",
    subtitle: "Project overview · Expo for Content Creators",
    tag: "event",
  },
  {
    file: "work-02.jpg",
    title: "Immersive Activations",
    subtitle: "1 Billion Followers Summit",
    tag: "spatial",
  },
  {
    file: "work-03.jpg",
    title: "Guest Journey",
    subtitle: "Registration, lounges, and live moments",
    tag: "event",
  },
  {
    file: "work-04.jpg",
    title: "Wayfinding & Print",
    subtitle: "Amazon Ads × Twitch · The Connected Worlds",
    tag: "brand",
  },
  {
    file: "work-05.jpg",
    title: "Stage Experience",
    subtitle: "The Connected Worlds, Riyadh 2022",
    tag: "event",
  },
  {
    file: "work-06.jpg",
    title: "Aramco GIITS",
    subtitle: "Project overview · Land of Opportunities",
    tag: "event",
  },
  {
    file: "work-07.jpg",
    title: "Spatial Identity",
    subtitle: "Aramco × GITEX",
    tag: "spatial",
  },
  {
    file: "work-08.jpg",
    title: "Complete Event Branding",
    subtitle: "World Safety Summit",
    tag: "brand",
  },
  {
    file: "work-09.jpg",
    title: "Brand Systems",
    subtitle: "G20 · SHOOF · Google",
    tag: "brand",
    wide: true,
  },
  {
    file: "work-10.jpg",
    title: "Creating Stories",
    subtitle: "SHOOF · Al Qadsiah",
    tag: "brand",
    wide: true,
  },
  {
    file: "work-11.jpg",
    title: "Al Fursan Endurance AlUla",
    subtitle: "Identity, hospitality, and desert wayfinding",
    tag: "brand",
    wide: true,
  },
  {
    file: "work-12.jpg",
    title: "Richard Mille AlUla Desert Polo",
    subtitle: "Luxury event identity in the desert",
    tag: "brand",
    wide: true,
  },
  {
    file: "work-13.jpg",
    title: "Merch & Presentations",
    subtitle: "1B Summit · Amazon · Aramco",
    tag: "brand",
    wide: true,
  },
  {
    file: "work-14.jpg",
    title: "Identity Systems",
    subtitle: "Made in Saudi · Tamer · Knowledge Summit",
    tag: "brand",
    wide: true,
  },
  {
    file: "work-15.jpg",
    title: "Tamer Centennial",
    subtitle: "100 years corporate celebration",
    tag: "event",
    wide: true,
  },
  {
    file: "work-16.jpg",
    title: "Exhibition Stands",
    subtitle: "Amazon · Google · Aramco",
    tag: "spatial",
    panorama: true,
  },
  {
    file: "work-17.jpg",
    title: "Knowledge Summit",
    subtitle: "Dubai · Made in Saudi",
    tag: "event",
    wide: true,
  },
];

const grid = document.getElementById("work-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const year = document.getElementById("year");
const nav = document.getElementById("site-nav");
const toggle = document.querySelector(".nav-toggle");

let currentIndex = 0;
let visibleWorks = works;

function cardClass(work) {
  if (work.panorama) return "work-card panorama";
  if (work.wide) return "work-card wide";
  return "work-card";
}

function render(filter = "all") {
  visibleWorks = filter === "all" ? works : works.filter((work) => work.tag === filter);
  grid.innerHTML = visibleWorks
    .map((work, index) => {
      const number = String(works.indexOf(work) + 1).padStart(2, "0");
      return `
        <button class="${cardClass(work)}" type="button" data-index="${index}">
          <figure>
            <img src="assets/images/${work.file}" alt="${work.title}" loading="lazy" />
            <figcaption>
              <span>
                <span class="num">${number}</span>
                <span class="title"> ${work.title}</span>
              </span>
              <span class="meta">${work.subtitle}</span>
            </figcaption>
          </figure>
        </button>
      `;
    })
    .join("");
}

function openLightbox(index) {
  currentIndex = index;
  const work = visibleWorks[currentIndex];
  lightboxImage.src = `assets/images/${work.file}`;
  lightboxImage.alt = work.title;
  lightboxCaption.textContent = `${work.title} — ${work.subtitle}`;
  if (!lightbox.open) lightbox.showModal();
}

function step(delta) {
  if (!visibleWorks.length) return;
  currentIndex = (currentIndex + delta + visibleWorks.length) % visibleWorks.length;
  openLightbox(currentIndex);
}

render();

grid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-index]");
  if (!card) return;
  openLightbox(Number(card.dataset.index));
});

document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    render(button.dataset.filter);
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
document.querySelector(".lightbox-prev").addEventListener("click", () => step(-1));
document.querySelector(".lightbox-next").addEventListener("click", () => step(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowRight") step(1);
  if (event.key === "ArrowLeft") step(-1);
});

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

year.textContent = new Date().getFullYear();
