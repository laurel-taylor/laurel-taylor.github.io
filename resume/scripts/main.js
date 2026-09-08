const formatDuration = (startDate, endDate = new Date()) => {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (endDate.getDate() < startDate.getDate()) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`);
  }
  return parts.length > 0 ? parts.join(' ') : '';
};

$(document).ready(() => {
  $('.duration[data-start]').each((_, el) => {
    const [year, month] = $(el).attr('data-start').split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const duration = formatDuration(startDate);
    if (duration) {
      $(el).text(`(${duration})`);
    }
  });

  $(document).on('click', '#silly-button', function(e) {
    e.preventDefault();
    $('.silly').show();
    $('.serious').hide();
    window.scrollTo(0,document.body.scrollHeight)
  })
  $(document).on('click', '#serious-button', function(e) {
    e.preventDefault();
    $('.silly').hide()
    $('.serious').hide()
  })
})
