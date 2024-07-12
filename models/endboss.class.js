class Endboss extends MovableObject{
    world;
    x = 2200;
    y = 50;
    width = 300;
    height = 400;
    offsetX = 25;
    offsetWidth = this.offsetX * 2 + 15;
    offsetY = 75;
    offsetHeight = 100;
    speed = 1;
    walk = false;
    attack = false;
    dead = false;
    
    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    chicken_sound = new Audio('../audio/chicken.mp3');

    status = this.IMAGES_ALERT;


    /**
     * This function is to init a new endboss. Load all images and start the animation. 
     * 
     */
    constructor(){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    /**
     * This function is to set the interval for the animate of the endboss in his different states.
     * 
     */
    animate(){
        let interval = setInterval(()=>{
            this.checkAnimate();
        },200)
        intervalIds.push(interval);
    }

    /**
     * This function is to check with animation the endboss have.
     * 
     */
    checkAnimate(){
        this.chicken_sound.pause();
        if(this.isHurt()){
            this.animateHurt();
        }else if(this.isDead()){
            this.animateDead();
        }else{        
            this.playAnimation(this.status);
        }
    }

    /**
     * This function is to show the hurt animation.
     * 
     */
    animateHurt(){
        this.playAnimation(this.IMAGES_HURT);
        if(sound){
            this.chicken_sound.play();
        }
    }

     /**
     * This function is to show the dead animation.
     * 
     */
    animateDead(){
        if(this.howLongDead()){
            this.playAnimation(this.IMAGES_DEAD);
        }else{
            this.img = new Image();
            if(!this.dead){
                this.dead = true;
                this.spawnSmallChicken();
                world.setWorld();
            }                    
        }
    }


    /**
     * This function is to check how long the endboss is dead.
     * 
     * @returns true or false if the enboss is dead for no more than 1.5 seconds or not.
     */
    howLongDead(){
        return new Date().getTime() - this.lastHit < 1500
    }


    /**
     * This function is to spawn 6 small chicken on the position of the enboss.
     * 
     */
    spawnSmallChicken(){
        for(let i = 0; i < 6; i++){
            this.world.level.enemies.push(new Smallchicken(this.x));
        }
    }


    /**
     * This function is to start the animation for walking and start move.
     * 
     */
    setWalk(){
        if (this.status != this.IMAGES_WALKING){
            this.status = this.IMAGES_WALKING;
            if(!this.walk){
                this.move(); 
                this.playSound();
                this.walk = true;
            }
        }
    }

    /**
     * This function is to play the sound for the chicken if sound is true.
     * 
     */
    playSound(){
        let chicken_sound = new Audio('../audio/chicken.mp3');
        if(sound){
            chicken_sound.play();
        }
        setTimeout( () => {
            chicken_sound.pause();
        }, 1500) 
    }

    /**
     * This function is to set the endboss to attack status.
     * 
     */
    setAttack(){
        if(!this.attack){
            this.attack = true;
            this.status = this.IMAGES_ATTACK;
            this.speed = 2;
            let self = this;
            this.resetAttack();
        }
    }

    /**
     * This function is to reset the attack status for the endboss after 2 sec.
     * 
     */
    resetAttack(){
        setTimeout( () => {
            this.attack = false;
            self.speed = 1;
            this.setWalk();
        }
        ,2000);
    }
}