const player1=1;
const player2=2;
const zero=0;

export default class Game extends Phaser.Scene{
    constructor(){
        super('Game');
    }


    preload(){
        this.load.image("tiles", "./assets/images/tile.png");
        this.load.spritesheet("player", "./assets/images/br.png", {frameWidth: 200, frameHeight: 173});
        this.load.audio('music', './assets/audio/backgroundMusic.mp3');
    }

    create(){ 

        //Game music
        this.backgroundMusic= this.sound.add('music');
        this.backgroundMusic.play('volume', {volume: 0.4});
        this.backgroundMusic.play();

        this.gameOver=false;
        this.turn=player1;
        
        this.bArray = [];

        let blankSize = 150;
        let halfSize = 150/2;

        let nKey= 0;
        
        for(let row=0; row < 3; row++){
            let y=halfSize +  (blankSize * row) + (row*10);
        for(let column=0; column<3; column++){
            let x=halfSize + (blankSize*column) + (column*10);
            
            let emptyTiles = this.add.image(x+60, y+100, "tiles");

            emptyTiles.mKey = nKey++;

            emptyTiles.setInteractive();
            emptyTiles.on('pointerdown',this.clickfunction);

            this.bArray.push({
                occupiedBy: zero,
                playersprite: null
                })
            }
        }
    this.identifyTurn();

    }
    clickfunction(event){
        let offset= this.mKey;
        let scene= this.scene;

    
        if(this.gameOver){
            return true;
        }

        let occupiedBy = scene.bArray[offset].occupiedBy;
        let playersprite;
        if(occupiedBy == zero){
            if(scene.turn == player1 ){
                playersprite = scene.add.sprite(this.x, this.y, 'player', 1);
                occupiedBy = player1;
            }else{
                playersprite = scene.add.sprite(this.x, this.y, 'player', 0);
                occupiedBy = player2;
                }

        scene.bArray[offset].occupiedBy = occupiedBy;
        scene.bArray[offset].playersprite = playersprite;
        scene.winner(scene.turn);
        
        if(scene.turn == player1){
            scene.turn = player2;
        }else{
            scene.turn = player1;
        }
    }
    scene.identifyTurn();

    }

    identifyTurn(){
        let x = this.game.config.width/2;
        let y = 50  

        let iT;
        if (this.turn == player1){
            iT = "RED";
        }else{
            iT = "BLUE";
        }

        let playerText = this.add.text(x,y,iT, {fontSize:'64px Times New Roman', fill: "0x000000"});
        playerText.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: playerText,
            alpha:  0,
            ease: 'Power1',
            duration:3000,
        })
    }

    winner(id){
        let winCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ];

        for (let line = 0; line < winCombos.length; line++){
            let winLine = winCombos[line];

            if((this.bArray[winLine[0]].occupiedBy == id)&&  
            (this.bArray[winLine[1]].occupiedBy == id)&&
            (this.bArray[winLine[2]].occupiedBy == id)
            ){
                this.victorText(id, winLine);
                return true;
            }
        }
        //Stalemate Function
        let moves = false;
        for(let n = 0; n < this.bArray.length; n++){
            if (this.bArray[n].occupiedBy == zero) {
                moves = true;
            }
        }

        if(!moves){
            this.victorText(zero);
        }
        return false;
    }

    victorText(id, winLine){
        this.gameOver = true;
        this.tweens.killAll();

        let x = this.game.config.width / 2;
        let y = 50;

        let iT;

        if(id == player1){
            iT = "RED WINS";
        }else if(id == player2){
            iT = "BLUE WINS";
        }else{
            iT= "STALEMATE";
        }

        let playerText = this.add.text(x,y,iT, {fontSize: "70px Times New Roman", fill: "#FFFFFF", backgroundColor:  "0x000000"});
        playerText.setOrigin(0.5,0.5);
        playerText = this.add.text(180,580, "PLAY AGAIN", {fontSize: "40px Times New Roman", fill: "0x000000" });

        playerText.setInteractive();
        playerText.on('pointerdown', function(){
            this.scene.start('Game');
        }, this); 

        if (id !=zero){
            for(let n = 0; n < winLine.length; n++) {
                let sprite = this.bArray[winLine[n]].playersprite;
            }
        }


    }


}
