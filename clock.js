// GLOBAL VARIABLES
let sakuras = [];
let lanterns = [];
let petals = [];
let sg, petalImg, lanternImg, lanternLitImg;
let numSakuras = 0;
let numLanterns = 0;
let numPetals = 0;
let t = 0;
let flash = 0;
let night;
let waterColor;

// PRELOAD FUNCTION
function preload() {
  // Create graphic
  sg = sakura();

  // Load images
  petalImg = loadImage('assets/petal.png');
  lanternImg = loadImage('assets/lantern.png');
  lanternLitImg = loadImage('assets/lantern-lit.png');

  // Create lantern objects
  lanterns.push(new Lanterns(700, -300));
  lanterns.push(new Lanterns(500, -150));
  lanterns.push(new Lanterns(700, 0));
  lanterns.push(new Lanterns(500, 150));
  lanterns.push(new Lanterns(700, 300));

  // Create petal objects
  petals.push(new Petals(petals.length, -400, -200));
  petals.push(new Petals(petals.length, -300, -150));
  petals.push(new Petals(petals.length, -400, -100));
  petals.push(new Petals(petals.length, -300, -50));
  petals.push(new Petals(petals.length, -400, 0));
  petals.push(new Petals(petals.length, -300, 50));
  petals.push(new Petals(petals.length, -400, 100));
  petals.push(new Petals(petals.length, -300, 150));
  petals.push(new Petals(petals.length, -400, 200));
}

// DRAW CLOCK FUNCTION
function draw_clock(obj) {
  // Set styles
  translate(width / 2, height / 2);
  angleMode(DEGREES);

  // Set night variable
  if (obj.hours >= 6 && obj.hours < 19) {
    night = false;
  } else {
    night = true;
  }

  // Set water color
  if (obj.hours <= 3 || obj.hours >= 19) {
    waterColor = color(20, 20, 100);
  }
  if (obj.hours >= 4 && obj.hours <= 9) {
    waterColor = lerpColor(color(20, 20, 100), color(100, 100, 255), map(obj.hours, 4, 9, 0, 1));
  }
  if (obj.hours >= 10 && obj.hours <= 15) {
    waterColor = color(100, 100, 255);
  }
  if (obj.hours >= 16 && obj.hours <= 19) {
    waterColor = lerpColor(color(100, 100, 255), color(20, 20, 100), map(obj.hours, 16, 19, 0, 1));
  }
  background(waterColor);

  // DRAW KOI
  koi();

  // DRAW SAKURAS
  // Declare 12-hour variable
  let hour12 = (obj.hours) % 12;

  // Set 12-hour variable to correct value
  if (obj.hours === 0 && hour12 === 0) {
    hour12 = 12;
  }
  if (obj.hours >= 11 && hour12 == 0) {
    hour12 = 12;
  }

  // Create new sakura object when it is 1AM / 1PM
  if (obj.hours === 1 || obj.hours === 13) {
    // Reset sakuras array and variable
    sakuras = [];
    numSakuras = 0;

    // Create sakura
    sakuras.push(new Sakuras(0, 1, sg));
    numSakuras++;
  }

  // Create new sakura objects depending on the current hour
  else {
    while (sakuras.length < hour12) {
      sakuras.push(new Sakuras(sakuras.length, hour12, sg));
      numSakuras++;
    }

    while (sakuras.length > hour12) {
      sakuras.pop();
      numSakuras--;
    }
  }

  // Show and move all sakura objects in the array
  for (const sakura of sakuras) {
    sakura.move();
    sakura.show();
  }

  // DRAW LANTERNS
  // Declare target and countdown variables
  let targetNumLanterns = floor(obj.minutes / 10);
  let countdown = floor(obj.seconds_until_alarm);

  // Show the target number of lanterns
  for (let i = 0; i < targetNumLanterns && i < lanterns.length; i++) {
      lanterns[i].show(1);
  }

  // When alarm is counting down, toggle visible lanterns on / off
  if (obj.seconds_until_alarm > 0 && countdown <= lanterns.length && countdown > 0) {
      if (lanterns[countdown - 1].showing) {
          lanterns[countdown - 1].show(0);
      }
  }

  // When alarm is running, make visible lanterns flash
  else if (obj.seconds_until_alarm === 0) {
    if (frameCount % 60 === 0) {
      flash++;
    }

    if (flash % 2 == 0) {
      for (let i = 0; i < lanterns.length; i++) {
        if (lanterns[i].showing) {
          lanterns[i].show(1);
        }
      }
    } else {
      for (let i = 0; i < lanterns.length; i++) {
        if (lanterns[i].showing) {
          lanterns[i].show(0);
        }
      }
    }
  }

  // DRAW PETALS
  // Declare target variable
  let targetNumPetals = obj.minutes % 10;

  // Show the target number of petals
  for (let i = 0; i < targetNumPetals && i < petals.length; i++) {
    petals[i].show();
  }

  // DEBUG
  // debug(hour12, night);
}

