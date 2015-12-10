var APP = {};

function setupCard(indexes, list){
	var index = 0;
	var c = document.getElementById("cardBody");
	for(var i=0; i<5; i++){
		var r = document.createElement('tr');
		for(var j=0; j<5; j++){
			var d = document.createElement('td');
			var cellValue;
			var s1 = document.createElement('span');
			d.setAttribute('data-column', i);
			d.setAttribute('data-row', j);
			if(i==2 && j==2){
				cellValue="FREE SPACE";
				d.id="freeSpace";
				d.className = "taken";
				s1.innerHTML = cellValue;
				d.appendChild(s1);
			}
			else{
				cellValue = list[indexes[index]];
				index++;

				s1.innerHTML = cellValue;
				s1.className = "title";
				d.appendChild(s1);
				if(cellValue.indexOf('---') > -1){
					var s2 = document.createElement('span');
					s1.innerHTML = cellValue.substring(0, cellValue.indexOf('---'));
					s2.innerHTML = cellValue.substring(cellValue.indexOf('---')+3, cellValue.length);
					s2.className = "info";
					d.appendChild(s2);
				}
			}
			r.appendChild(d);
		}
		c.appendChild(r);
	}
}

function getIndexes(array) {
  var currentIndex = 30, 
  randomIndex,
  indexArray=[];

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * (array.length));
    var used = false;
    for(var i=0; i<indexArray.length; i++){
    	if(indexArray[i] == randomIndex){
    		used=true; 
    		break;
    	}
    }
	if(!used){
	    currentIndex -= 1;
	    indexArray.push(randomIndex);
	}
  }

  return indexArray;
}

function checkVictory(a){
	$('.winning').removeClass('winning');
	var max = a[0].length;
	var winning = [];
	//rows
	for(var i=0; i<max; i++){
		for(var j=0; j<max; j++){
			if(a[i][j] && j == (max-1)) winning.push([i, 0], [i, 1], [i, 2], [i, 3], [i, 4]);
			if(!a[i][j]) break;
		}
	}
	//columns
	for(var i=0; i<max; i++){
		for(var j=0; j<max; j++){
			if(a[j][i] && j == (max-1)) winning.push([0, i], [1, i], [2, i], [3, i], [4, i]);
			if(!a[j][i]) break;
		}
	}
	//diagonal left
	for(var i=0; i<max; i++){
		if(a[i][i] && i==max-1) winning.push([0,0], [1,1], [2,2], [3,3], [4,4]);
		if(!a[i][i]) break;
	}
	//diagonal right
	if(a[4][0] && a[3][1] && a[2][2] && a[1][3] && a[0][4]) 
		winning.push([4,0], [3,1], [2,2], [1,3], [0,4]);

	return winning;
}

function flashWinning(v){
	for(var i=0; i<v.length; i++){
		var cell = $('[data-row=' + v[i][0] + '][data-column=' + v[i][1] + ']');
		cell.addClass('winning');
	}
}
function displayTakens(taken){
	for(var i=0; i<taken.length; i++){
		var row = taken[i];
		for(var j=0; j<row.length; j++){
			if(taken[i][j]){
				$('[data-row=' + i + '][data-column=' + j + ']').addClass('taken');
			}
		}
	}
}

function updateTaken(taken){
    //save cookies
    localStorage.setItem("karaoke_bingo_taken", JSON.stringify(taken));
}
function loadCookie(name, obj){
    //if cookie not found, return obj
    var t = localStorage.getItem(name);
    if(t){
    	return $.parseJSON(t);
    }
    else {
    	localStorage.setItem(name, JSON.stringify(obj));
    }
    return obj;
}
function resetCookies(){
	localStorage.removeItem('karaoke_bingo_taken');
	localStorage.removeItem('karaoke_bingo_indexes');
	$('#card tbody').empty();
	init();
}


function init(){
	var array = getList();
	var indexes = getIndexes(array);
	APP.arrayIndexes = loadCookie("karaoke_bingo_indexes", indexes);
	setupCard(APP.arrayIndexes, array);

	var taken = [[false, false, false, false, false],
				 [false, false, false, false, false],
				 [false, false, true, false, false],
				 [false, false, false, false, false],
				 [false, false, false, false, false]];
	APP.taken = loadCookie("karaoke_bingo_taken", taken);
	displayTakens(APP.taken);
	var v = checkVictory(APP.taken);
	flashWinning(v);
	
}

$(document).on('click', 'table td', function(){
	$(this).toggleClass('taken');
	var row = $(this).attr('data-row');
	var column = $(this).attr('data-column');
	APP.taken[row][column] = !APP.taken[row][column];
    updateTaken(APP.taken);
	var v = checkVictory(APP.taken);
	flashWinning(v);
});
$(document).on('click', '#resetCookies', function(){
	resetCookies();
});


