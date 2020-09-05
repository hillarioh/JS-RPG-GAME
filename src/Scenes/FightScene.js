import 'phaser';
import {gameState} from '../index';
import {Enemy,PlayerCharacter} from '../unit';

// class FightScene extends Phaser.Scene {
//     constructor(){
//         super({key: 'FightScene'});
//     }

//     create(){
//         this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
//         this.startBattle();
//         this.sys.events.on('wake', this.startBattle, this);
//     }

//     startBattle(){

//         gameState.warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);        
//          this.add.existing(gameState.warrior);
         
//          gameState.mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
//          this.add.existing(gameState.mage);            
         
//          gameState.dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
//          this.add.existing(gameState.dragonblue);
         
//          gameState.dragonOrange = new Enemy(this, 50, 100, 'dragonorrange', null,'Dragon2', 50, 3);
//          this.add.existing(gameState.dragonOrange);
         
//          gameState.heroes = [ gameState.warrior, gameState.mage ];
//          gameState.enemies = [ gameState.dragonblue, gameState.dragonOrange ];
//          gameState.units = gameState.heroes.concat(gameState.enemies);
         
//         gameState.index = -1;

//         this.scene.launch('UIScene');
//     }

//     nextTurn() {
//         if(this.checkEndBattle()) {           
//             this.endBattle();
//             return;
//         }

//         do {
//             gameState.index++;
//             // if there are no more units, we start again from the first one
//             if(gameState.index >= gameState.units.length) {
//                 gameState.index = 0;
//             }
//         } while(gameState.units[gameState.index].living);
        
//         // if its player hero
//         if(gameState.units[gameState.index] instanceof PlayerCharacter) {                
//             this.events.emit("PlayerSelect", gameState.index);
//         } else { // else if its enemy unit
//             // pick random hero
//             var r;
//             do {
//               r = Math.floor(Math.random() * gameState.heroes.length);
//             } while(!gameState.heroes[r].living);
           
//             // call the enemy"s attack function 
//             gameState.units[gameState.index].attack(gameState.heroes[r]);  
//             // add timer for the next turn, so will have smooth gameplay
//             this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
//         }
//     }

//     receivePlayerSelection(action, target) {
//         if(action == 'attack') {            
//             gameState.units[gameState.index].attack(gameState.enemies[target]);              
//         }
//         this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
      
//     }

//     checkEndBattle() {        
//         var victory = true;
//         // if all enemies are dead we have victory
//         for(var i = 0; i < gameState.enemies.length; i++) {
//             if(gameState.enemies[i].living)
//                 victory = false;
//         }
//         var gameOver = true;
//         // if all heroes are dead we have game over
//         for(var i = 0; i < gameState.heroes.length; i++) {
//             if(gameState.heroes[i].living)
//                 gameOver = false;
//         }
//         return victory || gameOver;
//     }

//     endBattle() {       
//         // clear state, remove sprites
//         gameState.heroes.length = 0;
//         gameState.enemies.length = 0;
//         for(var i = 0; i < gameState.units.length; i++) {
//             // link item
//             gameState.units[i].destroy();            
//         }
//         gameState.units.length = 0;
//         // sleep the UI
//         this.scene.sleep('UIScene');
//         // return to WorldScene and sleep current BattleScene
//         this.scene.switch('WorldScene');
//     }

  
   

  
// }

var BattleScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function BattleScene()
    {
      Phaser.Scene.call(this, {key: 'BattleScene'});
    },
    create: function() {
      this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
      this.startBattle();
      this.sys.events.on('wake', this.startBattle, this);
    },
    startBattle: function() {
      // player character - warrior
      var warrior = new PlayerCharacter(this, 400, 50, 'player', 1, 'Warrior', 100, 20);
      this.add.existing(warrior);
      // player character - mage
      var mage = new PlayerCharacter(this, 400, 100, 'player', 4, 'Mage', 80, 8);
      this.add.existing(mage);
      var dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
      this.add.existing(dragonblue);
      var dragonOrange = new Enemy(this, 50, 100, 'dragonorange', null,'Charizard', 50, 3);
      this.add.existing(dragonOrange);
      this.heroes = [warrior, mage];
      this.enemies = [dragonblue, dragonOrange];
      this.units = this.heroes.concat(this.enemies);
      // launch
      this.index = -1;
      this.scene.launch('UIScene');
    },
    nextTurn: function() {
      if(this.checkEndBattle()) {
        this.endBattle();
        return;
      }
      do {
        this.index++;
        // if there are no more units, we start again from the first one
        if(this.index >= this.units.length) {
          this.index = 0;
        }
      } while (!this.units[this.index].living);
      // if its player hero
      if(this.units[this.index] instanceof PlayerCharacter) {
        // we need the player to select action and then enemy
        this.events.emit("PlayerSelect", this.index);
      } else { // else if its enemy unit
        // pick random living hero to be attacked
        var r;
        do {
          r = Math.floor(Math.random() * this.heroes.length);
        } while(!this.heroes[r].living)
        // call the enemy's attack function
        this.units[this.index].attack(this.heroes[r]);
        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    },
    receivePlayerSelection: function(action, target) {
      if(action == 'attack') {
        this.units[this.index].attack(this.enemies[target]);
      }
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    },
    checkEndBattle: function() {
      var victory = true;
      // if all enemies are dead we have victory
      for(var i = 0; i < this.enemies.length; i++) {
        if(this.enemies[i].living)
          victory = false;
      }
      var gameOver = true;
      // if all heroes are dead we have game over
      for(var i = 0; i < this.heroes.length; i++) {
        if(this.heroes[i].living)
          gameOver = false;
      }
      return victory || gameOver;
    },
    endBattle: function() {
      // clear state, remove sprites
      this.heroes.length = 0;
      this.enemies.length = 0;
      for(var i = 0; i < this.units.length; i++) {
        // link item
        this.units[i].destroy();
      }
      this.units.length = 0;
      // sleep the UI
      this.scene.sleep('UIScene');
      // return to WorldScene and sleep current BattleScene
      this.scene.switch('WorldScene');
     }
  });

export default BattleScene;