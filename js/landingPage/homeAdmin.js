  // Scroll animation for cards
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.card, .container').forEach(el => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Button interaction feedback
  document.querySelectorAll("button, .btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 200);
    });
  });