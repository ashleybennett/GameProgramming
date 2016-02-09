var scoreCoordX;
var scoreCoordY;
var sketch;
var ctx;
var snake;
var food;
var direction;

var eatFood = new Audio('powerup.mp3');

function Board()
{
    this.canvas = document.createElement('canvas');
    this.canvas.style.border = "black 10px solid";
    canvas.style = "position:absolute; width: 600px; margin-left: 100px;";
    this.canvas.setAttribute("tabindex", 0);
    document.getElementById('canvas').appendChild(this.canvas);
    ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1024, 600);

    this.displayScore = function()
    {
        scoreCoordY = this.canvas.height - 40;
        scoreCoordX = this.canvas.width - 50;

        ctx.clearRect(scoreCoordX, scoreCoordY - 50, 50 ,50 );
        ctx.font = '30pt Wide Latin';
        ctx.fillStyle = "white";
        ctx.fillText(game.score, scoreCoordX, scoreCoordY, 40);
    };

    this.clearCanvas = function()
    {
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    };
    this.drawFood = function(foodX, foodY)
    {
        ctx.fillStyle = "magenta";
        ctx.fillRect(foodX, foodY, gridSize, gridSize);
    };

    this.drawSnake = function(snakeX, snakeY)
    {
        if (snake.body.some(snake.collide))
        {
            game.reset();
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

        if (food.eatFood())
        {
            eatFood.play();
            game.updateScore();
            food.makeFood();
            snake.length++;

            if (snake.speed > 25)
            {
                clearInterval(game.timerHandle);
                snake.speed = snake.speed - 8;
                game.timerHandle = setInterval(snake.keepMoving, snake.speed);
            }
        }
    };
}

function Move()
{
    // adjust snake speed
    this.speed = 75;

    this.left = function()
    {
        if (direction != 2)
        {
            direction = 4;
            x = x - gridSize;
            if (x < 0)
            {
                game.reset();
                window.location = "gameOver.html";
            }
            sketch.drawSnake(x, y);
        }
    };

    this.right = function()
    {
        if (direction != 4 )
        {
            direction = 2;
            x = x + gridSize;
            if (x  >= sketch.canvas.width)
            {
                game.reset();
                window.location = "gameOver.html";
            }
            sketch.drawSnake(x, y);
        }
    };

    this.up = function()
    {
        if (direction != 3)
        {
            direction = 1;
            y = y - gridSize;
            if (y < 0)
            {
                game.reset();
                window.location = "gameOver.html";
            }

            sketch.drawSnake(x , y);
        }
    };

    this.down = function()
    {
        if (direction != 1)
        {
            direction = 3;
            y = y + gridSize;
            if (y >=  sketch.canvas.height)
            {
                game.reset();
                window.location = "gameOver.html";
            }
            sketch.drawSnake(x , y);
        }
    };

    //keep moving
    this.keepMoving = function()
    {
        switch (direction)
        {
            case 1:
                snake.up();
                break;
            case 2:
                snake.right();
                break;
            case 3:
                snake.down();
                break;
            case 4:
                snake.left();
                break;
            default:
                break;
        }
    };

    this.collide = function(body)
    {
        return (body[0] == x && body[1] == y);
    };
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
    switch (keyCode)
    {
        case 37:
            snake.left();
            break;
        case 38:
            snake.up();
            break;
        case 39:
            snake.right();
            break;
        case 40:
            snake.down();
            break;
        default:
            break;
    }
}

// mouse controls
function mouseHandler(event)
{
    moveX = event.layerX;
    moveY = event.layerY;

    if (direction == 1 || direction == 3)
    {
        if(moveX > x)
            snake.right();
        else
            snake.left();
    }
    // else direction is left or right!
    else
    {
        if(moveY > y)
            snake.down();
        else
            snake.up();
    }
    return 0;
}

function Food()
{
    this.foodLocation = [];

    this.isFoodOnBody = function(body)
    {
        return (body[0] == food.foodLocation[0] && body[1] == food.foodLocation[1]);
    };

    //eat food
    this.eatFood = function()
    {
        return (this.foodLocation[0] == x && this.foodLocation[1] == y);
    };

    this.makeFood = function()
    {
        this.foodLocation = [
            Math.floor(Math.random() * (sketch.canvas.width / gridSize)) * gridSize,
            Math.floor(Math.random() * (sketch.canvas.height / gridSize)) * gridSize
        ];
        if (snake.body.some(this.isFoodOnBody))
            this.makeFood();
        else
            sketch.drawFood(this.foodLocation[0], this.foodLocation[1]);
    };
}

function Game()
{
    this.score = 0;
    this.timerHandle = null;

    this.updateScore = function()
    {
        this.score += 1;
        sketch.displayScore();
    };

    this.storeData = function()
    {
        localStorage["snake_ts"] = this.score;

        if (localStorage["snake_hs"] == undefined || this.score > localStorage["snake_hs"])
        {
            localStorage["snake_hs"]= this.score;
        }

        return true;
    };

    this.pause = function()
    {
        clearInterval(game.timerHandle);
    };

    this.popupCallBack = function(index)
    {
        switch (index)
        {
            case 0:
                game.timerHandle = setInterval(snake.keepMoving, snake.speed);
                break;
            case 1:
                this.quit();
                break;
            default: break;
        }
    };

    this.reset = function()
    {
        clearInterval(game.timerHandle);
        game.storeData();
        // alert( "Your score is " + this.score);
        snake.body = [];
        snake.length = 3;
        this.score = 0;
        x = 0;
        y = 0;
        direction = 2;
    };

    this.quit = function()
    {
        this.reset();
    };
}

function ImpossibleMain()
{
    var audio = new Audio('audio_file.mp3');
    audio.play();
    sketch = new Board();

    // size of squares --> snake segments and food pieces will be 25 x 25 pixels
    this.gridSize = 25;

    sketch.canvas.width = 1024;
    sketch.canvas.height = 600;

    // snake head position
    this.x = 0;
    this.y = 0;

    // current direction
    direction = 2; // right

    game = new Game();

    food = new Food();
    snake = new Move();

    snake.body = [];
    snake.length = 3;
    food.makeFood();

    // sketch.canvas.addEventListener('mousedown', mouseHandler, false);
    this.canvas.setAttribute("tabindex", 0)
    window.addEventListener('keydown', keyBoardHandler, false);
    game.timerHandle = setInterval(snake.keepMoving, snake.speed);
}
