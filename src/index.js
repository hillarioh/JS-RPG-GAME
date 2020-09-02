import 'phaser';
import BootScene from './Scenes/BootScene';
import WorldScene from './Scenes/WorldScene';

const gameState = {};

const config = {
  type: Phaser.AUTO,
  width:800,
  height:600,
  backgroundColor: "#ded34a",
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: {y: 0},
          enableBody: true,
      }
  },
  scene: [BootScene,WorldScene]
};

const game = new Phaser.Game(config);

export {gameState};

