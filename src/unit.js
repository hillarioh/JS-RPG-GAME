import 'phaser';

class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame,type,hp,damage){
        super(scene,x,y,texture,frame);
        this.type = type;
        this.maxHp = this.hp = hp;
        this.damage = damage; 
    }

    attack(target){
        target.takeDamage(this.damage);
    }

    takeDamage(damage){
        this.hp -=damage;
    }
}

class Enemy extends Unit {
    constructor(scene,x,y,texture,frame,type,hp,damage){
        super(scene,x,y,texture,frame,type,hp,damage);
    }
}

class PlayerCharacter extends Unit {
    constructor(scene,x,y,texture,frame,type,hp,damage){
        super(scene,x,y,texture,frame,type,hp,damage);
        this.flipX = true;
        this.setScale(2);
    }
}

export {Unit,Enemy,PlayerCharacter}