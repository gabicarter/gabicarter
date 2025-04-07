document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // Interactive Terminal Code
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");

  // Define terminal commands and responses
  const commands = {
    help: "| COMMANDS:\n├── about\n├── clear\n├── contact\n├── help\n└── skills",
    about: "Hi, I'm Gabi—a DevOps guru with a passion for tech, art, and all things creative!",
    skills: "I'm skilled in Docker, Kubernetes, AWS, CI/CD, and more. Stay tuned for updates!",
    projects: "Check out my GitHub for rad projects and collaborations.",
    contact: "Shoot me an email at your-email@example.com to connect!"
  };

  // Welcome message on load
  appendToTerminal("<3 ~ Use \"help\" to see a list of commands");

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const input = terminalInput.value.trim();
      if (input) {
        appendToTerminal(`<3 ~ ${input}`);
        const command = input.toLowerCase();

        if (command === "clear") {
          clearTerminal();
        } else {
          const response = commands[command] || "Command not found. Type 'help' for options.";
          appendToTerminal(response);
        }
        terminalInput.value = "";
      }
    }
  });

  function appendToTerminal(text) {
    const p = document.createElement("p");
    p.textContent = text;
    terminalOutput.appendChild(p);
    // Auto-scroll to the bottom of the terminal
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function clearTerminal() {
    terminalOutput.innerHTML = "";
  }
});
