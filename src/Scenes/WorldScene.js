import 'phaser';
import {gameState} from '../index';

class WorldScene extends Phaser.Scene {
    constructor(){
        super({key: 'WorldScene'});
    }

    preload(){
        this.load.image('tile1', 'assets/map/tmw_desert_spacing.png');
        this.load.image('tile2', 'assets/map/slopes32mud.png');
        this.load.image('tile3', 'assets/map/walls_1x2.png');
        this.load.tilemapTiledJSON('map', 'assets/map/desert.json');
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

    }

    create(){

        gameState.map = this.make.tilemap({key: 'map'});
        gameState.tile1 = gameState.map.addTilesetImage('Desert', 'tile1');
        gameState.tile2 = gameState.map.addTilesetImage('mijguy', 'tile2');
        gameState.tile3 = gameState.map.addTilesetImage('walls', 'tile3');
        gameState.desert = gameState.map.createStaticLayer('Ground', gameState.tile1, 0, 0);
        gameState.obstacles = gameState.map.createDynamicLayer('mkuhhv', [gameState.tile1,gameState.tile2,gameState.tile3], 0, 0);
        gameState.rest = gameState.map.createStaticLayer('rest', gameState.tile1, 0, 0);
        gameState.obstacles.setCollisionByExclusion([-1]);

               
        gameState.player = this.physics.add.sprite(50, 100, 'player', 0).setScale(2);
        this.physics.world.bounds.width = gameState.map.widthInPixels;
        this.physics.world.bounds.height = gameState.map.heightInPixels;
        gameState.player.setCollideWorldBounds(true);
        this.physics.add.collider(gameState.player, gameState.obstacles);

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
            gameState.player.body.setVelocityX(-180);
            gameState.player.anims.play('left',true);
        }
        else if (gameState.cursors.right.isDown)
        {
            gameState.player.body.setVelocityX(180);
            gameState.player.anims.play('right',true);
        } else if (gameState.cursors.up.isDown)
        {
            gameState.player.body.setVelocityY(-180);
            gameState.player.anims.play('up',true);
        }
        else if (gameState.cursors.down.isDown)
        {
            gameState.player.body.setVelocityY(180);
            gameState.player.anims.play('down',true);
        }  else {
            gameState.player.anims.stop();
        }
    }
}

export default WorldScene;