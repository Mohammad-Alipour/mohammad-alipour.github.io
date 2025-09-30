// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if(el) el.scrollIntoView({behavior:'smooth'});
  })
});

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Landing page logic
const landing = document.getElementById('landing');
const enterBtn = document.getElementById('enterBtn');
const resumeWrap = document.querySelector('.wrap');

enterBtn.addEventListener('click', () => {
  landing.classList.add('fade-out');
  setTimeout(() => {
    landing.style.display = 'none';
    resumeWrap.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 600);
});
