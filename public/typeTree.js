
function TypeTree() {
    this.name = "Tree";
    this.generateStartTree = function() {
        /* Default start with walkers at the bottom. */
        tree = [];
        for (let i = 0; i < floor(width / 2); i += radius * 2) {
            tree.push(new Walker(i, height, radius, true));
            tree.push(new Walker(width - i, height, radius, true));
        }

        return tree;
    }

    this.createWalker = function() {
        /* Return random position from the top. */
        return new Walker(random(width), 0, radius, false);
    }
    
    this.checkDone = function(walker) {
        if (floor(walker.pos.y) == 0) {
            return true;
        }

        return false;
    }
    
    this.drawBackground = function() {
        background(0);
    }
}    