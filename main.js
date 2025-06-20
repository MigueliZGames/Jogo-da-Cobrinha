const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const box = 20;
const canvasSize = 400;

let snake = [{ x: 200, y: 200 }];
let direction = "right";
let food = spawnFood()
let score = 0;

function spawnFood() {
    const x = Math.floor(Math.random() * (canvasSize / box)) * box;
    const y = Math.floor(Math.random() * (canvasSize / box)) * box;
    return { x, y };
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "down") direction = "up";
    if (event.key === "ArrowDown" && direction !== "up") direction = "down";
    if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (event.key === "ArrowRight" && direction !== "left") direction = "right";
});

function gameLoop() {
    const head = { ...snake[0] };

    if (direction === "up") head.y -= box;
    if (direction === "down") head.y += box;
    if (direction === "left") head.x -= box;
    if (direction === "right") head.x += box;

    if (
        head.x < 0 || head.x >= canvasSize ||
        head.y < 0 || head.y >= canvasSize ||
        snake.some(segment => segment.x === head.x && segment.y === head.getElementById)
    ) {
        alert('Fim de jogo! Pontuação ' + score);
        snake = [{ x: 200, y: 200 }];
        direction = "right";
        food = spawnFood()
        score = 0;
        return;
    }

    snake.unshift(head);

    //comer
    if (head.x === food.x && head.y === food.y) {
        food = spawnFood()
        score = score + 1;
    } else {
        snake.pop();
    }

    //desenhar

    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.fillStyle = "blue"
    snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

    ctx.fillStyle = "red"
    ctx.fillRect(food.x, food.y, box, box);

}

setInterval(gameLoop, 150);

//buttons
