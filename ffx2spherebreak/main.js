$(document).ready(function() {
  $('#go').click( function() {
     myFunction();
  });

  $(document).on('keyup change', '#core, #echo', function(){
      var $this = $(this);
      myFunction($this.attr('value'));
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
  function myFunction()
  {

      var c = document.getElementById('core').value;
      var g = [2, 3, 5, 6];
      var s = [9,8,7,6,5,4,3,2,1];
      var results = new Array();
      var selectElt = document.getElementById('echo');
      var echo = selectElt.options[selectElt.selectedIndex].value;

      for(var i=0; i<g.length; i++){
        if(g[i]%c!=0){
           if(echo==2){
            for(var j=0; j<s.length; j++){
              var x = g[i] + s[j];
              if(x%c==0){
                 results.push([g[i], s[j]]);
              }
            }
           }
           else if(echo==3){
             for(var j=0; j<s.length; j++){
               var y = g[i] + s[j];
               if(y%c!=0){
                  for(var k=0; k<s.length; k++){
                    var x = g[i] + s[j] + s[k];
                    if(x%c==0){
                       results.push([g[i], s[j], s[k]]);
                    }
                  }
               }
             }
           }

        }

      }

      var newline = "<br/>"
      var string=newline;
      for(var i=0; i<results.length; i++){
          if(echo==2){
             string+="<span class='entry'>" + results[i][0] + "</span> + " + results[i][1] + newline;
          }
          else if (echo==3){
             string+="<span class='entry'>" + results[i][0] + "</span> + " + results[i][1] + " + " + results[i][2] + newline;
          }

      }

      document.getElementById('combos').innerHTML = string;
  }
})
