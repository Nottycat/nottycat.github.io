
function TypeInnerSquare() {
    this.name = "InnerSquare";
    this.generateStartTree = function() {
        /* Default start with walkers around the square. */
        tree = [];
        for (let i = 0; i < floor(width / 8 / 2); i += radius * 2) {
            tree.push(new Walker((width / 2) - floor(width / 8 / 2) + i, (height / 2) - floor(width / 8 / 2), radius, true));
            tree.push(new Walker((width / 2) - floor(width / 8 / 2) + i, (height / 2) + floor(width / 8 / 2), radius, true));
            tree.push(new Walker((width / 2) + floor(width / 8 / 2) - i, (height / 2) - floor(width / 8 / 2), radius, true));
            tree.push(new Walker((width / 2) + floor(width / 8 / 2) - i, (height / 2) + floor(width / 8 / 2), radius, true));

            if (i > 0) {
                tree.push(new Walker((width / 2) - floor(width / 8 / 2), (height / 2) - floor(width / 8 / 2) + i, radius, true));
                tree.push(new Walker((width / 2) + floor(width / 8 / 2), (height / 2) - floor(width / 8 / 2) + i, radius, true));

                tree.push(new Walker((width / 2) - floor(width / 8 / 2), (height / 2) + floor(width / 8 / 2) - i, radius, true));
                tree.push(new Walker((width / 2) + floor(width / 8 / 2), (height / 2) + floor(width / 8 / 2) - i, radius, true));
            }
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
        rect((width / 2) - floor(width / 8 / 2), (height / 2) - floor(width / 8 / 2), floor(width / 8), floor(width / 8));
    }
}    