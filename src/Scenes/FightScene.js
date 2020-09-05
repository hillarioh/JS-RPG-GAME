import 'phaser';
import {gameState} from '../index';
import {Enemy,PlayerCharacter} from '../unit';

class FightScene extends Phaser.Scene {
    constructor(){
        super({key: 'FightScene'});
    }

    create(){
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        this.startBattle();
        this.sys.events.on('wake', this.startBattle, this);
    }

    startBattle(){

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
         
        gameState.index = -1;

        this.scene.launch('UIScene');
    }

    nextTurn() {
        if(this.checkEndBattle()) {           
            this.endBattle();
            return;
        }

        do {
            gameState.index++;
            // if there are no more units, we start again from the first one
            if(gameState.index >= gameState.units.length) {
                gameState.index = 0;
            }
        } while(gameState.units[gameState.index].living);
        
        // if its player hero
        if(gameState.units[gameState.index] instanceof PlayerCharacter) {                
            this.events.emit("PlayerSelect", gameState.index);
        } else { // else if its enemy unit
            // pick random hero
            var r = Math.floor(Math.random() * gameState.heroes.length);
            // call the enemy"s attack function 
            gameState.units[gameState.index].attack(gameState.heroes[r]);  
            // add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
    }

    checkEndBattle() {        
        var victory = true;
        // if all enemies are dead we have victory
        for(var i = 0; i < gameState.enemies.length; i++) {
            if(gameState.enemies[i].living)
                victory = false;
        }
        var gameOver = true;
        // if all heroes are dead we have game over
        for(var i = 0; i < gameState.heroes.length; i++) {
            if(gameState.heroes[i].living)
                gameOver = false;
        }
        return victory || gameOver;
    }

    endBattle() {       
        // clear state, remove sprites
        gameState.heroes.length = 0;
        gameState.enemies.length = 0;
        for(var i = 0; i < gameState.units.length; i++) {
            // link item
            gameState.units[i].destroy();            
        }
        gameState.units.length = 0;
        // sleep the UI
        this.scene.sleep('UIScene');
        // return to WorldScene and sleep current BattleScene
        this.scene.switch('WorldScene');
    }

  
    receivePlayerSelection(action, target) {
        if(action == 'attack') {            
            gameState.units[gameState.index].attack(gameState.enemies[target]);              
        }
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
      
    }

  
}

export default FightScene;