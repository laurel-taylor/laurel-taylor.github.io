var wheelSpinning = false;
var wheelDisabled = false;

var theWheel = null;

function createWheel(goalList){
  // Create new wheel object specifying the parameters at creation time.
  var theWheel = new Winwheel({
    'numSegments'   : goalList.length,   // Specify number of segments.
    'outerRadius'   : 212,  // Set radius to so wheel fits the background.
    'innerRadius'   : 80,  // Set inner radius to make wheel hollow.
    'textFontSize'  : 16,   // Set font size accordingly.
    'textMargin'    : 0,    // Take out default margin.
    'segments'      :       // Define segments including colour and text.
      goalList,
    'animation' :           // Define spin to stop animation.
    {
      'type'     : 'spinToStop',
      'duration' : 5,
      'spins'    : 8, // change this to update how fast it spins
      'callbackFinished' : 'alertPrize(null, true)'
    }
  });
  return theWheel;
}


function startSpin(theWheel, power)
{
  // Ensure that spinning can't be clicked again while already running.
  if (wheelSpinning == false && !wheelDisabled)
  {
    var p = setPower(theWheel, power)
    theWheel.startAnimation();
    showPower(p);
    wheelSpinning = true;
    wheelDisabled = false;
  }
  else {
    // resetWheel(theWheel);
  }
}

function resetWheel(theWheel, list)
{
  theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
  theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
  // theWheel.segments = list;
  theWheel.draw();                // Call draw to render changes to the wheel.

  wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
  wheelDisabled = false;
  resetWinText();
}

function resetWinText() {
  $('#power-level').removeClass('animate')
  $('.goal-container').removeClass('animate')
  $('#canvas-container').css('opacity', 1)
}

function alertPrize(text)
{
  // Get the segment indicated by the pointer on the wheel background which is at 0 degrees.
  if(!text){
    var winningSegment = theWheel.getIndicatedSegment();
    text = winningSegment.text;
    theWheel.stopAnimation(false);
  }
  wheelSpinning = false;
  wheelDisabled = true;

  $('#goal-text').html(text)
  $('#goal-container').addClass('animate')
  $('#canvas-container').css('opacity', 0.5)
}

function setPower(theWheel, power) {
  var spins = 2
  var duration = 5
  var powerLevel = "Boo..."
  if (power >= 12) {
    spins = 20
    duration = 10
    powerLevel = "MAX POWER!!"
  }
  else if (power >= 6){
    spins = 13
    duration = 8
    powerLevel = "High Power!"
  }
  else if (power >= 3 ) {
    spins = 8
    duration = 6
    powerLevel = "Good Spin!"
  }
  else if (power > 1.5 ) {
    spins = 4
    duration = 5
    powerLevel = "Low power"
  }
  theWheel.animation.spins = spins
  theWheel.animation.duration = duration
  return powerLevel
}

function showPower(power){
  $('#power-level').html(power).addClass('animate')
}

function initWheel() {
  var customList = OHA_COOKIES.getCookie(OHA_COOKIES.customGoalsToken, defaultGoalList)
  var theWheel = createWheel(customList);
  return theWheel;
}

$(document).ready(function(){
 theWheel = initWheel();
 $('#reset-button').on('click', function(e) {
    goalList = OHA_COOKIES.getCookie(OHA_COOKIES.customGoalsToken, defaultGoalList);
    resetWheel(theWheel, goalList);
 })

 //notice dragging of the wheel
 var isDragging = false;
 var startMousePos = { x: -1, y: -1 };
 var startTime = 0;

 $('#canvas-container')
  .mousedown(function(e) {
    startMousePos = { x: e.pageX, y: e.pageY };
    isDragging = true
    startTime = new Date();
  })
  $(document).mouseup(function(e) {
    var p0 = startMousePos,
        p1 = { x: e.pageX, y: e.pageY },
        d = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
    if (d <= 4) {
      //clicked
    }
    if (d > 4 && isDragging) {
      //dragged
      var endTime = new Date();
      var timeDiff = endTime - startTime;
      if (timeDiff > 0) {
        var velocity = d / timeDiff;
        console.log('velocity: ' + velocity)
        startSpin(theWheel, velocity)
      }
    }

    isDragging = false;
    startTime = 0;
  })
});
