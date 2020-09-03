import 'phaser';

class BootScene extends Phaser.Scene {
    constructor(){
        super({key: 'BootScene'})
    }

    preload(){
     

    }

    create(){
        this.scene.stop('BootScene');
        this.scene.start('WorldScene');
    }
}

export default BootScene;