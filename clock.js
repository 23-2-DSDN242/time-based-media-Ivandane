/*
Use p5.js to draw a clock on a 960x500 canvas
*/

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
  
  // Set styles
  background(170);
  translate(width / 2, height / 2);

  push();
  strokeWeight(5);
  stroke(0, 0, 255);
  noFill();
  ellipse(0, 0, 300);

  stroke(100, 100, 255);
  ellipse(0, 0, 250);
  
  stroke(150, 150, 255);
  ellipse(0, 0, 200);
  pop();

  let flower = new Flower(0, 0, 100, (255, 0, 0), 5);
  flower.show();
}

// FLOWER CLASS
class Flower {
  // CONSTRUCTOR FUNCTION
  constructor(_x, _y, _r, _color, _numPetals) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.color = _color;
    this.numPetals = _numPetals;
  }

  // CALCULATE PETALS FUNCTION
  calculatePetals() {
    switch(this.numPetals) {
      case 2:
        return 2;
      case 4:
        return 4;
      case 6:
        return 6;
      default:
        return 8;
    }
  }

  // SHOW FUNCTION
  show() {
    stroke(this.color);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < 360; i++) {
      let x = this.r * cos(i * this.numPetals) * cos(i);
      let y = this.r * cos(i * this.numPetals) * sin(i);

      vertex(x, y);
    }
    endShape();
  }
}