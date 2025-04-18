// Get all necessary DOM elements
const subject = document.getElementById("subject");
const date = document.getElementById("date");
const timeIn = document.getElementById("timeIn");
const timeOut = document.getElementById("timeOut");
const postBtn = document.getElementById("postBtn");
const message = document.getElementById("message");
const showFormBtn = document.getElementById("showFormBtn");
const formContent = document.getElementById("formContent");
const addPostDiv = document.querySelector(".addPost");
const feed = document.querySelector("#feed");

// Initial styling (form hidden)
addPostDiv.style.border = "none";
addPostDiv.style.boxShadow = "none";
addPostDiv.style.marginTop = "-5%";

// Show form on button click
showFormBtn.addEventListener("click", () => {
  showFormBtn.style.display = "none";
  formContent.style.display = "block";
  addPostDiv.style.border = "2px solid var(--dark-red)";
  addPostDiv.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
  addPostDiv.style.marginTop = "-2%";
});

// Form validation
function validateForm() {
  if (subject.value && date.value && timeIn.value && timeOut.value) {
    postBtn.disabled = false;
    message.textContent = "";
  } else {
    postBtn.disabled = true;
    message.textContent = "Please fill in all fields before posting.";
  }
}

// Check each input field
[subject, date, timeIn, timeOut].forEach(input => {
  input.addEventListener("input", validateForm);
});

// Convert time to 12-hour format with AM/PM
function formatTimeTo12Hour(timeStr) {
  const [hour, minute] = timeStr.split(":");
  let h = parseInt(hour, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${minute} ${ampm}`;
}

// Post the card
postBtn.addEventListener("click", () => {
  document.getElementById("noPostMessage")?.remove();
  const newCard = document.createElement("div");
  newCard.classList.add("card");

  const formattedTime = `${formatTimeTo12Hour(timeIn.value)} - ${formatTimeTo12Hour(timeOut.value)}`;

  newCard.innerHTML = `
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
    <div class="subject-display">${subject.value}</div>
    <div class="bottom-section">
      <div class="date-label"><strong>Date:</strong> ${date.value}</div>
      <div class="time-label"><strong>Time:</strong> ${formattedTime}</div>
      <button class="book-now">Book now</button>

      <div class="confirm-overlay">
        <p>Confirm Booking?</p>
        <button class="confirm-yes">Yes</button>
        <button class="confirm-no">No</button>
      </div>
    </div>
  `;

  document.getElementById("postsContainer").appendChild(newCard);

  // Reset input fields
  subject.value = "";
  date.value = "";
  timeIn.value = "";
  timeOut.value = "";
  validateForm();

  // Hide form and reset to button-only
  formContent.style.display = "none";
  showFormBtn.style.display = "block";
  addPostDiv.style.border = "none";
  addPostDiv.style.boxShadow = "none";
  addPostDiv.style.marginTop = "-5%";


  const bookBtn = newCard.querySelector(".book-now");
  const confirmOverlay = newCard.querySelector(".confirm-overlay");
  const confirmYes = newCard.querySelector(".confirm-yes");
  const confirmNo = newCard.querySelector(".confirm-no");

  bookBtn.addEventListener("click", () => {
    confirmOverlay.style.display = "flex";
  });

  confirmNo.addEventListener("click", () => {
    confirmOverlay.style.display = "none";
  });

  confirmYes.addEventListener("click", () => {
    newCard.classList.add("slide-out");
    setTimeout(() => {
      newCard.remove();
    }, 500);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dashNotif = document.querySelector(".dash .notification");
  dashNotif.style.display = "none";

  // Use event delegation on the whole document for dynamic posts
  document.addEventListener("click", function (e) {
    // When "Book now" is clicked
    if (e.target.classList.contains("book-now")) {
      const post = e.target.closest(".post");
      const overlay = post.querySelector(".confirm-overlay");
      overlay.style.display = "flex"; // Show the confirmation overlay
    }

    // When "No" is clicked in the confirmation
    if (e.target.classList.contains("confirm-no")) {
      const post = e.target.closest(".post");
      const overlay = post.querySelector(".confirm-overlay");
      overlay.style.display = "none";
    }

    // When "Yes" is clicked in the confirmation
    if (e.target.classList.contains("confirm-yes")) {
      const post = e.target.closest(".post");
      const subject = post.querySelector(".subject-display").textContent;
      const date = post.querySelector(".date-label").textContent;
      const time = post.querySelector(".time-label").textContent;

      // Create notification card
      const notif = document.createElement("div");
      notif.className = "notif-card";
      notif.innerHTML = `
        <div class="top-section">
          <div class="image-circle">
            <img src="image/landingPage/ando.png" alt="Profile Image">
          </div>
          <div class="information">
            <div class="name">Ando, Mark John S.</div>
            <div class="studentID">ID: 2024-03655</div>
            <div>Applied As Student</div>
            <div>Cick to view</div>
          </div>
        </div>
      `;

      dashNotif.appendChild(notif);
      dashNotif.style.display = "block";
      post.remove(); // remove the booked post
    }
  });
});

const home = document.querySelector('#home');
home.addEventListener('click', function () {
  window.location.href = 'Home.html';
});
const search = document.querySelector('#home');
search.addEventListener('click', function () {
  window.location.href = 'seach1.html';
});