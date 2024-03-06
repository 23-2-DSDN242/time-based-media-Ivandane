// Declare global variables
let ellipseX = 175;
let ellipseY = 75;
let ellipseGrid = 60;

// DRAW CLOCK FUNCTION
function draw_clock(obj) {
  // Set styles
  background(0); // Black
  strokeWeight(2);
  noFill();

  // SECONDS
  push();
  // Declare second radius
  let secondRadius = 50;

  // Set stroke color
  stroke(0, 0, 255); // Blue
  
  // Draw ellipses
  drawEllipse(4, 0, secondRadius);
  drawEllipse(3, 0, secondRadius);
  drawEllipse(2, 0, secondRadius);
  drawEllipse(1, 0, secondRadius);
  drawEllipse(0, 0, secondRadius);
  drawEllipse(0, 1, secondRadius);
  drawEllipse(0, 2, secondRadius);
  drawEllipse(1, 2, secondRadius);
  drawEllipse(2, 2, secondRadius);
  drawEllipse(3, 2, secondRadius);
  drawEllipse(4, 3, secondRadius);
  drawEllipse(4, 4, secondRadius);
  drawEllipse(4, 5, secondRadius);
  drawEllipse(3, 6, secondRadius);
  drawEllipse(2, 6, secondRadius);
  drawEllipse(1, 6, secondRadius);
  drawEllipse(0, 5, secondRadius);

  drawEllipse(6, 1, secondRadius);
  drawEllipse(7, 0, secondRadius);
  drawEllipse(8, 0, secondRadius);
  drawEllipse(9, 0, secondRadius);
  drawEllipse(10, 1, secondRadius);
  drawEllipse(10, 2, secondRadius);
  drawEllipse(9, 3, secondRadius);
  drawEllipse(8, 3, secondRadius);
  drawEllipse(10, 4, secondRadius);
  drawEllipse(10, 5, secondRadius);
  drawEllipse(9, 6, secondRadius);
  drawEllipse(8, 6, secondRadius);
  drawEllipse(7, 6, secondRadius);
  drawEllipse(6, 5, secondRadius);
  pop();

  // MINUTES
  push();
  // Declare minute radius
  let minuteRadius = 55;

  // Set stroke color
  stroke(255, 255, 0); // Yellow

  // Draw ellipses
  drawEllipse(3, 0, minuteRadius);
  drawEllipse(2, 1, minuteRadius);
  drawEllipse(1, 2, minuteRadius);
  drawEllipse(0, 3, minuteRadius);
  drawEllipse(0, 4, minuteRadius);
  drawEllipse(1, 4, minuteRadius);
  drawEllipse(2, 4, minuteRadius);
  drawEllipse(3, 4, minuteRadius);
  drawEllipse(4, 4, minuteRadius);
  drawEllipse(3, 1, minuteRadius);
  drawEllipse(3, 2, minuteRadius);
  drawEllipse(3, 3, minuteRadius);
  drawEllipse(3, 5, minuteRadius);
  drawEllipse(3, 6, minuteRadius);

  drawEllipse(6, 1, minuteRadius);
  drawEllipse(7, 0, minuteRadius);
  drawEllipse(8, 0, minuteRadius);
  drawEllipse(9, 0, minuteRadius);
  drawEllipse(10, 1, minuteRadius);
  drawEllipse(10, 2, minuteRadius);
  drawEllipse(9, 3, minuteRadius);
  drawEllipse(8, 4, minuteRadius);
  drawEllipse(7, 5, minuteRadius);
  drawEllipse(6, 6, minuteRadius);
  drawEllipse(7, 6, minuteRadius);
  drawEllipse(8, 6, minuteRadius);
  drawEllipse(9, 6, minuteRadius);
  drawEllipse(10, 6, minuteRadius);
  pop();

  // HOURS
  push();
  // Declare hour radius
  let hourRadius = 60;

  // Set stroke color
  stroke(255, 0, 0); // Red

  // Draw ellipses
  drawEllipse(6, 0, hourRadius);
  drawEllipse(5, 0, hourRadius);
  drawEllipse(4, 0, hourRadius);
  drawEllipse(3, 1, hourRadius);
  drawEllipse(3, 2, hourRadius);
  drawEllipse(3, 3, hourRadius);
  drawEllipse(4, 4, hourRadius);
  drawEllipse(5, 4, hourRadius);
  drawEllipse(6, 4, hourRadius);
  drawEllipse(7, 1, hourRadius);
  drawEllipse(7, 2, hourRadius);
  drawEllipse(7, 3, hourRadius);
  drawEllipse(7, 4, hourRadius);
  drawEllipse(7, 5, hourRadius);
  drawEllipse(6, 6, hourRadius);
  drawEllipse(5, 6, hourRadius);
  drawEllipse(4, 6, hourRadius);
  pop();
}

// DRAW ELLIPSE FUNCTION
function drawEllipse(x, y, radius) {
  // Draw ellipse using arguments
  ellipse(ellipseX + ellipseGrid * x, ellipseY + ellipseGrid * y, radius);
}