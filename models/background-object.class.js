class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    y= 0;

    /**
     * This function is to init an Background Object.
     * 
     * @param {*} imagePath - path to the img of the Background Object
     * @param {*} x - x coordinate for position the element in canvas
     */
    constructor(imagePath,x){
        super().loadImage(imagePath);
        this.x = x;
    }
}