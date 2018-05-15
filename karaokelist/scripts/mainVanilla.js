const COLUMNS = {
    FILE_NAME: 0,
  };
let fromListJS;
let table

function getDataTable(a, adminOverride = false) {
    if(table) table.destroy();

    table = $('#list').DataTable( {
        data: a,
        paging: false,
        select: false,
        fixedHeader: true,
        bAutoWidth: false,
        searching: adminOverride,
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

    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        search($('#searching').val());
    });
}

function setUpTableHandlers(table) {
    $('.clear').on('click', function(e) {
        table.search('');
    });
}

function search(term) {
    $('.error-message, .sigh').hide();

    if (term === 'i did this to myself') {
        $('.sigh').show();
        // table = getDataTable(fromListJS, true);
    } else if (term.length > 3) {
        const filtered = fromListJS.filter((name) => name[COLUMNS.FILE_NAME].toLowerCase().indexOf(term.toLowerCase()) >= 0);
        table = getDataTable(filtered);
    } else {
        $('.error-message').show();
    }
}

$(document).ready(function(){
    fromListJS = buildSongList();
    $('.loading').hide();
    $('.loaded').show();
    table = getDataTable([]);

    setUpTableHandlers(table);

    setUpHandlers();
});
