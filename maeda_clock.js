// Update this function to draw you own maeda clock on a 960x500 canvas
function draw_clock(obj) {
  // YOUR MAIN CLOCK CODE GOES HERE
  background(150); // Black
  angleMode(DEGREES);
  translate(width / 2, height / 2);
  textAlign(CENTER, CENTER);

  push();
  rotate(-25);
  fill(0);
  textSize(400);
  
  text('11', 0, 0);
  pop();

  push();
  rotate(105);
  fill(255);
  textSize(300);
  text('4', 0, 0);
  pop();

  push();
  rotate(15);
  fill(255, 0, 0);
  textSize(200);
  text('47', 0, 0);
  pop();

  // background(0);

  // push();
  // translate(width / 3, height / 2);
  // let hour = {
    
  // };
  // pop();

  // push();
  // translate((width / 3) * 2, height / 2);
  // pop();
}