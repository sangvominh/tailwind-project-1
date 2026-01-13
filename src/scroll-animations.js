const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const revealElements = document.querySelectorAll("[data-reveal]");
const canObserve = "IntersectionObserver" in window;

if (!prefersReducedMotion && revealElements.length) {
  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    const delay = element.dataset.revealDelay ?? String(index * 40);
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  if (!canObserve) {
    revealElements.forEach((element) =>
      element.classList.add("reveal--visible"),
    );
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  revealElements.forEach((element) => observer.observe(element));
}
