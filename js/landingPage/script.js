
//Sign in logic
function signinAdmin() {
  const container = document.getElementById('signin-box');
  container.innerHTML = `
    <p class="signin-close" onclick="signinCloseModal()">×</p>
    <h2>Sign In</h2>
    <form id="signin-form" onsubmit="return signinValidateForm(event)">
      <input type="email" id="signin-email" placeholder="Email (@wmsu.edu.ph)" required>
      <p class="error-msg" id="signin-email-error"></p>

      <input type="password" id="signin-password" placeholder="Password" required>
      <p class="error-msg" id="signin-password-error"></p>

      <p style="margin-top: 5px; font-size: 14px;">
        <a href="#" onclick="signinShowForgotPassword()" style="color: black;">Forgot password?</a>
      </p>
      <button type="submit">Sign In</button>
    </form>
  `;
}


document.getElementById('sign').addEventListener('click', function(event) {
  document.getElementById('signin-overlay').style.display = 'flex';
  signinAdmin();
});



function signinValidateForm(event) {
  event.preventDefault();

  const email = document.getElementById('signin-email').value.trim();
  const password = document.getElementById('signin-password').value.trim();

  let isValid = true;

  document.getElementById('signin-email-error').textContent = '';
  document.getElementById('signin-password-error').textContent = '';

  if (!email.endsWith('@wmsu.edu.ph')) {
    document.getElementById('signin-email-error').textContent = 'Email must be @wmsu.edu.ph';
    isValid = false;
  }

  if (password.length < 8) {
    document.getElementById('signin-password-error').textContent = 'Password must be at least 8 characters';
    isValid = false;
  }

  if (isValid) {
    if (email === 'admin@wmsu.edu.ph' && password === 'admin12345') {
      window.location.href = 'adminPage.html';
    } else if (email === 'user@wmsu.edu.ph' && password === 'user12345') {
      window.location.href = 'UserHTML/Home.html';
    } else {
      document.getElementById('signin-password-error').textContent = 'Invalid email or password';
    }
  }

  return false; 
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
    codeInput.type = 'text'; 
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

  const newPassInput = document.createElement('input');
  newPassInput.type = 'password';
  newPassInput.id = 'new-password';
  newPassInput.placeholder = 'New Password (8 characters)';
  newPassInput.required = true;

  const newPassError = document.createElement('p');
  newPassError.className = 'error-msg';
  newPassError.id = 'new-password-error';

  const confirmPassInput = document.createElement('input');
  confirmPassInput.type = 'password';
  confirmPassInput.id = 'confirm-password';
  confirmPassInput.placeholder = 'Confirm Password';
  confirmPassInput.required = true;

  const confirmPassError = document.createElement('p');
  confirmPassError.className = 'error-msg';
  confirmPassError.id = 'confirm-password-error';


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
    <button onclick="function signinAdmin()">Back to Sign In</button>
  `;
}
}

function signinCloseModal() {
  document.getElementById('signin-overlay').style.display = 'none';
}

//Sign up logic
  document.getElementById('signup').addEventListener('click', function(event) {
    signupShowForm();
    document.getElementById('signup-overlay').style.display = 'flex';
  });


  function signupShowForm() {
    const container = document.getElementById('signup-box');
    container.innerHTML = `
      <button class="signup-close" onclick="signupCloseModal()">×</button>
      <h2>Sign Up</h2>
      <form id="signup-form" onsubmit="return signupValidateForm(event)">
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

  function signupValidateForm(event) {
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

  function signupCloseModal() {
    document.getElementById('signup-overlay').style.display = 'none';
    signupResetBox();
  }


  $(document).ready(function() {
    $("#hustle").on("click", function() {
      alert("You clicked Hustle");
    });
  
    $("#booking").on("click", function() {
      alert("You clicked Booking");
    });
  
    $("#quiz").on("click", function() {
      alert("You clicked Quiz");
    });
  
    $("#lead").on("click", function() {
      alert("You clicked lead");
    });
  });
  