import './App.css';
import { useEffect } from 'react';

class _Snake {
    constructor(board) {
        this.speed = 1;
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
        this.clickLog = ['d'];
    }

    spawnApple() {
        const element = document.createElement("div");

        element.classList.add("apple");

        element.style.gridRowStart = Math.floor(Math.random() * 20);
        element.style.gridColumnStart = Math.floor(Math.random() * 20);

        if (element.classList.contains("body") || element.classList.contains("head")) return this.spawnApple();
        this.indexOfApple.push({ x: element.style.gridRowStart, y: element.style.gridColumnStart });
        this.board.appendChild(element);
    }

    moveRight() {
        for (let i = 0; i < this.snakeBody.length; i++) {
            this.snakeBody[i].y++;
        }
    }

    update() {
        if (this.indexOfApple.length < 2) this.spawnApple();
        if (this.clickLog[0] === 'd') this.moveRight();
    }

    draw() {
        this.board.innerHTML = '';
        for (let i = 0; i < this.snakeBody.length; i++) {
            const element = document.createElement("div");

            /*    if (i === this.snakeBody.length - 1) {
                   const lastSnakeBody = document.querySelector(`div grid-row-start=${this.snakeBody[i].x}`);
   
                   console.log(lastSnakeBody);
               }
    */
            if (i === 0) element.classList.add("head");
            else element.classList.add("body");

            element.style.gridRowStart = this.snakeBody[i].x;
            element.style.gridColumnStart = this.snakeBody[i].y;
            this.board.appendChild(element);

        }
    }
}

function Snake({ score, updateScore }) {
    useEffect(() => {
        const border = document.getElementById("border");

        const SNAKE = new _Snake(border);
        let lastRenderTime = 0;

        function main(currentTime) {
            window.requestAnimationFrame(main);
            const secondLastRender = (currentTime - lastRenderTime) / 1000;

            if (secondLastRender < 1 / SNAKE.speed) return;

            lastRenderTime = currentTime;

            SNAKE.update();
            SNAKE.draw();

        }

        window.requestAnimationFrame(main);
    }, []);

    return null;
}

export default Snake;