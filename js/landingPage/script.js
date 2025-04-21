// Sign In Logic
function signinAdmin() {
  $('#signin-box').html(`
    <p class="signin-close" onclick="signinCloseModal()">×</p>
    <h2>Sign In</h2>
    <form id="signin-form">
      <input type="email" id="signin-email" placeholder="Email (@wmsu.edu.ph)" required>
      <p class="error-msg" id="signin-email-error"></p>
      <input type="password" id="signin-password" placeholder="Password" required>
      <p class="error-msg" id="signin-password-error"></p>
      <p style="margin-top: 5px; font-size: 14px;">
        <a href="#" onclick="signinShowForgotPassword()" style="color: black;">Forgot password?</a>
      </p>
      <button type="submit">Sign In</button>
    </form>
  `);
}

// Open Sign In Modal
$('#sign').on('click', () => {
  $('#signin-overlay').css('display', 'flex');
  signinAdmin();
});

// Validate Sign In
$(document).on('submit', '#signin-form', function (e) {
  e.preventDefault();

  const email = $('#signin-email').val().trim();
  const password = $('#signin-password').val().trim();

  $('#signin-email-error, #signin-password-error').text('');
  let isValid = true;

  if (!email.endsWith('@wmsu.edu.ph')) {
    $('#signin-email-error').text('Email must be @wmsu.edu.ph');
    isValid = false;
  }

  if (password.length < 8) {
    $('#signin-password-error').text('Password must be at least 8 characters');
    isValid = false;
  }

  if (isValid) {
    if (email === 'admin@wmsu.edu.ph' && password === 'admin12345') {
      window.location.href = 'adminPage.html';
    } else if (email === 'user@wmsu.edu.ph' && password === 'user12345') {
      window.location.href = 'UserHTML/Home.html';
    } else {
      $('#signin-password-error').text('Invalid email or password');
    }
  }
});

function signinShowForgotPassword() {
  $('#signin-box').html(`
    <p class="signin-close" onclick="signinCloseModal()">×</p>
    <h2>Reset Password</h2>
    <form id="forgot-form">
      <input type="email" id="forgot-email" placeholder="Email (@wmsu.edu.ph)" required>
      <p class="error-msg" id="forgot-email-error"></p>
      <button type="button" id="send-code-btn">Send Code</button>
    </form>
  `);
}

$(document).on('click', '#send-code-btn', function () {
  const email = $('#forgot-email').val();
  $('#forgot-email-error').text('');

  if (!email.endsWith('@wmsu.edu.ph')) {
    $('#forgot-email-error').text('Email must be @wmsu.edu.ph');
    return;
  }

  const form = $('#forgot-form');

  if (!$('#forgot-code').length) {
    form.append(`
      <input type="text" id="forgot-code" placeholder="Enter 6-digit code" required>
      <p class="error-msg" id="forgot-code-error"></p>
    `);
  }

  $(this).text('Confirm Code').attr('id', 'confirm-code-btn');
});

$(document).on('click', '#confirm-code-btn', function () {
  const code = $('#forgot-code').val();
  $('#forgot-code-error').text('');

  if (!/^\d{6}$/.test(code)) {
    $('#forgot-code-error').text('Code must be exactly 6 digits.');
    return;
  }

  const form = $('#forgot-form');
  $(this).remove();

  form.append(`
    <input type="password" id="new-password" placeholder="New Password (8 characters)" required>
    <p class="error-msg" id="new-password-error"></p>
    <input type="password" id="confirm-password" placeholder="Confirm Password" required>
    <p class="error-msg" id="confirm-password-error"></p>
    <button type="button" id="reset-password-btn">Reset Password</button>
  `);
});

$(document).on('click', '#reset-password-btn', function () {
  const newPass = $('#new-password').val();
  const confirmPass = $('#confirm-password').val();
  let valid = true;

  $('#new-password-error, #confirm-password-error').text('');

  if (newPass.length !== 8) {
    $('#new-password-error').text('Password must be exactly 8 characters.');
    valid = false;
  }

  if (newPass !== confirmPass) {
    $('#confirm-password-error').text('Passwords do not match.');
    valid = false;
  }

  if (valid) {
    $('#forgot-form').html(`
      <p style="color: green; font-weight: bold; text-align: center; margin-bottom: 20px;">
        Password changed successfully!
      </p>
      <button onclick="signinAdmin()">Back to Sign In</button>
    `);
  }
});

function signinCloseModal() {
  $('#signin-overlay').hide();
}

// Sign Up Logic
$('#signup').on('click', () => {
  signupShowForm();
  $('#signup-overlay').css('display', 'flex');
});

function signupShowForm() {
  $('#signup-box').html(`
    <button class="signup-close" onclick="signupCloseModal()">×</button>
    <h2>Sign Up</h2>
    <form id="signup-form">
      <input type="email" id="signup-email" placeholder="Email (@wmsu.edu.ph)" required>
      <p class="error-msg" id="signup-email-error"></p>
      <input type="password" id="signup-password" placeholder="Password (8 characters)" required>
      <p class="error-msg" id="signup-password-error"></p>
      <input type="password" id="signup-confirm-password" placeholder="Confirm Password" required>
      <p class="error-msg" id="signup-confirm-password-error"></p>
      <p style="margin-left: -50%">Student ID number: </p>
      <div class="student-id-container">
        <input type="text" id="signup-student-id-prefix" placeholder="XXXX" maxlength="4" required>
        <span>-</span>
        <input type="text" id="signup-student-id-suffix" placeholder="XXXXX" maxlength="5" required>
      </div>
      <p class="error-msg" id="signup-student-id-error"></p>
      <input type="file" id="signup-image" accept="image/*" required>
      <p class="error-msg" id="signup-image-error"></p>
      <button type="submit">Sign Up</button>
    </form>
  `);
}

$(document).on('submit', '#signup-form', function (e) {
  e.preventDefault();
  let isValid = true;

  const email = $('#signup-email').val();
  const password = $('#signup-password').val();
  const confirmPassword = $('#signup-confirm-password').val();
  const prefix = $('#signup-student-id-prefix').val();
  const suffix = $('#signup-student-id-suffix').val();
  const image = $('#signup-image')[0].files[0];

  $('.error-msg').text('');

  if (!email.endsWith('@wmsu.edu.ph')) {
    $('#signup-email-error').text('Email must be @wmsu.edu.ph');
    isValid = false;
  }

  if (password.length !== 8) {
    $('#signup-password-error').text('Password must be exactly 8 characters');
    isValid = false;
  }

  if (password !== confirmPassword) {
    $('#signup-confirm-password-error').text('Passwords do not match');
    isValid = false;
  }

  if (!/^\d{4}$/.test(prefix) || !/^\d{5}$/.test(suffix)) {
    $('#signup-student-id-error').text('Student ID must be in the format 2024-03655');
    isValid = false;
  }

  if (!image || !image.type.startsWith('image/')) {
    $('#signup-image-error').text('Please upload a valid image');
    isValid = false;
  }

  if (isValid) {
    signupCloseModal();
  }
});

function signupCloseModal() {
  $('#signup-overlay').hide();
}
