let currentRole = 'tutor'; 

const studentSchedules = [
  {
    name: "Zorro D. Gold",
    date: "April 20, 2025",
    time: "2:00 PM - 4:00 PM",
    subject: "English Grammar"
  },
  {
    name: "Aitana Morrow",
    date: "April 22, 2025",
    time: "10:00 AM - 12:00 PM",
    subject: "General Mathematics"
  },
  {
    name: "Angelica Reyes",
    date: "April 24, 2025",
    time: "1:00 PM - 3:00 PM",
    subject: "Science Inquiry"
  }
];

function switchRole(role) {
  currentRole = role;

  $('.scheduleBox').each(function(index) {
    const $box = $(this);
    const $p = $box.find('p');
    const $button = $box.find('button');

    if (role === 'student') {
      if (index < 3) {
        const student = studentSchedules[index];
        $p.eq(0).text(student.name);
        $p.eq(1).text(student.date);
        $p.eq(2).text(student.time);
        $p.eq(3).text(student.subject);
        $button.text('Remind Tutor');
        $box.show();
      } else {
        $box.hide();
      }
    } else {
      const defaultData = $box.data('original'); 
      if (defaultData) {
        $p.eq(0).text(defaultData.name);
        $p.eq(1).text(defaultData.date);
        $p.eq(2).text(defaultData.time);
        $p.eq(3).text(defaultData.subject);
      }
      $button.text('Remind Student');
      $box.show();
    }
  });
}


$(document).ready(function() {
  $('.scheduleBox').each(function() {
    const $p = $(this).find('p');
    const originalData = {
      name: $p.eq(0).text(),
      date: $p.eq(1).text(),
      time: $p.eq(2).text(),
      subject: $p.eq(3).text()
    };s
    $(this).data('original', originalData);
  });

  switchRole(currentRole);
});