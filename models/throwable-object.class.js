class ThrowableObject extends MovableObject{
    splash = false;
    speedY = 12;

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * This function is to init a new throwable object. Load Images, set x, set y, set height, set width, throws, animate and apply grafity.
     * 
     * @param {*} x - position x for canvas
     * @param {*} y - position y for canvas
     * @param {*} direction - direction to throw
     */
    constructor(x, y, direction){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.throw(direction);
        this.animate();
        this.applyGrafity();
    }

    /**
     * This function is to animate the throwable object.
     * 
     */
    animate(){        
        let interval = setInterval(()=>{
            if(this.splash){
                this.playAnimation(this.IMAGES_SPLASH);
            }else{
                this.playAnimation(this.IMAGES_THROW);
            }
        },50)
        intervalIds.push(interval);
    }

    /**
     * This function is to throw the throwable object.
     * 
     * @param {*} direction - direction to throw
     */
    throw(direction){                
        if(direction){           
            let interval = setInterval(()=> {
                this.x -=25;
            },50)
            intervalIds.push(interval);
        }else{
            this.x += 50;
            let interval = setInterval(()=> {
                this.x +=25;
            },50)
            intervalIds.push(interval);
        }
    }    
}