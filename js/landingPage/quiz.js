let quizzes = [];
let currentRole = '';
let studentAnswers = [];
let gradedResults = [];

function switchRole(role) {
  currentRole = role;
  renderView();
}

function renderView() {
  const area = document.getElementById('contentArea');
  area.innerHTML = '';

  // 🔻 Default screen when no role is selected
  if (!currentRole) {
    area.innerHTML = `
      <div id="noPostMessage">
        <h2>Select Role</h2>
        <div class="no-post-image-container">
          <img src="../image/landingPage/noPost.gif" alt="Choose Role">
        </div>
      </div>
    `;
    return;
  }

  // 🔻 Tutor view
  if (currentRole === 'tutor') {
    area.innerHTML = `
      <div id="tutorDashboard">
        <h2>Tutor Dashboard</h2>
        <button id="addQuizBtn">➕ Add Quiz</button>
        <div id="quizList"></div>
      </div>

      <div id="quizForm" style="display: none;">
        <h2>Post a Quiz</h2>
        <input type="text" id="subject" placeholder="Subject">
        <input type="number" id="items" placeholder="Number of items">
        <textarea id="questions" placeholder="Enter questions, one per line (e.g. What is 2+2?|4,3,2,1)"></textarea>
        <input type="text" id="studentName" placeholder="Assign to Student">
        <button onclick="postQuiz()">Post Quiz</button>
        <button onclick="cancelQuiz()">Cancel</button>
      </div>
    `;

    showTutorNotifications();

    const addBtn = document.getElementById('addQuizBtn');
    const quizForm = document.getElementById('quizForm');
    const dashboard = document.getElementById('tutorDashboard');

    addBtn.addEventListener('click', () => {
      dashboard.style.display = 'none';
      quizForm.style.display = 'block';
    });

  // 🔻 Student view
  } else {
    area.innerHTML = `
      <h2>Student Dashboard</h2>
      <div id="notifications"></div>
      <div id="studentQuizArea"></div>
    `;
    showStudentNotifications();
  }
}


function postQuiz() {
  const subject = document.getElementById('subject').value;
  const items = document.getElementById('items').value;
  const questionLines = document.getElementById('questions').value.split('\n');
  const student = document.getElementById('studentName').value;

  const questions = questionLines.map(q => {
    const [text, ...choices] = q.split('|');
    return { text, choices: choices[0]?.split(',') || [] };
  });

  quizzes.push({ subject, items, questions, student, status: 'pending', answers: null, graded: false });

  alert('Quiz posted!');
  renderView();
}

function showTutorNotifications() {
  const area = document.getElementById('quizList');
  quizzes.forEach((quiz, index) => {
    if (quiz.status === 'submitted' && !quiz.graded) {
      area.innerHTML += `
        <div class="quiz-card">
          <strong>${quiz.student}</strong> finished the quiz on <strong>${quiz.subject}</strong><br>
          <button onclick="gradeQuiz(${index})">Grade Quiz</button>
        </div>
      `;
    }
  });

  if (gradedResults.length) {
    area.innerHTML += `<h3>Posted Grades</h3>`;
    gradedResults.forEach(res => {
      area.innerHTML += `
        <div class="notification">
          ${res.student} scored ${res.score}% on ${res.subject}<br>
          Comment: ${res.comment}
        </div>
      `;
    });
  }
}

function showStudentNotifications() {
  const notif = document.getElementById('notifications');
  const quizArea = document.getElementById('studentQuizArea');

  const quiz = quizzes.find(q => q.status === 'pending');
  if (quiz) {
    notif.innerHTML = `<div class="notification">New quiz on ${quiz.subject} assigned to you!</div>`;
    let form = `<form onsubmit="submitQuiz(event, ${quizzes.indexOf(quiz)})">`;

    quiz.questions.forEach((q, i) => {
      form += `<label>${i + 1}. ${q.text}</label><br>`;
      q.choices.forEach(choice => {
        form += `<input type="radio" name="q${i}" value="${choice}" required> ${choice}<br>`;
      });
    });

    form += `<button type="submit">Submit Answers</button></form>`;
    quizArea.innerHTML = form;
  } else {
    notif.innerHTML = `<div>No new quizzes.</div>`;
  }

  const checked = gradedResults.find(g => g.student === "You");
  if (checked) {
    quizArea.innerHTML += `
      <div class="notification">
        Your quiz on ${checked.subject} has been graded!<br>
        Score: ${checked.score}%<br>
        Tutor's Comment: ${checked.comment}
      </div>
    `;
  }
}

function submitQuiz(event, index) {
  event.preventDefault();
  const quiz = quizzes[index];
  const form = event.target;

  const answers = quiz.questions.map((q, i) => {
    const selected = form[`q${i}`].value;
    return selected;
  });

  quizzes[index].answers = answers;
  quizzes[index].status = 'submitted';
  alert('Quiz submitted!');
  renderView();
}

function gradeQuiz(index) {
  const quiz = quizzes[index];
  const correctAnswers = quiz.questions.map(q => q.choices[0]); // Assume first choice is correct
  const studentAnswers = quiz.answers;

  let score = 0;
  correctAnswers.forEach((ans, i) => {
    if (ans === studentAnswers[i]) score++;
  });

  const percentage = Math.round((score / correctAnswers.length) * 100);
  const comment = prompt("Enter your comment:");

  gradedResults.push({ student: quiz.student, subject: quiz.subject, score: percentage, comment });
  quizzes[index].graded = true;

  renderView();
}

document.addEventListener("DOMContentLoaded", renderView);
