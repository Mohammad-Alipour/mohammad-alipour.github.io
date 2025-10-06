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

const skillPercents = {
  "Golang": 90,
  "PostgreSQL": 80,
  "Docker": 75,
  "Git": 85,
  "RESTful APIs": 70,
  "SQL": 80,
  "OOP & Concurrency": 65
};

function createWaveSVG(percent) {

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 200 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.classList.add("skill-wave");

  svg.innerHTML = `
    <defs>
      <linearGradient id="g-${Math.random().toString(36).slice(2,9)}" x1="0" y1="0" x2="0" y2="1">
        <stop class="water-stop-top" offset="0%"/>
        <stop class="water-stop-bottom" offset="100%"/>
      </linearGradient>
    </defs>
    <g class="wave-wrap">
      <g class="wave1">
        <path d="M0 30 Q25 20 50 30 T100 30 T150 30 T200 30 V100 H0 Z" fill="url(#g-${Math.random().toString(36).slice(2,9)})" />
      </g>
      <g class="wave2">
        <path d="M0 35 Q25 25 50 35 T100 35 T150 35 T200 35 V100 H0 Z" fill="url(#g-${Math.random().toString(36).slice(2,9)})" opacity="0.9"/>
      </g>
    </g>
  `;


  const maxDown = 55; // percent
  const minDown = -5; 
  const translateY = maxDown - ( (percent / 100) * (maxDown - minDown) );
  svg.style.transform = `translateY(${translateY}%)`;

  return svg;
}

// Add waves & percent labels to chips
document.querySelectorAll('.chip').forEach(chip => {
  // read skill text (trim)
  const keyText = chip.textContent.trim();
  const percent = skillPercents.hasOwnProperty(keyText) ? skillPercents[keyText] : 60;

  // create svg wave and append
  const svg = createWaveSVG(percent);
  chip.appendChild(svg);

  const pct = document.createElement('span');
  pct.className = 'skill-percent';
  pct.textContent = `${percent}%`;
  chip.appendChild(pct);

  // add accessibility / focus
  chip.setAttribute('tabindex', '0');

  let touchTimer = null;
  chip.addEventListener('click', (e) => {
    // toggle class that shows percent
    chip.classList.add('_show-percent');
    clearTimeout(touchTimer);
    touchTimer = setTimeout(() => chip.classList.remove('_show-percent'), 1500);
  });

  chip.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      chip.classList.add('_show-percent');
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => chip.classList.remove('_show-percent'), 1500);
    }
  });
});
