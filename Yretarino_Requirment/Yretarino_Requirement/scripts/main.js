import Game from './scenes/Game.js';
import Menu from './scenes/Menu.js';

let game = new Game();
let menu = new Menu();

var config = {
    type: Phaser.AUTO,
    parent: "tic tac toe",
    width: 620,
    height: 620,
    backgroundColor: 0xffffff,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
};

let gameconfig = new Phaser.Game(config);

gameconfig.scene.add('Game', game);
gameconfig.scene.add('Menu', menu);

gameconfig.scene.start('Menu');