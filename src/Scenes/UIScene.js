import 'phaser';
import {MenuItem,Menu,HeroesMenu,ActionsMenu,EnemiesMenu} from '../menu';
import {gameState} from '../index';
import Message from '../message';

// class UIScene extends Phaser.Scene {
//     constructor(){
//         super({key: 'UIScene'});
//     }

//     create(){
//         this.graphics = this.add.graphics();
//         this.graphics.lineStyle(1, 0xffffff);
//         this.graphics.fillStyle(0x031f4c, 1);        
//         this.graphics.strokeRect(2, 150, 90, 100);
//         this.graphics.fillRect(2, 150, 90, 100);
//         this.graphics.strokeRect(95, 150, 90, 100);
//         this.graphics.fillRect(95, 150, 90, 100);
//         this.graphics.strokeRect(188, 150, 130, 100);
//         this.graphics.fillRect(188, 150, 130, 100);

       
//         this.menus = this.add.container();
                
//         gameState.heroesMenu = new HeroesMenu(195, 153, this);           
//         gameState.actionsMenu = new ActionsMenu(100, 153, this);            
//         gameState.enemiesMenu = new EnemiesMenu(8, 153, this);   
         
//         gameState.currentMenu = gameState.actionsMenu;
         
//         this.menus.add(gameState.heroesMenu);
//         this.menus.add(gameState.actionsMenu);
//         this.menus.add(gameState.enemiesMenu);

//         gameState.fightScene = this.scene.get('FightScene');

//         gameState.fightCursors = this.input.keyboard.createCursorKeys();

      

//         gameState.fightScene.events.on("PlayerSelect", this.onPlayerSelect, this);
//         this.events.on("SelectAction", this.onSelectedAction, this);
//         this.events.on("Enemy", this.onEnemy, this);
//         this.sys.events.on('wake',this.createMenu,this);
       

//         this.message = new Message(this, gameState.fightScene.events);
//         this.add.existing(this.message);

//         this.createMenu();
//     }

//     createMenu(){
//         this.remapHeroes();
//         this.remapEnemies();
//         gameState.fightScene.nextTurn();
//     }

//     update(){
        
//             if(gameState.currentMenu) {
//                 if(gameState.fightCursors.up.isDown) {
//                     gameState.currentMenu.moveSelectionUp();
//                 } else if(gameState.fightCursors.down.isDown) {
//                     gameState.currentMenu.moveSelectionDown();
//                 } else if(gameState.fightCursors.right.isDown || gameState.fightCursors.shift.isDown) {
     
//                 } else if(gameState.fightCursors.space.isDown || gameState.fightCursors.left.isDown) {
//                     gameState.currentMenu.confirm();
//                 } 
//             }
//     }
    

//     remapHeroes() {
//         // gameState.heroesMenu.remap(gameState.heroes);
//     }

//     remapEnemies() {
//         // gameState.enemiesMenu.remap(gameState.enemies);
//     }

//     onPlayerSelect(id) {
//         gameState.heroesMenu.select(id);
//         gameState.actionsMenu.select(0);
//         gameState.currentMenu = gameState.actionsMenu;
//     }

//     onSelectedAction() {
//         gameState.currentMenu = gameState.enemiesMenu;
//         gameState.enemiesMenu.select(0);
//     }
 
//     onEnemy(index) {
//         gameState.heroesMenu.deselect();
//         gameState.actionsMenu.deselect();
//         gameState.enemiesMenu.deselect();
//         gameState.currentMenu = null;
//         gameState.fightScene.receivePlayerSelection('attack', index);
//     }

// }


var UIScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function UIScene()
    {
      Phaser.Scene.call(this, {key: 'UIScene'});
    },
    create: function() {
      this.graphics = this.add.graphics();
      this.graphics.lineStyle(1, 0xffffff);
      this.graphics.fillStyle(0x031f4c, 1);
      this.graphics.strokeRect(3, 225, 135, 150);
      this.graphics.fillRect(3, 225, 135, 150);
      this.graphics.strokeRect(142, 225, 136, 150);
      this.graphics.fillRect(142, 225, 136, 150);
      this.graphics.strokeRect(282, 225, 195, 150);
      this.graphics.fillRect(282, 225, 195, 150);
      // basic container to hold all menus
      this.menus = this.add.container();
      this.heroesMenu = new HeroesMenu(290, 230, this);
      this.actionsMenu = new ActionsMenu(150, 230, this);
      this.enemiesMenu = new EnemiesMenu(8, 230, this);
      // the currently selected menu
      this.currentMenu = this.actionsMenu;
      // add menus to the container
      this.menus.add(this.heroesMenu);
      this.menus.add(this.actionsMenu);
      this.menus.add(this.enemiesMenu);
      this.battleScene = this.scene.get('BattleScene');
      this.input.keyboard.on('keydown', this.onKeyInput, this);
      this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);
      this.events.on("SelectedAction", this.onSelectedAction, this);
      this.events.on("Enemy", this.onEnemy, this);
      this.sys.events.on('wake', this.createMenu, this);
      this.message = new Message(this, this.battleScene.events);
      this.add.existing(this.message);
      this.createMenu();
    },
    createMenu: function() {
      this.remapHeroes();
      this.remapEnemies();
      this.battleScene.nextTurn();
    },
    onEnemy: function(index) {
      this.heroesMenu.deselect();
      this.actionsMenu.deselect();
      this.enemiesMenu.deselect();
      this.currentMenu = null;
      this.battleScene.receivePlayerSelection('attack', index);
    },
    onSelectedAction: function() {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(0);
    },
    onPlayerSelect: function(id) {
      this.heroesMenu.select(id);
      this.actionsMenu.select(0);
      this.currentMenu = this.actionsMenu;
    },
    remapHeroes: function() {
      var heroes = this.battleScene.heroes;
      this.heroesMenu.remap(heroes);
    },
    remapEnemies: function() {
      var enemies = this.battleScene.enemies;
      this.enemiesMenu.remap(enemies);
    },
    onKeyInput: function(event) {
      if(this.currentMenu && this.currentMenu.selected) {
        if(event.code === "ArrowUp") {
          this.currentMenu.moveSelectionUp();
        } else if(event.code === "ArrowDown") {
          this.currentMenu.moveSelectionDown();
        } else if(event.code === "ArrowRight" || event.code === "Shift") {
        } else if(event.code === "Space" || event.code === "ArrowLeft") {
          this.currentMenu.confirm();
        }
      }
    }
  });

export default UIScene;