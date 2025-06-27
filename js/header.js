// Mobile menu toggle functionality
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const menuOverlay = document.getElementById("menuOverlay");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenuDropdown = document.getElementById("mobileMenuDropdown");
const mobileMenuIcon = document.getElementById("mobileMenuIcon");
// Add this to your JavaScript file
const darkModeToggle = document.createElement("button");
darkModeToggle.textContent = "🌓";
darkModeToggle.className =
  "fixed bottom-4 right-4 bg-white text-black p-2 rounded-full shadow-lg z-50";
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  // Optional: Save preference to localStorage
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
});

// Add the toggle button to the page
document.body.appendChild(darkModeToggle);

// Check for saved preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}
function toggleMenu() {
  // Toggle hamburger to X animation
  const lines = hamburger.querySelectorAll("span");
  hamburger.classList.toggle("active");

  if (hamburger.classList.contains("active")) {
    // Transform to X
    lines[0].style.transform = "rotate(45deg) translate(6px, 6px)";
    lines[1].style.opacity = "0";
    lines[1].style.transform = "scale(0)";
    lines[2].style.transform = "rotate(-45deg) translate(6px, -6px)";

    // Show menu and overlay
    navLinks.classList.remove("translate-x-full");
    navLinks.classList.add("flex");
    menuOverlay.classList.remove("opacity-0", "invisible");
    menuOverlay.classList.add("opacity-100", "visible");
  } else {
    // Transform back to hamburger
    lines[0].style.transform = "";
    lines[1].style.opacity = "";
    lines[1].style.transform = "";
    lines[2].style.transform = "";

    // Hide menu and overlay
    navLinks.classList.add("translate-x-full");
    navLinks.classList.remove("flex");
    menuOverlay.classList.add("opacity-0", "invisible");
    menuOverlay.classList.remove("opacity-100", "visible");
  }
}

function closeMenu() {
  const lines = hamburger.querySelectorAll("span");
  hamburger.classList.remove("active");

  // Transform back to hamburger
  lines[0].style.transform = "";
  lines[1].style.opacity = "";
  lines[1].style.transform = "";
  lines[2].style.transform = "";

  // Hide menu and overlay
  navLinks.classList.add("translate-x-full");
  navLinks.classList.remove("flex");
  menuOverlay.classList.add("opacity-0", "invisible");
  menuOverlay.classList.remove("opacity-100", "visible");

  // Close mobile menu dropdown if open
  mobileMenuDropdown.classList.add("hidden");
  mobileMenuIcon.style.transform = "";
}

// Mobile menu dropdown toggle
function toggleMobileMenuDropdown() {
  mobileMenuDropdown.classList.toggle("hidden");

  if (mobileMenuDropdown.classList.contains("hidden")) {
    mobileMenuIcon.style.transform = "";
  } else {
    mobileMenuIcon.style.transform = "rotate(180deg)";
  }
}

// Toggle menu when hamburger is clicked
hamburger.addEventListener("click", toggleMenu);

// Close menu when overlay is clicked
menuOverlay.addEventListener("click", closeMenu);

// Toggle mobile menu dropdown
mobileMenuToggle.addEventListener("click", toggleMobileMenuDropdown);

// Close menu when clicking anywhere on the side panel background
navLinks.addEventListener("click", (e) => {
  if (e.target === navLinks && window.innerWidth < 768) {
    closeMenu();
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
});
