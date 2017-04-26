function getCombos(echo, core)
{
  const gold = [2, 3, 5, 6];
  const silver = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  let results = new Array();

  for (let i = 0; i < gold.length; i++) {
    if (gold[i] % core !== 0) {
      if (echo === 2) {
        for (let j = 0; j < silver.length; j++) {
          const x = gold[i] + silver[j];

          if (x % core === 0) {
            results.push([gold[i], silver[j]]);
          }
        }
      } else if(echo === 3) {
        for (let j = 0; j < silver.length; j++) {
          const y = gold[i] + silver[j];

          if (y % core !== 0) {
            for (let k = 0; k < silver.length; k++) {
              const x = gold[i] + silver[j] + silver[k];

              if (x % core === 0) {
                results.push([gold[i], silver[j], silver[k]]);
              }
            }
          }
        }
      }
    }
  }

  const newline = "<br/>"
  let string = newline;
  for (let i=0; i<results.length; i++) {
    if(echo === 2) {
      string += "<span class='entry'>" + results[i][0] + "</span> + " + results[i][1] + newline;
    }
    else if (echo === 3){
      string += "<span class='entry'>" + results[i][0] + "</span> + " + results[i][1] + " + " + results[i][2] + newline;
    }
  }

  document.getElementById('combos').innerHTML = string;
}

$(document).ready( function() {
  $('#go').click( function() {
    getCombos(parseInt($('#echo').val()), parseInt($('#core').val()));
  });

  $(document).on('keyup change', '#core, #echo', function(){
    var $this = $(this);
    getCombos(parseInt($('#echo').val()), parseInt($('#core').val()));
    $('#core').select();
  })
  .on('focus', '#core', function(){
    var $this = $(this);
    $this.select();

    // Work around Chrome's little problem
    $this.mouseup(function() {
      // Prevent further mouseup intervention
      $this.unbind("mouseup");
      return false;
    });
  });
})