// SAKURAS CLASS
class Sakuras {
  // Constructor function
  constructor(_index, _hour12, _graphic) {
    // Set graphic
    this.graphic = _graphic;

    // Set initial coordinates
    this.x = 0;
    this.y = 0;

    // Set distance variables
    this.distanceTraveled = 0;
    this.maxDistance = 50;

    // Randomise variables
    this.scale = map(noise(_index), 0, 1, 0.4, 0.6);
    this.direction = round(noise(_index + 1000));
    this.initialRotation = map(noise(_index + 2000), 0, 1, 0, 359);
    this.rotationSpeed = map(noise(_index + 3000), 0, 1, 0.05, 0.1);
    this.glowHue = round(map(noise(_index + 4000), 0, 1, 0, 359));

    // Set rotation as initial rotation
    this.rotation = this.initialRotation;

    // Set angle to increment by 30 degrees based on current index
    this.angle = _index * 30;
    
    // Adjust angle to start from the top
    this.angle -= 60;
  }

  // Move function
  move() {
    // When alarm is running
    if (obj.seconds_until_alarm === 0) {
      // Calculate the maximum distance based on milliseconds
      if (obj.millis % 1000 < 500) {
        this.maxDistance = map(obj.millis % 500, 0, 499, 50, 125);
      } else {
        this.maxDistance = map(obj.millis % 500, 0, 499, 125, 50);
      }

      // Check if traveled distance has reached maximum distance
      if (this.distanceTraveled < this.maxDistance) {
        // Update X and Y positions
        this.x += cos(this.angle) * 2;
        this.y += sin(this.angle) * 2;

        // Increment distance traveled
        this.distanceTraveled++;
      } else {
        // Reset distance variables and invert the angle to move back inward
        this.distanceTraveled = 0;
        this.maxDistance = 50;
        this.angle += 180;
      }
    }
    // When alarm is not active
    else {
      // Reset maximum distance
      this.maxDistance = 50;

      // Check if traveled distance has reached maximum distance
      if (this.distanceTraveled < this.maxDistance) {
        // Update X and Y positions
        this.x += cos(this.angle) * 2;
        this.y += sin(this.angle) * 2;

        // Increment distance traveled
        this.distanceTraveled++;
      }
    }
  }

  // Show function
  show() {
    // Declare variables for the rotation based on the direction, and elapsed time
    let rotationDirection = (this.direction === 0) ? 1 : -1;
    let currentRotation = ((frameCount * this.rotationSpeed) % 360) * rotationDirection;

    // Add initial rotation to create a seamless loop
    this.rotation = (currentRotation + this.initialRotation) % 360;

    // Set styles
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    scale(this.scale);
    imageMode(CENTER);

    if (night) {
      // Set glow blur
      drawingContext.shadowBlur = 30;

      // Set glow color
      let glowColorHSB = color(this.glowHue, 100, 35);
      let glowColorRGB = color(red(glowColorHSB), green(glowColorHSB), blue(glowColorHSB));
      drawingContext.shadowColor = glowColorRGB;

      // Initialise glow X and Y offsets
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
    } else {
      // Set shadow blur
      drawingContext.shadowBlur = 25;

      // Set shadow color
      drawingContext.shadowColor = color(40, 40, 40); // Dark gray

      // Set shadow X offset
      if (obj.hours <= 11) {
        drawingContext.shadowOffsetX = map(obj.hours, 0, 11, 10, -10);
      } else {
        drawingContext.shadowOffsetX = map(obj.hours, 12, 23, 10, -10);
      }
      
      // Set shadow Y offset
      if (obj.hours <= 5) {
        drawingContext.shadowOffsetY = map(obj.hours, 0, 5, 10, -10);
      } else if (obj.hours >= 6 && obj.hours <= 11) {
        drawingContext.shadowOffsetY = map(obj.hours, 6, 11, -10, 10);
      } else if (obj.hours >= 12 && obj.hours <= 17) {
        drawingContext.shadowOffsetY = map(obj.hours, 12, 17, 10, -10);
      } else if (obj.hours >= 18) {
        drawingContext.shadowOffsetY = map(obj.hours, 18, 23, -10, 10);
      }
    }
    
    // Draw sakura
    image(this.graphic, 0, 0);
    pop();
  }
}

