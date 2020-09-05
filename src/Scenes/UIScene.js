import 'phaser';
import {MenuItem,Menu,HeroesMenu,ActionsMenu,EnemiesMenu} from '../menu';
import {gameState} from '../index';
import Message from '../message';


class UIScene extends Phaser.Scene{

    constructor(){
        super({key: 'UIScene'});
    }
    
    create() {
      this.graphics = this.add.graphics();
      this.graphics.lineStyle(1, 0xffffff);
      this.graphics.fillStyle(0x031f4c, 1);
      this.graphics.strokeRect(3, 225, 135, 150);
      this.graphics.fillRect(3, 225, 135, 150);
      this.graphics.strokeRect(142, 225, 136, 150);
      this.graphics.fillRect(142, 225, 136, 150);
      this.graphics.strokeRect(282, 225, 195, 150);
      this.graphics.fillRect(282, 225, 195, 150);
      this.menus = this.add.container();
      this.heroesMenu = new HeroesMenu(290, 230, this);
      this.actionsMenu = new ActionsMenu(150, 230, this);
      this.enemiesMenu = new EnemiesMenu(8, 230, this);
      this.currentMenu = this.actionsMenu;
      this.menus.add(this.heroesMenu);
      this.menus.add(this.actionsMenu);
      this.menus.add(this.enemiesMenu);
      this.FightScene = this.scene.get('FightScene');
      this.input.keyboard.on('keydown', this.onKeyInput, this);
      this.FightScene.events.on("PlayerSelect", this.onPlayerSelect, this);
      this.events.on("SelectedAction", this.onSelectedAction, this);
      this.events.on("Enemy", this.onEnemy, this);
      this.sys.events.on('wake', this.createMenu, this);
      this.message = new Message(this, this.FightScene.events);
      this.add.existing(this.message);
      this.createMenu();
    }

    createMenu() {
      this.remapHeroes();
      this.remapEnemies();
      this.FightScene.nextTurn();
    }

    onEnemy(index) {
      this.heroesMenu.deselect();
      this.actionsMenu.deselect();
      this.enemiesMenu.deselect();
      this.currentMenu = null;
      this.FightScene.receivePlayerSelection('attack', index);
    }

    onSelectedAction() {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(0);
    }

    onPlayerSelect(id) {
      this.heroesMenu.select(id);
      this.actionsMenu.select(0);
      this.currentMenu = this.actionsMenu;
    }

    remapHeroes() {
      var heroes = this.FightScene.heroes;
      this.heroesMenu.remap(heroes);
    }

    remapEnemies() {
      var enemies = this.FightScene.enemies;
      this.enemiesMenu.remap(enemies);
    }

    onKeyInput(event) {
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
  }

export default UIScene;