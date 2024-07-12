class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    
}

/**
 * This function is used to from button set Left true when device no touch.
 * 
 */
function keyLeft(){
    if(!hasTouchScreen){
        keyboard.LEFT = true;
    }
}

/**
 * This function is used to from button set Right true when device no touch.
 * 
 */

function keyRight(){
    if(!hasTouchScreen){
        keyboard.RIGHT = true;
    }
}

/**
 * This function is used to from button set Up true when device no touch.
 * 
 */
function keyJump(){
    if(!hasTouchScreen){
        keyboard.UP = true;
    }
}

/**
 * This function is used to from button set D true when device no touch.
 * 
 */

function keyThrow(){
    if(!hasTouchScreen){
        keyboard.D = true;
    }
}

/**
 * This function is used to from button reset Left false when device no touch.
 * 
 */
function keyLeftReset(){
    if(!hasTouchScreen){
        keyboard.LEFT = false;
    }
}

/**
 * This function is used to from button reset Right false when device no touch.
 * 
 */
function keyRightReset(){
    if(!hasTouchScreen){
        keyboard.RIGHT = false;
    }
}

/**
 * This function is used to from button reset Up false when device no touch.
 * 
 */
function keyJumpReset(){
    if(!hasTouchScreen){
        keyboard.UP = false;
    }
}

/**
 * This function is used to from button reset D false when device no touch.
 * 
 */
function keyThrowReset(){
    if(!hasTouchScreen){
        keyboard.D = false;
    }
}

 /**
 * This function is used to set the keyboard class values ​​to true when press the corresponding key on the keyboard.
 * 
 */    
 document.addEventListener('keydown',(e) => {
    if(e.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 38){
        keyboard.UP = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68){
        keyboard.D = true;
    }
});



/**
 * This function is used to set the keyboard class values ​​to true when touch the corresponding button in HTML.
 * 
 */
window.addEventListener("DOMContentLoaded", (event) => {    
        document.getElementById('touchleft').addEventListener('touchstart',(e) => {
            event.preventDefault();
            keyboard.LEFT = true;
        });
        document.getElementById('touchleft').addEventListener('',(e) => {
            event.preventDefault();
            keyboard.LEFT = true;
        });
        
        document.getElementById('touchright').addEventListener('touchstart', (e) => {
            event.preventDefault();
            keyboard.RIGHT = true;
        });
        
        document.getElementById('touchup').addEventListener('touchstart',(e) => {
            event.preventDefault();
            keyboard.UP = true;
        });
        
        document.getElementById('touchthrow').addEventListener('touchstart',(e) => {
            event.preventDefault();
            keyboard.D = true;
        });    
});

/**
 * This function is used to set the keyboard class values ​​to true when release the corresponding key on the keyboard.
 * 
 */
document.addEventListener('keyup',(e) => {
    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }    
    if(e.keyCode == 68){
        keyboard.D = false;
    }
});


/**
 * This function is used to set the keyboard class values ​​to true when not touch the corresponding button in HTML.
 * 
 */
window.addEventListener("DOMContentLoaded", (event) => {
        document.getElementById('touchleft').addEventListener('touchend',(e) => {
            e.preventDefault();
            keyboard.LEFT = false;
        });
        
        document.getElementById('touchright').addEventListener('touchend',(e) => {
            e.preventDefault();
            keyboard.RIGHT = false;
        });
        
        document.getElementById('touchup').addEventListener('touchend',(e) => {
            e.preventDefault();
            keyboard.UP = false;
        });
        
        document.getElementById('touchthrow').addEventListener('touchend',(e) => {
            e.preventDefault();
            keyboard.D = false;
        });    
});
