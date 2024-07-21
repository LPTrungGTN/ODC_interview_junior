# Snake Game Project

This is a simple implementation of the classic snake game. The player controls a snake, moving it around a grid to consume bait that appears at random locations. The game increases in difficulty as the snake grows longer with each piece of bait consumed.

## Features

- The game is initialized with a user-defined grid size.
- The snake starts with a length of 3 at position 0x0.
- Bait appears randomly on the grid but not on the snake's current location.
- The snake grows in length by 1 unit at the head after consuming the bait.
- The snake moves one index at a time using arrow keys and cannot move backward.
- The body of the snake follows the head or the previous body part's movement.
- The game progresses in real-time, with each move taking one second.

## Game End Conditions

- The game ends with a "You lose" message if:
  - The snake hits the border of the matrix.
  - The snake collides with itself.
  - There is no more space for the snake to move and the body does not cover the entire matrix.
- The game ends with a "You win" message if the snake's body covers the entire matrix.

### Use the following Docker commands to interact with the project
   ```bash
   # To open the terminal of the project
   docker exec -it snake ash

   # To follow the log outputs
   docker logs -f snake
   ```
### Website

For more information and interactive gameplay, visit the project's website at [Snake Game](https://odc-interview-snake.vercel.app/).

### Development

Feel free to fork this project and customize it as per your requirements. Contributions to improve the game are welcome.
