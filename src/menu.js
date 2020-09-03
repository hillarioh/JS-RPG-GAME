import 'phaser';

class MenuItem extends Phaser.GameObjects.Text {
    constructor(x,y,text,scene){
        super(scene,x,y,text,{color: '#ffffff',align: 'left', fontSize:15});
    }

    select(){
        this.setColor('#f8ff38');
    }

    deselect(){
        this.setColor('#ffffff');
    }

}

class Menu extends Phaser.GameObjects.Container {

    constructor(x, y, scene, heroes){
        super( scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.heroes = heroes;
        this.x = x;
        this.y = y;
    }

    addMenuItem(){
        let menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem); 
    }

    moveSelectionUp(){
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--;
        if(this.menuItemIndex < 0)
            this.menuItemIndex = this.menuItems.length - 1;
        this.menuItems[this.menuItemIndex].select();
    }

    moveSelectionDown() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex++;
        if(this.menuItemIndex >= this.menuItems.length)
            this.menuItemIndex = 0;
        this.menuItems[this.menuItemIndex].select();
    }

    select(index) {
        if(!index)
            index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    }

    deselect() {        
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
    }

    confirm() {
        // wen the player confirms his slection, do the action
    } 
}

class HeroesMenu extends Menu {
    constructor(x,y,scene){
        super(x,y,scene);
    }
}

class ActionsMenu extends Menu {
    constructor(x,y,scene){
        super(x,y,scene);
        this.addMenuItem('Attack');
    }

    confirm(){

    }
}

class EnemiesMenu extends Menu {
    constructor(x,y,scene){
        super(x,y,scene);
    }

    confirm(){

    }
}

export {MenuItem,Menu,HeroesMenu,ActionsMenu,EnemiesMenu};