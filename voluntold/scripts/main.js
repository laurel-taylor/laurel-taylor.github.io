function displayList(list, id) {
  var $rl = $('#' + id).empty();
  for( var i=0; i<list.length; i++) {
    $rl.append('<li class="number_'+ i + '">' + list[i] + '</li>');
  }
}

function init (list) {
  displayList(list, 'list1');
  var randomList = randomize(list);
  displayList(randomList, 'list2');
}

function shuffle(arr) {
  var array = []
  for (var i = 0; i<arr.length; i++) {
    array.push(arr[i]);
  }

  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

function randomize(list, counter=0) {
  //randomize list
  var randomList = shuffle(list);

  var isDone = true;
  for(var i=0; i<list.length; i++) {
    if(list[i] === randomList[i]) {
      isDone = false;
      break;
    }
  }

  if(!isDone) {
    if(counter > 20) {
      return ['not able to randomize...'];
    } else {
      console.log('randomizing again', counter)

      counter++;
      randomize(list, counter)
    }
  }
  return randomList;
}

$(document).ready(function() {
  var list1 = [
    'The Kylo Rentals',
    'Space Pigs',
    'Space Pigs - B side',
    'Suri You Jest',
    'Laurel and the Hardys',
    'Ryan Schremp and the Coctails'
  ];

  init(list1);
  $(document).on('click', '#randomize', function() {
    displayList(randomize(list1), 'list2')
  }).on('change', '#number', function() {
    $('#list2 li').removeClass('show')
    var val = +$('#number').val()
    $('#list2').addClass('hideAll')
    if(val > 0) {
      $('#list2 .number_' + (val-1)).addClass('show')
    }
    else {
      $('#list2').removeClass('hideAll')
    }
  })
});
