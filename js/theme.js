document.addEventListener('DOMContentLoaded', function() {
  // Elements specific to your header/nav
  const header = document.querySelector('header.bg-\\[\\#836262\\]');
  if (!header) return;

  // Create toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '🌙';
  toggleBtn.className = 'dark-mode-toggle ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition';
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
  
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
    buttonBg: '#2d2d2d',
    buttonText: '#f0f0f0',
    buttonHover: '#3d3d3d',
    dropdownBg: '#2d2d2d',
    dropdownText: '#f0f0f0',
    dropdownHover: '#3d3d3d',
    hamburger: '#f0f0f0'
  };

  // Light mode colors (original)
  const lightColors = {
    headerBg: '#836262',
    text: 'white',
    hoverText: '#e0e0e0',
    buttonBg: 'white',
    buttonText: '#836262',
    buttonHover: '#f0f0f0',
    dropdownBg: 'white',
    dropdownText: '#836262',
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
    document.querySelectorAll('.group-hover\\:block').forEach(menu => {
      menu.style.backgroundColor = colors.dropdownBg;
      menu.style.color = colors.dropdownText;
    });
    
    // Hamburger icon
    document.querySelectorAll('#hamburger span').forEach(line => {
      line.style.backgroundColor = colors.hamburger;
    });
    
    // Update toggle icon
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
  }

  // Check preferences
  function initDarkMode() {
    const saved = localStorage.getItem('navDarkMode');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'true' : systemDark;
    applyScheme(isDark);
    return isDark;
  }

  // Toggle functionality
  toggleBtn.addEventListener('click', () => {
    const isDark = !header.classList.contains('dark-mode');
    header.classList.toggle('dark-mode', isDark);
    localStorage.setItem('navDarkMode', isDark);
    applyScheme(isDark);
  });

  // Initialize
  header.classList.toggle('dark-mode', initDarkMode());
  
  // Watch for system changes (only if no user preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('navDarkMode')) {
      applyScheme(e.matches);
    }
  });
});