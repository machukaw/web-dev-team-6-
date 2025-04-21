$(document).ready(function () {
  const $subject = $("#subject");
  const $date = $("#date");
  const $timeIn = $("#timeIn");
  const $timeOut = $("#timeOut");
  const $postBtn = $("#postBtn");
  const $message = $("#message");
  const $showFormBtn = $("#showFormBtn");
  const $formContent = $("#formContent");
  const $addPostDiv = $(".addPost");
  const $feed = $("#feed");
  const $postsContainer = $("#postsContainer");
  const $dashNotif = $(".dash .notification");

  // Initial styling
  $addPostDiv.css({
    border: "none",
    boxShadow: "none",
    marginTop: "-5%",
  });

  $formContent.hide();
  $dashNotif.hide();

  $showFormBtn.on("click", function () {
    $(this).hide();
    $formContent.show();
    $addPostDiv.css({
      border: "2px solid var(--dark-red)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      marginTop: "-2%",
    });
  });

  function validateForm() {
    if ($subject.val() && $date.val() && $timeIn.val() && $timeOut.val()) {
      $postBtn.prop("disabled", false);
      $message.text("");
    } else {
      $postBtn.prop("disabled", true);
      $message.text("Please fill in all fields before posting.");
    }
  }

  $subject.add($date).add($timeIn).add($timeOut).on("input", validateForm);

  function formatTimeTo12Hour(timeStr) {
    const [hour, minute] = timeStr.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  }

  $postBtn.on("click", function () {
    $("#noPostMessage").remove();

    const formattedTime = `${formatTimeTo12Hour($timeIn.val())} - ${formatTimeTo12Hour($timeOut.val())}`;

    const $newCard = $(`
      <div class="card">
        <div class="top-section">
          <div class="image-circle">
            <img src="image/landingPage/ando.png" alt="Profile Image">
          </div>
          <div class="infos">
            <div class="name">Ando, Mark John S.</div>
            <div class="studentID">ID: 2024-03655</div>
            <div class="college"><em>College Of Computing Studies</em></div>
            <div class="points">Tutoring Points: 300</div>
          </div>
        </div>
        <div class="subject-display">${$subject.val()}</div>
        <div class="bottom-section">
          <div class="date-label"><strong>Date:</strong> ${$date.val()}</div>
          <div class="time-label"><strong>Time:</strong> ${formattedTime}</div>
          <button class="book-now">Book now</button>
          <div class="confirm-overlay">
            <p>Confirm Booking?</p>
            <button class="confirm-yes">Yes</button>
            <button class="confirm-no">No</button>
          </div>
        </div>
      </div>
    `);

    $postsContainer.append($newCard);

    // Reset fields
    $subject.val("");
    $date.val("");
    $timeIn.val("");
    $timeOut.val("");
    validateForm();

    $formContent.hide();
    $showFormBtn.show();
    $addPostDiv.css({
      border: "none",
      boxShadow: "none",
      marginTop: "-5%",
    });

    // Local event bindings
    $newCard.find(".book-now").on("click", function () {
      $(this).siblings(".confirm-overlay").css("display", "flex");
    });

    $newCard.find(".confirm-no").on("click", function () {
      $(this).closest(".confirm-overlay").hide();
    });

    $newCard.find(".confirm-yes").on("click", function () {
      $newCard.addClass("slide-out");
      setTimeout(() => $newCard.remove(), 500);
    });
  });

  // Delegated events for dynamically added posts
  $(document).on("click", ".book-now", function () {
    $(this).siblings(".confirm-overlay").css("display", "flex");
  });

  $(document).on("click", ".confirm-no", function () {
    $(this).closest(".confirm-overlay").hide();
  });

  $(document).on("click", ".confirm-yes", function () {
    const $post = $(this).closest(".card");
    const subject = $post.find(".subject-display").text();
    const date = $post.find(".date-label").text();
    const time = $post.find(".time-label").text();

    const $notif = $(`
      <div class="notif-card">
        <div class="top-section">
          <div class="image-circle">
            <img src="image/landingPage/ando.png" alt="Profile Image">
          </div>
          <div class="information">
            <div class="name">Ando, Mark John S.</div>
            <div class="studentID">ID: 2024-03655</div>
            <div>Applied As Student</div>
            <div>Click to view</div>
          </div>
        </div>
      </div>
    `);

    $dashNotif.append($notif).show();
    $post.remove();
  });

  // Navigation
  $("#home").on("click", () => {
    window.location.href = "Home.html";
  });

  $("#search").on("click", () => {
    window.location.href = "search1.html";
  });
});
