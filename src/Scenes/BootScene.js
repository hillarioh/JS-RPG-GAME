import 'phaser';

class BootScene extends Phaser.Scene {
    constructor(){
        super({key: 'BootScene'})
    }

    preload(){
        this.load.image('dragonblue', 'assets/dragonblue.png');
        this.load.image('dragonorrange', 'assets/orange.png');

    }

    create(){
        this.scene.stop('BootScene');
        this.scene.start('WorldScene');
    }
}

export default BootScene;