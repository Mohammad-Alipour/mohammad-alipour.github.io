// Smooth scroll
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const el = document.querySelector(a.getAttribute('href'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});

// Theme toggle with auto detection
const themeBtn = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  if (themeBtn) themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

const saved = localStorage.getItem('theme');
if (saved) applyTheme(saved === 'dark');
else applyTheme(prefersDark.matches);

prefersDark.addEventListener('change', e => applyTheme(e.matches));
if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(!document.body.classList.contains('dark')));

// Landing transition with cinematic blur
const landing = document.getElementById('landing');
const enterBtn = document.getElementById('enterBtn');
const resumeWrap = document.querySelector('.wrap');

if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    if (landing.classList.contains('fade-out')) return;

    // Add smooth blur + fade
    landing.style.transition = 'opacity 1.2s ease, transform 1.2s ease, filter 1.2s ease';
    landing.style.transform = 'scale(1)';
    landing.style.filter = 'blur(0px)';
    landing.classList.add('fade-out');

    // Fade-out animation
    landing.style.opacity = '0';
    landing.style.transform = 'scale(1.05)';
    landing.style.filter = 'blur(8px)';

    // Then show resume
    setTimeout(() => {
      landing.style.display = 'none';
      resumeWrap.classList.remove('hidden');
      resumeWrap.style.opacity = 0;
      resumeWrap.style.transform = 'translateY(30px)';
      resumeWrap.style.filter = 'blur(6px)';
      document.body.classList.remove('landing-active');

      // Resume fade-in animation
      resumeWrap.style.transition = 'opacity 1s ease, transform 1s ease, filter 1s ease';
      requestAnimationFrame(() => {
        resumeWrap.style.opacity = 1;
        resumeWrap.style.transform = 'translateY(0)';
        resumeWrap.style.filter = 'blur(0px)';
      });
    }, 1000);
  });
}
