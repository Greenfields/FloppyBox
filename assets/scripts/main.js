// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds

        // Load the bird sprite
        game.load.image('box', '/images/lego.png');

        // Load the pipe sprite
        game.load.image('pipe', '/images/legoblock.png');

        //Load the jump sound
        game.load.audio('jump', '/sounds/jump.wav');
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        // Change the background color of the game to blue
        game.stage.backgroundColor = '#71c5cf';

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the box at the position x=100 and y=245
        this.box = game.add.sprite(100, 245, 'box');

        // Move the anchor to the left and downward
        this.box.anchor.setTo(-0.2, 0.5);

        //Set score to 0
        this.score = -1;

        //Add score onto the canvas
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Helvetica", fill: "#ffffff" });

        // Create an empty group
        this.pipes = game.add.group();

        // Create a new set of pipes every 1.5 seconds
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

        // Bind the jump sound to the game
        this.jumpSound = game.add.audio('jump');

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.box);

        // Add gravity to the bird to make it fall
        this.box.body.gravity.y = 1000;

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic

        if (this.box.angle < 20) {
            this.box.angle += 1;
        }

        //Detect collisions between the bird and the pipes.
        game.physics.arcade.overlap(this.box, this.pipes, this.hitPipe, null, this);

        if (game.input.activePointer.isDown){
            this.jump();
        }

        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.box.y < 0 || this.box.y > 490)
            this.restartGame();
    },

    hitPipe: function() {
        // If the bird has already hit a pipe, do nothing
        // It means the bird is already falling off the screen
        if (this.box.alive == false)
            return;

        // Set the alive property of the bird to false
        this.box.alive = false;

        // Prevent new pipes from appearing
        game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    addOnePipe: function(x, y) {
        // Create a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');

        // Add the pipe to our previously created group
        this.pipes.add(pipe);

        // Enable physics on the pipe
        game.physics.arcade.enable(pipe);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;

        // Automatically kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        //Update score as we add pipes
        this.score += 1;
        this.labelScore.text = this.score;

        // Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 5) + 1;

        // Add the 6 pipes
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 8; i++) {
            if (i != hole && i != hole + 1) {
                this.addOnePipe(400, i * 60 + 10);
            }
        }
    },

    // Make the bird jump
    jump: function() {
        // Create an animation on the bird
        var animation = game.add.tween(this.box);

        // Change the angle of the bird to -20° in 100 milliseconds
        animation.to({angle: -20}, 100);

        // And start the animation
        animation.start();

        // Add a vertical velocity to the bird
        this.box.body.velocity.y = -350;

        // Play the jump sound
        this.jumpSound.play();
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');