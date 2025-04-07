let signinCurrentType = null;

document.getElementById('sign').addEventListener('click', function(event) {
  event.preventDefault();
  signinResetBox();
  document.getElementById('signin-overlay').style.display = 'flex';
});


function signinShowForm(type) {
  signinCurrentType = type;
  const container = document.getElementById('signin-box');
  container.innerHTML = `
    <p class="signin-close" onclick="signinCloseModal()">×</p>
    <h2>${type === 'tutor' ? 'Tutor Sign In' : 'Tutee Sign In'}</h2>
    <form id="signin-form" onsubmit="return signinValidateForm(event, '${type}')">
      <input type="email" id="signin-email" placeholder="Email (@wmsu.edu.ph)" required>
      <p class="error-msg" id="signin-email-error"></p>

      <input type="password" id="signin-password" placeholder="Password (8 characters)" required>
      <p class="error-msg" id="signin-password-error"></p>

      ${type === 'tutor'
        ? `<input type="text" id="signin-tutorId" placeholder="Tutor ID (6 digits)" required>
           <p class="error-msg" id="signin-tutorId-error"></p>`
        : ''}

      <p style="margin-top: 5px; font-size: 14px;">
        <a href="#" onclick="signinShowForgotPassword()" style="color: black;">Forgot password?</a>
      </p>

      <button type="submit">Sign In</button>
    </form>
  `;
}

function signinValidateForm(event, type) {
  event.preventDefault();
  let isValid = true;

  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  document.getElementById('signin-email-error').textContent = '';
  document.getElementById('signin-password-error').textContent = '';
  if (type === 'tutor') {
    document.getElementById('signin-tutorId-error').textContent = '';
  }

  if (!email.endsWith('@wmsu.edu.ph')) {
    document.getElementById('signin-email-error').textContent = 'Email must be @wmsu.edu.ph';
    isValid = false;
  }

  if (password.length !== 8) {
    document.getElementById('signin-password-error').textContent = 'Password must be exactly 8 characters';
    isValid = false;
  }

  if (type === 'tutor') {
    const tutorId = document.getElementById('signin-tutorId').value;
    if (!/^\d{6}$/.test(tutorId)) {
      document.getElementById('signin-tutorId-error').textContent = 'Tutor ID must be 6 digits';
      isValid = false;
    }
  }

  if (isValid) {
    signinCloseModal();
  }
}

function signinShowForgotPassword() {
  const container = document.getElementById('signin-box');
  container.innerHTML = `
    <p class="signin-close" onclick="signinCloseModal()">×</p>
    <h2>Reset Password</h2>
    <form id="forgot-form" onsubmit="return false;">
      <input type="email" id="forgot-email" placeholder="Email (@wmsu.edu.ph)" required>
      <p class="error-msg" id="forgot-email-error"></p>

      <button type="button" id="send-code-btn" onclick="signinSendCode()">Send Code</button>
    </form>
    <p style="margin-top: 15px; font-size: 14px;">
      <a href="#" onclick="signinShowForm(signinCurrentType)" style="color: black;">Back to sign in</a>
    </p>
  `;
}

function signinSendCode() {
  const email = document.getElementById('forgot-email').value;
  const emailError = document.getElementById('forgot-email-error');
  emailError.textContent = '';

  if (!email.endsWith('@wmsu.edu.ph')) {
    emailError.textContent = 'Email must be @wmsu.edu.ph';
    return;
  }

  const form = document.getElementById('forgot-form');

  if (!document.getElementById('forgot-code')) {
    const codeInput = document.createElement('input');
    codeInput.type = 'text'; // No arrow buttons
    codeInput.id = 'forgot-code';
    codeInput.placeholder = 'Enter 6-digit code';
    codeInput.required = true;
    form.insertBefore(codeInput, form.children[form.children.length - 1]);

    const codeError = document.createElement('p');
    codeError.className = 'error-msg';
    codeError.id = 'forgot-code-error';
    form.insertBefore(codeError, form.children[form.children.length - 1]);
  }

  const button = document.getElementById('send-code-btn');
  button.textContent = 'Confirm Code';
  button.setAttribute('onclick', 'signinConfirmCode()');
}

function signinConfirmCode() {
  const code = document.getElementById('forgot-code').value;
  const codeError = document.getElementById('forgot-code-error');
  codeError.textContent = '';

  if (!/^\d{6}$/.test(code)) {
    codeError.textContent = 'Code must be exactly 6 digits.';
    return;
  }

  const form = document.getElementById('forgot-form');
  document.getElementById('send-code-btn').remove();

  // New password input
  const newPassInput = document.createElement('input');
  newPassInput.type = 'password';
  newPassInput.id = 'new-password';
  newPassInput.placeholder = 'New Password (8 characters)';
  newPassInput.required = true;

  const newPassError = document.createElement('p');
  newPassError.className = 'error-msg';
  newPassError.id = 'new-password-error';

  // Confirm password input
  const confirmPassInput = document.createElement('input');
  confirmPassInput.type = 'password';
  confirmPassInput.id = 'confirm-password';
  confirmPassInput.placeholder = 'Confirm Password';
  confirmPassInput.required = true;

  const confirmPassError = document.createElement('p');
  confirmPassError.className = 'error-msg';
  confirmPassError.id = 'confirm-password-error';

  // Submit button
  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.textContent = 'Reset Password';
  resetBtn.onclick = signinResetPassword;

  form.appendChild(newPassInput);
  form.appendChild(newPassError);
  form.appendChild(confirmPassInput);
  form.appendChild(confirmPassError);
  form.appendChild(resetBtn);
}

