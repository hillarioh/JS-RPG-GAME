import 'phaser';
import BootScene from './Scenes/BootScene';
import WorldScene from './Scenes/WorldScene';
import FightScene from './Scenes/FightScene';
import UIScene from './Scenes/UIScene';

const gameState = {};

const config = {
  type: Phaser.AUTO,
  // width:500,
  // height:400,
  width: 1000,
    height: 640,
    // zoom: 1,
  backgroundColor: "#ded34a",
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: {y: 0},
          enableBody: true,
      }
  },
  scene: [BootScene,WorldScene,FightScene,UIScene,]
};

const game = new Phaser.Game(config);

export {gameState};

