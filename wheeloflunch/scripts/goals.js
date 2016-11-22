var defaultGoalList = [
   {'fillStyle' : '#9fc7cf', 'text' : 'Taco Bell'},
   {'fillStyle' : '#60a1ae', 'text' : 'Flo\'s'},
   {'fillStyle' : '#fda47a', 'text' : 'Zoe\'s'},
   {'fillStyle' : '#9fc7cf', 'text' : 'Flower Child'},
   {'fillStyle' : '#fda47a', 'text' : 'BWW'},
   {'fillStyle' : '#60a1ae', 'text' : 'Sugar Jam'},
   {'fillStyle' : '#fda47a', 'text' : 'Fresh Mint'},
   {'fillStyle' : '#9fc7cf', 'text' : 'Thai House'},
   {'fillStyle' : '#60a1ae', 'text' : 'RA'},
   {'fillStyle' : '#fda47a', 'text' : 'Villiage Inn'},
   {'fillStyle' : '#9fc7cf', 'text' : 'Ajo Al\'s'},
   {'fillStyle' : '#60a1ae', 'text' : 'eggstacy'},
   {'fillStyle' : '#fda47a', 'text' : 'Yogi\'s'}
]
var goalList;

function makeGoal(fillStyle, goalText) {
  var $goal = $('<div class="goal"></div>')
  var $color = $('<input type="color" class="color-picker" value="' + fillStyle + '"/>')
  var $goalText = $('<input type="text" class="goal-text" value="' + goalText + '" maxLength="16"/>')
  var $remove = $('<i class="fa fa-times-circle remove"></i>')
  $goal.append($color).append($goalText).append($remove)
  return $goal;
}

function displayGoals(list) {
  var $container = $('#goals-container').empty();
  for(var i=0; i<list.length; i++) {
    var fillStyle = list[i].fillStyle
    var goalText = list[i].text
    var $goal = makeGoal(fillStyle, goalText);
    $container.append($goal)
  }
  setTimeout(function(){
    $('.goal').addClass('animate')
  }, 0)
}

function addGoal() {
  var $goal = makeGoal('#ffffff', '')
  $('#goals-container').append($goal)
  setTimeout(function(){
    $goal.addClass('animateOne')
  }, 0)
}

function removeGoal($goal) {
  $goal.removeClass('animate animateOne');
  setTimeout(function(){
    $goal.remove();
  },200)
}

function saveGoals() {
  var list = [];
  $('.goal').each(function() {
    var fillStyle = $(this).find('.color-picker').val()
    var goalText = $(this).find('.goal-text').val()
    list.push({'fillStyle': fillStyle, 'text': goalText})
  })

  $('#save-success').addClass('animate');
  setTimeout(function() {
    $('#save-success').removeClass('animate');
  }, 2000)

  OHA_COOKIES.updateCookie(OHA_COOKIES.customGoalsToken, list);
  return list;
}

function loadGoals(list){
  displayGoals(list)
  return list;
}

$(document).ready(function(){
  goalList = OHA_COOKIES.getCookie(OHA_COOKIES.customGoalsToken, defaultGoalList);

  displayGoals(goalList);
  $('#default-button').on('click', function(e) {
    goalList = loadGoals(defaultGoalList);
  })

  $('#sample1-button').on('click', function(e) {
    goalList = loadGoals(sample1);
  })
  $('#sample2-button').on('click', function(e) {
    goalList = loadGoals(sample2);
  })

  $('#save-button').on('click', function(e) {
    goalList = saveGoals();
    location.reload();
  })
  $('#add-button').on('click', function(e) {
    addGoal();
  })

  $('#goals-container').on('click', '.goal .remove', function(){
    removeGoal($(this).parent())
  })
});
