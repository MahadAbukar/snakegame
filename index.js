window.onload = function(){
  var cvs = document.getElementById("canvas");
  var ctx = cvs.getContext("2d");

  //images
  var ground = document.getElementById("ground");
  var foodImg = document.getElementById("food");

  // audio
  var dead = new Audio();
  var eat  = new Audio();
  var up = new Audio();
  var left = new Audio();
  var right = new Audio();
  var down = new Audio();

  dead.src = "audio/dead.mp3";
  eat.src = "audio/eat.mp3";
  up.src = "audio/up.mp3";
  down.src = "audio/down.mp3";
  left.src = "audio/left.mp3";
  right.src = "audio/right.mp3";


  // variable
  const box = 32;


  // Snake
  var snake =[];
  snake[0] = {
    x: 9 * box,
    y: 10 * box
  }

  // food
  var food ={
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
  }

  // score
  var score = 0;

  // keys
  var d;
  document.addEventListener("keydown",direction);
  function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
      d = "LEFT";
      left.play();
    }else if(event.keyCode == 38 && d != "DOWN"){
      d = "UP";
      up.play();
    }else if(event.keyCode == 39 && d != "LEFT"){
      d = "RIGHT";
      right.play();
    }else if(event.keyCode == 40 && d != "UP"){
      d = "DOWN";
      down.play();
    }
  }

  // collision function
  function collision(head,array){
    for(i=0;i<array.length;i++){
      if(head.x == array[i].x && head.y == array[i].y){
        return true;
      }
    }
    return false;
  }
  // draw
  function draw(){
    ctx.drawImage(ground,0,0);
    for(i=0;i<snake.length;i++){
      ctx.fillStyle = (i==0)? "green" : "white";
      ctx.fillRect(snake[i].x,snake[i].y,box,box);
      ctx.strokeStyle = "red";
      ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    //which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    // snake eat food
    if(snakeX == food.x && snakeY == food.y){
      score++;
      eat.play();
      food ={
        x: Math.floor(Math.random()*17+1)* box,
        y: Math.floor(Math.random()*15+3) * box
      }
      //  dont remove tail if snake ate food
    } else{
        // remove the tail
        snake.pop()
    }
    //new head
    var newHead = {
      x: snakeX,
      y: snakeY
    }

    // game over
    if(collision(newHead,snake) || snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box){
      clearInterval(game);
      dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
  }

  // draw function every 100ms
  var game = setInterval(draw,100);

  draw();
}
