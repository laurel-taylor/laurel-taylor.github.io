const COLUMNS = {
  ARTIST: 0,
  SONG: 1,
  OWN: 2,
  COME_BACK: 3,
  FAVORITE: 4,
}

function filterTable(table) {
  const filters = {
    onlyOwned: $('#onlyOwned').is(':checked'),
    onlyFavorites: $('#onlyFavorites').is(':checked'),
    comeBack: $('#comeBack').is(':checked'),
  };

  table.columns(COLUMNS.OWN).search(filters.onlyOwned ? 'y' : '')
       .columns(COLUMNS.COME_BACK).search(filters.comeBack ? 'come back' : '')
       .columns(COLUMNS.FAVORITE).search(filters.onlyFavorites ? 'y' : '')
       .draw();
}

function hasFavorite(favoriteList, item) {
  for(var i=0; i<favoriteList.length; i++) {
    const d = favoriteList[i];
    if(d.artist === item[COLUMNS.ARTIST] && d.song === item[COLUMNS.SONG]) {
      return true;
    }
  }
  return false;
}

function getDataTable(a) {
  var table = $('#list').DataTable( {
    data: a,
    paging: false,
    select: false,
    fixedHeader: true,
    bAutoWidth: false,
    columns: [
        { title: "Artist", "width": "40%" },
        { title: "Title", "width": "45%"  },
        { title: "Own?", },
        { title: "Come Back" },
        { title: "Favorite" }
    ],
    "createdRow": function(row, data, index){
      if(data[COLUMNS.FAVORITE].toLowerCase() === 'y') {
        $(row).addClass('favorite');
      }

      if(!data[COLUMNS.OWN]) return
      if(data[COLUMNS.OWN].toLowerCase() === 'y') {
        $(row).addClass('own');
      }
      else if(data[COLUMNS.OWN].toLowerCase() === 'expired') {
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
  });

  $('.top-container').on('click', function(e) {
    $('body, html').animate({ scrollTop:0 }, 'fast');
  });
}

function getFavoritesList() {
  var favoritesList = [{artist: '.38 Special', song: 'Caught Up in You'}];
  if (localStorage.getItem('rockband_favorites')) {
    favoritesList = JSON.parse(localStorage.getItem('rockband_favorites'));
  }
  return favoritesList;
}

function saveFavoritesList(favorites) {
  localStorage.setItem('rockband_favorites', JSON.stringify(favorites))
}

function addToFavorites(list, item) {
  list.push(item);
  saveFavoritesList(list);
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
  const isDisabled = true; // $('#disableFavorites').is(':checked')
  if(isDisabled) {
    $('table').addClass('hideFavorites');
  } else {
    $('table').removeClass('hideFavorites');
  }
}

function buildTableList(list, favoritesList) {
  var t = [];
  list.map((item) => {
    item.push(hasFavorite(favoritesList, item) ? 'y' : '');
    t.push(item);
  });
  return t;
}

$(document).ready(function(){
  var fromListJS = buildSongList();
  var favoritesList = getFavoritesList();
  var t = buildTableList(fromListJS, favoritesList);
  var table = getDataTable(t);
  filterTable(table);
  setUpHandlers();
  disableFavorites();

  $('.filter').on('click', function(e) {
    filterTable(table);
  });

  $('.clear').on('click', function(e) {
      table.search('').columns().search('').draw();
  });

  $('#disableFavorites').on('click', function(e) {
    disableFavorites();
  });

  $('#clearFavs').on('click', function(e) {
    $('.favorite').removeClass('favorite')
    favoritesList = [];
    saveFavoritesList(favoritesList);
    // TODO reloading works but is dumb
    window.location.reload();
  });

  $(document).on('click', '#list tbody tr', function () {
    var $t = $(this);
    var data = table.row( this ).data();
    if($t.hasClass('favorite')) {
      $t.removeClass('favorite');
      removeFromFavorites(favoritesList, { artist: data[COLUMNS.ARTIST], song: data[COLUMNS.SONG] });
    } else {
      $t.addClass('favorite');
      addToFavorites(favoritesList, { artist: data[COLUMNS.ARTIST], song: data[COLUMNS.SONG] });
    }
  });
});
