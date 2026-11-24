
// ======================================
// 1. DARK / LIGHT MODE
// ======================================

const themeToggle = document.getElementById("theme-toggle");

// Apply saved theme when the website loads
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

// Update theme button icon
function updateThemeIcon() {
    if (document.body.classList.contains("light-theme")) {
        themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    } else {
        themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    }
}

updateThemeIcon();

// Toggle theme on button click
themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-theme");

    const currentTheme =
        document.body.classList.contains("light-theme")
            ? "light"
            : "dark";

    localStorage.setItem("portfolio-theme", currentTheme);

    updateThemeIcon();
});

// ======================================
// 2. MOBILE NAVIGATION
// ======================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open and close mobile menu
menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    // Change hamburger icon to X and back
    menuToggle.innerHTML = isOpen
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';

});

// Close menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = '<i class="bi bi-list"></i>';

    });

});

// Close menu using Escape key
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = '<i class="bi bi-list"></i>';

    }

});


// ======================================
// 3. ANIMATED PROJECT CARDS
// DESKTOP + MOBILE FIX
// ======================================

const projectCards = document.querySelectorAll(".project-card");

const observerOptions = {
    root: null,
    rootMargin: "0px 0px -30px 0px",
    threshold: 0.01
};

if ("IntersectionObserver" in window) {

    const projectObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        observerOptions
    );

    projectCards.forEach((card) => {
        projectObserver.observe(card);
    });

} else {

    // Fallback for unsupported browsers

    projectCards.forEach((card) => {
        card.classList.add("show");
    });

}
