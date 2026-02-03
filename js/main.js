// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and content boxes
document.querySelectorAll('.skill-card, .content-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Random glitch effect on hero title
const glitchElements = document.querySelectorAll('.glitch');
setInterval(() => {
    glitchElements.forEach(el => {
        if (Math.random() > 0.95) {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 50);
        }
    });
}, 2000);

// Cursor trail effect
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9998';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
let mouse = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    particles.push({
        x: mouse.x,
        y: mouse.y,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        life: 1
    });
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        ctx.fillStyle = `rgba(0, 240, 255, ${p.life * 0.5})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.02;
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== TERMINAL FUNCTIONALITY =====
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalWindow = document.getElementById('terminal-window');
const terminalToggle = document.getElementById('terminal-toggle');

// Terminal commands and responses
const commands = {
    help: {
        output: `<span class="terminal-success">AVAILABLE COMMANDS:</span><br>
├─ help     : Display this help message<br>
├─ about    : Display information about me<br>
├─ skills   : Show my technical skills<br>
├─ contact  : Get contact information<br>
├─ clear    : Clear terminal output<br>
└─ exit     : Minimize terminal window`
    },
    about: {
        output: `<span class="terminal-success">ABOUT:</span><br>
Senior Cloud Engineer and Army veteran specializing in secure cloud infrastructure, automation, and Linux systems. Currently at Dragos designing critical industrial security solutions.<br><br>
<span class="terminal-link" data-scroll="#about">→ View full about section</span>`,
        scroll: '#about'
    },
    skills: {
        output: `<span class="terminal-success">SKILLS:</span><br>
├─ Cloud: AWS, Azure, GCP, Linode<br>
├─ Automation: Terraform, Terragrunt, Bash, Github Actions, Ansible, Python<br>
└─ Distros: Debian, Ubuntu, Red Hat, Fedora<br><br>
<span class="terminal-link" data-scroll="#skills">→ View full skills section</span>`,
        scroll: '#skills'
    },
    contact: {
        output: `<span class="terminal-success">CONTACT:</span><br>
├─ Email: <a href="mailto:gabriellasamcarter@gmail.com" class="terminal-link">gabriellasamcarter@gmail.com</a><br>
├─ LinkedIn: <a href="https://www.linkedin.com/in/gabi-carter/" class="terminal-link" target="_blank" rel="noopener noreferrer">linkedin.com/in/gabi-carter</a><br>
└─ GitHub: <a href="https://github.com/gabi-carter" class="terminal-link" target="_blank" rel="noopener noreferrer">github.com/gabi-carter</a><br><br>
<span class="terminal-link" data-scroll="#contact">→ View full contact section</span>`,
        scroll: '#contact'
    }
};

// Welcome message
function initTerminal() {
    appendToTerminal('<span class="terminal-success">SYSTEM TERMINAL v1.0</span>');
    appendToTerminal('Type <span class="terminal-command">help</span> to see available commands');
    appendToTerminal('─'.repeat(50));
}

// Append text to terminal
function appendToTerminal(html, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = html;
    terminalOutput.appendChild(line);
    
    // Add click handlers to links
    line.querySelectorAll('.terminal-link').forEach(link => {
        link.addEventListener('click', function() {
            const target = this.getAttribute('data-scroll');
            if (target) {
                document.querySelector(target).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Clear terminal
function clearTerminal() {
    terminalOutput.innerHTML = '';
    initTerminal();
}

// Toggle terminal visibility
terminalToggle.addEventListener('click', () => {
    const isMinimized = terminalWindow.classList.toggle('minimized');
    terminalToggle.querySelector('.toggle-text').textContent = isMinimized ? 'MAXIMIZE' : 'MINIMIZE';
});

// Handle terminal input
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim().toLowerCase();
        
        if (input) {
            // Display the command
            appendToTerminal(`<span class="terminal-prompt">&gt;&gt;</span> <span class="terminal-command">${input}</span>`);
            
            // Process command
            if (input === 'clear') {
                setTimeout(() => clearTerminal(), 100);
            } else if (input === 'exit') {
                terminalWindow.classList.add('minimized');
                terminalToggle.querySelector('.toggle-text').textContent = 'MAXIMIZE';
                appendToTerminal('<span class="terminal-success">Terminal minimized. Click MAXIMIZE to reopen.</span>');
            } else if (commands[input]) {
                appendToTerminal(commands[input].output);
            } else {
                appendToTerminal(`<span class="terminal-error">Command not found: ${input}</span><br>
Type <span class="terminal-command">help</span> for available commands`, 'terminal-error');
            }
            
            terminalInput.value = '';
        }
    }
});

// Initialize terminal on load
initTerminal();