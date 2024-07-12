class PickableObject extends DrawableObject {
    offsetX = 35;
    offsetWidth = 70;
    offsetY = 35;
    offsetHeight = 70;
    
    /**
     * This function is to init a new pickable object. Load all image, set position x and y, set width and height, set offsets for frame an collision. 
     * 
     */
    constructor(imagePath,y,width,height,offsetX,offsetY,offsetWidth,offsetHeight){
        super().loadImage(imagePath);
        this.x = 200 + Math.random() * 1500;
        this.y = y; //120 + Math.random() * 220;
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetWidth = offsetWidth;
        this.offsetY = offsetY;
        this.offsetHeight = offsetHeight;
    }
}