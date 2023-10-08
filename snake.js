var PLAY = 1;
var END = 0;
var gameState = PLAY;

var snake;
var food;
var gridSize = 20;
var snakeSpeed = 10;
var direction = "right";

function setup() {
  createCanvas(400, 400);
  frameRate(snakeSpeed);
  
  snake = [{ x: 3, y: 1 }];
  food = { x: 10, y: 10 };
}

function draw() {
  background(220);

  if (gameState === PLAY) {
    moveSnake();
    checkCollision();

   
    fill(255, 0, 0);
    rect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

   
    fill(0, 255, 0);
    for (let segment of snake) {
      rect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }
  } else if (gameState === END) {
    
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Game Over", width / 2, height / 2);
  }
}

function moveSnake() {
  let headX = snake[0].x;
  let headY = snake[0].y;

  
  if (keyIsDown(LEFT_ARROW) && direction !== "right") {
    direction = "left";
  } else if (keyIsDown(RIGHT_ARROW) && direction !== "left") {
    direction = "right";
  } else if (keyIsDown(UP_ARROW) && direction !== "down") {
    direction = "up";
  } else if (keyIsDown(DOWN_ARROW) && direction !== "up") {
    direction = "down";
  }

  
  if (direction === "left") {
    headX--;
  } else if (direction === "right") {
    headX++;
  } else if (direction === "up") {
    headY--;
  } else if (direction === "down") {
    headY++;
  }

  
  snake.unshift({ x: headX, y: headY });

  
  if (headX === food.x && headY === food.y) {
    
    food.x = floor(random(width / gridSize));
    food.y = floor(random(height / gridSize));
  } else {
    
    snake.pop();
  }
}

function checkCollision() {
  let headX = snake[0].x;
  let headY = snake[0].y;

  l
  if (headX < 0 || headY < 0 || headX >= width / gridSize || headY >= height / gridSize) {
    gameState = END;
    return;
  }

  
  for (let i = 1; i < snake.length; i++) {
    if (headX === snake[i].x && headY === snake[i].y) {
      gameState = END;
      return;
    }
  }
}
