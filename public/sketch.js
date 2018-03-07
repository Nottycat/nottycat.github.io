var socket;
var r = 5;
var k = 30;
var grid = [];
var cellSize = r / Math.sqrt(2);
var activeList = []
var ordered = []

var columns, rows;

function setup() {
  createCanvas(600, 600);
  
  // socket = io.connect('http://localhost:3000');
  // socket.on('mouse', newDrawing)

  columns = floor(width / cellSize);
  rows = floor(height / cellSize);
  for (var i = 0; i < columns * rows; i++) {
    grid[i] = undefined;
  }

  var pos = createVector(random(width), random(height))
  var i = floor(pos.x / cellSize);
  var j = floor(pos.y / cellSize);
  grid[i + j * columns] = pos;
  activeList.push(pos);

  // for (var i = 0; i < 2500; i++) {
  //   stroke(255, 255, 255);
  //   point(random(width), random(height));
  // }
}

function draw() {
  background(0);
  colorMode(HSB);

  for (var total = 0; total < 25; total++) {   
    if (activeList.length > 0) {
      var randomIndex = floor(random(activeList.length));
      var randomIndexPos = activeList[randomIndex];
      var found = false;
      for (var n = 0; n < k; n++) {
        var sample = p5.Vector.random2D();
        var magnitude = random(r, 2*r);
        sample.setMag(magnitude);
        sample.add(randomIndexPos);

        var col = floor(sample.x / cellSize);
        var row = floor(sample.y / cellSize);

        if (col < 0 || col >= columns || row < 0 || row >= rows || grid[col + row * columns]) {
          continue;
        }

        var valid = true;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            var index = (col + i) + (row + j) * columns;
            var neighbour = grid[index];
            if (neighbour) {
              var distance = p5.Vector.dist(sample, neighbour);
              if (distance < r) {
                valid = false;
              }
            }
          }
        }

        if (valid) {
          found = true;
          grid[col + row * columns] = sample;
          activeList.push(sample);
          ordered.push(sample)
        }
      }

      if (!found) {
        activeList.splice(randomIndex, 1);
      }
    }
  }

  for (var i = 0; i < ordered.length; i++) {
    if (ordered[i]) {
      stroke(i / 10 % 360, 100, 100);
      strokeWeight(4);
      point(ordered[i].x, ordered[i].y)
    }
  }

  // for (var i = 0; i < activeList.length; i++) {
  //   stroke(255, 0, 255);
  //   strokeWeight(1);
  //   point(activeList[i].x, activeList[i].y)
  // }
}