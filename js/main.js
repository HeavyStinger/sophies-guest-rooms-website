// Handle mobile navbar
const hamburgerWrapper = document.getElementById("hamburger-wrapper");
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

hamburgerWrapper.addEventListener("click", () => {
    menuBtn.checked = !menuBtn.checked;
    navLinks.classList.toggle("active", menuBtn.checked);
});

menuBtn.addEventListener("change", () => {
    navLinks.classList.toggle("active", menuBtn.checked);
});