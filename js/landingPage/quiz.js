let quizzes = [];
let currentRole = '';
let gradedResults = [];

function switchRole(role) {
  currentRole = role;
  renderView();
}

function renderView() {
  const $area = $('#contentArea').empty();

  if (!currentRole) {
    $area.html(`
      <div id="noPostMessage">
        <h2>Select Role</h2>
        <div class="no-post-image-container">
          <img src="../image/landingPage/noPost.gif" alt="Choose Role">
        </div>
      </div>
    `);
    return;
  }

  if (currentRole === 'tutor') {
    $area.html(`
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
        <button id="postQuizBtn">Post Quiz</button>
        <button id="cancelQuizBtn">Cancel</button>
      </div>
    `);

    showTutorNotifications();

    $('#addQuizBtn').on('click', () => {
      $('#tutorDashboard').hide();
      $('#quizForm').show();
    });

    $('#postQuizBtn').on('click', postQuiz);
    $('#cancelQuizBtn').on('click', renderView);

  } else {
    $area.html(`
      <h2>Student Dashboard</h2>
      <div id="notifications"></div>
      <div id="studentQuizArea"></div>
    `);
    showStudentNotifications();
  }
}

function postQuiz() {
  const subject = $('#subject').val();
  const items = $('#items').val();
  const questionLines = $('#questions').val().split('\n');
  const student = $('#studentName').val();

  const questions = questionLines.map(q => {
    const [text, ...choices] = q.split('|');
    return { text, choices: choices[0]?.split(',') || [] };
  });

  quizzes.push({ subject, items, questions, student, status: 'pending', answers: null, graded: false });

  alert('Quiz posted!');
  renderView();
}

function showTutorNotifications() {
  const $area = $('#quizList').empty();

  quizzes.forEach((quiz, index) => {
    if (quiz.status === 'submitted' && !quiz.graded) {
      $area.append(`
        <div class="quiz-card">
          <strong>${quiz.student}</strong> finished the quiz on <strong>${quiz.subject}</strong><br>
          <button class="grade-btn" data-index="${index}">Grade Quiz</button>
        </div>
      `);
    }
  });

  if (gradedResults.length) {
    $area.append('<h3>Posted Grades</h3>');
    gradedResults.forEach(res => {
      $area.append(`
        <div class="notification">
          ${res.student} scored ${res.score}% on ${res.subject}<br>
          Comment: ${res.comment}
        </div>
      `);
    });
  }

  $('.grade-btn').on('click', function () {
    gradeQuiz($(this).data('index'));
  });
}

function showStudentNotifications() {
  const $notif = $('#notifications').empty();
  const $quizArea = $('#studentQuizArea').empty();
  const quiz = quizzes.find(q => q.status === 'pending');

  if (quiz) {
    $notif.html(`<div class="notification">New quiz on ${quiz.subject} assigned to you!</div>`);
    let form = $(`<form></form>`).on('submit', function (e) {
      submitQuiz(e, quizzes.indexOf(quiz));
    });

    quiz.questions.forEach((q, i) => {
      form.append(`<label>${i + 1}. ${q.text}</label><br>`);
      q.choices.forEach(choice => {
        form.append(`<input type="radio" name="q${i}" value="${choice}" required> ${choice}<br>`);
      });
    });

    form.append(`<button type="submit">Submit Answers</button>`);
    $quizArea.append(form);
  } else {
    $notif.html(`<div>No new quizzes.</div>`);
  }

  const checked = gradedResults.find(g => g.student === "You");
  if (checked) {
    $quizArea.append(`
      <div class="notification">
        Your quiz on ${checked.subject} has been graded!<br>
        Score: ${checked.score}%<br>
        Tutor's Comment: ${checked.comment}
      </div>
    `);
  }
}

function submitQuiz(e, index) {
  e.preventDefault();
  const quiz = quizzes[index];
  const form = $(e.target);

  const answers = quiz.questions.map((_, i) => form.find(`input[name="q${i}"]:checked`).val());
  quizzes[index].answers = answers;
  quizzes[index].status = 'submitted';

  alert('Quiz submitted!');
  renderView();
}

function gradeQuiz(index) {
  const quiz = quizzes[index];
  const correctAnswers = quiz.questions.map(q => q.choices[0]); // First is correct
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

$(document).ready(renderView);
