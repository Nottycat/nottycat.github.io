
function TypeOriginal() {
    this.name = "Original";
    this.generateStartTree = function() {
        /* Default start with 1 walker in the middle. */
        tree = [];
        tree.push(new Walker(width / 2, height / 2, radius, true))

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
        if (walker.pos.x == 0 || walker.pos.y == 0 || walker.pos.x == width || walker.pos.y == height) {
            return true;
        }

        return false;
    }
}    