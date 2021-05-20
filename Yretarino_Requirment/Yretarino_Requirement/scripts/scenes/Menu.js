export default class Menu extends Phaser.Scene{
    constructor(){
        super('Menu');
    }

    preload(){
        this.load.image("startbtn", "./assets/images/start.png");
        this.load.image("menutitle", "./assets/images/menu.png")
        this.load.image("br", "./assets/images/br.png")
    }

    create(){
        this.add.image(280,280,"menutitle");
        this.add.image(280,290,"br");
        let startbtn = this.add.sprite(280,500, "startbtn");
        startbtn.setInteractive();
        startbtn.on('pointerdown', () => this.startBtn());    
    }
    startBtn(pointer,start) {
        this.scene.start("Game");
    }
}
