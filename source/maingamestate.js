var mainGameState = {}

mainGameState.preload = function() { 
    console.log("Pre-loading the Game");
    this.game.load.image("space-bg", "assets/images/space-bg.jpg");
    this.game.load.image("player-ship", "assets/player-ship.jpg" )
    this.game.load.audio("game-music", "assets/music/maingame.mp3");
}

mainGameState.create = function() { 
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.game.add.sprite(0, 0, 'space-bg');
    
     var shipX = this.game.width * 0.5;
     var shipY = this.game.height * 0.95;

    
    this.cursors = this.game.input.keyboard.createCursorKeys();        

    this.playerShip = this.game.add.sprite(shipX, shipY, 'player-ship');
    this.playerShip.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.playerShip);


}

mainGameState.update = function() { 
    
     if ( this.cursors.left.isDown ) {
        this.playerShip.body.velocity.x = -200;
    } else if ( this.cursors.right.isDown ) {
        this.playerShip.body.velocity.x = 200;
    } else {
        this.playerShip.body.velocity.x = 0;
    }

}