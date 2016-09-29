
function buildTable(a, filterText) {
 const OWN = 2;
 var $b = $('#listBody');
 $b.empty();
 for (var i=0; i<a.length; i++) {
  var $row = $('<tr />')
  var found = !filterText || filterText === ''
  for (var j=0; j<a[i].length; j++) {
    var cellContents = a[i][j]
    var cell = document.createElement('td');
    cell.innerHTML = cellContents;
    $row.append(cell);
    if (j === OWN && cellContents && cellContents !== '') {
      if(cellContents.toLowerCase() === 'y') {
        $row.attr('data-own', 'own')
      }
      else if(cellContents.toLowerCase() === 'expired') {
        $row.attr('data-own', 'expired')
      }
    }
    if (found || cellContents.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
      found = true;
    }
  }
  if (found)
    $b.append($row);
 }
}

function sortTable(a, col, direction) {
  return a.sort(sortFunction);

  function sortFunction(a, b) {
    if (direction === 'asc')
      return (b[col] || "!!!").toUpperCase().localeCompare((a[col] || "!!!").toUpperCase())
    else
      return (a[col] || "|||").toUpperCase().localeCompare((b[col] || "|||").toUpperCase())
  }
}


$(document).ready(function(){
 var a = buildSongList();
 a = sortTable(a, 0, 'desc');
 $('#list #artist').addClass('desc')
 buildTable(a);

 $('#search').on('keyup', function(e) {
  $('.asc').removeClass('asc')
  $('.desc').removeClass('desc')
  buildTable(a, $('#search').val())
 })
 $('#list th').on('click', function(e) {
  var direction = 'desc'
  if($(this).hasClass('desc')) {
    direction = 'asc'
  }
  $('.asc').removeClass('asc')
  $('.desc').removeClass('desc')

  a = sortTable(a, $(this).attr('data-index'), direction)
  buildTable(a)

  $(this).addClass(direction)
 })
  // $('#list').DataTable( {
  //   data: a,
  //   paging: false,
  //   columns: [
  //       { title: "Artist" },
  //       { title: "Title" },
  //       { title: "Own?" }
  //   ]
  // });
});
