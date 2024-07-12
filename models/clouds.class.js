class Clouds extends MovableObject {
    y = 50;
    width = 500;
    height = 250;

    /**
     * This function is to init a new cloud. Load all images, set position x and start moving. 
     * 
     */
    constructor(){
        super();
        super.loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 2500;
        this.moveLeft();
    }
   
  }