class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isAlive = false;
    }

    getColor() {
        if (this.color) 
            return this.color;
        if (this.isAlive)
            return "white";
        else
            return "black";
    }

    setColor(color) {
        this.color = color;
    }

    toString() {
        return this.resource;
    }
}