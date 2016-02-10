var scoreCoordX;
var scoreCoordY;
var game;
var ctx;
var snake;
var food;
var direction;

var eatPiece = new Audio('powerup.mp3');

// sets up the main game board
function Board()
{
    this.canvas = document.createElement('canvas');
    this.canvas.style.border = "white 10px solid";
    canvas.style = "position:absolute; width: 600px; margin-left: 100px;";
    this.canvas.setAttribute("tabindex", 0);
    document.getElementById('canvas').appendChild(this.canvas);
    ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1024, 600);

    // clears current game display
    this.clearCanvas = function()
    {
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    };

    // draws current snake position
    this.drawSnake = function(snakeX, snakeY)
    {
        if (snake.body.some(snake.collide))
        {
            newGame.reset();
            window.location = "gameOver.html";
        }

        ctx.fillStyle = "rgb(7, 247, 71)";

        // draw new body
        snake.body.push([snakeX, snakeY]);
        ctx.fillRect(snakeX, snakeY, gridSize - 1, gridSize - 1);

        // erase old body
        if (snake.body.length > snake.length)
        {
            var eraseBody = snake.body.shift();
            ctx.clearRect(eraseBody[0], eraseBody[1], gridSize, gridSize);
        }

        // if the snake collides with the piece of food, the score is incremented, a new food piece
        // is generated, and the snake body length inceases by one
        if (food.eatFood())
        {
            eatPiece.play();
            newGame.updateScore();
            food.makeFood();
            snake.length++;

            // snake speed increases each time a piece of food is eaten
            if (snake.speed > 25)
            {
                clearInterval(newGame.timerHandle);
                snake.speed = snake.speed - 4;
                newGame.timerHandle = setInterval(snake.keepMoving, snake.speed);
            }
        }
    };

    // draws the next food piece on the screen
    this.drawFood = function(foodX, foodY)
    {
        ctx.fillStyle = "magenta";
        ctx.fillRect(foodX, foodY, gridSize, gridSize);
    };

    // displays the score in the bottom right-hand corner of the game canvas
    this.displayScore = function()
    {
        scoreCoordY = this.canvas.height - 40;
        scoreCoordX = this.canvas.width - 50;

        ctx.clearRect(scoreCoordX, scoreCoordY - 50, 50 ,50 );
        ctx.font = '30pt Wide Latin';
        ctx.fillStyle = "white";
        ctx.fillText(newGame.score, scoreCoordX, scoreCoordY, 40);
    };
}

// tracks the score and controls reset of the game
function Game()
{
    this.score = 0;
    this.timerHandle = null;

    // stores the current game score
    this.storeData = function()
    {
        localStorage["snake_ts"] = this.score;

        if (localStorage["snake_hs"] == undefined || this.score > localStorage["snake_hs"])
        {
            localStorage["snake_hs"]= this.score;
        }

        return true;
    };

    // increments the game score by one
    this.updateScore = function()
    {
        this.score += 1;
        game.displayScore();
    };

    // resets the game upon snake collision
    this.reset = function()
    {
        clearInterval(newGame.timerHandle);
        newGame.storeData();
        snake.length = 3;
        snake.body = [];
        this.score = 0;
        x = 0;
        y = 0;
        direction = 2;
    };
}

// controls snake direction
function Move()
{
    // adjust snake speed
    this.speed = 120;

    // direction = 4
    this.west = function()
    {
        if (direction != 2)
        {
            direction = 4;
            x = x - gridSize;
            if (x < 0)
            {
                newGame.reset();
                window.location = "gameOver.html";
            }
            game.drawSnake(x, y);
        }
    };

    // direction = 2
    this.east = function()
    {
        if (direction != 4 )
        {
            direction = 2;
            x = x + gridSize;
            if (x  >= game.canvas.width)
            {
                newGame.reset();
                window.location = "gameOver.html";
            }
            game.drawSnake(x, y);
        }
    };

    // direction = 1
    this.north = function()
    {
        if (direction != 3)
        {
            direction = 1;
            y = y - gridSize;
            if (y < 0)
            {
                newGame.reset();
                window.location = "gameOver.html";
            }

            game.drawSnake(x , y);
        }
    };

    // direction = 3
    this.south = function()
    {
        if (direction != 1)
        {
            direction = 3;
            y = y + gridSize;
            if (y >=  game.canvas.height)
            {
                newGame.reset();
                window.location = "gameOver.html";
            }
            game.drawSnake(x , y);
        }
    };

    // keeps the snake moving in the current direction until a turn is signaled
    this.keepMoving = function()
    {
        if (direction == 1) {
            snake.north();
        }
        else if (direction == 2) {
            snake.east();
        }
        else if (direction == 3) {
            snake.south();
        }
        else {
            snake.west();
        }
    };

    // checks for collision with the snake's own body
    this.collide = function(body)
    {
        return (body[0] == x && body[1] == y);
    };
}

// mouse controls
function mouseHandler(event)
{
    // gets the x and y coordinates
    moveX = event.layerX;
    moveY = event.layerY;

    // if the snake is moving up or down, the next direction is either right or left
    // if the mouse click is to the left of the current snake position, it moves left
    // if the mouse click is to the right of the current snake position, it moves right
    if (direction == 1 || direction == 3)
    {
        if(moveX > x)
            snake.east();
        else
            snake.west();
    }
    else
    {
        if(moveY > y)
            snake.south();
        else
            snake.north();
    }
    return 0;
}

// keyboard controls
function keyBoardHandler(event)
{
    var keyCode = event.keyCode;

    //window.alert("hit");

    /* if (event == null)
     {
     keyCode = window.event.keyCode;
     }
     else
     {
     keyCode = event.keyCode;
     }
     */

    // calls direction functions for each arrow key
    if (keyCode == 37) {
        snake.west();
    }
    else if (keyCode == 38) {
        snake.north();
    }
    else if (keyCode == 39) {
        snake.east();
    }
    else if (keyCode == 40) {
        snake.south();
    }
}

// controls the food functions
function Food()
{
    this.foodLocation = [];

    // returns true if the food piece has made contact with the body
    this.isFoodOnBody = function(body)
    {
        return (body[0] == food.foodLocation[0] && body[1] == food.foodLocation[1]);
    };

    // "eats" if the food piece if the body comes in contact with it
    this.eatFood = function()
    {
        return (this.foodLocation[0] == x && this.foodLocation[1] == y);
    };

    // generates the coordinates for the next piece of food
    this.makeFood = function()
    {
        this.foodLocation = [
            Math.floor(Math.random() * (game.canvas.width / gridSize)) * gridSize,
            Math.floor(Math.random() * (game.canvas.height / gridSize)) * gridSize
        ];

        if (snake.body.some(this.isFoodOnBody))
            this.makeFood();
        else
            game.drawFood(this.foodLocation[0], this.foodLocation[1]);
    };
}

function KeyboardMain()
{
    var audio = new Audio('audio_file.mp3');
    audio.play();
    game = new Board();

    // size of squares --> snake segments and food pieces will be 25 x 25 pixels
    this.gridSize = 25;

    game.canvas.width = 1024;
    game.canvas.height = 600;

    // snake head position
    this.x = 0;
    this.y = 0;

    // current direction
    direction = 2; // right

    newGame = new Game();

    food = new Food();
    snake = new Move();

    snake.body = [];
    snake.length = 3;
    food.makeFood();

    //game.canvas.addEventListener('mousedown', mouseHandler, false);
    this.canvas.setAttribute("tabindex", 0)
    window.addEventListener('keydown', keyBoardHandler, false);
    newGame.timerHandle = setInterval(snake.keepMoving, snake.speed);
}