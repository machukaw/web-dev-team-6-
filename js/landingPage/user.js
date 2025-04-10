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
});
