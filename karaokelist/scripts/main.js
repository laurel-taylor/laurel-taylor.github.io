const COLUMNS = {
  FILE_NAME: 0,
};

function getDataTable(a) {
  var table = $('#list').DataTable( {
    data: a,
    paging: false,
    select: false,
    fixedHeader: true,
    bAutoWidth: false,
    columns: [
        { title: "File Name", "width": "100%" },
    ],
  });

  return table;
}

function setUpHandlers(table) {
  $('.top-container').on('click', function(e) {
    $('body, html').animate({ scrollTop:0 }, 'fast');
  });

  $('.clear').on('click', function(e) {
    table.search('').columns().search('').draw();
  });
}

$(document).ready(function(){
  var fromListJS = buildSongList();
  var table = getDataTable(fromListJS);

  setUpHandlers(table);
});
