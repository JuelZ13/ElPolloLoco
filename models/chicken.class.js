class Chicken extends MovableObject{
    world = {'character': {'x': 0}}; 
    y = 355;
    width = 60;
    height = 60;
    offsetX = 2;
    offsetWidth = 5;
    offsetY = 5;
    offsetHeight = 10;        
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * This function is to init a new Chicken. Load all images, set position x on canvas, set speed, start the animation and move. 
     * 
     */
    constructor() {
        super();
        super.loadImage(this.IMAGES_WALKING[0]);
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.move();
    }

    /**
     * This function is to animate the chicken.
     * 
     */
    animate(){        
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