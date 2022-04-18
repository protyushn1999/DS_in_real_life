console.log("Connected to Snake Game");

function init(){
    canvas = document.getElementById("snakeCanvas");
    score = document.getElementById("score");
    bestScore = document.getElementById("bestscore");

    W = canvas.width = 1000;
    H = canvas.height = 865;
    pen = canvas.getContext("2d");
    cellsize = 67;
    gameOver =  false;
    gamePause = false;
    food = getRandomFood();
    points = 5;
    time = 500;

    food_img = new Image();
    food_img.src = "./Assets/apple.png";

    snake = {
        init_length : 5, // initital length of the snake
        color : "brown",
        cells : [],
        direction : "right",

        createSnake : function(){
            for(var i = this.init_length; i > 0; i--){
                this.cells.push({x : i, y : 0});
                
            } 
        },

        drawSnake : function(){
            for(var i = 0; i < this.cells.length; i++){
                pen.fillStyle  = this.color;
                pen.fillRect(this.cells[i].x * cellsize, this.cells[i].y * cellsize, cellsize-2, cellsize-2);
            }
        },

        updateSnake : function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            var nextX, nextY;

            if(headX == food.x && headY == food.y){
                console.log("Food eaten");
                food = getRandomFood();
                points++;
                score.innerHTML = points;
                if(time >= 50){
                    time = time - 50;
                }
                else{
                    time = 50;
                }
                console.log("time is" + time);
                
            }
            else{
                this.cells.pop();
                
            }

            if(this.direction == "right"){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "up"){
                nextX = headX;
                nextY = headY - 1;
            }
            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY + 1;
            }

            var last_x = Math.round(W/cellsize);
            var last_y = Math.round(H/cellsize);

            if(this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y < 0 || this.cells[0].y > last_y){
                console.log("Game Over");
                gameOver = true;
            }
            this.cells.unshift({x : nextX, y : nextY});
        }
    }


    snake.createSnake();


    // add a event listener to the canvas for keyboarsd press
    function keyPressed(e){
        //console.log(e);
        console.log("Key Pressed", e.key);

        if(e.key == "a"){
            gamePause = true;
        }

        if(e.key == "s"){
            gamePause = false;
        }
        
        if(e.key == "ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key == "ArrowUp"){
            snake.direction = "up";
        }
        else if(e.key == "ArrowDown"){
            snake.direction = "down";
        }
       
    }
    document.addEventListener("keydown", keyPressed);
}

function draw(){
    // erase the previous drawing
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x * cellsize, food.y * cellsize, cellsize, cellsize);
}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX = Math.round(Math.random() * (W - cellsize) / cellsize);
    var foodY = Math.round(Math.random() * (H - cellsize) / cellsize);

    var food = {
        x : foodX,
        y : foodY,
        color : "blue"
    }

    return food;
}

function gameloop(){ 
    if(gameOver == true){
        score.innerHTML = 5;
        alert("Game Over");
        init();
        return;
    }
    if(gamePause == true){
        console.log("Game Paused");
        clearInterval(game);
    }
        
        draw();
        update();
    
}

init();



var game = setInterval(gameloop, 100);

