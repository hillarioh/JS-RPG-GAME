import 'phaser';

class TitleScene extends Phaser.Scene {
    constructor(){
        super({key: 'TitleScene'});
    }

    create(){

        // play
        this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
        this.centerButton(this.gameButton, 1);
        
        this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);

        // options
        this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
        this.centerButton(this.optionsButton);
        
        this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.optionsText, this.optionsButton);

        // credits
        this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
        this.centerButton(this.creditsButton, -1);
        
        this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.creditsText, this.creditsButton);
        

        // play listeners
        this.gameButton.on('pointerup', function (pointer) {
        this.scene.start('WorldScene');
        }.bind(this));
        
        this.input.on('pointerdown', function (event, gameObjects) {
        gameObjects[0].setTexture('blueButton2');
        });
        
        this.input.on('pointerout', function (event, gameObjects) {
        gameObjects[0].setTexture('blueButton1');
        });

        // options listeners
        this.optionsButton.on('pointerup', function (pointer) {
            this.scene.start('OptionsScene');
          }.bind(this));

        //credit listeners
        this.creditsButton.on('pointerup', function (pointer) {
            this.scene.start('CreditScene');
          }.bind(this));

    }

    centerButton (gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
            gameObject,
            this.add.zone(1000/2, 640/2 - offset * 100, 1000, 640)
        );
    }
    
    centerButtonText (gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }
}

export default TitleScene;