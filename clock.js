/*
Use p5.js to draw a clock on a 960x500 canvas
*/

// GLOBAL VARIABLES
let initialize = true;

let flowers = [];

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
    
    // Create flower objects
    flowers.push(new Flower(
      -300,
      -100,
      50,
      color(255, 0, 0),
      8
    ));
    
    flowers.push(new Flower(
      300,
      -100,
      50,
      color(255, 0, 255),
      8
    ));

    flowers.push(new Flower(
      -300,
      100,
      50,
      color(255, 255, 0),
      8
    ));

    flowers.push(new Flower(
      300,
      100,
      50,
      color(0, 255, 255),
      8
    ));

    // Set boolean to false
    initialize = false;
  }

  // Set styles
  background(170);
  translate(width / 2, height / 2);

  // DRAW POND
  pond();

  // DRAW BRANCHES
  branch();

  // DRAW FLOWERS
  // Repeat for every flower object in array
  for (const flower of flowers) {
    // Run show function
    flower.show();
  }
}

// FLOWER CLASS
class Flower {
  // Constructor function
  constructor(_x, _y, _r, _color, _numPetals) {
    // Pass arguments into respective variables
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.color = _color;
    this.numPetals = _numPetals;
  }

  // Show function
  show() {
    // Set styles
    push();
    stroke(this.color);
    strokeWeight(2);
    fill(this.color);

    // Draw flower
    beginShape();
    // Repeat for every angle
    for (let i = 0; i < 360; i++) {
      // Declare variables
      let x = this.r * cos(i * this.numPetals) * cos(i) + this.x;
      let y = this.r * cos(i * this.numPetals) * sin(i) + this.y;

      // Create vertex
      vertex(x, y);
    }
    endShape(CLOSE);
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
    // Set fill color and increasing alpha value
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
  // point(-120, -60);
  pop();
}