
function TypeInnerCircle() {
    this.name = "InnerCircle";
    this.generateStartTree = function() {
        /* Default start with walkers around the circle. */
        tree = [];

        circumference = 2 * PI * floor(width / 8 / 2);
        walkerAmount = floor(circumference / (radius * 2));
        angleAdditionAmount = (2 * PI) / walkerAmount;
        currentAngle = 0;
        for (let i = 0; i < walkerAmount; i ++) {
            tree.push(new Walker((width / 2) + floor(width / 8 / 2) * cos(currentAngle), (height / 2) + floor(width / 8 / 2) * sin(currentAngle), radius, true));
            currentAngle += angleAdditionAmount;
        }

        return tree;
    }

    this.createWalker = function() {
        /* Generate random position from the outside. */
        var n = floor(random(4));
        var pos;

        if (n == 0) {
            pos = createVector(random(width), 0);
        } else if (n == 1) {
            pos = createVector(random(width), height);
        } else if (n == 2) {
            pos = createVector(0, random(height));
        } else if (n == 3) {
            pos = createVector(width, random(height));
        }

        return new Walker(pos.x, pos.y, radius, false);
    }
    
    this.checkDone = function(walker) {
        if (floor(walker.pos.x) == 0 || floor(walker.pos.y) == 0 || floor(walker.pos.x) == width || floor(walker.pos.y ) == height) {
            return true;
        }

        return false;
    }
    
    this.drawBackground = function() {
        background(0);
        fill(255, 0, 100);
        noStroke();
        ellipse(width / 2, height / 2, floor(width / 8), floor(width / 8));
    }
}    