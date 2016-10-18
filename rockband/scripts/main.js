
function filterTable(table, filter) {
  if(filter) table.columns(2).search('y').draw()
  else {
    table.columns(2).search('').draw()
  }
}

function getDataTable(a) {
  var table = $('#list').DataTable( {
    data: a,
    paging: false,
    select: true,
    fixedHeader: true,
    bAutoWidth: false,
    columns: [
        { title: "Artist", "width": "40%" },
        { title: "Title", "width": "45%"  },
        { title: "Own?" }
    ],
    "createdRow": function(row, data, index){
      if(!data[2]) return
      if(data[2].toLowerCase() === 'y') {
        $(row).addClass('own')
      }
      else if(data[2].toLowerCase() === 'expired') {
        $(row).addClass('expired')
      }
    }
  });

  return table;
}


function setUpHandlers(a) {
 $('.clickme, #tooltip').on('click', function(e) {
  $('#tooltip').toggle();
 })
 $('.top-container').on('click', function(e) {
  $('body, html').animate({scrollTop:0}, 'fast');
 })
}

$(document).ready(function(){
 var a = buildSongList()
 var table = getDataTable(a)
 filterTable(table, $('#onlyOwned').is(':checked'))
 setUpHandlers();

 $('#onlyOwned').on('click', function(e) {
  filterTable(table, $('#onlyOwned').is(':checked'))
 })

  // var filteredData = table.column(2).data().filter(function(value, index) {
  //   return value.toLowerCase().indexOf('y') >= 0
  // });
});
