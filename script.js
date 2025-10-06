// Smooth scroll
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const el = document.querySelector(a.getAttribute('href'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});

// Theme toggle
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

// Typing effect
const typeText = document.getElementById("typeText");
const text = "Backend Developer — Golang & System Design";
let idx = 0;
function type() {
  if (idx < text.length) {
    typeText.textContent += text.charAt(idx);
    idx++;
    setTimeout(type, 80);
  }
}
if (typeText) type();

// Landing transition
const landing = document.getElementById('landing');
const enterBtn = document.getElementById('enterBtn');
const resumeWrap = document.querySelector('.wrap');
if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    if (landing.classList.contains('fade-out')) return;
    landing.classList.add('fade-out');
    setTimeout(() => {
      landing.style.display = 'none';
      resumeWrap.classList.remove('hidden');
      resumeWrap.style.opacity = 0;
      document.body.classList.remove('landing-active');
      requestAnimationFrame(() => {
        resumeWrap.style.transition = 'opacity 0.8s ease';
        resumeWrap.style.opacity = 1;
      });
    }, 700);
  });
}

//  WAVE EFFECT for Skills 
document.querySelectorAll('.chip').forEach(chip => {
  const level = parseInt(chip.dataset.level || 0);
  const wave1 = document.createElement('div');
  const wave2 = document.createElement('div');
  wave1.classList.add('wave');
  wave2.classList.add('wave', 'second');
  chip.appendChild(wave1);
  chip.appendChild(wave2);

  const fillPercent = Math.min(Math.max(level, 0), 100);
  wave1.style.setProperty('--fill', `${fillPercent}%`);
  wave2.style.setProperty('--fill', `${fillPercent}%`);
});
