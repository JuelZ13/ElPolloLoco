class Statusbar extends DrawableObject{
    x = 40;
    y = 0;
    width = 70;
    height = 70;
    
    /**
     * This function is to init a new statusbar. Load image and set x.
     * 
     * @param {*} IMAGE - path to the image to load
     * @param {*} x - position x for canvas
     */ 
    constructor(IMAGE,x){
        super()        
        this.loadImage(IMAGE);
        this.x = x;
    }    
}