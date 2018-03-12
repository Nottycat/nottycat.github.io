function DLA() {
    this.tree = [];
    this.walkers = [];
    this.grid = [];
    this.gridSize = radius;
    this.gridWidth = floor(canvasWidth / radius);
    this.gridheight = floor(canvasWidth / radius);
    this.gridLength = this.grid.length;
    this.type = null;
    this.done = false;

    this.walk = function() {
        if (!this.done) {
            for (var n = 0; n < walksPerFrame; n++) {
                for (var i = 0; i < this.walkers.length; i++) {
                    this.walkers[i].walk();
                    /* Get the grids around the current grid. */
                    let gridPos = this.getGridPosition(this.walkers[i]);
                    let stuck = false;
                    // console.log("StuckPos: " + gridPos + ", tot: " + this.gridLength);
                    // console.log(this.grid[gridPos]);
                    stuck = this.walkers[i].checkStuck(this.grid[gridPos])
                    || (gridPos - 1 > 0 && this.walkers[i].checkStuck(this.grid[gridPos - 1]))
                    || (gridPos - 1 < this.gridLength && this.walkers[i].checkStuck(this.grid[gridPos + 1]))
                    || (gridPos - this.gridWidth > 0 && this.walkers[i].checkStuck(this.grid[gridPos - this.gridWidth]))
                    || (gridPos - this.gridWidth - 1 > 0 && this.walkers[i].checkStuck(this.grid[gridPos - this.gridWidth - 1]))
                    || (gridPos - this.gridWidth + 1 > 0 && this.walkers[i].checkStuck(this.grid[gridPos - this.gridWidth + 1]))
                    || (gridPos + this.gridWidth < this.gridLength && this.walkers[i].checkStuck(this.grid[gridPos + this.gridWidth]))
                    || (gridPos + this.gridWidth - 1 < this.gridLength && this.walkers[i].checkStuck(this.grid[gridPos + this.gridWidth - 1]))
                    || (gridPos + this.gridWidth + 1 < this.gridLength && this.walkers[i].checkStuck(this.grid[gridPos + this.gridWidth + 1]));

                    if (stuck) {
                        this.addToTree(this.walkers[i], true);

                        /* Check if the adding of this walker finishes the dla. */
                        if (this.type.checkDone(this.walkers[i])) {
                            this.done = true;
                            return;
                        }

                        this.walkers.splice(i, 1);
                        
                        if (!this.done) {
                            this.createWalker();
                        }
                    }
                }
            }
        }
    }

    this.show = function() {
        for (let i = 0; i < this.tree.length; i++) {
            this.tree[i].show();
        }
    
        if (!this.done) {
            for (let i = 0; i < this.walkers.length; i++) {
                this.walkers[i].show();
            }
        }
    }
    
    this.startDLA = function() {
        if (this.type != null) {
            startTree = this.type.generateStartTree();
            for (let i = 0; i < tree.length; i++) {
                this.addToTree(startTree[i], false);
            }

            for (let i = 0; i < walkersAmount; i++) {
                this.createWalker();
            }
        }
    }

    this.addToTree = function(walker, changeColour) {
        /* Set the colors of the walker. */
        if (changeColour) {
            startR += changeR;
            startG += changeG;
            startB += changeB;
        }
        
        constrain(startR, 0, 255);
        constrain(startG, 0, 255);
        constrain(startB, 0, 255);

        walker.r = floor(startR);
        walker.g = floor(startG);
        walker.b = floor(startB);

        /* Calculate where in the grid the walker is and add them to the grid. */
        let gridPos = this.getGridPosition(walker);
        // console.log("GridPos: " + gridPos);
        this.grid[gridPos].push(walker);
        this.tree.push(walker);
    }

    this.createWalker = function() {
        radius = radius * radiusChange;
        if (radius < 0.1) {
            radius = 0.1;
        }

        this.walkers.push(this.type.createWalker());        
    }

    this.getGridPosition = function(walker) {
        return floor(walker.pos.x / this.gridSize) + floor(walker.pos.y / this.gridSize) * this.gridWidth;
    }

    this.drawBackground = function() {
        this.type.drawBackground();
    }

    this.fixWalkerAmount = function() {
        if (!this.done) {
            if (this.walkers.length > walkersAmount) {
                this.walkers.splice(0, (this.walkers.length - walkersAmount));
            } else if (this.walkers.length < walkersAmount) {
                for (let i = 0; i < walkersAmount - this.walkers.length; i++) {
                    this.createWalker();
                }
            }
        }
    }

    this.getTypeName = function() {
        return this.type.name;
    }

    this.changeType = function(newType) {
        this.type = newType;
        this.reset();
    }
    
    this.resetGrid = function() {
        this.grid = [];
        this.gridSize = radius * 2;
        this.gridWidth = floor(canvasWidth / this.gridSize);
        this.gridheight = floor(canvasWidth / this.gridSize);
        for (let i = 0; i < this.gridWidth * this.gridheight; i++) {
            this.grid[i] = []
        }

        this.gridLength = this.grid.length;
    }

    this.reset = function() {
        this.tree = [];
        this.walkers = [];
        this.done = false;
        radius = realRadius;
        startR = realR;
        startG = realG;
        startB = realB;
        
        this.resetGrid();
        this.startDLA();
    }
}    