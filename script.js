// Theme toggle & typing effect 
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

// Typing text
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
    landing.classList.add('fade-out');
    setTimeout(() => {
      landing.style.display = 'none';
      resumeWrap.classList.remove('hidden');
      document.body.classList.remove('landing-active');
    }, 700);
  });
}

// Skill Circles (Wave + Percent)
document.querySelectorAll('.skill').forEach(skill => {
  const name = skill.dataset.skill;
  const percent = skill.dataset.percent;
  const label = document.createElement('span');
  label.textContent = name;
  skill.appendChild(label);

  const p = document.createElement('div');
  p.className = 'percent';
  p.textContent = percent + '%';
  skill.appendChild(p);
});
