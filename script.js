// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if(el) el.scrollIntoView({behavior:'smooth'});
  });
});

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Typing animation for landing page
const typingEl = document.getElementById("typing");
if (typingEl) {
  const text = "Hi, I'm Mohammad Alipour";
  let i = 0;
  function typeEffect() {
    if (i < text.length) {
      typingEl.textContent += text.charAt(i);
      i++;
      setTimeout(typeEffect, 100);
    }
  }
  typeEffect();
}

// Scroll from landing to resume
const enterBtn = document.getElementById("enterBtn");
if (enterBtn) {
  enterBtn.addEventListener("click", () => {
    document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
  });
}
