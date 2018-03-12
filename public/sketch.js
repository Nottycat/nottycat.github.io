var canvasWidth = 800;
var canvasHeight = 600;

var radiusSlider;
var radius = 4;

var walkersAmount = 100;
var walksPerFrame = 500;

var dla;

function setup() {
  dla = new DLA();
  dla.changeType(new TypeOriginal());

  /* Create the canvas. */
  createCanvas(canvasWidth, canvasHeight);

  /* Create the buttons. */
  typeDiv = createDiv("Type: " + this.dla.getTypeName());
  typeInput = createInput(this.dla.getTypeName());
  setTypeButton = createButton("Set type");
  setTypeButton.mousePressed(setType);
  
  radiusDiv = createDiv("Radius: " + radius);
  radiusInput = createInput(radius);
  setRadiusButton = createButton("Set radius");
  setRadiusButton.mousePressed(setRadius);
  
  walkersAmountDiv = createDiv("Walker amount: " + walkersAmount);
  walkersAmountInput = createInput(walkersAmount);
  setWalkersAmountButton = createButton("Set walker amount");
  setWalkersAmountButton.mousePressed(setWalkersAmount);

  walksPerFrameDiv = createDiv("Walks per frame: " + walksPerFrame);
  walksPerFrameInput = createInput(walksPerFrame);
  setWalksPerFrameButton = createButton("Set walks per frame");
  setWalksPerFrameButton.mousePressed(setWalksPerFrame);


  createP("");
  resetButton = createButton("Reset");
  resetButton.mousePressed(reset);

  this.dla.reset();
}

function draw() {
  background(0);
  dla.walk();
  dla.show();
}

function setRadius() {
  result = (int) (radiusInput.value());
  if (!isNaN(result)) {
    radius = result;
    radiusDiv.html("Radius: " + radius);    
  }
}

function setType() {
  result = typeInput.value();
  if (result == "Original") {
    dla.changeType(new TypeOriginal());
    typeDiv.html("Type: " + result);
  } else if (result == "Tree") {
    dla.changeType(new TypeTree());
    typeDiv.html("Type: " + result);
  }
}

function setWalkersAmount() {
  result = (int) (walkersAmountInput.value());
  if (!isNaN(result)) {
    walkersAmount = result;
    walkersAmountDiv.html("Walker amount: " + result);
    dla.fixWalkerAmount();
  }
}

function setWalksPerFrame() {
  result = (int) (walksPerFrameInput.value());
  if (!isNaN(result)) {
    walksPerFrame = result;
    walksPerFrameDiv.html("Walks per frame: " + result);
    dla.fixWalkerAmount();
  }
}

function reset() {
  dla.reset();
}