var gameOverState = {}

gameOverState.preload = function (){
    this.game.load.image("gameoverbg", "assets/images/GameOver.png");
    this.game.load.image("startoverbutton", "assets/images/button_play1.png");
        
}

gameOverState.create = function () {
    this.game.add.sprite(0, 0, 'gameoverbg');
    
    //start over button
    var button = this.game.add.button(230, 250, 'startoverbutton', gameOverState.actionOnClick);
    button.scale.setTo(0.3);
    
}


gameOverState.update = function () {
    
       if (this.spaceKey.isDown) {
        this.game.state.start("MainGame");
    }
    
}

gameOverState.actionOnClick = function () {
    this.game.state.start("MainGame");
    
}