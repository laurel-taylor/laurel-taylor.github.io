const COLUMNS = {
    FILE_NAME: 0,
    FILE_PATH: 1,
  };
let fromListJS;
let table

function getDataTable(a, showFilter = false) {
    const filters = {
      filePath: $('#filePath').is(':checked'),
      showFilter: $('#tableFilter').is(':checked'),
    };

    if(table) table.destroy();

    let columns = [
        { title: "File Name", width: "100%" },
    ];

    if (filters.filePath) {
        columns = [
            { title: "Full Path", width: "100%" },
        ];
        a = a.map((item) => [item[COLUMNS.FILE_PATH]]);
    }

    table = $('#list').DataTable( {
        data: a,
        paging: false,
        select: false,
        fixedHeader: true,
        bAutoWidth: false,
        searching: showFilter || filters.showFilter,
        columns,
    });

    return table;
}

function setUpHandlers(table) {
    $('.top-container').on('click', function(e) {
        $('body, html').animate({ scrollTop:0 }, 'fast');
    });

    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        search();
    });

    $('#filePath, #tableFilter').on('click', function(e) {
        search();
    });
}

function setUpTableHandlers(table) {
    $('.clear').on('click', function(e) {
        table.search('');
    });
}

function search() {
    const term = $('#searching').val();
    $('.error-message, .sigh').hide();

    if (term === 'i did this to myself') {
        $('.sigh').show();
        table = getDataTable(fromListJS, true);
    } else if (term.length > 3) {
        const columnToSearch = $('#filePath').is(':checked') ? COLUMNS.FILE_PATH : COLUMNS.FILE_NAME;
        const filtered = fromListJS.filter((name) => name[columnToSearch].toLowerCase().indexOf(term.toLowerCase()) >= 0);
        table = getDataTable(filtered);
    } else {
        $('.error-message').show();
        if (term === '') {
            table = getDataTable([]);
        }
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
