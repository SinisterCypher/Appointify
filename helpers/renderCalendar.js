
let calendarEl = document.getElementById('calendar');
let userSelection = document.getElementById('userSelection');
let calendar;
if (calendarEl) {
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  });

  calendar.render();
}
else {
  console.error('Calendar element not found');
}

calendar.on('dateClick', function (info) {
  console.log(info);
  userSelection.innerHTML = info.dateStr;
});

// export default calendar; 

