/*
Use p5.js to draw a clock on a 960x500 canvas
*/

// GLOBAL VARIABLES
let initialize = true;
let oldHour;
let sakuraImg;

let flowers = [];
let sakuras = [];

// DRAW CLOCK FUNCTION
function draw_clock(obj) {
  // draw your own clock here based on the values of obj:
  //    obj.hours goes from 0-23
  //    obj.minutes goes from 0-59
  //    obj.seconds goes from 0-59
  //    obj.millis goes from 0-999
  //    obj.seconds_until_alarm is:
  //        < 0 if no alarm is set
  //        = 0 if the alarm is currently going off
  //        > 0 --> the number of seconds until alarm should go off
  
  // Run "setup" function
  if (initialize) {
    // Set styles
    angleMode(DEGREES);

    // Load sakura image
    sakuraImg = loadImage('assets/sakura.png');

    // Create sakura objects depending on the current hour
    for (let i = 0; i < obj.hours; i++) {
      // Append object to sakuras array
      sakuras.push(new Sakura(
        random(-200, 200), // X
        random(-100, 100), // Y
        random(0.5, 0.75) // Scale
      ));
    }

    // Set oldHour to current hour
    oldHour = obj.hours;
    
    // Set boolean to false
    initialize = false;
  }

  // Set styles
  background(170);
  translate(width / 2, height / 2);

  // DRAW POND
  pond();

  // DRAW BRANCHES
  // branch();

  // DRAW FLOWERS
  // Repeat for every flower object in array
  // for (const flower of flowers) {
  //   // Run show function
  //   flower.show();
  // }

  // DRAW SAKURAS
  if (obj.hours > oldHour) {
    // Append sakuras array with new object
    sakuras.push(new Sakura(
      random(-200, 200),
      random(-100, 100),
      random(0.25, 0.75)
    ));

    // Set oldHour to current hour
    oldHour = obj.hours;
  }

  if (obj.hours < oldHour) {
    // Remove latest object from sakuras array
    sakuras.pop();

    // Set oldHour to current hour
    oldHour = obj.hours;
  }

  // Repeat for all objects in sakuras array
  for (const sakura of sakuras) {
    sakura.setRotation(obj.seconds);
    sakura.show();
  }

  // DEBUG
  debug();
}

// SAKURA CLASS
class Sakura {
  // Constructor function
  constructor(_x, _y, _scale) {
    this.x = _x;
    this.y = _y;
    this.scale = _scale;

    this.direction = floor(random(2));
    this.rotation;
  }

  // Set rotation function
  setRotation(seconds) {
    // Clockwise
    if (this.direction === 0) {
      this.rotation = map(seconds, 0, 59, 0, 359);
    }

    // Anti-clockwise
    if (this.direction === 1) {
      this.rotation = map(seconds, 0, 59, 359, 0);
    }
  }

  // Move function
  move() {
    
  }

  // Show function
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    scale(this.scale);

    drawingContext.shadowOffsetX = 10;
    drawingContext.shadowOffsetY = -10;
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = color(40, 40, 40); // Dark gray

    imageMode(CENTER);
    image(sakuraImg, 0, 0);
    pop();
  }
}

// POND FUNCTION
function pond() {
  // Declare variables
  let pondAlpha = 1;
  let pondRadius = 500;

  // Set styles
  push();
  noStroke();

  // Repeat 50 times
  for (let i = 0; i < 50; i++) {
    // Set fill color with increasing alpha value
    fill(100, 100, 255, pondAlpha * i);

    // Draw ellipse with decreasing radius
    ellipse(0, 0, pondRadius - (i * 5));
  }
  pop();
}

// BRANCH FUNCTION
function branch() {
  push();
  stroke(160, 100, 0);
  strokeWeight(15);
  noFill();
  bezier(-480, -150, -300, -200, -200, -80, 0, -150);

  strokeWeight(10);
  bezier(-230, -140, -210, -100, -120, -80, -120, -80);
  pop();
}

// DEBUG FUNCTION
function debug() {
  push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text('Hours: ' + obj.hours, -450, -200);
  text('Minutes: ' + obj.minutes, -450, -175);
  text('Seconds: ' + obj.seconds, -450, -150);
  pop();
}