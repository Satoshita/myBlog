'use strict';
{
  let canvas = document.getElementById('myCanvas');
  let ctx = canvas.getContext("2d");

  let x = canvas.width/2;
  let y = canvas.height-30; 
  let dx = 2; 
  let dy = -5;

  let ballRadius = 8;

  let paddleHeight = 10;
  let paddleWidth = 100;
  let paddleX = (canvas.width-paddleWidth)/2; 

  let rightPressed = false;
  let leftPressed = false;

  let brickRowCount = 4;
  let brickColumnCount = 6;
  let brickWidth = 71;
  let brickHeight = 22; 
  let brickPadding = 5;
  let brickOffsetTop = 25;
  let brickOffsetLeft = 16;

  let score = 0; 
  let lives = 3;

  let bricks = [];
  for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1};
    }
  }

  document.addEventListener('keydown', keyDownHandler, false); 
  document.addEventListener('keyup', keyUpHandler, false);

  function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if(e.key == "right" || e.key == "ArrowRight") {
      rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }
  document.addEventListener('mousemove', mouseMoveHandler, false);

  function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
    }
  }

  function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
      for(let r = 0; r < brickRowCount; r++) {
        let b = bricks[c][r];
        if(b.status == 1) {
          if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if(score == brickRowCount*brickColumnCount) {
              alert(`合計：${score}点、YOU WIN, CONGRATULATIONS!`);
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = "yellow";
    ctx.fillText("score: " + score, 8, 20);
  }

  function drawLives() {
    ctx.font = '16px Arail';
    ctx.fillStyle = 'pink';
    ctx.fillText("Lives: " +lives, canvas.width-65, 20);
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill(); 
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
      for(let r = 0; r < brickRowCount; r++) {
        if(bricks[c][r].status == 1) {
          let brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY; 
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if(y + dy < ballRadius) {
      dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy-1; //返るボールのスピードアップ
      } 
      else {
        lives--;
        if(!lives) {
          alert("GAME OVER");
          document.location.reload();
        }
        else {
          x = canvas.width/2;
          y = canvas.height-25; 
          dx = 3
          dx = -3;
          paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 8;
    }
    else if(leftPressed && paddleX > 0) {
      paddleX -= 8;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
  }
  
  draw();
}
