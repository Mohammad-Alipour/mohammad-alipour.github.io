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

// Terminal elements
const overlay = document.getElementById('terminalOverlay');
const openBtn = document.getElementById('terminalOpen');
const exitBtn = document.getElementById('terminalExit');
const input = document.getElementById('terminalInput');
const screen = document.getElementById('terminalScreen');

const commands = {
  help: () => "Available commands: help, about, skills, projects, experience, contact, clear, exit",
  about: () => "Passionate backend developer working with Golang, databases and performance-oriented systems.\nFocused on server-side design, concurrency and clean engineering.",
  skills: () => "Golang\nPostgreSQL\nSQL\nRESTful APIs\nGit",
  projects: () => "Portfolio Website — this site\nCafe Menu API — Go + PostgreSQL\nVPN Sales Dashboard — internal tool",
  experience: () => "2024 — Present: Front-End Developer — Freelance\n2022 — 2024: Web Developer — (Your Company)",
  contact: () => "Email: imoalipour@gmail.com\nGitHub: github.com/mohammad-alipour\nLinkedIn: linkedin.com/in/Mohmmadalipour"
};

function appendLine(text, opts = {}) {
  const div = document.createElement('div');
  div.className = 'term-line';
  div.textContent = text;
  if (opts.small) div.style.fontSize = '14px';
  screen.appendChild(div);
  screen.scrollTop = screen.scrollHeight;
}

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;
  if (cmd === 'clear') {
    screen.innerHTML = '';
    return;
  }
  if (cmd === 'exit') {
    closeTerminal();
    return;
  }
  if (commands[cmd]) {
    // print command and output
    appendLine(`$ ${cmd}`);
    const out = commands[cmd]();
    out.split('\n').forEach(line => appendLine(line));
  } else {
    appendLine(`$ ${cmd}`);
    appendLine(`Command not found: ${cmd}. Type 'help' for a list of commands.`);
  }
}

// Open terminal
function openTerminal() {
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  input.value = '';
  // focus input
  setTimeout(() => input.focus(), 80);
  // If screen has only welcome, keep it; else don't duplicate
  if (!screen.querySelector('.term-welcome')) {
    appendLine("Welcome to Mohammad Alipour's Interactive Resume (Terminal Mode)");
    appendLine("Type 'help' to see available commands.");
  }
}

// Close terminal
function closeTerminal() {
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  input.blur();
}

// Attach handlers
openBtn.addEventListener('click', () => openTerminal());
exitBtn.addEventListener('click', () => closeTerminal());

// submit command with Enter
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = input.value;
    runCommand(val);
    input.value = '';
  } else if (e.key === 'Escape') {
    closeTerminal();
  }
});

// allow clicking overlay outside to close (but not when clicking inside terminal)
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeTerminal();
});

// Keyboard shortcut: press `Ctrl+~` or `Ctrl+` to open terminal
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey && e.key === '`') || (e.ctrlKey && e.key === '~')) {
    if (overlay.classList.contains('active')) closeTerminal();
    else openTerminal();
  }
});
