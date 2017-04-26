var index;

function goTo(a, index) {
  setDisplay(a, index)
  return index
}

function updateList(a, index, result, comeBack) {
  a[index] = [a[index][0], a[index][1], result, comeBack];
  return a;
}

function setDisplay(a, index) {
  $('#title').html(a[index][1])
  $('#artist').html(a[index][0])
  var $s = $('#songList')

  $('.highlighted').removeClass('highlighted')
  if (a[index][2].toLowerCase().indexOf('y') === 0) {
    $('#yes').addClass('highlighted')
  } else {
    $('#no').addClass('highlighted')
  }
}

function init () {
  index = 0;
  var a = buildSongList();
  setDisplay(a, index);
  $('#results').val('');
  return a;
}
$(document).ready(function(){
  var a = init();

  $('#yes').on('click', function(e) {
    a = updateList(a, index, 'y', a[index][3] || '')
    index = goTo(a, index + 1)
  })

  $('#no').on('click', function(e) {
    a = updateList(a, index, '', a[index][3] || '')
    index = goTo(a, index + 1)
  })

  $('#star').on('click', function(e) {
    a = updateList(a, index, a[index][2], 'come back')
  })

  $('#results').click(function(){
    $(this).select();
  });

  //key press
  $(document).keydown(function(e) {
    switch(e.which) {
      //left
      case 37: index = addAndGo(a, index, 'Expired')
      break;

      //up
      case 38:
        $('#addingArea').toggle();
        $('addText').focus();
      break;

      //right
      case 39: index = addAndGo(a, index, 'Y')
      break;

      //down
      case 40: index = addAndGo(a, index, '')
      break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
});
