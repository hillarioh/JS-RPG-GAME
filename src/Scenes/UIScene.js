import 'phaser';
import {MenuItem,Menu,HeroesMenu,ActionsMenu,EnemiesMenu} from '../menu';
import {gameState} from '../index';
import Message from '../message';

class UIScene extends Phaser.Scene {
    constructor(){
        super({key: 'UIScene'});
    }

    create(){
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);        
        this.graphics.strokeRect(2, 150, 90, 100);
        this.graphics.fillRect(2, 150, 90, 100);
        this.graphics.strokeRect(95, 150, 90, 100);
        this.graphics.fillRect(95, 150, 90, 100);
        this.graphics.strokeRect(188, 150, 130, 100);
        this.graphics.fillRect(188, 150, 130, 100);

       
        this.menus = this.add.container();
                
        gameState.heroesMenu = new HeroesMenu(195, 153, this);           
        gameState.actionsMenu = new ActionsMenu(100, 153, this);            
        gameState.enemiesMenu = new EnemiesMenu(8, 153, this);   
         
        gameState.currentMenu = gameState.actionsMenu;
         
        this.menus.add(gameState.heroesMenu);
        this.menus.add(gameState.actionsMenu);
        this.menus.add(gameState.enemiesMenu);

        gameState.fightScene = this.scene.get('FightScene');

        gameState.fightCursors = this.input.keyboard.createCursorKeys();

      

        gameState.fightScene.events.on("PlayerSelect", this.onPlayerSelect, this);
        this.events.on("SelectAction", this.onSelectedAction, this);
        this.events.on("Enemy", this.onEnemy, this);
        this.sys.events.on('wake',this.createMenu,this);
       

        this.message = new Message(this, gameState.fightScene.events);
        this.add.existing(this.message);

        this.createMenu();
    }

    createMenu(){
        this.remapHeroes();
        this.remapEnemies();
        gameState.fightScene.nextTurn();
    }

    update(){
        
            if(gameState.currentMenu) {
                if(gameState.fightCursors.up.isDown) {
                    gameState.currentMenu.moveSelectionUp();
                } else if(gameState.fightCursors.down.isDown) {
                    gameState.currentMenu.moveSelectionDown();
                } else if(gameState.fightCursors.right.isDown || gameState.fightCursors.shift.isDown) {
     
                } else if(gameState.fightCursors.space.isDown || gameState.fightCursors.left.isDown) {
                    gameState.currentMenu.confirm();
                } 
            }
    }
    

    remapHeroes() {
        gameState.heroesMenu.remap(gameState.heroes);
    }

    remapEnemies() {
        gameState.enemiesMenu.remap(gameState.enemies);
    }

    onPlayerSelect(id) {
        gameState.heroesMenu.select(id);
        gameState.actionsMenu.select(0);
        gameState.currentMenu = gameState.actionsMenu;
    }

    onSelectedAction() {
        gameState.currentMenu = gameState.enemiesMenu;
        gameState.enemiesMenu.select(0);
    }
 
    onEnemy(index) {
        gameState.heroesMenu.deselect();
        gameState.actionsMenu.deselect();
        gameState.enemiesMenu.deselect();
        gameState.currentMenu = null;
        gameState.fightScene.receivePlayerSelection('attack', index);
    }
    
}

export default UIScene;