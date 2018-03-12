
function TypeOuterCircle() {
    this.name = "OuterCircle";
    this.generateStartTree = function() {
        /* Default start with walkers on the outer circle. */
        tree = [];

        circumference = 2 * PI * floor((height * 0.9) / 2);
        walkerAmount = floor(circumference / (radius * 2));
        angleAdditionAmount = (2 * PI) / walkerAmount;
        currentAngle = 0;
        for (let i = 0; i < walkerAmount; i ++) {
            tree.push(new Walker((width / 2) + floor((height * 0.9) / 2) * cos(currentAngle), (height / 2) + floor((height * 0.9) / 2) * sin(currentAngle), radius, true));
            currentAngle += angleAdditionAmount;
        }

        return tree;
    }

    this.createWalker = function() {
        /* Generate a walker in the middle. */
        return new Walker(width / 2, height / 2, radius, false);
    }
    
    this.checkDone = function(walker) {
        if (floor(walker.pos.x) == (width / 2) && floor(walker.pos.y) == (height / 2)) {
            return true;
        }

        return false;
    }
    
    this.drawBackground = function() {
        background(255);
        fill(0);
        noStroke();
        ellipse(width / 2, height / 2, floor(height * 0.9), floor(height * 0.9));
    }
}    