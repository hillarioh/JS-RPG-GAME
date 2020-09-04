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

        gameState.index = -1;
    }

    nextTurn() {
        gameState.index++;
        if(gameState.index >= gameState.units.length) {
            gameState.index = 0;
        }
        if(gameState.units[gameState.index]) {
            if(gameState.units[gameState.index] instanceof PlayerCharacter) {                
                this.events.emit('PlayerSelect', gameState.index);
            } else { 
                var r = Math.floor(Math.random() * gameState.heroes.length);
                gameState.units[gameState.index].attack(gameState.heroes[r]);  
                this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
            }
        }
    }
}

export default FightScene;