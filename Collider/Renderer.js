/**
 * Created by ashleybennett on 2/10/16.
 */
/*#######################################################
 # Class used Render simulation onto HTML5 canvas       #
 ########################################################*/

var Renderer = (function (Context) {
    var canvasColour;
    function Renderer(inCanvasColour) {
        canvasColour = "#14DEBC";
    };

    Renderer.prototype.draw = function(context, ballArray) {
        // draw Canvas Background.
        drawCanvasBackground(context);
        // draw Balls.
        drawBalls(context, ballArray);
    }

    function drawCanvasBackground(context) {
        context.beginPath();
        context.fillStyle = canvasColour;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawBalls(context,ballArray) {
        for (var i = 0; i < ballArray.length; i++) {
            context.beginPath();
            // draw ball using ball objects data.
            context.arc(ballArray[i].getX(), ballArray[i].getY(),ballArray[i].getRadius(), 0, Math.PI * 2, false);
            context.strokeStyle = "000000";
            context.stroke();
            context.fillStyle = ballArray[i].getColour();
            context.fill();
            context.closePath();
        }

        for (var i = 0; i < ballArray.length; i++) {
            if (ballArray[i].getColX() != null) {
                context.beginPath();
                context.arc(ballArray[i].getColX(), ballArray[i].getColY(), 10, 0, 2 * Math.PI, false);
                context.strokeStyle = "000000";
                context.stroke();
                context.fillStyle = "blue";
                context.fill();
                context.closePath();
                ballArray[i].setColX(null);
                ballArray[i].setColY(null);

            }

        }
    }

    function checkBall(context, ball1, ball2) {
        var xDistance = (ball2.getX() - ball1.getX()); // subtract the X distances from each other.
        var yDistance = (ball2.getY() - ball1.getY()); // subtract the Y distances from each other.
        var distanceBetween = Math.sqrt((xDistance * xDistance) + (yDistance *yDistance)); // the distance between the balls is the sqrt of X squard + Ysquared.

        var sumOfRadius = ((ball1.getRadius()) + (ball2.getRadius())); // add the balls radius together

        if (distanceBetween < sumOfRadius) { // if the distance between them is less than the sum of radius they have collided.
            collisionPointX = (((ball1.getX() * ball2.getRadius()) + (ball2.getX()* ball1.getRadius())) / (ball1.getRadius() + ball2.getRadius()));
            collisionPointY = (((ball1.getY() * ball2.getRadius()) + (ball2.getY()* ball1.getRadius())) / (ball1.getRadius() + ball2.getRadius()));
            conntext.beginPath();
            context.arc(collisionPointX, collisionPointY, (sumOfRadius/2), 0, 2*Math.PI, false);
            context.strokeStyle = "000000";
            context.fillStyle = "blue";
            context.fill();
            context.closePath();
            return true;
        }
        else {
            return false;
        }
    }

    return Renderer;
})();