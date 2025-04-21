$(function () {
    // Scroll animation for cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $(entry.target).addClass("visible");
        }
      });
    }, {
      threshold: 0.1
    });

    $(".card, .container").each(function () {
      $(this).addClass("fade-in");
      observer.observe(this);
    });

    // Button interaction feedback
    $("button, .btn").on("click", function () {
      const $btn = $(this);
      $btn.addClass("clicked");
      setTimeout(() => $btn.removeClass("clicked"), 200);
    });
  });