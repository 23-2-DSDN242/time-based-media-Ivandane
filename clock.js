/*
Use p5.js to draw a clock on a 960x500 canvas
*/

// GLOBAL VARIABLES
let initialize = true;
let sakuraImg;
let numSakura = 0;

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
    // Load sakura image
    sakuraImg = loadImage('assets/sakura.png');
    
    // Set boolean to false
    initialize = false;
  }

  // Set styles
  background(170);
  translate(width / 2, height / 2);
  angleMode(DEGREES);

  // DRAW POND
  pond();

  // DRAW BRANCHES
  // branch();

  // DRAW SAKURAS


  if (obj.hours > numSakura) {
    // Append sakuras array with new object
    sakuras.push(new Sakura());

    // Set numSakura to current hour
    numSakura++;
  }

  if (obj.hours < numSakura) {
    // Remove latest object from sakuras array
    sakuras.pop();

    // Set numSakura to current hour
    numSakura--;
  }

  // Run the show function for all objects in sakuras array
  for (const sakura of sakuras) {
    sakura.show(obj.hours);
  }

  console.log(numSakura);

  // DEBUG
  debug();
}

// SAKURA CLASS
class Sakura {
  // Constructor function
  constructor() {
    // Randomise variables
    this.scale = map(noise(frameCount), 0, 1, 0.5, 1);
    this.direction = round(noise(frameCount));
    this.initialRotation = map(noise(frameCount), 0, 1, 0, 359);
    this.rotationSpeed = map(noise(frameCount), 0, 1, 0, 0.1);

    // Set rotation as initial rotation
    this.rotation = this.initialRotation;
  }

  move() {
    
  }

  // Show function
  show(hours) {
    // Calculate the rotation based on the direction and elapsed time
    let rotationDirection = (this.direction === 0) ? 1 : -1;
    let currentRotation = ((frameCount * this.rotationSpeed) % 360) * rotationDirection;

    // Add initial rotation to create a seamless loop
    this.rotation = (currentRotation + this.initialRotation) % 360;

    // Set styles
    push();
    translate(0, 0);
    rotate(this.rotation);
    scale(this.scale);
    imageMode(CENTER);
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = color(40, 40, 40); // Dark gray

    // Shadow X
    if (hours <= 11) {
      drawingContext.shadowOffsetX = map(hours, 0, 11, 25, -25);
    }
    else {
      drawingContext.shadowOffsetX = map(hours, 12, 23, 25, -25);
    }
    
    // Shadow Y
    if (hours <= 5) {
      drawingContext.shadowOffsetY = map(hours, 0, 5, 20, -10);
    }
    else if (hours >= 6 && hours <= 11) {
      drawingContext.shadowOffsetY = map(hours, 6, 11, -10, 20);
    }
    else if (hours >= 12 && hours <= 17) {
      drawingContext.shadowOffsetY = map(hours, 12, 17, 20, -10);
    }
    else if (hours >= 18) {
      drawingContext.shadowOffsetY = map(hours, 18, 23, -10, 20);
    }

    // Draw image
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
  text('Number of sakura: ' + numSakura, -450, -125);
  pop();
}