class Game {
    constructor(width, height, squareSize, spacing) {
        this.width = width;
        this.height = height;
        this.squareSize = squareSize;
        this.spacing = spacing;
        this.squareSpace = squareSize + spacing;
        this.canvasWidth = this.squareSpace * width + spacing;
        this.canvasHeight = this.squareSpace * height + spacing;
        // document.addEventListener("keydown", this.update.bind(this));
    }

    graphicsInit() {
        const my_canvas = document.getElementById("canvas");
        this.context = my_canvas.getContext("2d");
        my_canvas.setAttribute("height", this.canvasHeight);
        my_canvas.setAttribute("width", this.canvasWidth);
        this.context.fillStyle = "green";
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    createBoard(width, height) {
        var board = [];
        while (board.length < height) {
            var row = [];
            while (row.length < width) {
                row.push(new Square(row.length, board.length));
            }
            board.push(row);
        }
        return board;
    }

    populateNeighbors () {
        for (let row of this.board) {
            for (let square of row) {
                square.neighbors = this.getSquareNeighbors(square);
            }
        }
    }

    printBoard() {
        var output = document.getElementById("game-output");
        output.innerHTML = "";
        Utilities.repeat(this.height, (i) => {    
            output.innerHTML += this.board[i].join(" ") + "\n";
        });
    }
    
    drawRectBoard() {
        this.board.forEach ((row, y) => {
            row.forEach ((square, x) => {
                this.context.fillStyle = square.getColor();
                this.context.fillRect(this.squareSpace * x + this.spacing,
                this.squareSpace * y + this.spacing, this.squareSize, this.squareSize);
            });
        });
    }


    getSquare (x, y) {
        if (this.board[y] && this.board[y][x])
            return this.board[y][x];
        else
            return null;
    }

    getSquareNeighbors(square) {
        let squareNeighbors = [];
        let x = square.x;
        let y = square.y;
        if (x + 1 < this.width) {
            squareNeighbors.push(this.getSquare(x + 1, y));
        }
        if (x + 1 < this.width && y + 1 < this.height) {
            squareNeighbors.push(this.getSquare(x + 1, y + 1));
        }
        if (x !== 0 && y !== 0) {
            squareNeighbors.push(this.getSquare(x - 1, y - 1));
        }
        if (x !== 0 && y + 1 < this.height) {
            squareNeighbors.push(this.getSquare(x - 1, y + 1));
        }
        if (x + 1 < this.width && y !== 0) {
            squareNeighbors.push(this.getSquare(x + 1, y - 1));
        }
        if (x !== 0) {
            squareNeighbors.push(this.getSquare(x - 1, y));
        }
        if (y !== 0) {
            squareNeighbors.push(this.getSquare(x, y - 1));
        }
        if (y + 1 < this.height) {
            squareNeighbors.push(this.getSquare(x, y + 1));
        
        }
        //reikia diagonal neighbors
    return squareNeighbors;
    }

    createSeed(amount) {
        let seed = ""
        for (var i = 0; i < amount; i++) {
            const randX = Utilities.randinteger(this.height / 10 + amount / 20) + (this.height / 4);
            const randY = Utilities.randinteger(this.width / 10 + amount / 20) + (this.width / 4);
            this.board[randX][randY].isAlive = true;
            seed += randX.toString() + ", " + randY.toString() + "; " + "\n";
        }
 
        console.log(seed);
    }

    colorSquareNeihbors() {
        this.board.forEach ((row, y) => {
            row.forEach ((square, x) => {
                for (const neighbor of square.neighbors) {
                    if (square.isAlive)
                        if (neighbor.getColor() !== "white")
                        neighbor.setColor("pink");
                }
            });
        });
    }
    
    gameLogic () {
        this.board.forEach ((row) => {
            row.forEach ((square) => {
                const aliveNeighbors = square.neighbors.filter(neighbor => neighbor.isAlive).length;
                if (aliveNeighbors < 2 || aliveNeighbors > 3)
                    square.shouldLive = false;
                else if (aliveNeighbors == 3 || (aliveNeighbors == 2 && square.isAlive))
                    square.shouldLive = true;
            });
        });
        for (const row of this.board)
            for (const square of row)
                square.isAlive = square.shouldLive;      
    }

    start () {
        this.board = this.createBoard(this.width, this.height);
        this.populateNeighbors();
        this.graphicsInit();
        this.createSeed(150);
        this.drawRectBoard();
    }

    update () {
        this.drawRectBoard();
        this.gameLogic();
        window.setTimeout(this.update.bind(this), 100);    
    }
}

const game = new Game(200, 200, 10, 1);
game.start();
game.update();

   