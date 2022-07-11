//empty array to add fish class instances to 
let fishes = [];

//variables for fullscreen display
var w = window.innerWidth;
var h = window.innerHeight;

//create a drawing context and push n number of fish into fishes array 
const n = 17;

function setup() {
  createCanvas(w, h);
  for (let i = 0; i < n ; i++) {
    fishes.push(new Fish());
  }
}

//in draw create a blue background and loop through all the fish class instances in the fishes array and call the updateAndDraw method on all of them, thus rendering them to the drawing context
function draw() {
  background('aqua');
  for (let fish in fishes) {
    fishes[fish].updateFish();
    fishes[fish].drawFish();
  }
}

//function called every time window is resized
window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.size(w,h);
}
