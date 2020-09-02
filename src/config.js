const config = {
    type: Phaser.AUTO,
    width:800,
    height:600,
    backgroundColor: "#ded34a",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            enableBody: true,
        }
    }
};

export default config;