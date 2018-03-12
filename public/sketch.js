var canvasWidth = 800;
var canvasHeight = 600;

var radius = 4;
var realRadius = 4;
var radiusChange = 1.00;
var startR = 255;
var startG = 0;
var startB = 100;
var realR = 255;
var realG = 0;
var realB = 100;
var changeR = 0.00;
var changeG = 0.00;
var changeB = 0.00;

var walkersAmount = 100;
var walksPerFrame = 500;

var dla;
var paused = false;

function setup() {
  dla = new DLA();
  dla.changeType(new TypeOriginal());

  /* Create the canvas. */
  createCanvas(canvasWidth, canvasHeight);

  /* Create the buttons. */
  typeDiv = createDiv("Type: " + this.dla.getTypeName());
  typeSelect = createSelect(this.dla.getTypeName());
  typeSelect.option('Original');
  typeSelect.option('InnerSquare');
  typeSelect.option('OuterSquare');
  typeSelect.option('Tree');
  typeSelect.option('InnerCircle');
  typeSelect.option('OuterCircle');

  setTypeButton = createButton("Set type");
  setTypeButton.mousePressed(setType);
  
  radiusDiv = createDiv("Radius: " + realRadius + ". Grown to: " + radius);
  radiusInput = createInput(radius);
  setRadiusButton = createButton("Set radius");
  setRadiusButton.mousePressed(setRadius);

  radiusChangeDiv = createDiv("Radius change: " + radiusChange);
  radiusChangeInput = createInput(radiusChange);
  setRadiusChangeButton = createButton("Set radius change");
  setRadiusChangeButton.mousePressed(setRadiusChange);
  
  walkersAmountDiv = createDiv("Walker amount: " + walkersAmount);
  walkersAmountInput = createInput(walkersAmount);
  setWalkersAmountButton = createButton("Set walker amount");
  setWalkersAmountButton.mousePressed(setWalkersAmount);

  walksPerFrameDiv = createDiv("Walks per frame: " + walksPerFrame);
  walksPerFrameInput = createInput(walksPerFrame);
  setWalksPerFrameButton = createButton("Set walks per frame");
  setWalksPerFrameButton.mousePressed(setWalksPerFrame);

  colorDiv = createDiv("Start r: " + realR + ". Start g: " + realG + ". Start b: " + realB + ". Grown to; r: " + startR + ", g: " + startG + ", b: " + startB);
  rInput = createInput(startR);
  setRButton = createButton("Set r");
  setRButton.mousePressed(setR);
  gInput = createInput(startG);
  setGButton = createButton("Set g");
  setGButton.mousePressed(setG);
  bInput = createInput(startB);
  setBButton = createButton("Set b");
  setBButton.mousePressed(setB);

  colorChangeDiv = createDiv("Change r: " + changeR + ". Change g: " + changeG + ". Change b: " + changeB);
  rChangeInput = createInput(changeR);
  setRChangeButton = createButton("Set change r");
  setRChangeButton.mousePressed(setChangeR);
  gChangeInput = createInput(changeG);
  setGChangeButton = createButton("Set change g");
  setGChangeButton.mousePressed(setChangeG);
  bChangeInput = createInput(changeB);
  setBChangeButton = createButton("Set change b");
  setBChangeButton.mousePressed(setChangeB);

  createP("");
  resetButton = createButton("Reset");
  resetButton.mousePressed(reset);
  pauseButton = createButton("Pause");
  pauseButton.mousePressed(pause);
  
  this.dla.reset();
}

function draw() {
  dla.drawBackground();
  if (!paused) {
    dla.walk();
  }

  dla.show();
  radiusDiv.html("Radius: " + realRadius + ". Grown to: " + radius);
  colorDiv.html("Start r: " + realR + ". Start g: " + realG + ". Start b: " + realB + ". Grown to; r: " + startR + ", g: " + startG + ", b: " + startB);
}

function setRadius() {
  result = (int) (radiusInput.value());
  if (!isNaN(result)) {
    radius = result;
    realRadius = result;
    radiusDiv.html("Radius: " + realRadius + ". Grown to: " + radius);    
  }
}

function setRadiusChange() {
  result = (float) (radiusChangeInput.value());
  if (!isNaN(result)) {
    radiusChange = result;
    radiusChangeDiv.html("Radius change: " + radiusChange);    
  }
}

function setType() {
  result = typeSelect.value();
  if (result == "Original") {
    dla.changeType(new TypeOriginal());
    typeDiv.html("Type: " + result);
  } else if (result == "InnerSquare") {
    dla.changeType(new TypeInnerSquare());
    typeDiv.html("Type: " + result);
  } else if (result == "OuterSquare") {
    dla.changeType(new TypeOuterSquare());
    typeDiv.html("Type: " + result);
  } else if (result == "Tree") {
    dla.changeType(new TypeTree());
    typeDiv.html("Type: " + result);
  } else if (result == "InnerCircle") {
    dla.changeType(new TypeInnerCircle());
    typeDiv.html("Type: " + result);
  } else if (result == "OuterCircle") {
    dla.changeType(new TypeOuterCircle());
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

function setR() {
  result = (float) (rInput.value());
  if (!isNaN(result)) {
    startR = result;
    realR = result;
    colorDiv.html("Start r: " + realR + ". Start g: " + realG + ". Start b: " + realB + ". Grown to; r: " + startR + ", g: " + startG + ", b: " + startB);    
  }
}

function setG() {
  result = (float) (gInput.value());
  if (!isNaN(result)) {
    startG = result;
    realG = result;
    colorDiv.html("Start r: " + realR + ". Start g: " + realG + ". Start b: " + realB + ". Grown to; r: " + startR + ", g: " + startG + ", b: " + startB);    
  }
}

function setB() {
  result = (float) (bInput.value());
  if (!isNaN(result)) {
    startB = result;
    realB = result;
    colorDiv.html("Start r: " + realR + ". Start g: " + realG + ". Start b: " + realB + ". Grown to; r: " + startR + ", g: " + startG + ", b: " + startB);    
  }
}

function setChangeR() {
  result = (float) (rChangeInput.value());
  if (!isNaN(result)) {
    changeR = result;
    colorChangeDiv.html("Change r: " + changeR + ". Change g: " + changeG + ". Change b: " + changeB);    
  }
}

function setChangeG() {
  result = (float) (gChangeInput.value());
  if (!isNaN(result)) {
    changeG = result;
    colorChangeDiv.html("Change r: " + changeR + ". Change g: " + changeG + ". Change b: " + changeB);    
  }
}

function setChangeB() {
  result = (float) (bChangeInput.value());
  if (!isNaN(result)) {
    changeB = result;
    colorChangeDiv.html("Change r: " + changeR + ". Change g: " + changeG + ". Change b: " + changeB);    
  }
}


function reset() {
  dla.reset();
}

function pause() {
  if (paused) {
    paused = false;
    pauseButton.html("Pause");
  } else {
    paused = true;
    pauseButton.html("Continue");
  }
}