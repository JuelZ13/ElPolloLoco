class DrawableObject{
    energy = 100;
    img;
    x;
    y;
    offsetX = 0;
    offsetWidth = 0;
    offsetY = 0;
    offsetHeight = 0;
    width;
    height;
    imageCache = [];
    currentImage = 0;
    picked = false;
    

    /**
     * This function is to create an image and load the src path.
     * 
     * @param {String} path - path to the image file to load
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    
    /**
     * This function is to create an image for all values (path) of an array.
     * 
     * @param {Array} arr - Array with the paths for the image file to load
     */    
    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });        
    }

    /**
     * This function is to switch the image of an object to the next image of an array.
     * 
     * @param {Array} images - Array with images to switch the image to the next
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }    

    /**
     * This function is to draw a Frame to the objects character, chicken, smallchicken, pickableobjects, endboss if the dev switch is true.
     * 
     * @param {ctx} ctx - canvas context
     */
    drawFrame(ctx){
        if(this.wantFrame() && dev){
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offsetX ,this.y + this.offsetY,this.width - this.offsetWidth, this.height - this.offsetHeight);
            ctx.stroke();
        }
    }

    /**
     * This function is to check if this object colliding with the object from the parameters.
     * 
     * @param {object} obj - object to check if colliding with this object
     * @returns true or false if the objects colliding or not
     */
    isColliding(obj) {
        return  (this.x + this.offsetX + this.width - this.offsetWidth) >= obj.x + obj.offsetX && 
                this.x + this.offsetX <= (obj.x + obj.offsetX + obj.width - obj.offsetWidth) && 
                (this.y + this.offsetY + this.height - this.offsetHeight) >= obj.y + obj.offsetY &&
                (this.y + this.offsetY) <= (obj.y + obj.offsetY + obj.height - obj.offsetHeight) &&
                (obj.energy > 0) && (this.energy > 0)
                //&& obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    /**
     * This function is to check if this object is on the head of the object from the parameters.
     * 
     * @param {object} obj - object to check if this object on head
     * @returns true or false if this object on head or not
     */
    isOnHead(obj){        
        return  (this.x + this.offsetX + this.width - this.offsetWidth) >= (obj.x + obj.offsetX) && 
                (this.x + this.offsetX) <= (obj.x + obj.offsetX + obj.width - obj.offsetWidth) && 
                (this.y + this.offsetY + this.height - this.offsetHeight) >= (obj.y + obj.offsetY - 20) &&
                (this.y + this.offsetY) <= (obj.y + obj.offsetY) && 
                (this.speedY < 0) &&
                (obj.energy > 0)
    }

    /**
     * This function checks the object gets a frame or not.
     * 
     * @returns true or false if the object gets a frame or not
     */
    wantFrame(){
        return (this instanceof Character || this instanceof Chicken || this instanceof Smallchicken ||  this instanceof PickableObject || this instanceof Endboss)
    }

    /**
     * This function draw the image of the object on the coordinats into canvas 
     * 
     */
    drawToCanvas(ctx){
        if(!this.picked){
            ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
            this.drawFrame(ctx);
        }
    }

    /**
     * This function check if the object move to left when the object move to left, canvas will reflect
     * 
     */
    checkAndSetOtherDirection(ctx){
        if(this.otherDirection){
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            this.x = this.x * -1;
        }
    }
    /**
     * This function check if the object move to left when the object move to left, canvas will reset the reflect
     * 
     */
    checkAndResetOtherDirection(ctx){
        if(this.otherDirection){
            this.x = this.x * -1;
            ctx.restore();
        }
    }
}
