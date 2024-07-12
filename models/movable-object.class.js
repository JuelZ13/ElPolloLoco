class MovableObject extends DrawableObject {
    lastHit = 1;
    lastMove = new Date().getTime();
    speed = 0.15;
    speedY = 0;
    acceleration = 0.5;
    otherDirection = false;
    
    /**
     * This function is to init a new movable object.
     * 
     */
    constructor(){
        super();
    }

    /**
     * This function is to apply grafity for an moveable object.
     * 
     */
    applyGrafity(){
        let interval = setInterval(() => {
            if(this.hasSpeedY || this.isAboveGround()){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if(!this.isAboveGround()){
                this.speedY = 0;
            }
        }, 1000 / 60 )
        intervalIds.push(interval);
    }
    
    /**
     * This function is to check if the object as an speed on the y coordinate.
     * 
     * @returns true or false if has speed or not
     */
    hasSpeedY(){
        return this.speedY > 0
    }

    /**
     * This function is to move an object in the direction to the character.
     * 
     */
    move(){
        let interval = setInterval( () => {
            if(!this.isDead()){
                if(this.rightSideOfCharacter() && this.canGoLeft()){
                    this.x -= this.speed;
                    this.otherDirection = false;
                }else if(this.canGoRight()){
                   this.x += this.speed;
                    this.otherDirection = true;
                }
            }
        },1000 / 60);
        intervalIds.push(interval);
    }

    /**
     * This function is to check if the character move left and can move left.
     * 
     * @returns true or false if the character can move left
     */
    canGoLeft(){
        return this.x > 0
    }

    /**
     * This function is to check if the character move right and can move right.
     * 
     * @returns true or false if the character can move right
     */
    canGoRight(){
        return this.x < this.world.level.level_end_x
    }

    /**
     * This function is to check if a move is in the level.
     * 
     * @returns true or false if the object is in the world or not
     */
    moveInLevel(){
        return this.x < this.world.level.level_end_x && this.x > 0
    }

    /**
     * This function is to check if an object is on the right side of the character.
     * 
     * @returns true or false if the object on the right side of the character or not
     * 
     */
    rightSideOfCharacter(){
        return this.x > this.world.character.x
    }


    /**
     * This function is to move an object to the left side and if the object go to the end of the level the object start again at the right end of the level.
     * 
     */
    moveLeft(){
        let interval = setInterval( () => {
            if(!this.isDead()){
                this.x -= this.speed;
            }
            if(this.x + this.width < 0){
                this.x = 2500;
            }

        },1000 / 60);
        intervalIds.push(interval);
    }

    
    /**
     * This function is to check if an object is above the ground.
     * 
     * @returns true or false if the object is above ground or not
     */
    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true
        }else if(this instanceof Smallchicken){
            if(this.y > 355){
                this.y = 355;
            }
            return this.y < 355
        }else{
            if(this.y > 220){
                this.y = 220;
            }
            return this.y < 220
        }        
    }

    /**
     * This function is to reduce the energy of an object
     * 
     * @param {int}} intense - how much energy is withdrawn
     */
    hit(intense){
        if(new Date().getTime() - this.lastHit > 400){
            this.energy -= intense;
            if (this.energy < 0) {
                this.energy = 0;
            }else{
                this.lastHit = new Date().getTime();
            }    
        }
    }

    /**
     * This function is to pushback an object on the way it hit.
     * 
     * @param {object} enemy - how hit the object to definie the direction
     * @param {*} speedX - how strong the hit for the pushback
     */
    pushback(enemy,speedX){
        let interval = setInterval(() => {
            if(speedX > 0 && this.moveInLevel()){
                if(enemy.otherDirection){
                    this.x += speedX;
                    speedX -= this.acceleration;
                }else{
                    this.x -= speedX;
                    speedX -= this.acceleration;
                }
            }              
        },1000 / 60)  
        intervalIds.push(interval);    
    }

    /**
     * This function is to check if the object hit in the last sec.
     * 
     * @returns true or false if the obeject hit in the last sec or not
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * This function is to check if the object is dead.
     * 
     * @returns true or false if the energy of the object is 0 or bigger than 0
     */
    isDead(){
        return this.energy <= 0;
    }

    dead(){
        this.energy = 0;
    }

}