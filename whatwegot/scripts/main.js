function appendToResults(obj) {
  var newRes = $('#results').val() + 'a.push(["' + (obj[0] ? obj[0].trim() : '') + '", "' + (obj[1] ? obj[1].trim() : '') + '", "' + (obj[2] ? obj[2].trim() : '') + '"]);\n'
  $('#results').val(newRes)
}
function goNext(a, index) {
  index = index + 1;
  $('#title').html(a[index][1])
  $('#artist').html(a[index][0])
  return index
}
function addAndGo(a, index, result) {
  appendToResults([a[index][0], a[index][1], result]);
  return goNext(a, index)
}
$(document).ready(function(){
  var index = 0;
  var a = buildSongList();
  $('#title').html(a[0][1])
  $('#artist').html(a[0][0])

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
    $('#title').html(a[index][1])
    $('#artist').html(a[index][0])
  });
  //key press
  $(document).keydown(function(e) {
    switch(e.which) {
      case 38: index = addAndGo(a, index, 'Y')
      break;

      case 39: index = addAndGo(a, index, '')
      break;

      case 40: index = addAndGo(a, index, 'Expired')
      break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
});
