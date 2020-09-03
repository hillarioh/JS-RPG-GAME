import 'phaser';
import {MenuItem,Menu,HeroesMenu,ActionsMenu,EnemiesMenu} from '../menu';
import {gameState} from '../index';

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
         
         // add menus to the container
        this.menus.add(gameState.heroesMenu);
        this.menus.add(gameState.actionsMenu);
        this.menus.add(gameState.enemiesMenu);
    }
}

export default UIScene;