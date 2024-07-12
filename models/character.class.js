class Character extends MovableObject{
    world;
    x = 200;
    y = 20;
    offsetX = 20;
    offsetWidth = this.offsetX * 2 + 10;
    offsetY = 100;
    offsetHeight = 110;
    width = 100;
    height = 200;
    speed = 10;
    pickedCoins = 0;
    pickedBottles = 0;
    
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    walking_sound = new Audio('../audio/walk.mp3') //this.walking_sound.play() //this.walking_sound.pause()
    
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
        
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    hurt_sound = new Audio('../audio/aua.mp3');

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * This function is to init a new character. Load all images, start the animation and apply grafity. 
     * 
     */
    constructor() {
        super();
        super.loadImage(this.IMAGES_WALKING[0]);
        super.loadImages(this.IMAGES_IDLE);
        super.loadImages(this.IMAGES_LONGIDLE);
        super.loadImages(this.IMAGES_WALKING);   
        super.loadImages(this.IMAGES_JUMPING);   
        super.loadImages(this.IMAGES_HURT); 
        super.loadImages(this.IMAGES_DEAD); 
        this.movement();
        this.animate();
        this.applyGrafity();    
    }

    /**
     * This function is to set the interval for check the movement of the character.
     * 
     */
    movement(){
        let interval = setInterval(()=>{
            this.checkMovement();
        }, 1000 / 60);
        intervalIds.push(interval);
    }    
    
    /**
     * This function is to set the interval for the animate of the character in his different states.
     * 
     */
    animate(){        
        let interval = setInterval( () => {  
            this.checkAnimate();
        }, 50)
        intervalIds.push(interval);
    }

    /**
     * This function is to call the function to move if the character is moving.
     * 
     */
    checkMovement(){
        this.walking_sound.pause();
        if(this.world.keyboard.RIGHT && this.canGoRight()){
            this.goRight();                
        }
        if(this.world.keyboard.LEFT && this.canGoLeft()){
            this.goLeft();
        }
        if(this.canJump()){
            this.jump();
        }            
        this.moveCam();        
    }

    /**
     * This function is to check with animation the character have.
     * 
     */
    checkAnimate(){
        this.hurt_sound.pause();             
        if(this.isDead()){    
            this.animateDead();
        }else if(this.isHurt()){    
            this.animateHurt();
        }else if(this.isAboveGround()){
            this.playAnimation(this.IMAGES_JUMPING)
        }else if(this.isLongIdle()){
            this.playAnimation(this.IMAGES_LONGIDLE)
        }else{                       
            if(this.isWalking()){
                this.playAnimation(this.IMAGES_WALKING);
            }else{
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
    }

    /**
     * This function is to check if the character jump and can jump.
     * 
     * @returns true or false if the character can jump
     */
    canJump(){
        return this.world.keyboard.UP && !this.isAboveGround()
    }

    /**
     * This function is to move the character to left side.
     * 
     */
    goLeft(){
        this.x -= this.speed;
        this.otherDirection = true;
        this.lastMove = new Date().getTime();
        this.playWalkingSound();
    }

    /**
     * This function is to move the character to right side.
     * 
     */
    goRight(){
        this.x += this.speed;
        this.otherDirection = false;
        this.lastMove = new Date().getTime();
        this.playWalkingSound();
    }

    /**
     * This function is to jump with the character.
     * 
     */
    jump(){
        this.speedY = 10;
        this.lastMove = new Date().getTime();
    }

    /**
     * This function is to jump when onhead of enemy.
     * 
     */
    onHead(){
        this.speedY = 10;
    }

    /**
     * This function is to play the walking sound.
     * 
     */
    playWalkingSound(){
        if(sound){
            this.walking_sound.play();
        }
    }

    /**
     * This function is to move the cam with the character.
     * 
     */
    moveCam(){
        this.world.camera_x = -this.x + 200; 
    }

    /**
     * This function is to check if the character in long idle status.
     * 
     * @returns true or false if the character long idle or not
     */
    isLongIdle(){
        return new Date().getTime() - this.lastMove > 5000
    }

     /**
     * This function is to check if the character in walking status.
     * 
     * @returns true or false if the character walking or not
     */
    isWalking(){
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }

    /**
     * This function is to show the dead animation.
     * 
     */
    animateDead(){
        this.playAnimation(this.IMAGES_DEAD)
        setTimeout(()=>{
            gameOver = true;
            drawGameOverScreen();
            showRestartGame();
            gameSound.pause();
            stopIntervals();
        },1500);
    }
    
    /**
     * This function is to show the hurt animation.
     * 
     */
    animateHurt(){
        this.playAnimation(this.IMAGES_HURT);
        if(sound){
            this.hurt_sound.play();
        }
    }
}