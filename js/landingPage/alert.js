function sendAlert() {
    const title = document.getElementById("titleInput").value.trim();
    const desc = document.getElementById("descInput").value.trim();
    const confirmation = document.getElementById("confirmationMsg");
  
    if (!title || !desc) {
      alert("Please fill in both the title and description.");
      return;
    }
  
    console.log("Patch Title:", title);
    console.log("Patch Description:", desc);
  
    confirmation.style.display = "block";
  
    setTimeout(() => {
      confirmation.style.display = "none";
      document.getElementById("titleInput").value = '';
      document.getElementById("descInput").value = '';
    }, 3000);
  }
  function submitPost() {
    const title = document.querySelector('.Title').value.trim();
    const desc = document.querySelector('.dis1').value.trim();
    const confirmation = document.getElementById('confirmation');
  
    if (title && desc) {
      confirmation.style.display = 'block';
      confirmation.textContent = '✅ Post submitted successfully!';
      confirmation.style.color = 'green';
  
      setTimeout(() => {
        confirmation.style.display = 'none';
      }, 3000);
    } else {
      confirmation.style.display = 'block';
      confirmation.textContent = '⚠️ Please fill in both fields!';
      confirmation.style.color = 'red';
  
      setTimeout(() => {
        confirmation.style.display = 'none';
      }, 3000);
    }
  }