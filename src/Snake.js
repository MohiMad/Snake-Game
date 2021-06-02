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
        this.direction = { x: 0, y: 0 };
        this.expantionRate = 1;
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
            this.indexOfApple.push({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        }
    }


    handleApple() {
        for (const apple of this.indexOfApple) {
            if (this.snakeBody[0].x === apple.y && this.snakeBody[0].y === apple.x) {
                this.indexOfApple.splice(this.indexOfApple.indexOf(apple), 1);
                this.score += 1;
                this.indexOfApple.push({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
            }
        }
    }

    move() {
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
                break;

            case "d":
                if (this.direction.x === -1) return;
                this.direction = { x: 1, y: 0 };
                break;

            case "a":
                if (this.direction.x === 1) return;
                this.direction = { x: -1, y: 0 };
                break;

            case "s":
                if (this.direction.y === -1) return;
                this.direction = { x: 0, y: 1 };
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
}

function Snake() {
    useEffect(() => {
        const border = document.getElementById("border");

        const SNAKE = new _Snake(border);
        let lastRenderTime = 0;

        window.addEventListener("keydown", function (e) {
            SNAKE.handleClick(e);
        });

        function main(currentTime) {
            window.requestAnimationFrame(main);
            const secondLastRender = (currentTime - lastRenderTime) / 1000;

            if (secondLastRender < 1 / SNAKE.speed) return;

            lastRenderTime = currentTime;

            SNAKE.move();
            SNAKE.draw();
            SNAKE.spawnApple();
            SNAKE.handleApple();
            document.querySelector(".score").textContent = `Score: ${SNAKE.score}`
        }

        window.requestAnimationFrame(main);
    }, []);

    return null;
}

export default Snake;