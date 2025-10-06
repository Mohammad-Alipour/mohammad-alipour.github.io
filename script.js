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

// Typing effect for landing subtitle
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
// SVG Effect for Skills ===
document.querySelectorAll('.chip').forEach(chip => {
  const percent = parseInt(chip.dataset.percent || "0", 10);
  const waveHeight = 100 - percent;


  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 200 100");
  svg.innerHTML = `
    <defs>
      <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a4da8" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#062c6a" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <path d="M0 30 Q50 20 100 30 T200 30 V100 H0 Z" fill="url(#waterGrad)">
      <animateTransform attributeName="transform" attributeType="XML"
        type="translate" from="0 0" to="-100 0" dur="4s" repeatCount="indefinite" />
    </path>
    <path d="M0 35 Q50 25 100 35 T200 35 V100 H0 Z" fill="url(#waterGrad)" opacity="0.5">
      <animateTransform attributeName="transform" attributeType="XML"
        type="translate" from="0 0" to="-100 0" dur="6s" repeatCount="indefinite" />
    </path>
  `;
  svg.style.transform = `translateY(${waveHeight}%)`;

  chip.appendChild(svg);

  const percentLabel = document.createElement('span');
  percentLabel.className = 'percent';
  percentLabel.textContent = `${percent}%`;
  chip.appendChild(percentLabel);
});

