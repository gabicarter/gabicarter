document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const xPercent = parseInt(link.getAttribute("data-x"), 10) || 0;
      const yPercent = parseInt(link.getAttribute("data-y"), 10) || 0;

      // Compute target scroll positions (relative to viewport)
      const targetX = (xPercent / 100) * window.innerWidth;
      const targetY = (yPercent / 100) * window.innerHeight;

      window.scrollTo({
        left: targetX,
        top: targetY,
        behavior: "smooth"
      });
    });
  });
});
