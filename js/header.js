document.addEventListener("DOMContentLoaded", () => {
  // Hamburger toggle for mobile nav links
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });

  // Dropdown toggle for "Menu" on mobile
  const menuButton = document.querySelector("li.relative.group > button");
  const dropdown = menuButton.nextElementSibling;

  menuButton.addEventListener("click", (e) => {
    // Prevent default button behavior
    e.preventDefault();

    // Toggle dropdown visibility
    dropdown.classList.toggle("hidden");
  });

  // Close dropdown if clicking outside (optional)
  document.addEventListener("click", (e) => {
    if (!menuButton.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
});
