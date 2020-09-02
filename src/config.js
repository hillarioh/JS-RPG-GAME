import BootScene from "./Scenes/BootScene";
import WorldScene from "./Scenes/WorldScene";

const config = {
    type: Phaser.AUTO,
    width:800,
    height:500,
    backgroundColor: "#ded34a",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            enableBody: true,
        }
    },
    scene: [BootScene,WorldScene]
};

export default config;