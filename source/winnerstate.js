var winnerGameState = {}

winnerGameState.preload = function (){
    
}


winnerGameState.create = function () {
    var textStyle1 = {font: "50px Arial", fill: "#43F723", align: "center"};
    var textStyle2 = {font: "30px Arial", fill: "#ffffff", align: "center"};

	WinnerTitle = this.game.add.text(this.game.width * 0.3, 40, "YOU WON!", textStyle1);

    WinnerText = this.game.add.text(this.game.width *0.15,130, "Want to play again? Click the 'Q' key", textStyle2);

    this.startOverKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
}


winnerGameState.update = function () {
    
    if (this.startOverKey.isDown){
        this.game.state.start("MainGame");
    }
    
}