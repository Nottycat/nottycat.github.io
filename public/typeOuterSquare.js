
function TypeOuterSquare() {
    this.name = "OuterSquare";
    this.generateStartTree = function() {
        /* Default start with walkers on the outer circle. */
        tree = [];

        for (let i = 0; i < floor(width / 2); i += radius * 2) {
            tree.push(new Walker(i, height, radius, true));
            tree.push(new Walker(width - i, height, radius, true));

            tree.push(new Walker(i, 0, radius, true));
            tree.push(new Walker(width - i, 0, radius, true));

            if (i > 0) {
                tree.push(new Walker(0, 0 + i, radius, true));
                tree.push(new Walker(0, height - i, radius, true));

                tree.push(new Walker(width, 0 + i, radius, true));
                tree.push(new Walker(width, height - i, radius, true));
            }
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
        background(0);
    }
}    