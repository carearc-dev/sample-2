// Mobile navigation, page top button, and soft reveal animations.
const menuToggle = document.querySelector(".menu-toggle");
const globalNav = document.querySelector(".global-nav");
const headerActions = document.querySelector(".header-actions");

if (menuToggle && globalNav && headerActions) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    globalNav.classList.toggle("is-open", isOpen);
    headerActions.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  globalNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("is-open");
      globalNav.classList.remove("is-open");
      headerActions.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const pageTop = document.querySelector(".page-top");

if (pageTop) {
  const togglePageTop = () => {
    pageTop.classList.toggle("is-visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", togglePageTop, { passive: true });
  togglePageTop();

  pageTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
