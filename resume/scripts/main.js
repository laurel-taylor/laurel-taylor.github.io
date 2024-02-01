$(document).ready(function() {
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
