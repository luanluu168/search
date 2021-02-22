class Node {
    constructor(x, y, value = undefined, type = "normal") {
        if (value) { this.value = value }
        else { this.value = `${x}-${y}` };

        this.id   = `${x}-${y}`;
        this.type = type;
        this.x    = x;
        this.y    = y;
    }
};