// LANTERNS CLASS
class Lanterns {
  // Constructor function
  constructor(_x, _y) {
    // Set X and Y coordinates
    this.x = _x;
    this.y = _y;

    // Set scale
    this.scale = 0.5;

    // Set glow color
    this.glowColor = color(255, 100, 0);

    // Declare showing variable
    this.showing = false;
  }

  // Show function
  show(_state) {
    // Set showing flag based on the state
    this.showing = (_state === 1); // Cited from ChatGPT

    // Set styles
    push();
    scale(this.scale);
    imageMode(CENTER);

    if (night) {
      // Set glow blur
      drawingContext.shadowBlur = 30;

      // Set glow color
      drawingContext.shadowColor = this.glowColor;

      // Initialise glow X and Y offsets
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
    } else {
      // Set shadow blur
      drawingContext.shadowBlur = 15;

      // Set shadow color
      drawingContext.shadowColor = color(40, 40, 40); // Dark gray

      // Set shadow X offset
      if (obj.hours <= 11) {
        drawingContext.shadowOffsetX = map(obj.hours, 0, 11, 5, -5);
      } else {
        drawingContext.shadowOffsetX = map(obj.hours, 12, 23, 5, -5);
      }
      
      // Set shadow Y offset
      if (obj.hours <= 5) {
        drawingContext.shadowOffsetY = map(obj.hours, 0, 5, 10, 5);
      } else if (obj.hours >= 6 && obj.hours <= 11) {
        drawingContext.shadowOffsetY = map(obj.hours, 6, 11, 5, 10);
      } else if (obj.hours >= 12 && obj.hours <= 17) {
        drawingContext.shadowOffsetY = map(obj.hours, 12, 17, 10, 5);
      } else if (obj.hours >= 18) {
        drawingContext.shadowOffsetY = map(obj.hours, 18, 23, 5, 10);
      }
    }

    // Draw lantern depending on time of day, and state
    if (night) {
      if (_state === 1) {
        image(lanternLitImg, this.x, this.y);
      } else {
        image(lanternImg, this.x, this.y);
      }
    } else {
      if (_state === 0) {
        image(lanternLitImg, this.x, this.y);
      } else {
        image(lanternImg, this.x, this.y);
      }
    }
    pop();
  }
}

// PETALS CLASS
class Petals {
  // Constructor function
  constructor(_index, _x, _y) {
    // Set X and Y coordinates
    this.x = _x;
    this.y = _y;

    // Apply random values to X and Y coordinates
    this.x += map(noise(_index), 0, 1, -25, 25);
    this.y += map(noise(_index + 1000), 0, 1, -25, 25);

    // Randomise variables
    this.scale = map(noise(_index), 0, 1, 0.25, 0.5);
    this.initialRotation = map(noise(_index + 1000), 0, 1, 0, 359);
    this.direction = round(noise(_index + 1000));
    this.initialRotationSpeed = map(noise(_index + 3000), 0, 1, 0.05, 0.1);
    this.glowHue = round(map(noise(_index + 2000), 0, 1, 0, 359));

    // Set rotation variables as initial rotation variables
    this.rotation = this.initialRotation;
    this.rotationSpeed = this.initialRotationSpeed;
  }

