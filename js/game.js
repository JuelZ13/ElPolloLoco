let canvas;
let ctx;
let world;
let gameStartet = false;
let keyboard = new Keyboard();
let startScreen = new Image();
let gameOverScreen = new Image();
let gameSound = new Audio('../audio/ambiente.mp3');
let intervalIds = [];
let dev = false;
let gameOver = false;  

/**
 * This function is to set the Startscreen to Canvas after the Page load.
 * 
 */
function init(){
    startScreen.src = '../img/9_intro_outro_screens/start/startscreen_2.png';
    gameOverScreen.src = '../img/9_intro_outro_screens/game_over/game over.png';
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');    
    drawStartScreen(); 
    checkMobileDevice();
    checkScreenSize();
}


/**
 * This function is to dectect if device have a touchscreen.
 * 
 */
function checkMobileDevice(){
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }

    if (hasTouchScreen){
        switchMobile();
    }
}

/**
 * This function is to dectect the Orientation on mobile device. 
 * 
 */
function checkScreenSize() {
    if(screen.availHeight > screen.availWidth) {
        document.getElementById('message').classList.remove('d-none');
    }
      
    if (screen.availHeight < screen.availWidth) {
        document.getElementById('message').classList.add('d-none');
    }
}


screen.orientation.addEventListener("change", function(e) { 
    checkScreenSize();
});


/**
 * This function is to draw the Startscreen so long the game not startet.
 * 
 */
function drawStartScreen() {
    ctx.clearRect(0,0, this.canvas.width,this.canvas.height); 
    ctx.drawImage(startScreen,0,0,720,480);    
  
    requestAnimationFrame(function() {
        if(!gameStartet){
            drawStartScreen();
        }
    });
}

/**
 * This function is to start the game.
 * 
 */
function startGame(){
    gameOver = false;
    gameStartet = true;
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    if(sound){
        gameSound.play();
    }
    document.getElementById('startGame').classList.add('d-none');
    document.getElementById('fullscreen').classList.remove('d-none');
}

/**
 * This function check if the Game is over.
 * 
 */    
function checkGameOver(){
    let deadEnemies = 0;
    world.level.enemies.forEach(enemy => {
        if(enemy.isDead()){
            deadEnemies++;
        }            
        if(deadEnemies == world.level.enemies.length){
            gameOver = true;
        }
    }); 

    if(gameOver){
        drawGameOverScreen();
        showRestartGame();
        gameSound.pause();
        stopIntervals();  
    }        
}

function drawGameOverScreen() {
    ctx.clearRect(0,0, this.canvas.width,this.canvas.height); 
    ctx.drawImage(gameOverScreen,0,0,720,480); 
  
    requestAnimationFrame(function() {
        if(gameOver){
            drawGameOverScreen();
        }
    });
}

function showRestartGame(){
    let startBtn = document.getElementById('startGame');
    startBtn.innerHTML = 'Restart Game'
    startBtn.classList.remove('d-none');   
}

/**
 * This function is to stop the game. All intervalls of the game will be cleared.
 * 
 */
function stopIntervals(){
    intervalIds.forEach(interval => {
        clearInterval(interval);                
    });
}
