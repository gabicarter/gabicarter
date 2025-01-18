/* 
  This script listens for clicks on nav links. 
  Each link has data attributes (data-x, data-y) 
  for the coordinate we want to scroll to. 
  Then we call window.scrollTo({ left, top }) for multi-axis movement.
*/

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");
  
    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const xPercent = parseInt(link.getAttribute("data-x"), 10) || 0;
        const yPercent = parseInt(link.getAttribute("data-y"), 10) || 0;
  
        // Convert "100" to "100vw" or "100vh" in a numeric sense:
        // We can do that by reading the window's current innerWidth/innerHeight
        const targetX = (xPercent / 100) * window.innerWidth;
        const targetY = (yPercent / 100) * window.innerHeight;
  
        // Smoothly scroll to that position
        window.scrollTo({
          left: targetX,
          top: targetY,
          behavior: "smooth"
        });
      });
    });
  });
  