class Smallchicken extends MovableObject{
    world = {'character': {'x': 0}}; 
    y = 355;
    width = 60;
    height = 60;
    offsetX = 2;
    offsetWidth = 5;
    offsetY = 5;
    offsetHeight = 10;        
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

     /**
     * This function is to init a new small chicken. Load all images, set position x, set speed, set speedY, start the animation and apply grafity. 
     * 
     * @param {int} x - position on x
     */     
    constructor(x) {
        super();
        super.loadImage(this.IMAGES_WALKING[0]);
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0.15 + Math.random() * 10;
        this.speedY = 12 + Math.random() * 20;
        this.animate();
        this.applyGrafity();
        setTimeout(() => {
            this.speed = 0.15 + Math.random() * 0.25;
        },1200);
    }

    /**
     * This function is to animate the small chicken.
     * 
     */
    animate(){
        this.move();
        let interval = setInterval( () => {        
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);    
            }else{
                this.playAnimation(this.IMAGES_WALKING);
            }            
        }, 200)
        intervalIds.push(interval);
    }
}