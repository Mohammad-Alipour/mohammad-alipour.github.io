// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  })
});

// Theme toggle (persist)
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if(savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add('dark');
  if(themeBtn) themeBtn.textContent = '☀️';
}
if(themeBtn){
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Terminal Mode
const terminalToggle = document.getElementById('terminalToggle');
const overlay = document.getElementById('terminalOverlay');
const input = document.getElementById('terminalInput');
const output = document.getElementById('terminalOutput');
const terminalClose = document.getElementById('terminalClose');

function printLine(text = '') {
  // escape and append
  const safe = String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  output.innerHTML += safe + '\n';
  output.scrollTop = output.scrollHeight;
}

function handleCommand(cmd) {
  if(!cmd) return;
  printLine('$ ' + cmd);
  const lc = cmd.toLowerCase().trim();
  switch(lc) {
    case 'help':
      printLine('Available commands: help, about, skills, projects, experience, contact, clear, exit');
      break;
    case 'about':
      printLine('Passionate backend developer working with Golang, databases and performance-oriented systems.');
      printLine('Focused on server-side design, concurrency and clean engineering.');
      break;
    case 'skills':
      printLine('Golang\nPostgreSQL\nSQL\nGit\nRESTful APIs\nDocker (familiar)');
      break;
    case 'projects':
      printLine('Portfolio Website — personal site\nCafe Menu API — Go + PostgreSQL\nVPN Sales Dashboard — internal tool\nFreelance projects');
      break;
    case 'experience':
      printLine('2024 — Present: Front-End Developer (Freelance)');
      printLine('2022 — 2024: Web Developer (Your Company)');
      break;
    case 'contact':
      printLine('Email: imoalipour@gmail.com');
      printLine('GitHub: https://github.com/mohammad-alipour');
      printLine('LinkedIn: https://www.linkedin.com/in/Mohmmadalipour');
      break;
    case 'clear':
      output.innerHTML = '';
      break;
    case 'exit':
      closeTerminal();
      break;
    default:
      printLine("Unknown command: '" + cmd + "'. Type 'help' for commands.");
  }
}

// open / focus
function openTerminal(autoDemo = true) {
  overlay.style.display = 'flex';
  overlay.setAttribute('aria-hidden', 'false');
  output.innerHTML = '';
  printLine("Welcome to Mohammad Alipour's Interactive Resume (Terminal Mode)");
  printLine("Type 'help' to see available commands.\n");
  input.focus();
  if(autoDemo) {
    setTimeout(() => autoDemoSequence(), 900);
  }
}

function closeTerminal(){
  overlay.style.display = 'none';
  overlay.setAttribute('aria-hidden', 'true');
  output.innerHTML = '';
  input.value = '';
  terminalToggle.focus();
}

// key handlers
terminalToggle && terminalToggle.addEventListener('click', () => openTerminal(true));
terminalClose && terminalClose.addEventListener('click', () => closeTerminal());

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && overlay.style.display === 'flex') {
    closeTerminal();
  }
});

// handle enter in input
input && input.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    const cmd = input.value.trim();
    handleCommand(cmd);
    input.value = '';
  }
});

// Auto-typing demo
function autoDemoSequence() {
  const demo = ['help','about','skills','projects'];
  let i = 0;
  function runNext() {
    if(i >= demo.length) {
      printLine('\nDemo finished — you can type a command.');
      return;
    }
    const cmd = demo[i];
    let j = 0;
    const typer = setInterval(() => {
      input.value += cmd[j] || '';
      j++;
      if(j > cmd.length) {
        clearInterval(typer);
        setTimeout(() => {
          handleCommand(cmd);
          input.value = '';
          i++;
          setTimeout(runNext, 700);
        }, 300);
      }
    }, 90);
  }
  runNext();
}
