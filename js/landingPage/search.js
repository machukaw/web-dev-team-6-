document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('input[type="text"]');
  const searchBtn = document.querySelector('input[type="button"]');
  const collegeFilter = document.querySelector('select[name="Colleges"]');
  const sortSelect = document.querySelector('select[name="ssort"]');
  const posts = document.querySelectorAll('.card.post');

  const filterPosts = () => {
    const searchValue = searchInput.value.toLowerCase();
    const collegeValue = collegeFilter.value;
    const sortedBy = sortSelect.value;

    let postArray = Array.from(posts);
    
    postArray.forEach(post => {
      const subject = post.querySelector('.subject-display').textContent.toLowerCase();
      const college = post.querySelector('.college').textContent.toLowerCase();

      const matchesSearch = subject.includes(searchValue);
      const matchesCollege = !collegeValue || college.includes(collegeValue);

      post.style.display = (matchesSearch && matchesCollege) ? 'block' : 'none';
    });

    if (sortedBy === 'tutor points') {
      postArray.sort((a, b) => {
        const pointsA = parseInt(a.querySelector('.points').textContent.split(': ')[1]);
        const pointsB = parseInt(b.querySelector('.points').textContent.split(': ')[1]);
        return pointsB - pointsA;
      });
    } else if (sortedBy === 'date') {
      postArray.sort((a, b) => {
        const dateA = new Date(a.querySelector('.date-label').textContent.split(': ')[1]);
        const dateB = new Date(b.querySelector('.date-label').textContent.split(': ')[1]);
        return dateA - dateB;
      });
    }

    const container = document.getElementById('postsContainer');
    container.innerHTML = '';
    postArray.forEach(post => container.appendChild(post));
  };

  searchBtn.addEventListener('click', filterPosts);
  collegeFilter.addEventListener('change', filterPosts);
  sortSelect.addEventListener('change', filterPosts);

  // Booking Confirmation Logic
  document.querySelectorAll('.book-now').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.nextElementSibling;
      overlay.style.display = 'block';
    });
  });

  document.querySelectorAll('.confirm-no').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.confirm-overlay').style.display = 'none';
    });
  });

  document.querySelectorAll('.confirm-yes').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      card.remove(); // remove from DOM
      // Optional: Add to notification section here
    });
  });
});
