/* =========================================
   HOBBY IMAGE CAROUSEL
========================================= */

const hobbyImages = [
    "images/image3.jpeg", // Travel
    "images/image1.jpeg", // Photography
    "images/image4.jpeg", // Fitness
    "images/image2.jpeg" // Gaming
];

let hobbyIndex = 0;

const hobbyImage = document.getElementById("hobby-image");
const hobbyPrev = document.querySelector(".hobby-prev");
const hobbyNext = document.querySelector(".hobby-next");

function updateHobbyImage() {
    hobbyImage.style.opacity = "0";

    setTimeout(() => {
        hobbyImage.src = hobbyImages[hobbyIndex];
        hobbyImage.style.opacity = "1";
    }, 250);
}

if (hobbyImage) {
    hobbyImage.src = hobbyImages[0];
}

hobbyPrev.addEventListener("click", () => {
    hobbyIndex--;

    if (hobbyIndex < 0) {
        hobbyIndex = hobbyImages.length - 1;
    }

    updateHobbyImage();
});

hobbyNext.addEventListener("click", () => {
    hobbyIndex++;

    if (hobbyIndex >= hobbyImages.length) {
        hobbyIndex = 0;
    }

    updateHobbyImage();
});

/* =========================================
   PROJECT DATA
========================================= */

const githubUsername = "dveek";

let projects = [];
let projectIndex = 0;

/* PROJECTS TO DISPLAY */
const selectedProjects = [
    "omni-search",
    "DAA-TSP",
    "ccms",
    "Billing-System"
];

/* CUSTOM TITLES */
const customTitles = {
    "omni-search": "OMNI Search",
    "DAA-TSP": "Visual Representation of TSP",
    "ccms": "Credit Card Management System",
    "Billing-System": "Groceries Billing System"
};

/* CUSTOM DESCRIPTIONS */
const customDescriptions = {

    "omni-search":
        "A Python-based search tool that combines local document search, web scraping, and AI-generated answers into one seamless system.",

    "DAA-TSP":
        "Travelling Salesman Problem Visualizer that graphically demonstrates how algorithms find the shortest route while visiting every city exactly once.",

    "ccms":
        "Credit Card Management System with secure authentication, transaction management, billing operations, and customer account handling.",
    "Billing-System": 
    "Full-stack Billing System built with HTML, CSS, JavaScript, Node.js, and SQL. Features bill creation, automatic total calculations, customer billing management, and secure storage of records in a local SQL database. Demonstrates CRUD operations, backend integration, and data persistence."

};

const projectCard = document.getElementById("project-card");
const projectPrev = document.querySelector(".project-prev");
const projectNext = document.querySelector(".project-next");
async function fetchProjects() {

    try {

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos`
        );

        const data = await response.json();

        projects = data.filter(repo =>
            selectedProjects.includes(repo.name)
        );

        renderProject();

    } catch (error) {

        console.error(error);

        projectCard.innerHTML = `
            <h3>Failed to load projects</h3>
        `;
    }
}

/* =========================================
   PROJECT CARD RENDER
========================================= */

function renderProject() {

    if (projects.length === 0) return;

    const project = projects[projectIndex];

    projectCard.innerHTML = `

     <h3>${customTitles[project.name] || project.name}</h3>

        <p>
        ${
            customDescriptions[project.name]
            || project.description
            || "No description available."
        }
        </p>

        <a
            href="${project.html_url}"
            target="_blank"
            class="project-btn"
        >
            View Project
        </a>

    `;
}


/* =========================================
   PROJECT NAVIGATION
========================================= */

projectPrev.addEventListener("click", () => {

    if (projects.length === 0) return;

    projectIndex--;

    if (projectIndex < 0) {
        projectIndex = projects.length - 1;
    }

    renderProject();
});
projectNext.addEventListener("click", () => {

    if (projects.length === 0) return;

    projectIndex++;

    if (projectIndex >= projects.length) {
        projectIndex = 0;
    }

    renderProject();
});

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");
            }
        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});

/* =========================================
   HERO PARALLAX EFFECT
========================================= */

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    const scrollY = window.scrollY;

    if (hero) {

        hero.style.backgroundPositionY =
            `${scrollY * 0.3}px`;
    }
});

/* =========================================
   TIMELINE ANIMATION
========================================= */

const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateX(0)";
            }
        });

    },
    {
        threshold: 0.2
    }
);

timelineItems.forEach((item, index) => {

    item.style.opacity = "0";
    item.style.transform = "translateX(-40px)";
    item.style.transition = `all 0.8s ease ${index * 0.15}s`;

    timelineObserver.observe(item);
});

/* =========================================
   SKILL CARD HOVER EFFECT
========================================= */

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-8px) scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0) scale(1)";
    });
});

/* =========================================
   AUTO ROTATE HOBBY IMAGES
========================================= */

setInterval(() => {

    hobbyIndex++;

    if (hobbyIndex >= hobbyImages.length) {
        hobbyIndex = 0;
    }

    updateHobbyImage();

}, 6000);

/* =========================================
   AUTO ROTATE PROJECTS
========================================= */

setInterval(() => {

    if (projects.length === 0) return;

    projectIndex++;

    if (projectIndex >= projects.length) {
        projectIndex = 0;
    }

    renderProject();

}, 8000);

/* =========================================
   IMAGE FADE TRANSITION
========================================= */

if (hobbyImage) {

    hobbyImage.style.transition =
        "opacity 0.4s ease";
}

/* =========================================
   PROJECT FADE TRANSITION
========================================= */

if (projectCard) {

    projectCard.style.transition =
        "opacity 0.4s ease, transform 0.4s ease";
}

/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "Karney Advik Portfolio Loaded Successfully"
);
fetchProjects();