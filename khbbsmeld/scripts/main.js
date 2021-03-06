function buildDataTable(list) {
  var table = $('#list').DataTable({
    data: list,
    paging: false,
    columns: [
        { title: "Type" },
        { title: "Command" },
        { title: "Melds" },
        { title: "Cmd1" },
        { title: "Cmd2" },
        { title: "Success Rate" },
        { title: "Available for" },
        { title: "Shimmering" },
        { title: "Fleeting" },
        { title: "Pulsing" },
        { title: "Wellspring" },
        { title: "Soothing" },
        { title: "Hungry" },
        { title: "Abounding" }
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
  return table;
}

// this is kept in so you can see how cool it is to scrape data
// but it's not being used any more
function parseDataFromSource() {
  var list = []
  function stripText(string) {
    if(!string || string.indexOf('</strong>') < 0) return ""
    var start = string.indexOf('</strong>') + 9;
    var l = string.length - start
    return string.substr(start,l).trim();
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

        var s = ''
        $.each(list, (index) => {
          s += 'a.push(['
          for(var i=0; i<list[index].length; i++) {
            s += '"' + list[index][i] + '"';
            if(i != list[index].length-1) s+=', '
          }
          s += ']);\n'
        })
        $('#pushlist').val(s)
        buildDataTable(list)
      });
    });
  });
}

function filterTable(table, char) {
  if(char=='All') char = "Aqua|Terra|Ventus"
  table.columns(6).search('All|' + char, true, false).draw()
}

function loading(isLoading) {
  if(isLoading) $('#info').hide();
  else $('#info').show();
}

$(document).ready(function(){
  loading(true);
  // parseDataFromSource();
  var list = buildMeldList();
  var table = buildDataTable(list)
  filterTable(table, $('input[name=available]:checked').val())
  $('input[name=available]').change(()=>{
    filterTable(table, $('input[name=available]:checked').val())
  })
  loading(false);

});
