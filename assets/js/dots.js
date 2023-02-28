// Setup the canvas element.
var canvas = $('canvas.dots');
var context = canvas[0].getContext('2d');
var canvasWidth = canvas.width();
var canvasHeight = canvas.height();
canvas.attr({height: canvasHeight, width: canvasWidth});

var dotNumber = 900;

for(var i = 0; i < dotNumber; ++i) {
  var min = 0.1;
  var max = 1.5;
  var dotRadius = Math.random() * (max - min) + min;

  var dotX = Math.random() * (canvasWidth - 8) + 8;
  var dotY = Math.random() * (canvasHeight -8) + 8;

  var frames = 150;
  var currentFrame = 0;

  var dot = {x : dotX, y: dotY, radius: dotRadius};
  drawDot(dot);
}

function drawDot(dot) {
  context.beginPath();
  context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
  context.fillStyle = '#FFFFFF'; //'#b2b2d8';
  context.fill();
}
