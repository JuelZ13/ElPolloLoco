class World{
    level = level1;
    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x;
    energyStatusbar = new Statusbar('../img/7_statusbars/3_icons/icon_health.png', 20);
    coinStatusbar = new Statusbar('../img/7_statusbars/3_icons/icon_coin.png', 160);
    bottleStatusbar = new Statusbar('../img/7_statusbars/3_icons/icon_salsa_bottle.png', 290);
    endbossStatusbar = new Statusbar('../img/7_statusbars/3_icons/icon_health_endboss.png', 580);
    throwableObjects = [];


    /**
     * This function is to init the world. load game over screen, set ctx, set canvas, set keyboard, start draw, set world and run.
     * 
     * @param {canvas} canvas - canvas 
     * @param {object} keyboard - keyboard object
     */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * This function is to set the world to the other objects in the world.
     * 
     */
    setWorld(){
        this.character.world = this;
        this.level.endboss.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;            
        });
    }

    /**
     * This function is an interval to check for throw objects, the status of the enboss and collision of any objects.
     * 
     */
    run(){        
        let interval = setInterval(() => {
            this.checkThrowObjects();
            this.checkEndbossStatus();
            if(this.level.endboss.isDead()){
                setTimeout(()=>{
                    checkGameOver();  
                },2000)
            }
        }, 200);
        let interval1 = setInterval(() => {
            this.checkCollisions();
        }, 10);
        intervalIds.push(interval);
        intervalIds.push(interval1);
    }

    /**
     * This function is to check the status of the endboss. If the character postion x > than 1800 the endboss start to walk.
     * 
     */
    checkEndbossStatus(){
        if(this.character.x > 1800){
            this.level.endboss.setWalk();
        }
    }

    /**
     * This function is to check if the character throw a bottle. If the character throw a bottle, a new throwable object will create and the number of picked bottels reduce.
     * 
     */
    checkThrowObjects(){
        if(this.keyboard.D){
            this.character.lastMove = new Date().getTime();
            if(this.character.pickedBottles > 0){
                let bottle = new ThrowableObject(this.character.x, this.character.y + 100, this.character.otherDirection)
                this.throwableObjects.push(bottle);                
                this.character.pickedBottles--;
            }
        }
    }

    /**
     * This function is to check if any collision for the objects exist.
     * 
     */
    checkCollisions(){
        this.checkEnemyCollisions();
        this.checkEndbossCollisions();        
        this.checkCoinPickups();
        this.checkBottlePickups();
        this.checkBottleCollisions();
    }

    /**
     * This function is to check for a collison between the enemies and the character or the enemies and a bottle.
     * 
     */
    checkEnemyCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isOnHead(enemy)){
                this.character.onHead();
                enemy.dead();
            }else if(this.character.isColliding(enemy) && this.isHit()){
                this.character.hit(5);
                this.character.pushback(enemy, 10);
            }
            this.throwableObjects.forEach((bottle) => {
                if(bottle.isColliding(enemy)){
                    enemy.dead();
                    bottle.splash = true;
                }
            })            
        })       
    }

    /**
     * This function is to check if a new hit can do.
     * 
     * @returns true or false if the last hit was more than one second ago
     */
    isHit(){
        return new Date().getTime() - this.character.lastHit > 1000
    }

    /**
     * This function is to check if the character have a collision with the endboss or is to near to the enboss.
     * 
     */
    checkEndbossCollisions(){
        if(this.level.endboss.isColliding(this.character) && this.isHit()){
            this.character.speedY = 10;
            this.character.pushback(this.level.endboss, 25);                
            this.character.hit(10);
        }
        if(this.level.endboss.x - this.character.x < 250){
            this.level.endboss.setAttack();
        }
    }

    /**
     * This function is to check if the character pickup a coin.
     * 
     */
    checkCoinPickups(){
        this.level.coins.forEach((coin) => {
            if(coin.isColliding(this.character)){
                if(!coin.picked){
                    this.character.pickedCoins++;
                }
                coin.picked = true;
            }
        })
    }

    /**
     * This function is to check if the character pickup a bottle.
     * 
     */
    checkBottlePickups(){
        this.level.bottles.forEach((bottle) => {
            if(bottle.isColliding(this.character)){
                if(!bottle.picked){
                    this.character.pickedBottles++;
                }
                bottle.picked = true;
            }
        })
    }

    /**
     * This function is to check if a thowable object is colliding an enemie or the enboss.
     * 
     */
    checkBottleCollisions(){       
        this.throwableObjects.forEach((bottle) => {
            if(this.level.endboss.isColliding(bottle)){
                this.level.endboss.hit(10);
                bottle.splash = true;
            }
        })
    }

    /**
     * This function is to draw the game to canvas.
     * 
     */
    draw(){
        this.clearCanvas();        
        this.moveCamera();        
        this.addElements();        
        this.movebackCamera();
        this.addfixedElemets();
        this.redraw();            
    }

    /**
    * This function is to redraw the game to canvas how often the graficcard can do.
    * 
    */
    redraw(){
        let self = this;
        requestAnimationFrame(function() {
            if(!gameOver){
                self.draw();
            }
        });       
    }

    /**
     * This function is to clear canvas.
     * 
     */
    clearCanvas(){
        this.ctx.clearRect(0,0, this.canvas.width,this.canvas.height);
    }

    /**
     * This function is to move the camera.
     * 
     */
    moveCamera(){
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * This function is to move back the camera.
     * 
     */
    movebackCamera(){
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * This function is to add the objects to canvas
     * 
     */
    addElements(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);               
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addToMap(this.character); 
        this.addObjectsToMap(this.throwableObjects)
    }
    
    /**
     * This function is to add objects allways to see
     * 
     */
    addfixedElemets(){
         this.addToMap(this.energyStatusbar);
         this.addToMap(this.coinStatusbar);
         this.addToMap(this.bottleStatusbar);
         if(this.level.endboss.status != this.level.endboss.IMAGES_ALERT){
             this.addToMap(this.endbossStatusbar);
         }
         this.drawStatus();
    }

    /**
     * This function is to draw the statusbars in canvas
     * 
     */
    drawStatus(){
        this.ctx.font = "30px Arial";
        this.ctx.fillText(Math.round(this.character.energy),80,50);
        this.ctx.fillText(Math.round(this.character.pickedCoins),225,50);
        this.ctx.fillText(Math.round(this.character.pickedBottles),345,50);
        if(this.level.endboss.status != this.level.endboss.IMAGES_ALERT){
           this.ctx.fillText(Math.round(this.level.endboss.energy),650,50);
        }
    }
    
    /**
     * This function draw an array of objects to canvas
     * 
     * @param {array} objects -array with objects to add to canvas
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * This function draw an object to canvas
     * 
     * @param {object} mo -object to add to canvas 
     */
    addToMap(mo){
        mo.checkAndSetOtherDirection(this.ctx);
        mo.drawToCanvas(this.ctx);
        mo.checkAndResetOtherDirection(this.ctx);
    }
}