  // Show function
  show() {
    // When alarm is running, increase rotation speed
    if (obj.seconds_until_alarm === 0) {
      this.rotationSpeed = this.initialRotationSpeed * 16;
    } 
    // When alarm is not active, reset rotation speed
    else if (obj.seconds_until_alarm < 0) {
      this.rotationSpeed = this.initialRotationSpeed;
    }

    // Declare variables for the rotation based on the direction, and elapsed time
    let rotationDirection = (this.direction === 0) ? 1 : -1;
    let currentRotation = ((frameCount * this.rotationSpeed) % 360) * rotationDirection;

    // Add initial rotation to create a seamless loop
    this.rotation = (currentRotation + this.initialRotation) % 360;

    // Set styles
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    scale(this.scale);
    imageMode(CENTER);

    if (night) {
      // Set glow blur
      drawingContext.shadowBlur = 30;

      // Set glow color
      let glowColorHSB = color(this.glowHue, 100, 35);
      let glowColorRGB = color(red(glowColorHSB), green(glowColorHSB), blue(glowColorHSB));
      drawingContext.shadowColor = glowColorRGB;

      // Initialise glow X and Y offsets
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
    } else {
      // Set shadow blur
      drawingContext.shadowBlur = 15;

      // Set shadow color
      drawingContext.shadowColor = color(40, 40, 40); // Dark gray

      // Set shadow X offset
      if (obj.hours <= 11) {
        drawingContext.shadowOffsetX = map(obj.hours, 0, 11, 5, -5);
      } else {
        drawingContext.shadowOffsetX = map(obj.hours, 12, 23, 5, -5);
      }
      
      // Set shadow Y offset
      if (obj.hours <= 5) {
        drawingContext.shadowOffsetY = map(obj.hours, 0, 5, 5, -5);
      } else if (obj.hours >= 6 && obj.hours <= 11) {
        drawingContext.shadowOffsetY = map(obj.hours, 6, 11, -5, 5);
      } else if (obj.hours >= 12 && obj.hours <= 17) {
        drawingContext.shadowOffsetY = map(obj.hours, 12, 17, 5, -5);
      } else if (obj.hours >= 18) {
        drawingContext.shadowOffsetY = map(obj.hours, 18, 23, -5, 5);
      }
    }

    // Draw petal
    image(petalImg, 0, 0);
    pop();
  }
}

