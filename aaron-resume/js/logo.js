var stage;
var time = 0;
var interval = 0.005;

var shape;
var shapePoints = 6;
var shapeDepth = 2;
var shapeAng = 360/shapePoints;
var shapeSize = 40;
var lineThickness = 1;

function init() {
	stage = new createjs.Stage("logo");
  TweenLite.ticker.addEventListener("tick", loop, this);

  createjs.Touch.enable(stage);
    
  shape = mCube(shapeSize, getRandomNumber(0.0, 1.0));
  shape.x = stage.canvas.width/2;
  shape.y = stage.canvas.height/2;
  shape.addEventListener("click", onShapeClicked);
  stage.addChild(shape);
}

function onShapeClicked(event) {
  stage.removeChild(shape);
  shape = mCube(shapeSize, getRandomNumber(0.0, 1.0));
  shape.x = stage.canvas.width/2;
  shape.y = stage.canvas.height/2;
  shape.addEventListener("click", onShapeClicked);
  stage.addChild(shape);
}

function loop() {
  stage.update();
  time+=interval;
}

function mCube(r, color) {
  var radius = r;
  var points = new Array();

  var shapeContainer = new createjs.Container();

  // Create an array of points to build the shape. Add one at the center to start.

  points.push(new Array(0, 0));

  for(var h = 1; h <= shapeDepth; h++) {
    for (var ang = 0; ang < 360; ang += shapeAng) {
      var rad = Math.radians(ang);
      var newX = 0 + ((radius*h) * Math.cos(rad));
      var newY = 0 + ((radius*h) * Math.sin(rad));

      points.push(new Array(newX, newY));
    }
  }

  // Now we're ready to build the shape by connecting the dots!

  for(var i = 0; i < points.length; i++) {
    var baseX = points[i][0];
    var baseY = points[i][1];
    for(var j = 0; j < points.length; j++) {
      var randomize = Math.random();
      if(randomize > 0.7) {
        var sX = points[j][0];
        var sY = points[j][1];

        var shape = new createjs.Shape();

        var ranSaturation = Math.random();

        shape.hue = color;
        if(ranSaturation > 0.2) {
          shape.saturation = 0.0;
        } else {
          shape.saturation = 1.0;
        }
        shape.lightness = getRandomNumber(0.3, 1.0);

        shape.baseX = baseX;
        shape.baseY = baseY;
        shape.oldX = baseX;
        shape.oldY = baseY;
        shape.newX = baseX;
        shape.newY = baseY;
        shape.sX = sX;
        shape.sY = sY;

        shapeContainer.addChild(shape);
        TweenMax.to(shape, 2, {alpha:0.7, newX:sX, newY:sY, delay:i*j*0.01, ease:Expo.easeOut, onUpdate:drawLine, onUpdateParams:[shape]});
      }
    }
  }

  // Then we add a circle around the outer edge of it and rotate it slightly. The rotation is only necessary to get a six sided shape upright

  var circle = new createjs.Shape();
  circle.graphics.beginStroke(hslToRgb(color, 0.0, getRandomNumber(0.7, 0.9)));
  circle.graphics.setStrokeStyle(lineThickness*2, "round");
  circle.graphics.drawCircle(0, 0, r*shapeDepth);

  shapeContainer.addChild(circle);
  TweenMax.from(circle, 2, {scaleX:0, scaleY:0, alpha:0, ease:Expo.easeOut});

  if(shapePoints == 6) {
    shapeContainer.rotation = shapeAng/2;
  }

  // set a hit area the size of the circle that we just made

  var hitCircle = new createjs.Shape();
  hitCircle.graphics.beginFill("#000000");
  hitCircle.graphics.drawCircle(0, 0, r*shapeDepth);
  shapeContainer.hitArea = hitCircle;
  
  return shapeContainer;
}

function drawLine(shape) {

  shape.graphics.clear();
  shape.graphics.setStrokeStyle(lineThickness, "round");
  shape.graphics.beginStroke(hslToRgb(shape.hue, shape.saturation, shape.lightness));
  shape.graphics.moveTo(shape.baseX, shape.baseY);
  shape.graphics.lineTo(shape.newX, shape.newY);
  shape.oldX = shape.newX;
  shape.oldY = shape.newY;
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
}

function getRandomNumber(min, max) {
  var ranNumber = Math.random() * (max - min) + min;
  return ranNumber; 
}

// the following color functions were acquired from several google searches.

function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
 
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')';
}

// start this thing!

window.addEventListener('load', init);