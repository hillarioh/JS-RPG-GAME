import 'phaser';

class FightScene extends Phaser.Scene {
    constructor(){
        super({key: 'FightScene'});
    }

    preload(){
        this.load.image('dragonblue', 'assets/dragonblue.png');
        this.load.image('dragonorrange', 'assets/dragonorrange.png');
    }

    create(){
        this.scene.launch('UIScene');
    }
}

export default FightScene;