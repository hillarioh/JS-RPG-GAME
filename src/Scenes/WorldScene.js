import 'phaser';

class WorldScene extends Phaser.Scene {
    constructor(){
        super({key: 'WorldScene'});
    }

    preload(){

    }

    create(){
        console.log('Here we are');
    }
}

export default WorldScene;