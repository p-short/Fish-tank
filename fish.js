//fish class
class Fish {
  constructor() {
    fill("tomato");
    strokeWeight(0.7);
    //x & y position of fish
    this.x_pos = 0;
    this.y_pos = 0;
    //easing value asigned a random value between 0.05 & 0.25 each time constructor is called, this creates variation in movment
    this.easing = random(0.05, 0.25);
    //t used to iterate through noise function
    this.t = random(10);
    //for movment of fish tail
    this.tailStart = random();
    this.tailInc = random(0.06, 0.2);
    //randomly seeded speed for fish target on x axis position
    this.xDirectionSpeed = random(0.5, 2);

    //object containing the x & y cordinates of each fishes target destination. Each fish follows their own target
    this.targetObj = {
      x: 0,
      y: 0,
    };
  }

  //update method is used to create the fishes movment
  updateFish() {
    //save state
    push();
    //translate to the middle of the drawing context
    translate(width / 2, height / 2);
    //increment targetObj x position by xDirectSpeed
    this.targetObj.x += this.xDirectionSpeed;
    //reverse direction when targetObj x position reaches either side of the drawing context
    if (
      this.targetObj.x + 20 >= width / 2 ||
      this.targetObj.x - 20 <= -width / 2
    ) {
      this.xDirectionSpeed *= -1;
    }

    //Perlin noise is used to move the target of the y axis
    this.targetObj.y = (map(noise(this.t + 10), 0, 1, -1, 1) * height) / 2;

    //dirive angle of fish using atan2 method, this is used for rotation
    this.myAng = atan2(
      this.targetObj.y - this.y_pos,
      this.targetObj.x - this.x_pos
    );

    //each fish follows the target using easing, the fish will follow and be attracted to the target but they will never actully reach it.
    this.dx = this.targetObj.x - this.x_pos;
    this.x_pos += this.dx * this.easing;

    this.dy = this.targetObj.y - this.y_pos;
    this.y_pos += this.dy * this.easing;

    //increment t so it can smoothly iterate through the noise function
    this.t += 0.005;
    //increment tailStart by randomly seeded value giving variation in tail movment
    this.tailStart += this.tailInc;
  }

  //draw fish to the drawing context
  drawFish() {
    //translate to position of fish
    translate(this.x_pos, this.y_pos);
    //rotate fish acording to angle
    rotate(this.myAng);
    //body
    ellipse(0, 0, 40, 20);
    //use a sinewave in a particular range and use it to create slow ocillation for the fish tail movment
    let sWave = map(sin(this.tailStart), -1, 1, 0.85, 1);
    //tail
    triangle(-30 * sWave, -13 * sWave, -20, 0, -30 * sWave, 13 * sWave);
    //eyes
    fill(0);
    ellipse(12, 0, 3);
    fill(255);
    ellipse(12.25, 0, 2.5);
    //exit saved state
    pop();
  }
}
