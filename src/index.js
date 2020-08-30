import 'phaser';
import Scene1 from './scene1';
import Scene2 from './scene2';
import Scene3 from './scene3';

const gameState = {
  score: 0
};

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  backgroundColor: "b9eaff",
  scene: [Scene1, Scene2, Scene3]
};

const game = new Phaser.Game(config);
