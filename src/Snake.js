import './App.css';
import { useEffect } from 'react';

class _Snake {
    constructor(board) {
        this.speed = 3;
        this.score = 0;
        this.snakeBody = [
            {
                x: 11,
                y: 11
            },
            {
                x: 11,
                y: 10
            },
            {
                x: 11,
                y: 9
            },
            {
                x: 11,
                y: 8
            }
        ];
        this.indexOfApple = [];
        this.board = board;
        this.direction = { x: 1, y: 0 };
        this.isDead = false;
        this.totalMoves = 0;
    }

    spawnApple() {
        if (this.indexOfApple.length === 2) {
            for (const apple of this.indexOfApple) {
                const element = document.createElement("div");

                element.classList.add("apple");

                element.style.gridRowStart = apple.x;
                element.style.gridColumnStart = apple.y;

                this.board.appendChild(element);
            }
        } else {
            const coord = this.givePositiveCoordinates();

            this.indexOfApple.push({ x: coord.x, y: coord.y });
        }
    }

    givePositiveCoordinates() {
        const coordinates = { x: [...Array(21).keys()].slice(1)[Math.floor(Math.random() * 20)], y: [...Array(21).keys()].slice(1)[Math.floor(Math.random() * 20)] }

        for (const element of this.snakeBody) {
            if (coordinates.x === element.x && coordinates.y === element.y) return this.givePositiveCoordinates();
        }

        for (const apple of this.indexOfApple) {
            if (coordinates.x === apple.x && coordinates.y === apple.y) return this.givePositiveCoordinates();
        }

        return coordinates;
    }

    handleApple() {
        for (const apple of this.indexOfApple) {
            if (this.snakeBody[0].x === apple.y && this.snakeBody[0].y === apple.x) {
                this.indexOfApple.splice(this.indexOfApple.indexOf(apple), 1);
                this.score += 1;
                this.speed += .5;
                this.snakeBody = [...this.snakeBody, { x: this.snakeBody[this.snakeBody.length - 1].x + 1, y: this.snakeBody[this.snakeBody.length - 1].y + 1 }]

                const coord = this.givePositiveCoordinates();

                this.indexOfApple.push({ x: coord.x, y: coord.y });
            }
        }
    }

    handleCrash() {
        //We check whether the snake head encounters a snakebody in front of it (loses)
        for (const piece of this.snakeBody.slice(1)) {
            if (this.snakeBody[0].x === piece.x && this.snakeBody[0].y === piece.y) {
                if (this.isDead || this.totalMoves < 5) continue;
                this.isDead = true;
                this.restart();
            }
        }

        //Now we check whether the snake HEAD hit a border.
        if (this.snakeBody[0].x < 1 || this.snakeBody[0].x >= 20 || this.snakeBody[0].y < 1 || this.snakeBody[0].y >= 20) {
            if (this.isDead) return;
            this.isDead = true;
            this.restart();
        }
    }

    move() {
        this.handleCrash();

        for (let i = this.snakeBody.length - 2; i >= 0; i--) {
            this.snakeBody[i + 1] = { ...this.snakeBody[i] };
        }

        this.snakeBody[0].x += this.direction.x;
        this.snakeBody[0].y += this.direction.y;

    }

    handleClick(e) {
        switch (e.key.toLowerCase()) {
            default:
                return;

            case "w":
                if (this.direction.y === 1) return;

                this.direction = { x: 0, y: -1 };
                this.totalMoves += 1;
                break;

            case "d":
                if (this.direction.x === -1) return;
                this.direction = { x: 1, y: 0 };
                this.totalMoves += 1;

                break;

            case "a":
                if (this.direction.x === 1) return;
                this.direction = { x: -1, y: 0 };
                this.totalMoves += 1;
                break;

            case "s":
                if (this.direction.y === -1) return;
                this.direction = { x: 0, y: 1 };
                this.totalMoves += 1;
                break;
        }
    }

    draw() {
        this.board.innerHTML = '';
        for (let i = 0; i < this.snakeBody.length; i++) {
            const element = document.createElement("div");

            if (i === 0) element.classList.add("head");
            else element.classList.add("body");

            element.style.gridRowStart = this.snakeBody[i].y;
            element.style.gridColumnStart = this.snakeBody[i].x;
            this.board.appendChild(element);

        }
    }

    restart() {
        document.getElementById("border").style.display = "none";
        document.querySelector("h2").textContent = "You lost!";
        document.querySelector(".score").innerHTML = `
        Score: ${this.score}
        <br/>
        Total moves: ${this.totalMoves}
        <br/>
        <button id="playagain" onclick="window.location.reload(false)">Play Again</button>
        `;

    }

}

function Snake() {
    useEffect(() => {
        const border = document.getElementById("border");

        const SNAKE = new _Snake(border);
        let lastRenderTime = 0;
        function main(currentTime) {
            window.requestAnimationFrame(main);
            const secondLastRender = (currentTime - lastRenderTime) / 1000;

            if (secondLastRender < 1 / SNAKE.speed) return;

            lastRenderTime = currentTime;

            SNAKE.move();
            SNAKE.draw();
            SNAKE.spawnApple();
            SNAKE.handleApple();
            if (!SNAKE.isDead) document.querySelector(".score").textContent = `Score: ${SNAKE.score}`;
        }

        window.addEventListener("keydown", function (e) {
            if (!["w", "a", "s", "d"].includes(e.key)) return;
            document.getElementById("instructions").style.display = "none";
            SNAKE.handleClick(e);
            window.requestAnimationFrame(main);
        });

    }, []);

    return null;
}

export default Snake;