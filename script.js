document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Get the vertical position of the target element
        const targetPosition = targetElement.offsetTop;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });
});
