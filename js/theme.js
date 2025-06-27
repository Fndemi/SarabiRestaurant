document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header.bg-\\[\\#836262\\]');
  if (!header) return;

  // Create toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '🌙';
  toggleBtn.className = 'dark-mode-toggle ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition';
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
  
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
    buttonBg: '#2d2d2d',
    buttonText: '#f0f0f0',
    buttonHover: '#3d3d3d',
    dropdownBg: '#2d2d2d',
    dropdownText: '#f0f0f0',
    hamburgerLines: '#f0f0f0'
  };

  // Light mode colors
  const lightColors = {
    headerBg: '#836262',
    buttonBg: 'white',
    buttonText: '#836262',
    buttonHover: '#f0f0f0',
    dropdownBg: 'white',
    dropdownText: '#836262',
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
    document.querySelectorAll('.group-hover\\:block').forEach(menu => {
      menu.style.backgroundColor = colors.dropdownBg;
      menu.style.color = colors.dropdownText;
    });
    
    // 4. Hamburger icon lines only (not links)
    document.querySelectorAll('#hamburger span').forEach(line => {
      line.style.backgroundColor = colors.hamburgerLines;
    });
    
    // 5. Mobile menu background only (no link styling)
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.style.backgroundColor = colors.headerBg;
    
    // Update toggle icon
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
  }

  // Check preferences
  function initDarkMode() {
    const saved = localStorage.getItem('headerDarkMode');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'true' : systemDark;
    applyScheme(isDark);
    return isDark;
  }

  // Toggle functionality
  toggleBtn.addEventListener('click', () => {
    const isDark = !header.classList.contains('dark-mode');
    header.classList.toggle('dark-mode', isDark);
    localStorage.setItem('headerDarkMode', isDark);
    applyScheme(isDark);
  });

  // Initialize
  header.classList.toggle('dark-mode', initDarkMode());
  
  // System preference listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('headerDarkMode')) {
      applyScheme(e.matches);
    }
  });
});