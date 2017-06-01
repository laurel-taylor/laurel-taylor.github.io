
function filterTable(table) {
  const filters = {
    onlyOwned: $('#onlyOwned').is(':checked'),
    onlyFavorites: $('#onlyFavorites').is(':checked')
  };
  if(filters.onlyOwned) {
    table.columns(2).search('y').draw()
  }
  else {
    table.columns(2).search('').draw()
  }
}

function hasFavorite(list, item) {
  for(var i=0; i<list.length; i++) {
    const d = list[i];
    if(d.artist === item[0] && d.song === item[1]) {
      return true;
    }
  }
  return false;
}

function getDataTable(a, favoritesList) {
  var table = $('#list').DataTable( {
    data: a,
    paging: false,
    select: false,
    fixedHeader: true,
    bAutoWidth: false,
    columns: [
        { title: "Artist", "width": "40%" },
        { title: "Title", "width": "45%"  },
        { title: "Own?" }
    ],
    "createdRow": function(row, data, index){
      if(hasFavorite(favoritesList, data)) {
        $(row).addClass('favorite');
      }
      if(!data[2]) return
      if(data[2].toLowerCase() === 'y') {
        $(row).addClass('own');
      }
      else if(data[2].toLowerCase() === 'expired') {
        $(row).addClass('expired');
      }
    }
  });

  return table;
}


function setUpHandlers(a) {
 $('.clickme, #tooltip').on('click', function(e) {
  var $tooltip = $('#tooltip');
  if($tooltip.is(':visible')) {
    $('#tooltipIcon').addClass('glyphicon-info-sign').removeClass('glyphicon-remove-circle')
    $tooltip.hide();
  } else {
    $('#tooltipIcon').removeClass('glyphicon-info-sign').addClass('glyphicon-remove-circle')
    $tooltip.show();
  }
 })
 $('.top-container').on('click', function(e) {
  $('body, html').animate({scrollTop:0}, 'fast');
 });
}

function getFavoritesList() {
  var favoritesList = [{artist: '.38 Special', song: 'Caught Up in You'}];
  if (localStorage.getItem('rockband_favorites')) {
    favoritesList = JSON.parse(localStorage.getItem('rockband_favorites'));
    console.log('has list');
  }
  return favoritesList;
}

function saveFavoritesList(favorites) {
  localStorage.setItem('rockband_favorites', JSON.stringify(favorites))
}

function addToFavorites(list, item) {
  list.push(item);
  saveFavoritesList(list);
 //filterTable(table, { onlyOwned: $('#onlyOwned').is(':checked'), onlyFavorites: $('#onlyFavorites').is(':checked') });
}

function removeFromFavorites(list, item) {
  for(var i=0; i<list.length; i++) {
    const d = list[i];
    if(d.artist === item.artist && d.song === item.song) {
      console.log('removing ' + item.song );
      list.splice(i, 1);
      saveFavoritesList(list);
      break;
    }
  }
}

function disableFavorites() {
  const isDisabled = $('#disableFavorites').is(':checked')
  if(isDisabled) {
    $('table').addClass('hideFavorites');
  } else {
    $('table').removeClass('hideFavorites');
  }
  // TODO save disabled
}

$(document).ready(function(){
 var a = buildSongList()
 var favoritesList = getFavoritesList();
 var table = getDataTable(a, favoritesList);
 filterTable(table);
 setUpHandlers();
  disableFavorites();

 $('#onlyOwned').on('click', function(e) {
  filterTable(table)
 })
 $('#onlyFavorites').on('click', function(e) {
  filterTable(table)
 })
 $('#disableFavorites').on('click', function(e) {
  disableFavorites();
 })
 $('#clearFavs').on('click', function(e) {
    $('.favorite').removeClass('favorite')
    favoritesList = [];
    saveFavoritesList(favoritesList);
    // TODO fix this :/
    window.location.reload();
 });
 $(document).on('click', '#list tbody tr', function () {
    var $t = $(this);
    var data = table.row( this ).data();
    if($t.hasClass('favorite')) {
      $t.removeClass('favorite');
      removeFromFavorites(favoritesList, { artist: data[0], song: data[1] });
    } else {
      $t.addClass('favorite');
      addToFavorites(favoritesList, { artist: data[0], song: data[1] });
    }
  });

  // var filteredData = table.column(2).data().filter(function(value, index) {
  //   return value.toLowerCase().indexOf('y') >= 0
  // });
});