function signinResetPassword() {
  const newPass = document.getElementById('new-password').value;
  const confirmPass = document.getElementById('confirm-password').value;
  const newPassError = document.getElementById('new-password-error');
  const confirmPassError = document.getElementById('confirm-password-error');

  newPassError.textContent = '';
  confirmPassError.textContent = '';

  let valid = true;

  if (newPass.length !== 8) {
    newPassError.textContent = 'Password must be exactly 8 characters.';
    valid = false;
  }

  if (newPass !== confirmPass) {
    confirmPassError.textContent = 'Passwords do not match.';
    valid = false;
  }

  if (valid) {
  const form = document.getElementById('forgot-form');
  form.innerHTML = `
    <p style="color: green; font-weight: bold; text-align: center; margin-bottom: 20px;">
      Password changed successfully!
    </p>
    <button onclick="signinShowForm(signinCurrentType)">Back to Sign In</button>
  `;
}
}

function signinResetBox() {
  const container = document.getElementById('signin-box');
  container.innerHTML = `
 <p class="signin-close" onclick="signinCloseModal()">×</p>
    <h2>Sign in as:</h2>
    <button onclick="signinShowForm('tutor')">Sign in as Tutor</button>
    <button onclick="signinShowForm('tutee')">Sign in as Tutee</button>
  `;
}

function signinCloseModal() {
  document.getElementById('signin-overlay').style.display = 'none';
  signinResetBox();
}


  document.getElementById('signup').addEventListener('click', function(event) {
    event.preventDefault();
    signupResetBox();
    document.getElementById('signup-overlay').style.display = 'flex';
  });

  document.getElementById('admin').addEventListener('click', function(event) {
    document.getElementById('signin-overlay').style.display = 'flex';
    signinAdmin();
  });

  function signinAdmin(type) {
    signinCurrentType = type;
    const container = document.getElementById('signin-box');
    container.innerHTML = `
      <p class="signin-close" onclick="signinCloseModal()">×</p>
      <h2>${type === 'tutor' ? 'Tutor Sign In' : 'ADMIN SIGNIN'}</h2>
      <form id="signin-form" onsubmit="return signinValidateForm(event, '${type}')">
        <input type="email" id="signin-email" placeholder="ADMIN EMAIL" required>
        <p class="error-msg" id="signin-email-error"></p>
  
        <input type="password" id="signin-password" placeholder="Password (ADMIN)" required>
        <p class="error-msg" id="signin-password-error"></p>
  
        ${type === 'tutor'
          ? `<input type="text" id="signin-tutorId" placeholder="Tutor ID (6 digits)" required>
             <p class="error-msg" id="signin-tutorId-error"></p>`
          : ''}
        <button type="submit">Sign In</button>
      </form>
    `;
  }
  

  function signupShowForm(type) {
    signupCurrentType = type;
    const container = document.getElementById('signup-box');
    container.innerHTML = `
      <button class="signup-close" onclick="signupCloseModal()">×</button>
      <h2>${type === 'tutor' ? 'Tutor Sign Up' : 'Tutee Sign Up'}</h2>
      <form id="signup-form" onsubmit="return signupValidateForm(event, '${type}')">
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
    `;
  }

  function signupValidateForm(event, type) {
    event.preventDefault();
    let isValid = true;

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    document.getElementById('signup-email-error').textContent = '';
    document.getElementById('signup-password-error').textContent = '';
    document.getElementById('signup-confirm-password-error').textContent = '';
    document.getElementById('signup-student-id-error').textContent = '';
    document.getElementById('signup-image-error').textContent = '';

    if (!email.endsWith('@wmsu.edu.ph')) {
      document.getElementById('signup-email-error').textContent = 'Email must be @wmsu.edu.ph';
      isValid = false;
    }

    if (password.length !== 8) {
      document.getElementById('signup-password-error').textContent = 'Password must be exactly 8 characters';
      isValid = false;
    }

    if (password !== confirmPassword) {
      document.getElementById('signup-confirm-password-error').textContent = 'Passwords do not match';
      isValid = false;
    }

    const studentIdPrefix = document.getElementById('signup-student-id-prefix').value;
    const studentIdSuffix = document.getElementById('signup-student-id-suffix').value;
    if (!/^\d{4}$/.test(studentIdPrefix) || !/^\d{5}$/.test(studentIdSuffix)) {
      document.getElementById('signup-student-id-error').textContent = 'Student ID must be in the format 2024-03655';
      isValid = false;
    }

    const image = document.getElementById('signup-image').files[0];
    if (!image || !image.type.startsWith('image/')) {
      document.getElementById('signup-image-error').textContent = 'Please upload a valid image';
      isValid = false;
    }

    if (isValid) {
      signupCloseModal();
    }
  }

  function signupResetBox() {
    const container = document.getElementById('signup-box');
    container.innerHTML = `
      <button class="signup-close" onclick="signupCloseModal()">×</button>
      <h2>Sign Up as:</h2>
      <button onclick="signupShowForm('tutor')"  class="signup-action">Sign Up as Tutor</button>
      <button onclick="signupShowForm('tutee')"  class="signup-action">Sign Up as Tutee</button>
    `;
  }

  function signupCloseModal() {
    document.getElementById('signup-overlay').style.display = 'none';
    signupResetBox();
  }


      const hustle = document.querySelector("#hustle");
    hustle.addEventListener("click", function(event) {
        alert("You clicked Hustle");
    })  
      const booking = document.querySelector("#booking");
    booking.addEventListener("click", function(event) {
        alert("You clicked Booking");
    })
      const quiz = document.querySelector("#quiz");
    quiz.addEventListener("click", function(event) {
        alert("You clicked Quiz");
    })

      const lead = document.querySelector("#lead");
    lead.addEventListener("click", function(event) {
        alert("You clicked lead");
    })