// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if(el) el.scrollIntoView({behavior:'smooth'});
  });
});

// Theme toggle with localStorage
const themeBtn = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark');
  themeBtn.textContent = '☀️';
}
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const darkMode = document.body.classList.contains('dark');
  themeBtn.textContent = darkMode ? '☀️' : '🌙';
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
});

// Landing page
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

// Animate cards on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));
