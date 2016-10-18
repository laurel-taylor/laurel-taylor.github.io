function appendToResults(obj) {
  var newRes = $('#results').val() + 'a.push(["' + (obj[0] ? obj[0].trim() : '') + '", "' + (obj[1] ? obj[1].trim() : '') + '", "' + (obj[2] ? obj[2].trim() : '') + '"]);\n'
  $('#results').val(newRes)
}
function goNext(a, index) {
  index++;
  setDisplay(a, index)
  return index
}
function addAndGo(a, index, result) {
  appendToResults([a[index][0], a[index][1], result]);
  return goNext(a, index)
}
function setDisplay(a, index) {
  $('#title').html(a[index][1])
  $('#artist').html(a[index][0])
  $('#remaining').html(a.length - index)
  $('#songList').val(index)
  var $s = $('#songList')
  var optionTop = $s.find("option[value="+index+"]").offset().top
  $s.scrollTop($s.scrollTop() + (optionTop + $s.offset().top));
  var $res = $('#results');
  if($res.length) $res.scrollTop($res[0].scrollHeight - $res.height());
}
function setSongList(a, index) {
  var $l = $('#songList')
  for(var i=0; i<a.length; i++) {
    $l.append($('<option>', {value: i, text: a[i][0] + ', ' + a[i][1] + ', ' + a[i][2]}))
  }
}
$(document).ready(function(){
  var index = 0;
  var a = buildSongList();
  setSongList(a, index);
  setDisplay(a, index);
  $('#results').val('');

 $('#own').on('click', function(e) {
  index = addAndGo(a, index, 'Y')
 })
 $('#expired').on('click', function(e) {
  index = addAndGo(a, index, 'Expired')
 })
 $('#next').on('click', function(e) {
  index = addAndGo(a, index, '')
 })
 $('#add').on('click', function(e) {
  $('#addingArea').toggle();
  $('addText').focus();
 })
  $('#addme').on('click', function(e) {
    var split = $('#addText').val().split(',')
    appendToResults(split)
    $('#addText').val('');
    $('#addingArea').hide();
  })
  $('#results').click(function(){
      $(this).select();
  });

  $('#save').click(function(){
    localStorage.setItem("whatWeGot-list", $('#results').val());
    localStorage.setItem("whatWeGot-index", index);
  });
  $('#restore').click(function(){
     $('#results').val(localStorage.getItem('whatWeGot-list'));
     index = localStorage.getItem("whatWeGot-index");
     setDisplay(a, index)
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
