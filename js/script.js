let mobile = false;
let sound = true;
let hasTouchScreen = false;
let fullscreen = false;


/**
 * This function is to switch the fullscreen mode. Enter the fullscreen if fullscreen false 
 * 
 * @param {string} id - id from the HTML Element to go to Fullscreen mode 
 */
function switchFullscreen(id){
  if(fullscreen){
    exitFullscreen();
    fullscreen = false;  
  }else{
    enterFullscreen(id);
    fullscreen = true;
  }
}

/**
 * This function is to set an HTML Element to fullscreen mode.
 * 
 * @param {string} id - id from the HTML Element to go to Fullscreen mode 
 */

function enterFullscreen(id) {
    let element = document.getElementById(id);
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
  }

/**
 * This function is to exit the fullscreen mode.
 * 
 */
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * This function is to switch the value and image for the DEV switch.
 * 
 */
function switchDev() {
  let dev1 = document.getElementById('dev')	
  if(dev){
    dev1.src = "./img/switch_off.png";
    dev = false;
  }else{
    dev1.src = "./img/switch_on.png";
    dev = true;
  }
}

/**
 * This function is to switch the value and image for the mobile switch.
 * 
 */
function switchMobile() {
  let mobile1 = document.getElementById('mobile');
  let btnMobile1 = document.getElementById('btnBottom');
  if(mobile){
    mobile1.src = "./img/switch_off.png";
    btnMobile1.classList.add('d-none');
    mobile = false;
    
  }else{
    mobile1.src = "./img/switch_on.png";
    btnMobile1.classList.remove('d-none');
    mobile = true;
  }
}

/**
 * This function is to switch the value and image for the sound switch.
 * 
 */
function switchSound() {
  let sound1 = document.getElementById('sound');
  if(sound){
    sound1.src = "./img/sound-off.ico";
    sound = false;      
    gameSound.pause();
  }else{
    sound1.src = "./img/sound-on.ico";      
    sound = true;
    gameSound.play();
  }
}

/**
 * This function is to show the help information.
 * 
 * @param {event} event - default event handler 
 */
function showHelp(event){
  event.stopPropagation();
  document.getElementById('help').classList.remove('d-none');
}

/**
 * This function is to close the help information.
 * 
 */
function closeHelp(){
  document.getElementById('help').classList.add('d-none');
}