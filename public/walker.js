function Walker(x, y, radius, isStuck) {
    this.pos = createVector(x, y);
    this.isStuck = isStuck;
    this.radius = radius;
    this.r = 255;
    this.g = 0;
    this.b = 100;

    this.walk = function() {
        this.pos.add(p5.Vector.random2D());
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }

    this.checkStuck = function(others) {
        if (others != undefined) {
            for (var i = 0; i < others.length; i++) {
                var distance = distanceSquared(this.pos, others[i].pos);
                if (distance < (this.radius * others[i].radius * 4)) {
                    this.isStuck = true;
                    return true;
                }
            }
        }

        return false;
    }

    this.show = function() {
        noStroke();
        if (this.isStuck) {
            fill(this.r, this.g, this.b);
        } else {
            fill(255);
        }
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }
}

function distanceSquared(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;

    return dx * dx + dy * dy;
}