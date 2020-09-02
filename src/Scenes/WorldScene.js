import 'phaser';
import {gameState} from '../index';

class WorldScene extends Phaser.Scene {
    constructor(){
        super({key: 'WorldScene'});
    }

    preload(){
        this.load.image('tiles', 'assets/map/tmw_desert_spacing.png');
        
        this.load.tilemapTiledJSON('map', 'assets/map/desert.json');
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

    }

    create(){
        // var tiles = map.addTilesetImage('Desert', 'tiles');
        // var layer = map.createDynamicLayer('Ground', tiles, 0, 0);

        gameState.map = this.make.tilemap({key: 'map'});
        gameState.tiles = gameState.map.addTilesetImage('Desert', 'tiles');
        gameState.layer = gameState.map.createStaticLayer('Ground', gameState.tiles, 0, 0);
        gameState.layer.setCollisionByExclusion([-1]);

        // gameState.tiles = gameState.map.addTilesetImage('Desert', 'tiles'); 
           // var grass = gameState.map.createStaticLayer('Grass', gameState.tiles, 0, 0);
        // var obstacles = gameState.map.createStaticLayer('Obstacles', gameState.tiles, 0, 0);
        // obstacles.setCollisionByExclusion([-1]);

        this.add.text(100,100,"GAME TIME");
        gameState.player = this.physics.add.sprite(50, 100, 'player', 0).setScale(2);
        this.physics.world.bounds.width = gameState.map.widthInPixels;
        this.physics.world.bounds.height = gameState.map.heightInPixels;
        gameState.player.setCollideWorldBounds(true);

        gameState.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, gameState.map.widthInPixels, gameState.map.heightInPixels);
        this.cameras.main.startFollow(gameState.player);
        this.cameras.main.roundPixels = true;


        this.createAnimations();

     
    }

    createAnimations(){
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });
        
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(){
       gameState.player.body.setVelocity(0);
 
        // Horizontal movement
        if (gameState.cursors.left.isDown)
        {
            gameState.player.body.setVelocityX(-80);
            gameState.player.anims.play('left',true);
        }
        else if (gameState.cursors.right.isDown)
        {
            gameState.player.body.setVelocityX(80);
            gameState.player.anims.play('right',true);
        } else if (gameState.cursors.up.isDown)
        {
            gameState.player.body.setVelocityY(-80);
            gameState.player.anims.play('up',true);
        }
        else if (gameState.cursors.down.isDown)
        {
            gameState.player.body.setVelocityY(80);
            gameState.player.anims.play('down',true);
        }  else {
            gameState.player.anims.stop();
        }
    }
}

export default WorldScene;