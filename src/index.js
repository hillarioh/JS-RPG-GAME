import 'phaser';
import BootScene from './Scenes/BootScene';
import WorldScene from './Scenes/WorldScene';

const gameState = {};

const config = {
  type: Phaser.AUTO,
  // width:500,
  // height:400,
  width: 1024,
  height: 768,
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
  },
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

