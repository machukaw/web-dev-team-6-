
function showSection(id) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
  const activeLink = Array.from(document.querySelectorAll('.sidebar a'))
    .find(a => a.textContent.trim() === capitalize(id));
  if (activeLink) activeLink.classList.add('active');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function logout() {
  window.location.href = "foradmin.html";
}

// Dashboard Chart
const ctx = document.getElementById('dashboardChart').getContext('2d');
const dashboardChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Total Users', 'Admins', 'New Signups', 'Reports'],
    datasets: [{
      label: 'System Stats',
      data: [24, 3, 7, 5],
      backgroundColor: ['#8b0000', '#a30000', '#b52a3a', '#dc3545'],
      borderColor: '#600000',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  }
});

// Manage Users Logic
let users = [
  { username: "admin", role: "Admin" },
  { username: "user1", role: "Viewer" }
];

function renderUserTable() {
  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = '';
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.role}</td>
      <td>
        <button onclick="editUser(${index})">Edit</button>
        <button onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function addUser() {
  const username = document.getElementById('newUsername').value.trim();
  const role = document.getElementById('newRole').value.trim();
  if (username && role) {
    users.push({ username, role });
    renderUserTable();
    document.getElementById('newUsername').value = '';
    document.getElementById('newRole').value = '';
  } else {
    alert("Please fill out both fields.");
  }
}

function editUser(index) {
  const newUsername = prompt("Enter new username:", users[index].username);
  const newRole = prompt("Enter new role:", users[index].role);
  if (newUsername && newRole) {
    users[index].username = newUsername.trim();
    users[index].role = newRole.trim();
    renderUserTable();
  }
}

function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    renderUserTable();
  }
}

// Render the initial table
document.addEventListener("DOMContentLoaded", renderUserTable);
