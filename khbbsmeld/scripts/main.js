function parseDataFromSource() {
  var list = []
  function stripText(string) {
    if(!string || string.indexOf('</strong>') < 0) return ""
    var start = string.indexOf('</strong>') + 9;
    var l = string.length - start
    return string.substr(start,l)
  }
  function loadPage(type) {
    $('h2').each(function(index) {
      var command, melds, meld1, meld2, d;
      command = $(this).html();
      var $table = $(this).next();

      $table.find('td').each(function(row) {
        if($(this).find('h3').length) {
          melds = $(this).find('h3').html()
          var meld1 = melds.split('+')[0]
          var meld2 = melds.split('+')[1]
          var $data = $(this).find('p')
          if($data.length) {
            d = $data.html().split('<br>')
          }
          list.push([type, command, melds, meld1, meld2, stripText(d[0]),
            stripText(d[1]), stripText(d[2]), stripText(d[3]), stripText(d[4]),
            stripText(d[5]), stripText(d[6]), stripText(d[7]), stripText(d[8])])
        }
      })
    });
  }
  $( "#resultsContainer" ).load( "data/pageResultsMagic.html", function() {
    console.log( "Load was performed." );
    loadPage('Magic');

    $( "#resultsContainer" ).load( "data/pageResultsAttack.html", function() {
      console.log( "Load was performed." );
      loadPage('Attack')

      $( "#resultsContainer" ).load( "data/pageResultsOther.html", function() {
        console.log( "Load was performed." );
        loadPage('Other')

        $('#list').DataTable({
          data: list,
          paging: false,
          columns: [
              { title: "type" },
              { title: "command" },
              { title: "melds" },
              { title: "meld1" },
              { title: "meld2" },
              { title: "success" },
              { title: "available" },
              { title: "shimmering" },
              { title: "fleeting" },
              { title: "pulsing" },
              { title: "wellspring" },
              { title: "soothing" },
              { title: "hungry" },
              { title: "abounding" }
          ],
          "columnDefs": [ {
              "targets": 5,
              "createdCell": function (td, cellData, rowData, row, col) {
                var amount = cellData.substr(0, cellData.length-1)
                if ( amount < 100 ) {
                  $(td).css('color', 'red')
                }
              }
            } ,
            {
              "targets": [8,9,10,11,12,13],
              "createdCell": function (td, cellData, rowData, row, col) {
                if ( cellData && cellData.toLowerCase().indexOf('hp') >= 0 ) {
                  $(td).css('color', 'lightgreen')
                }
              }
            }
          ]
        })
      });
    });
  });
}
$(document).ready(function(){
  parseDataFromSource();
});