// KOI FUNCTION
function koi() {
  push();
    // Declare X and Y variables for circular path
    let x = cos(t) * 175;
    let y = sin(t) * 175;
    
    // Set styles
    translate(x, y);
    scale(0.4);
    rotate(t + 180);

    // Increment t
    t += 1;

    // Draw tail
    push();
      stroke(0);
      fill(0);
      if (obj.millis % 1000 < 500) {
        scale(map(obj.millis % 500, 0, 499, 1, -1), 1);
      } else {
        scale(map(obj.millis % 500, 0, 499, -1, 1), 1);
      }
      beginShape();
      vertex(70, 100);
      bezierVertex(72, 100, 62, 108, 60, 110);
      bezierVertex(70, 108, 93, 120, 95, 120);
      bezierVertex(50, 140, 10, 90, 10, 90);
      bezierVertex(40, 115, 65, 100, 70, 100);
      endShape();
    pop();

    // Draw fins
    push();
      fill(0);

      // Left
      beginShape();
      if (obj.millis < 500) {
        vertex(
          map(obj.millis, 0, 499, -30, -25),
          map(obj.millis, 0, 499, -75, -68)
        );
        bezierVertex(
          map(obj.millis, 0, 499, -35, -30),
          map(obj.millis, 0, 499, -80, -70),
          map(obj.millis, 0, 499, -65, -45),
          map(obj.millis, 0, 499, -65, -45),
          map(obj.millis, 0, 499, -68, -50),
          map(obj.millis, 0, 499, -60, -38)
        );
        bezierVertex(
          map(obj.millis, 0, 499, -65, -47),
          map(obj.millis, 0, 499, -55, -35),
          map(obj.millis, 0, 499, -40, -27),
          map(obj.millis, 0, 499, -50, -45),
          map(obj.millis, 0, 499, -35, -25),
          map(obj.millis, 0, 499, -50, -42)
        );
        bezierVertex(
          map(obj.millis, 0, 499, -20, -10),
          -50,
          map(obj.millis, 0, 499, -20, -10),
          map(obj.millis, 0, 499, -80, -70),
          map(obj.millis, 0, 499, -40, -25),
          map(obj.millis, 0, 499, -75, -68)
        );
      } else {
        vertex(
          map(obj.millis, 500, 999, -25, -30),
          map(obj.millis, 500, 999, -68, -75)
        );
        bezierVertex(
          map(obj.millis, 500, 999, -30, -35),
          map(obj.millis, 500, 999, -70, -80),
          map(obj.millis, 500, 999, -45, -65),
          map(obj.millis, 500, 999, -45, -65),
          map(obj.millis, 500, 999, -50, -68),
          map(obj.millis, 500, 999, -38, -60)
        );
        bezierVertex(
          map(obj.millis, 500, 999, -47, -65),
          map(obj.millis, 500, 999, -35, -55),
          map(obj.millis, 500, 999, -27, -40),
          map(obj.millis, 500, 999, -45, -50),
          map(obj.millis, 500, 999, -25, -35),
          map(obj.millis, 500, 999, -42, -50)
        );
        bezierVertex(
          map(obj.millis, 500, 999, -10, -20),
          -50,
          map(obj.millis, 500, 999, -10, -20),
          map(obj.millis, 500, 999, -70, -80),
          map(obj.millis, 500, 999, -25, -40),
          map(obj.millis, 500, 999, -68, -75)
        );
      }
      endShape();

      // Right
      beginShape();
      if (obj.millis < 500) {
        vertex(
          map(obj.millis, 0, 499, 25, 30),
          map(obj.millis, 0, 499, -68, -75)
        );
        bezierVertex(
          map(obj.millis, 0, 499, 30, 35),
          map(obj.millis, 0, 499, -70, -80),
          map(obj.millis, 0, 499, 45, 65),
          map(obj.millis, 0, 499, -45, -65),
          map(obj.millis, 0, 499, 50, 68),
          map(obj.millis, 0, 499, -38, -60)
        );
        bezierVertex(
          map(obj.millis, 0, 499, 47, 65),
          map(obj.millis, 0, 499, -35, -55),
          map(obj.millis, 0, 499, 27, 40),
          map(obj.millis, 0, 499, -45, -50),
          map(obj.millis, 0, 499, 25, 35),
          map(obj.millis, 0, 499, -42, -50)
        );
        bezierVertex(
          map(obj.millis, 0, 499, 10, 20),
          -50,
          map(obj.millis, 0, 499, 10, 20),
          map(obj.millis, 0, 499, -70, -80),
          map(obj.millis, 0, 499, 25, 40),
          map(obj.millis, 0, 499, -68, -75)
        );
      } else {
        vertex(
          map(obj.millis, 500, 999, 30, 25),
          map(obj.millis, 500, 999, -75, -68)
        );
        bezierVertex(
          map(obj.millis, 500, 999, 35, 30),
          map(obj.millis, 500, 999, -80, -70),
          map(obj.millis, 500, 999, 65, 45),
          map(obj.millis, 500, 999, -65, -45),
          map(obj.millis, 500, 999, 68, 50),
          map(obj.millis, 500, 999, -60, -38)
        );
        bezierVertex(
          map(obj.millis, 500, 999, 65, 47),
          map(obj.millis, 500, 999, -55, -35),
          map(obj.millis, 500, 999, 40, 27),
          map(obj.millis, 500, 999, -50, -45),
          map(obj.millis, 500, 999, 35, 25),
          map(obj.millis, 500, 999, -50, -42)
        );
        bezierVertex(
          map(obj.millis, 500, 999, 20, 10),
          -50,
          map(obj.millis, 500, 999, 20, 10),
          map(obj.millis, 500, 999, -80, -70),
          map(obj.millis, 500, 999, 40, 25),
          map(obj.millis, 500, 999, -75, -68)
        );
      }
      endShape();
    pop();

    // Draw body
    push();
      noStroke();
      fill(255);

      beginShape();
      vertex(-10, -125);
      if (obj.millis < 500) {
        bezierVertex(
          -60,
          map(obj.millis, 0, 499, -70, -80),
          map(obj.millis, 0, 499, -40, 40),
          map(obj.millis, 0, 499, 100, 70),
          map(obj.millis, 0, 499, 50, -50),
          105
        );

        bezierVertex(
          map(obj.millis, 0, 499, -40, 40),
          map(obj.millis, 0, 499, 70, 100),
          60,
          map(obj.millis, 0, 499, -80, -70),
          10,
          -125
        );
        bezierVertex(5, -130, -5, -130, -10, -125);
      } else {
        bezierVertex(
          -60,
          map(obj.millis, 500, 999, -80, -70),
          map(obj.millis, 500, 999, 40, -40),
          map(obj.millis, 500, 999, 70, 100),
          map(obj.millis, 500, 999, -50, 50),
          105
        );

        bezierVertex(
          map(obj.millis, 500, 999, 40, -40),
          map(obj.millis, 500, 999, 100, 70),
          60,
          map(obj.millis, 500, 999, -70, -80),
          10,
          -125
        );
        bezierVertex(5, -130, -5, -130, -10, -125);
      }
      endShape();
    pop();

    // Draw eyes
    // Left
    push();
      noStroke();
      fill(0);
      translate(-18, -100);
      rotate(110);
      ellipse(0, 0, 10, 6);
    pop();

    // Right
    push();
      scale(-1, 1);
      noStroke();
      fill(0);
      translate(-18, -100);
      rotate(110);
      ellipse(0, 0, 10, 6);
    pop();
    
    // Draw scales
    push();
      noStroke();
      fill(255, 0, 0);
      
      push();
        if (obj.millis % 1000 < 500) {
          translate(map(obj.millis % 500, 0, 499, -3, 3), -75);
          rotate(map(obj.millis % 500, 0, 499, 3, -3));
        } else {
          translate(map(obj.millis % 500, 0, 499, 3, -3), -75);
          rotate(map(obj.millis % 500, 0, 499, -3, 3));
        }
        beginShape();
        for (let i = 0; i < 25; i++) {
          let angle = map(i, 0, 25, 0, 360);

          let noiseValue = noise(angle + i) * 5;

          let x = cos(angle) * (10 + noiseValue);
          let y = sin(angle) * (20 + noiseValue);

          vertex(x, y);
        }
        endShape();
      pop();

      push();
      if (obj.millis % 1000 < 500) {
        translate(map(obj.millis % 500, 0, 499, -18, 0), -5);
        rotate(map(obj.millis % 500, 0, 499, -9, -7));
      } else{
        translate(map(obj.millis % 500, 0, 499, 0, -18), -5);
        rotate(map(obj.millis % 500, 0, 499, -7, -9));
      }
      beginShape();
      for (let i = 0; i < 25; i++) {
        let angle = map(i, 0, 25, 0, 360);

        let noiseValue = noise(angle + i) * 5;

        let x = cos(angle) * (8 + noiseValue);
        let y = sin(angle) * (15 + noiseValue);
        
        vertex(x, y);
      }
      endShape();
      pop();

      push();
      if (obj.millis % 1000 < 500) {
        translate(map(obj.millis % 500, 0, 499, 10, 25), -20);
        rotate(map(obj.millis % 500, 0, 499, 10, -2));
      } else{
        translate(map(obj.millis % 500, 0, 499, 25, 10), -20);
        rotate(map(obj.millis % 500, 0, 499, -2, 10));
      }
      beginShape();
      for (let i = 0; i < 25; i++) {
        let angle = map(i, 0, 25, 0, 360);

        let noiseValue = noise(angle + i) * 5;

        let x = cos(angle) * (3 + noiseValue);
        let y = sin(angle) * (10 + noiseValue);
        
        vertex(x, y);
      }
      endShape();
      pop();

      push();
      if (obj.millis % 1000 < 500) {
        translate(map(obj.millis % 500, 0, 499, 10, -10), 75);
        rotate(map(obj.millis % 500, 0, 499, -25, 25));
      } else{
        translate(map(obj.millis % 500, 0, 499, -10, 10), 75);
        rotate(map(obj.milli % 500, 0, 499, 25, -25));
      }
      beginShape();
      for (let i = 0; i < 25; i++) {
        let angle = map(i, 0, 25, 0, 360);

        let noiseValue = noise(angle + i) * 5;

        let x = cos(angle) * (2 + noiseValue);
        let y = sin(angle) * (6 + noiseValue);
        
        vertex(x, y);
      }
      endShape();
      pop();

      fill(0);

      push();
      if (obj.millis % 1000 < 500) {
        translate(map(obj.millis % 500, 0, 499, -18, 0), 28);
        rotate(map(obj.millis % 500, 0, 499, -25, -10));
      } else{
        translate(map(obj.millis % 500, 0, 499, 0, -18), 28);
        rotate(map(obj.millis % 500, 0, 499, -10, -25));
      }
      beginShape();
      for (let i = 0; i < 25; i++) {
        let angle = map(i, 0, 25, 0, 360);

        let noiseValue = noise(angle + i) * 5;

        let x = cos(angle) * (2 + noiseValue);
        let y = sin(angle) * (6 + noiseValue);
        
        vertex(x, y);
      }
      endShape();
      pop();

      push();
      if (obj.millis % 1000 < 500) {
        translate(map(obj.millis % 500, 0, 499, 4, 22), 10);
        rotate(map(obj.millis % 500, 0, 499, 10, 0));
      } else{
        translate(map(obj.millis % 500, 0, 499, 22, 4), 10);
        rotate(map(obj.millis % 500, 0, 499, 0, 10));
      }
      beginShape();
      for (let i = 0; i < 25; i++) {
        let angle = map(i, 0, 25, 0, 360);

        let noiseValue = noise(angle + i) * 5;

        let x = cos(angle) * (4 + noiseValue);
        let y = sin(angle) * (10 + noiseValue);
        
        vertex(x, y);
      }
      endShape();
      pop();

      push();
      if (obj.millis % 1000 < 500) {
        translate(map(obj.millis % 500, 0, 499, 2, 15), -30);
        rotate(map(obj.millis % 500, 0, 499, -2, -12));
      } else{
        translate(map(obj.millis % 500, 0, 499, 15, 2), -30);
        rotate(map(obj.millis % 500, 0, 499, -12, -2));
      }
      beginShape();
      for (let i = 0; i < 25; i++) {
        let angle = map(i, 0, 25, 0, 360);

        let noiseValue = noise(angle + i) * 5;

        let x = cos(angle) * (10 + noiseValue);
        let y = sin(angle) * (15 + noiseValue);
        
        vertex(x, y);
      }
      endShape();
      pop();
    pop();
  pop();
}

