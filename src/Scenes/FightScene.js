import 'phaser';
import {gameState} from '../index';
import {Enemy,PlayerCharacter} from '../unit';

class FightScene extends Phaser.Scene {
    constructor(){
        super({key: 'FightScene'});
    }

    create(){
         this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        
         gameState.warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);        
         this.add.existing(gameState.warrior);
         
         gameState.mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
         this.add.existing(gameState.mage);            
         
         gameState.dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
         this.add.existing(gameState.dragonblue);
         
         gameState.dragonOrange = new Enemy(this, 50, 100, 'dragonorrange', null,'Dragon2', 50, 3);
         this.add.existing(gameState.dragonOrange);
         
         gameState.heroes = [ gameState.warrior, gameState.mage ];
         gameState.enemies = [ gameState.dragonblue, gameState.dragonOrange ];
         gameState.units = gameState.heroes.concat(gameState.enemies);
         
         this.scene.launch('UIScene');
    }
}

export default FightScene;