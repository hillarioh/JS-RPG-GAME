import 'phaser';

class CreditScene extends Phaser.Scene {
    constructor(){
        super({key: 'CreditScene'});
    }

    create(){

        this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
        this.madeByText = this.add.text(0, 0, 'Created By: Lecrae', { fontSize: '26px', fill: '#fff' });
        this.zone = this.add.zone(1000/2, 640/2, 1000, 640);
        
        Phaser.Display.Align.In.Center(
        this.creditsText,
        this.zone
        );
        
        Phaser.Display.Align.In.Center(
        this.madeByText,
        this.zone
        );
        
        this.madeByText.setY(1000);

        this.creditsTween = this.tweens.add({
        targets: this.creditsText,
        y: -100,
        ease: 'Power1',
        duration: 3000,
        delay: 1000,
        onComplete: function () {
            this.destroy;
        }
        });
        
        this.madeByTween = this.tweens.add({
        targets: this.madeByText,
        y: -300,
        ease: 'Power1',
        duration: 8000,
        delay: 1000,
        onComplete: function () {
            this.madeByTween.destroy;
            this.scene.start('TitleScene');
        }.bind(this)
        });
    }
}

export default CreditScene;