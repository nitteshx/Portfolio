/**
 * Portfolio Interactive Scripts — Nitesh Kumar
 * Themes: Noomo Labs (Kinetic Typography) + Newly AI (3D Glassmorphism & Canvas)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Ambient Neural / Wave Canvas Background (Cogniwave & Newly AI vibe)
  initAmbientCanvas();

  // 2. Noomo Labs Style Text Scramble Effect
  initTextScramble();

  // 3. 3D Card Perspective Tilt Effect (Newly AI)
  init3DTilt();

  // 4. Interactive CLI Terminal Playground
  initInteractiveTerminal();

  // 5. Copy Email Action & Toast System
  initEmailCopy();

  // 6. Direct Contact Form Dispatcher
  initContactForm();

  // 7. Clickable Words Handler
  initClickableWords();
});

/* ===================================================================
   1. AMBIENT NEURAL CANVAS (Newly AI / Cogniwave)
   =================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  // Particle network
  const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.6,
      color: Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(139, 92, 246, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse inertia
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Draw and connect particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse attraction
      const dxMouse = mouse.x - p.x;
      const dyMouse = mouse.y - p.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < 180) {
        p.x -= (dxMouse / distMouse) * 0.6;
        p.y -= (dyMouse / distMouse) * 0.6;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.6)';
      ctx.fill();

      // Connections between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - dist / 130) * 0.18;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ===================================================================
   2. NOOMO LABS KINETIC TEXT SCRAMBLER / DECODER EFFECT
   =================================================================== */
function initTextScramble() {
  const chars = 'ABCDEF0123456789!<>-_\\/[]{}—=+*^?#________';
  const scrambleElements = document.querySelectorAll('.scramble-hover');

  scrambleElements.forEach((el) => {
    const originalText = el.getAttribute('data-original') || el.innerText;
    let interval = null;

    function scramble() {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        el.innerText = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        iteration += 1 / 2;
      }, 30);
    }

    // Trigger on hover
    el.addEventListener('mouseenter', scramble);

    // Initial decode for main headline
    if (el.classList.contains('gradient-text')) {
      setTimeout(scramble, 300);
    }
  });
}

/* ===================================================================
   3. 3D CARD PERSPECTIVE TILT (Newly AI)
   =================================================================== */
function init3DTilt() {
  const tiltCard = document.getElementById('hero-3d-card');
  if (tiltCard) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  }

  // Tilt on Bento Cards
  const bentoCards = document.querySelectorAll('.bento-card[data-tilt="true"]');
  bentoCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ===================================================================
   4. INTERACTIVE CLI TERMINAL PLAYGROUND (Git, CLI, Python & More)
   =================================================================== */
function initInteractiveTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const submitBtn = document.getElementById('terminal-submit-btn');
  const clearBtn = document.getElementById('btn-clear-term');
  const quickChips = document.querySelectorAll('.quick-cmd');

  if (!input || !output) return;

  const commands = {
    help: () => `
<span class="term-greeting">Available Interactive Commands:</span><br>
  • <strong class="term-cmd-highlight">whoami</strong>       : Print developer identity & summary<br>
  • <strong class="term-cmd-highlight">about</strong>        : Academic background & NST Pune journey<br>
  • <strong class="term-cmd-highlight">skills</strong>       : Deep breakdown of Git, CLI, Python & AI/ML<br>
  • <strong class="term-cmd-highlight">python</strong>       : Launch Python 3.12 environment information<br>
  • <strong class="term-cmd-highlight">git status</strong>   : Inspect current git repo status & branches<br>
  • <strong class="term-cmd-highlight">cli</strong>          : Terminal philosophy and tooling setup<br>
  • <strong class="term-cmd-highlight">projects</strong>     : List featured projects and direct repositories<br>
  • <strong class="term-cmd-highlight">contact</strong>      : Direct email and LinkedIn connection links<br>
  • <strong class="term-cmd-highlight">matrix</strong>       : Digital neural rain visualizer<br>
  • <strong class="term-cmd-highlight">clear</strong>        : Clear terminal output screen
`,
    whoami: () => `
Nitesh Kumar — CSE (AI & ML) Student & Software Engineer<br>
College  : Newton School of Technology (NST), Pune (Batch of 2026)<br>
Focus    : Python Architecture, Unix/CLI Tooling, Git Versioning, Neural Networks<br>
Location : Pune, India
`,
    about: () => `
<span class="m-cyan">=== ABOUT NITESH KUMAR ===</span><br>
Started B.Tech in CSE (AI & ML) in 2026 at <a href="https://www.newtonschool.co/" target="_blank" class="glow-link">NST Pune</a>.<br>
Passionate about software craftsmanship, clean terminal architectures, and artificial intelligence.<br>
Belief: "Code should be as elegant in the terminal as it is in production."
`,
    skills: () => `
<span class="m-cyan">=== TECHNICAL SCALE & PROFICIENCY ===</span><br>
1. <strong class="text-white">Python 3.x</strong> : [████████████████░░] 92% (OOP, PyTorch, NumPy, Pandas, FastAPI)<br>
2. <strong class="text-white">Unix CLI</strong>   : [██████████████░░░░] 88% (Bash, Zsh, Neovim, tmux, Linux pipes)<br>
3. <strong class="text-white">Git/GitHub</strong> : [████████████████░░] 90% (Interactive rebase, branching, CI/CD)<br>
4. <strong class="text-white">AI & ML</strong>    : [█████████████░░░░░] 85% (Transformers, Neural Nets, OpenCV)
`,
    'python --version': () => `Python 3.12.4 (main, AI & Systems Edition, NST Pune Core)`,
    python: () => `
Python 3.12.4 (default, 2026)<br>
[GCC Apple LLVM 15.0] on darwin<br>
Type "help", "copyright", "credits" or "license" for more info.<br>
>>> <span class="c-keyword">import</span> torch, nst_pune<br>
>>> engineer = nst_pune.Engineer(<span class="c-str">"Nitesh Kumar"</span>)<br>
>>> engineer.status()<br>
<span class="m-success">'Ready to innovate with AI & CLI'</span>
`,
    'git status': () => `
On branch <span class="m-cyan">main</span><br>
Your branch is up to date with 'origin/main'.<br>
Changes committed:<br>
  <span class="m-success">✓ modified: nitesh_portfolio.html</span><br>
  <span class="m-success">✓ modified: style.css (Noomo Labs + Newly AI theme)</span><br>
  <span class="m-success">✓ modified: script.js (Interactive terminal & 3D tilt)</span><br>
nothing to commit, working tree clean.
`,
    git: () => `
Git version 2.44.0<br>
Scale: Advanced git workflows, atomic commits, conventional commit discipline.
`,
    cli: () => `
Terminal Stack: Zsh + Starship prompt + Neovim + tmux + fzf.<br>
Philosophy: The command-line is the most direct interface to system scale.
`,
    projects: () => `
<span class="m-cyan">=== FEATURED PROJECTS ===</span><br>
1. <strong>CogniFlow Agent</strong>   - Autonomous multi-agent pipeline with Python & vector search.<br>
2. <strong>GitPulse CLI</strong>     - High-velocity terminal Git repository analyzer.<br>
3. <strong>NeuroVision Edge</strong>  - Real-time computer vision inference engine.<br>
4. <strong>TermFlow Shell</strong>    - Custom Unix terminal productivity orchestrator.<br>
Type <strong class="term-cmd-highlight">contact</strong> to collaborate on any of these.
`,
    contact: () => `
<span class="m-cyan">=== CONTACT INFORMATION ===</span><br>
• Email   : <a href="mailto:niteshh.kumar@icloud.com" class="glow-link">niteshh.kumar@icloud.com</a><br>
• LinkedIn: <a href="https://www.linkedin.com/in/nitesh-kumar-nst/" target="_blank" class="glow-link">linkedin.com/in/nitesh-kumar-nst</a><br>
• College : Newton School of Technology (NST Pune)
`,
    matrix: () => `
<span style="color: #00f5a0; font-family: monospace;">
01001110 01001001 01010100 01000101 01010011 01001000<br>
Wake up, engineer... The terminal has you.<br>
Follow the white rabbit to NST Pune AI labs. 🐇
</span>
`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Echo command line
    const cmdRow = document.createElement('div');
    cmdRow.className = 'term-line';
    cmdRow.innerHTML = `<span class="term-prompt">nitesh@nst:~$</span> <span class="term-cmd">${escapeHtml(rawCmd)}</span>`;
    output.appendChild(cmdRow);

    // Process
    if (cmd === 'clear') {
      output.innerHTML = '';
    } else if (commands[cmd]) {
      const res = document.createElement('div');
      res.className = 'term-result';
      res.innerHTML = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
      output.appendChild(res);
    } else {
      const err = document.createElement('div');
      err.className = 'term-result';
      err.innerHTML = `<span style="color: #f43f5e;">zsh: command not found: ${escapeHtml(rawCmd)}. Type <strong class="term-cmd-highlight">help</strong> for a list of valid commands.</span>`;
      output.appendChild(err);
    }

    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
    input.value = '';
  }

  // Keyboard Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(input.value);
    }
  });

  submitBtn.addEventListener('click', () => {
    executeCommand(input.value);
    input.focus();
  });

  clearBtn.addEventListener('click', () => {
    output.innerHTML = '';
  });

  // Quick suggestions
  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        input.value = cmd;
        executeCommand(cmd);
      }
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

/* ===================================================================
   5. EMAIL COPY & TOAST NOTIFICATION SYSTEM
   =================================================================== */
function initEmailCopy() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'niteshh.kumar@icloud.com';

      navigator.clipboard.writeText(email).then(
        () => {
          showToast(`Copied to clipboard: ${email}`, 'success');
        },
        () => {
          // Fallback
          window.location.href = `mailto:${email}`;
        }
      );
    });
  });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i data-lucide="check-circle" style="color: var(--cyan); width: 18px; height: 18px;"></i> <span>${message}</span>`;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ===================================================================
   6. CONTACT FORM DISPATCHER
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name').value;
    const email = document.getElementById('sender-email').value;
    const msg = document.getElementById('sender-msg').value;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Nitesh,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

    window.location.href = `mailto:niteshh.kumar@icloud.com?subject=${subject}&body=${body}`;
    showToast('Launching email client with pre-filled message...', 'success');
  });
}

/* ===================================================================
   7. CLICKABLE WORDS HANDLER
   =================================================================== */
function initClickableWords() {
  const clickableWords = document.querySelectorAll('.clickable-word');
  clickableWords.forEach((word) => {
    word.addEventListener('click', () => {
      const link = word.getAttribute('data-link');
      if (link) {
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    });
  });
}
