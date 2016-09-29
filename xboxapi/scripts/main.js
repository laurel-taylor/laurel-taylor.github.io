function parseDataFromSource() {

  // var json = DATA;
  // for (var i=0; i<json.Items.length; i++) {
  //   var $tr = $('<tr><td>' + json.Items[i].Name + '</td></tr>')
  //   $('#list').append($tr)
  // }
  function isPack(description) {
    return description.indexOf('by purchasing this song game track pack') >= 0
  }
  function isOther(description) {
    return description.indexOf('by purchasing this album') >= 0 ||
    description.indexOf('this game album') >= 0 ||
    description.indexOf('purchasing Going Country Pack') >= 0 ||
    description.indexOf('this song game Pro Guitar') >= 0 ||
    description.indexOf('Rock Band Network Megamix 01') >= 0 ||
    description.indexOf('(2x Bass Pedal)') >= 0 ||
    description.indexOf('this enhanced game track') >= 0
  }
  function isTrialSong(text) {
    return text.indexOf('Trial Song') >= 0
  }
  function getStartSongName(desc) {
    var startIndex = desc.indexOf('song game track: ')
    if(startIndex >= 0) return startIndex + 'song game track: '.length
    console.log('start not found: ' + desc)
  }
  function getSongName(st) {
    var index = st.indexOf('--')
    if(index <= 0) index = st.indexOf('–')
    if(index <= 0) console.log('no song found for ' + st)
    return st.substr(0, index).replace(/"/g, '')
  }
  function getArtistName(st) {
    var index = st.indexOf('--')
    var buffer = 2
    if(index <= 0) {
      index = st.indexOf('–')
      buffer = 1
    }
    if(index <= 0) console.log('no song found for ' + st)
    return st.substr(index+buffer)
  }
  function getEndSongName(description) {
    let index = description.indexOf('. PLEASE NOTE')
    if(index >= 0) return index
    index = description.indexOf('PLEASE NOTE')
    if(index >= 0) return index
    index = description.indexOf('. Rock Band game disc')
    if(index >= 0) return index
    index = description.indexOf('Rock Band game disc')
    if(index >= 0) return index
    console.log('end not found: ' + description)
  }
  var list = []
  $( "#resultsContainer" ).load( "data/pageResults.html", function() {
    console.log( "Load was performed." );
    $('ol.ProductResults > li').each(function(index) {
      var text = $(this).find('h2 a').html()
      var description = $(this).find('.ProductDescription').html()
      if(text && !isPack(description) && !isTrialSong(text) && !isOther(description)) {
        var startIndex = getStartSongName(description)
        var endIndex = getEndSongName(description)
        var songAndTitle = description.substr(startIndex, endIndex - startIndex)
        var songName = getSongName(songAndTitle)
        var artistName = songAndTitle.substr(songAndTitle.indexOf('--') + 2)
        list.push([artistName, songName])
      }
    });
    $('#list').DataTable({
      data: list,
      paging: false,
      columns: [
          { title: "Artist" },
          { title: "Title" }
      ]
    })
  });
}

function showJSData() {

  $('#list').DataTable({
    data: getSongList(),
    paging: false,
    columns: [
        { title: "Artist" },
        { title: "Title" }
    ]
  })

}
$(document).ready(function(){
  // parseDataFromSource();
  showJSData();
});
