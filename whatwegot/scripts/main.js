var index;

function updateList(list, index, result, comeBack) {
  list[index] = [list[index][0], list[index][1], result, comeBack];
  save(list, index)
  return list;
}

function updateIndex(index) {
  saveIndex(index);
  return index;
}

function goTo(list, index) {
  $('#titleUp2').html(list[index-2] ? list[index-2][1] : '').attr('data-has', list[index-2] ? list[index-2][2] : '')
  $('#artistUp2').html(list[index-2] ? list[index-2][0] : '').attr('data-has', list[index-2] ? list[index-2][2] : '')
  $('#titleUp1').html(list[index-1] ? list[index-1][1] : '').attr('data-has', list[index-1] ? list[index-1][2] : '')
  $('#artistUp1').html(list[index-1] ? list[index-1][0] : '').attr('data-has', list[index-1] ? list[index-1][2] : '')
  $('#title').html(list[index][1]).attr('data-has', list[index][2])
  $('#artist').html(list[index][0]).attr('data-has', list[index][2])
  $('#titleDown1').html(list[index+1] ? list[index+1][1] : '').attr('data-has', list[index+1] ? list[index+1][2] : '')
  $('#artistDown1').html(list[index+1] ? list[index+1][0] : '').attr('data-has', list[index+1] ? list[index+1][2] : '')
  $('#titleDown2').html(list[index+2] ? list[index+2][1] : '').attr('data-has', list[index+2] ? list[index+2][2] : '')
  $('#artistDown2').html(list[index+2] ? list[index+2][0] : '').attr('data-has', list[index+2] ? list[index+2][2] : '')
  var $s = $('#songList')

  $('.highlighted').removeClass('highlighted')
  if (list[index][2].toLowerCase().indexOf('y') === 0) {
    $('#yes').addClass('highlighted')
  } else {
    $('#no').addClass('highlighted')
  }

  if (list[index][3]) {
    $('#star').addClass('highlighted')
  }
}

function convertToJS (list) {
  var start = 'function buildSongList() { \nvar a = new Array;';
  var end = '\nreturn a; \n}';
  var middle = '';
  for(var i=0; i<list.length; i++) {
    var s = '\na.push([';
    var row = list[i];
    for(var j=0; j<4; j++) {
      s += '"' + (row[j] || '') + '"' + (j===3 ? '' : ', ');
    }
    s += ']);'
    middle += s;
  }
  return start + middle + end;
}

function stripArticles (str) {
  if(str.indexOf('the ') === 0) {
    return str.substr(4)
  }
  if(str.indexOf('a ') === 0) {
    return str.substr(2)
  }
  if(str.indexOf('an ') === 0) {
    return str.substr(3)
  }
  return str;
}

function sortList (list) {
  return list.sort(function(first, second) {
    var aA = stripArticles(first[0].toLowerCase())
    var aB = stripArticles(second[0].toLowerCase())
    if (aA === aB) {
      var x = stripArticles(first[1].toLowerCase())
      var y = stripArticles(second[1].toLowerCase())
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }
    return ((aA < aB) ? -1 : ((aA > aB) ? 1 : 0));
  })
}

function init () {
  let songList;
  if (localStorage.getItem('rockband_list')) {
    songList = JSON.parse(localStorage.getItem('rockband_list'))
    index = parseInt(localStorage.getItem('rockband_index'))
    console.log('has list, index:', index)
  } else {
    songList = buildSongList();
    songList = sortList(songList);
    index = 0;
  }
  goTo(songList, index)
  $('#results').val('');
  return songList;
}

function save(list, index) {
  console.log('save called', index)
  localStorage.setItem('rockband_list', JSON.stringify(list))
  localStorage.setItem('rockband_index', index)
}
function saveIndex(index) {
  console.log('save index called', index)
  localStorage.setItem('rockband_index', index)
}

$(document).ready(function(){
  let a = init();

  $('#yes').on('click', function(e) {
    a = updateList(a, index, 'y', a[index][3] || '')
    if( index < a.length ) {
      index = updateIndex(index + 1)
      goTo(a, index)
    }
  })

  $('#no').on('click', function(e) {
    a = updateList(a, index, '', a[index][3] || '')
    if( index < a.length ) {
      index = updateIndex(index + 1)
      goTo(a, index)
    }
  })

  $('#star').on('click', function(e) {
    if (a[index][3]) {
      a = updateList(a, index, a[index][2], '')
    } else {
      a = updateList(a, index, a[index][2], 'come back')
    }
    goTo(a, index)
  })

  $('#up').on('click', function(e) {
    if( index > 0 ) {
      index = updateIndex(index - 1)
      goTo(a, index)
    }
  })

  $('#down').on('click', function(e) {
    if( index < a.length ) {
      index = updateIndex(index + 1)
      goTo(a, index)
    }
  })

  $('#convert').on('click', function(e) {
    $('#results').val(convertToJS(a));
  })

  $('#save').on('click', function(e) {
    save(a, index);
    $('#results').val(convertToJS(a));
  })

  $('#explode').on('click', function(e) {
    console.log('explode')
    localStorage.removeItem('rockband_list')
    localStorage.removeItem('rockband_index')
    a = buildSongList()
    index = updateIndex(0);
    goTo(a, index)
    $('#results').val(convertToJS(a));
  })

  //key press
  $(document).keydown(function(e) {
    switch(e.which) {
      //left
      case 37:
      a = updateList(a, index, 'y', a[index][3] || '')
      if (index < a.length) index = updateIndex(index + 1)
      goTo(a, index)
      break;

      //up
      case 38:
      if (index > 0) index = updateIndex(index - 1);
      goTo(a, index)
      break;

      //right
      case 39:
      a = updateList(a, index, '', a[index][3] || '')
      if (index < a.length) index = updateIndex(index + 1)
      goTo(a, index)
      break;

      //down
      case 40:
      if (index < a.length) index = updateIndex(index + 1)
      goTo(a, index)
      break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
});
