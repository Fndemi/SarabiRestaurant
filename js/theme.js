document.addEventListener('DOMContentLoaded', function() {
<<<<<<< HEAD
  // Elements specific to your header/nav
=======
>>>>>>> origin/main
  const header = document.querySelector('header.bg-\\[\\#836262\\]');
  if (!header) return;

  // Create toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '🌙';
  toggleBtn.className = 'dark-mode-toggle ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition';
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
  
<<<<<<< HEAD
  // Insert toggle button in navigation (before hamburger on mobile)
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.insertAdjacentElement('beforebegin', toggleBtn);
  } else {
    // Fallback for desktop
    const nav = document.querySelector('nav');
    nav?.appendChild(toggleBtn);
  }

  // Dark mode colors
  const darkColors = {
    headerBg: '#3a2a2a',
    text: '#f0f0f0',
    hoverText: '#ffffff',
=======
  // Insert toggle button
  const hamburger = document.getElementById('hamburger');
  hamburger?.insertAdjacentElement('beforebegin', toggleBtn);

  // Elements to exclude from dark mode (mobile menu links)
  const excludedSelectors = [
    '#navLinks a',        // All mobile menu links
    '#navLinks a:hover',  // Their hover states
    '#mobileMenuDropdown', // Mobile dropdown
    '#mobileMenuDropdown a' // Dropdown links
  ];

  // Dark mode colors (only for non-excluded elements)
  const darkColors = {
    headerBg: '#3a2a2a',
>>>>>>> origin/main
    buttonBg: '#2d2d2d',
    buttonText: '#f0f0f0',
    buttonHover: '#3d3d3d',
    dropdownBg: '#2d2d2d',
    dropdownText: '#f0f0f0',
<<<<<<< HEAD
    dropdownHover: '#3d3d3d',
    hamburger: '#f0f0f0'
  };

  // Light mode colors (original)
  const lightColors = {
    headerBg: '#836262',
    text: 'white',
    hoverText: '#e0e0e0',
=======
    hamburgerLines: '#f0f0f0'
  };

  // Light mode colors
  const lightColors = {
    headerBg: '#836262',
>>>>>>> origin/main
    buttonBg: 'white',
    buttonText: '#836262',
    buttonHover: '#f0f0f0',
    dropdownBg: 'white',
    dropdownText: '#836262',
<<<<<<< HEAD
    dropdownHover: '#f5f5f5',
    hamburger: 'white'
  };

  // Apply color scheme
  function applyScheme(isDark) {
    const colors = isDark ? darkColors : lightColors;
    
    // Header
    header.style.backgroundColor = colors.headerBg;
    
    // All nav links
    document.querySelectorAll('nav a').forEach(link => {
      link.style.color = colors.text;
      if (link.onmouseover) link.onmouseover(); // Force hover state update
    });
    
    // Mobile menu background
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.style.backgroundColor = colors.headerBg;
    
    // Desktop buttons
    document.querySelectorAll('.md\\:flex a').forEach(btn => {
      btn.style.backgroundColor = colors.buttonBg;
      btn.style.color = colors.buttonText;
    });
    
    // Dropdown menus
=======
    hamburgerLines: 'white'
  };

  // Apply color scheme (excluding mobile menu)
  function applyScheme(isDark) {
    const colors = isDark ? darkColors : lightColors;
    
    // 1. Header background
    header.style.backgroundColor = colors.headerBg;
    
    // 2. Desktop buttons only (explicitly targeted)
    document.querySelectorAll('.md\\:flex a').forEach(btn => {
      if (!btn.closest('#navLinks')) { // Extra exclusion check
        btn.style.backgroundColor = colors.buttonBg;
        btn.style.color = colors.buttonText;
      }
    });
    
    // 3. Desktop dropdowns only
>>>>>>> origin/main
    document.querySelectorAll('.group-hover\\:block').forEach(menu => {
      menu.style.backgroundColor = colors.dropdownBg;
      menu.style.color = colors.dropdownText;
    });
    
<<<<<<< HEAD
    // Hamburger icon
    document.querySelectorAll('#hamburger span').forEach(line => {
      line.style.backgroundColor = colors.hamburger;
    });
    
=======
    // 4. Hamburger icon lines only (not links)
    document.querySelectorAll('#hamburger span').forEach(line => {
      line.style.backgroundColor = colors.hamburgerLines;
    });
    
    // 5. Mobile menu background only (no link styling)
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.style.backgroundColor = colors.headerBg;
    
>>>>>>> origin/main
    // Update toggle icon
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
  }

  // Check preferences
  function initDarkMode() {
<<<<<<< HEAD
    const saved = localStorage.getItem('navDarkMode');
=======
    const saved = localStorage.getItem('headerDarkMode');
>>>>>>> origin/main
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'true' : systemDark;
    applyScheme(isDark);
    return isDark;
  }

  // Toggle functionality
  toggleBtn.addEventListener('click', () => {
    const isDark = !header.classList.contains('dark-mode');
    header.classList.toggle('dark-mode', isDark);
<<<<<<< HEAD
    localStorage.setItem('navDarkMode', isDark);
=======
    localStorage.setItem('headerDarkMode', isDark);
>>>>>>> origin/main
    applyScheme(isDark);
  });

  // Initialize
  header.classList.toggle('dark-mode', initDarkMode());
  
<<<<<<< HEAD
  // Watch for system changes (only if no user preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('navDarkMode')) {
=======
  // System preference listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('headerDarkMode')) {
>>>>>>> origin/main
      applyScheme(e.matches);
    }
  });
});