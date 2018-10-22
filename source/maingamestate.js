var mainGameState = {}

mainGameState.preload = function() { 
    console.log("Pre-loading the Game");
    this.game.load.image("space-bg", "assets/images/space-bg.jpg");
    this.game.load.image("player-ship", "assets/images/player-ship.png" );
    this.game.load.image("asteroid-medium-01", "assets/images/asteroid-medium-01.png");
    this.game.load.image("player-bullet", "assets/images/bullet-fire.png");  
    
    this.game.load.audio("game-music", "assets/music/maingame.mp3");
    this.game.load.audio('player_fire_01', 'assets/audio/player_fire_01.mp3');
    this.game.load.audio('player_fire_02', 'assets/audio/player_fire_02.mp3');
    this.game.load.audio('player_fire_03', 'assets/audio/player_fire_03.mp3');
    this.game.load.audio('player_fire_04', 'assets/audio/player_fire_04.mp3');
    this.game.load.audio('player_fire_05', 'assets/audio/player_fire_05.mp3');
    this.game.load.audio('player_fire_06', 'assets/audio/player_fire_06.mp3');
}

mainGameState.create = function() { 
    
       this.playerFireSfx = [];
    this.playerFireSfx.push(game.add.audio("player_fire_01"));
    this.playerFireSfx.push(game.add.audio("player_fire_02"));
    this.playerFireSfx.push(game.add.audio("player_fire_03"));
    this.playerFireSfx.push(game.add.audio("player_fire_04"));
    this.playerFireSfx.push(game.add.audio("player_fire_05"));
    this.playerFireSfx.push(game.add.audio("player_fire_06"));
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Player ship
    this.game.add.sprite(0, 0, 'space-bg');
    
     var shipX = this.game.width * 0.5;
     var shipY = this.game.height * 0.8;

    
    this.cursors = this.game.input.keyboard.createCursorKeys();        

    this.playerShip = this.game.add.sprite(shipX, shipY, 'player-ship');
    this.playerShip.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.playerShip);
    
    //music
    
    this.music = this.game.add.audio("game-music");
    this.music.play();
    this.music.volume = 0.5;
    this.music.loop = true;     

    //astroids
    
    this.asteroidTimer= 2.0;
    this.asteroids = this.game.add.group();
    
     //bullets
    //this.firebullets = this.game.add.group();
    //this.fireTimer = 2.0;
    
    //set firekey to Z 
    this.fireKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.playerBullets = this.game.add.group();
    this.fireTimer = 0.4;
    
    //setting up the scores
    this.playerScore = 0;
    
    var textStyle = {font: "16px Arial", fill: "#ffffff", align: "center"}

    this.scoreTitle = this.game.add.text(this.game.width * 0.85, 30, "SCORE", textStyle);
    this.scoreTitle.fixedToCamera = true;
    this.scoreTitle.anchor.setTo(0.5, 0.5);

    this.scoreValue = this.game.add.text(this.game.width * 0.75, 30, "0", textStyle);
    this.scoreValue.fixedToCamera = true;
    this.scoreValue.anchor.setTo(0.5, 0.5);

    this.playerScore = 0;
    
    ///Player lives
    var textStyle = {font: "16px Arial", fill: "#ffffff", align: "center"}

    this.livesTitle = this.game.add.text(this.game.width * 0.85, 30, "LIVES", textStyle);
    this.livesTitle.fixedToCamera = true;
    this.livesTitle.anchor.setTo(0.5, 0.5);

    this.livesValue = this.game.add.text(this.game.width * 0.75, 30, "0", textStyle);
    this.livesValue.fixedToCamera = true;
    this.livesValue.anchor.setTo(0.5, 0.5);

    this.playerLives = 3;

    
}

mainGameState.update = function() { 
    
     if ( this.cursors.left.isDown ) {
        this.playerShip.body.velocity.x = -200;
    } else if ( this.cursors.right.isDown ) {
        this.playerShip.body.velocity.x = 200;
    } else {
        this.playerShip.body.velocity.x = 0;
    }
    
  if ((this.playerShip.x > this.game.width) && (this.playerShip.body.velocity.x > 0)) {
        this.playerShip.body.velocity.x = 0;
    }

    if ((this.playerShip.x < 0) && (this.playerShip.body.velocity.x < 0)) {
        this.playerShip.body.velocity.x = 0;
    }
    
    
    //Creating/spawning Asteroids
    
    this.asteroidTimer -= this.game.time.physicsElapsed;

    if ( this.asteroidTimer <= 0.0 ) {
        console.log("SPAWN ASTEROID");
        this.asteroidTimer = 2.0;
    }
    
    // Clean up any asteroids that have moved off the bottom of the screen
    for( var i = 0; i < this.asteroids.children.length; i++ ) {
        if ( this.asteroids.children[i].y > (this.game.height + 200) ) {
            this.asteroids.children[i].destroy();
        }
    }
    
    if ( this.fireKey.isDown ) {
        this.spawnPlayerBullet();
    }
    
    this.fireTimer -= this.game.time.physicsElapsed;
    
    for (var j = 0; j < this.playerBullets.children.length; j++) {
        if ( this.playerBullets.children[j].y < -200 ) {
            this.playerBullets.children[j].destroy();
        }
    }
    
     this.scoreValue.setText(this.playerScore);
}


mainGameState.spawnAsteroid = function() {
    
    //creating astroids
  
    var x = this.game.rnd.integerInRange(0, this.game.width);
    var asteroid = this.game.add.sprite(x, 0, "asteroid-medium-01");
    asteroid.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(asteroid);
    asteroid.body.velocity.setTo(0, 100);
    
    //add to the astroid group
    this.asteroids.add(asteroid);
}



mainGameState.spawnPlayerBullet = function() {
    
    if (this.fireTimer < 0) {
        
    this.fireTimer = 0.4;
  
    var bullet = this.game.add.sprite(this.player.x, this.player.y, "player-bullet");
    bullet.anchor.setTo(0.5, 0.5);

    this.game.physics.arcade.enable(bullet);
    bullet.body.velocity.setTo(0, -200);
    
    this.playerBullets.add(bullet);
    } 
    
    var index = this.game.rnd.integerInRange(0, sfxArray.length - 1);
    sfxArray[index].play();
    
}

mainGameState.onAsteroidBulletCollision = function(object1, object2){ 
    console.log ("Collision! Argh!");
    object1.pendingDestroy = true;
    object2.pendingDestroy = true;
    this.playerScore +=15;
}


//function for checking player - asteroid collision
mainGameState.onAsteroidPlayerCollision = function (object1, object2){
    if (object1.key.includes("asteroid") )  {
        object1.pendingDestroy = true;
    } else {
        object2.pendingDestroy = true;
        this.playerLives -=1;
    }
}