// SAKURA FUNCTION
function sakura() {
  // Create graphic
  sg = createGraphics(150, 150);

  // Set styles
  sg.translate(sg.width / 2, sg.height / 2);
  sg.angleMode(DEGREES);
  sg.push();
  sg.noStroke();

  // Declare gradient variable
  let gradient = sg.drawingContext.createRadialGradient(
    0, // Start X
    0, // Start Y
    0, // Start R
    0, // End X
    0, // End Y
    125 // End R
  );

  // Create color stops
  gradient.addColorStop(0, color(255, 185, 210));
  gradient.addColorStop(1, color(255, 120, 165));

  // Apply gradient
  sg.drawingContext.fillStyle = gradient;

  // Draw sakura petals
  for (let i = 0; i < 5; i++) {
    // Declare angle variable
    let angle = (360 / 5) * i;

    // Rotate
    sg.push();
    sg.rotate(angle);

    // Draw petal
    sg.beginShape();
    sg.vertex(0, -63);
    sg.vertex(-9, -70);
    sg.bezierVertex(-40, -50, -20, -23, -20, -23);
    sg.vertex(0, 0);
    sg.vertex(20, -23);
    sg.bezierVertex(20, -23, 40, -50, 9, -70);
    sg.endShape(CLOSE);
    sg.pop();
  }
  sg.pop();

  // Draw sakura pistil
  sg.push();
  for (let i = 0; i < 360; i += 30) {
    let x = cos(i) * 25;
    let y = sin(i) * 25;

    sg.push();
    sg.noStroke();
    sg.fill(255);
    sg.ellipse(x, y, 5);
    sg.pop();

    sg.push();
    sg.stroke(255);
    sg.strokeWeight(1);
    sg.line(x, y, 0, 0);
    sg.pop();
  }

  sg.noStroke();
  sg.fill(255);
  sg.ellipse(0, 0, 15);
  sg.pop();

  // Return graphic
  return sg;
}

// DEBUG FUNCTION
function debug(hour12) {
  push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text('Hours (24hr): ' + obj.hours, -450, -200);
  text('Hours (12hr): ' + hour12, -450, -175);
  text('Minutes: ' + obj.minutes, -450, -150);
  text('Seconds: ' + obj.seconds, -450, -125);
  text('Number of sakura: ' + numSakuras, -450, -100);
  text('Number of lanterns: ' + numLanterns, -450, -75);
  text('Number of petals: ' + numPetals, -450, -50);
  text('Night: ' + night, -450, -25);
  pop();
}