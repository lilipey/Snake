var canvas = document.getElementById("gameBoard");
        var ctx = canvas.getContext("2d");

        var gridSize = 20;
        var snake = [{ x: 1, y: 1 }];
        var direction = "right";
        var food = { x: 5, y: 5 };
        var obstacles = [{ x: 8, y: 8 }, { x: 12, y: 10 }, { x: 15, y: 5 }];

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw obstacles
            ctx.fillStyle = "gray";
            obstacles.forEach(obstacle => {
                ctx.fillRect(obstacle.x * gridSize, obstacle.y * gridSize, gridSize, gridSize);
            });

            // Draw snake
            ctx.fillStyle = "green";
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
            });

            // Draw food
            ctx.fillStyle = "red";
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        }

        function moveSnake() {
            var head = { ...snake[0] };

            switch (direction) {
                case "up": head.y--; break;
                case "down": head.y++; break;
                case "left": head.x--; break;
                case "right": head.x++; break;
            }

            // Check for collisions with obstacles
            if (checkObstacleCollision(head)) {
                clearInterval(gameLoop);
                alert("Game Over - Hit an obstacle!");
                return;
            }

            snake.unshift(head);

            // Check if the snake eats the food
            if (head.x === food.x && head.y === food.y) {
                generateFood();
            } else {
                snake.pop();
            }

            // Check for collisions
            if (head.x < 0 || head.x >= canvas.width / gridSize ||
                head.y < 0 || head.y >= canvas.height / gridSize ||
                checkSelfCollision()) {
                clearInterval(gameLoop);
                alert("Game Over!");
            }

            draw();
        }

        function generateFood() {
            do {
                food.x = Math.floor(Math.random() * (canvas.width / gridSize));
                food.y = Math.floor(Math.random() * (canvas.height / gridSize));
            } while (checkObstacleCollision(food) || checkSelfCollision(food));
        }

        function checkSelfCollision() {
            return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
        }

        function checkObstacleCollision(position) {
            return obstacles.some(obstacle => obstacle.x === position.x && obstacle.y === position.y);
        }

        document.addEventListener("keydown", function (event) {
            switch (event.key) {
                case "ArrowUp": direction = "up"; break;
                case "ArrowDown": direction = "down"; break;
                case "ArrowLeft": direction = "left"; break;
                case "ArrowRight": direction = "right"; break;
            }
        });

        var gameLoop = setInterval(moveSnake, 400 / 5);  // Adjust the speed as needed

        function restart() {
            document.getElementById("startButton").addEventListener("click", function () {
                location.reload();
            });
        }

        restart();