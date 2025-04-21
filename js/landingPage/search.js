$(document).ready(function () {
  const $searchInput = $('input[type="text"]');
  const $searchBtn = $('input[type="button"]');
  const $collegeFilter = $('select[name="Colleges"]');
  const $sortSelect = $('select[name="ssort"]');
  const $posts = $('.card.post');
  const $container = $('#postsContainer');

  function filterPosts() {
    const searchValue = $searchInput.val().toLowerCase();
    const collegeValue = $collegeFilter.val();
    const sortedBy = $sortSelect.val();

    let $filteredPosts = $posts.filter(function () {
      const $post = $(this);
      const subject = $post.find('.subject-display').text().toLowerCase();
      const college = $post.find('.college').text().toLowerCase();

      const matchesSearch = subject.includes(searchValue);
      const matchesCollege = !collegeValue || college.includes(collegeValue);

      return matchesSearch && matchesCollege;
    });

    $posts.hide(); // Hide all posts initially
    $filteredPosts.show(); // Show only filtered posts

    if (sortedBy === 'tutor points') {
      $filteredPosts = $filteredPosts.sort(function (a, b) {
        const pointsA = parseInt($(a).find('.points').text().split(': ')[1]);
        const pointsB = parseInt($(b).find('.points').text().split(': ')[1]);
        return pointsB - pointsA;
      });
    } else if (sortedBy === 'date') {
      $filteredPosts = $filteredPosts.sort(function (a, b) {
        const dateA = new Date($(a).find('.date-label').text().split(': ')[1]);
        const dateB = new Date($(b).find('.date-label').text().split(': ')[1]);
        return dateA - dateB;
      });
    }

    $container.empty().append($filteredPosts);
  }

  $searchBtn.on('click', filterPosts);
  $collegeFilter.on('change', filterPosts);
  $sortSelect.on('change', filterPosts);

  // Booking Confirmation Logic
  $('.book-now').on('click', function () {
    $(this).next('.confirm-overlay').show();
  });

  $('.confirm-no').on('click', function () {
    $(this).closest('.confirm-overlay').hide();
  });

  $('.confirm-yes').on('click', function () {
    $(this).closest('.card').remove();
    // Optional: Add to notification section here
  });
});
