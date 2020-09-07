import 'phaser';

class BootScene extends Phaser.Scene {
    constructor(){
        super({key: 'BootScene'})
    }

    preload(){
        this.load.image('dragonblue', 'assets/dragonblue.png');
        this.load.image('dragonorrange', 'assets/orange.png');
        this.load.image('blueButton1', 'assets/ui/blue_button02.png');
        this.load.image('blueButton2', 'assets/ui/blue_button03.png');
        this.load.image('box', 'assets/ui/grey_box.png');
        this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
        this.load.audio('bgMusic', ['assets/TownTheme.mp3']);
    }

    create(){
        this.scene.stop('BootScene');
        this.scene.start('TitleScene');
    }
}

export default BootScene;