// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // Load the pipe sprite
        game.load.image('pipe', '/images/pipe.png');
    },

    create: function() {
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create an empty group
        this.pipes = game.add.group();

        //Add row of pipe every 1.5 seconds
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    },

    update: function() {
        //Add collision detection
        game.physics.arcade.overlap(this.box, this.pipes, this.restartGame, null, this);
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
        // Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 5) + 1;

        // Add the 6 pipes
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.addOnePipe(400, i * 60 + 10);
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
